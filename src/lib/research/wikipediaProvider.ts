import { buildResearchQuery } from "./buildResearchQuery";
import type { ResearchProvider, ResearchSource } from "./types";

type WikipediaSearchResponse = {
  query?: {
    pages?: Record<string, {
      pageid: number;
      title: string;
      fullurl?: string;
      extract?: string;
      index?: number;
    }>;
  };
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function keywords(query: string) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .filter((word) => !["the", "and", "for", "with", "lesson", "topic"].includes(word));
}

function scoreSource(query: string, title: string, text: string) {
  const words = keywords(query);
  const titleText = title.toLowerCase();
  const bodyText = text.toLowerCase();

  return words.reduce((score, word) => {
    if (titleText.includes(word)) return score + 4;
    if (bodyText.includes(word)) return score + 1;
    return score;
  }, 0);
}

function trimSnippet(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= 700) return normalized;
  return `${normalized.slice(0, 697).trim()}...`;
}

export const wikipediaProvider: ResearchProvider = {
  name: "wikipedia",
  async search(request) {
    const maxResults = request.maxResults ?? 4;
    const query = buildResearchQuery(request);
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrlimit: String(Math.max(maxResults * 2, 8)),
      prop: "extracts|info",
      exintro: "1",
      explaintext: "1",
      inprop: "url",
      redirects: "1",
      format: "json",
      origin: "*"
    });

    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`, {
      headers: { "User-Agent": "homeschool-ai-assistant-mvp/0.1" }
    });

    if (!response.ok) {
      throw new Error(`Wikipedia research failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as WikipediaSearchResponse;
    const pages = Object.values(data.query?.pages || {});

    return pages
      .sort((a, b) => (a.index || 0) - (b.index || 0))
      .map((page) => {
        const extract = page.extract?.trim() || "";
        return {
          title: page.title,
          url: page.fullurl || `https://en.wikipedia.org/?curid=${page.pageid}`,
          snippet: trimSnippet(extract),
          provider: "wikipedia",
          relevanceScore: scoreSource(query, page.title, extract)
        };
      })
      .filter((source) => !/disambiguation/i.test(source.title))
      .filter((source) => source.snippet.length > 80)
      .filter((source) => source.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxResults)
      .map<ResearchSource>((source, index) => ({
        id: `R${index + 1}`,
        ...source
      }));
  }
};
