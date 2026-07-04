import { buildResearchQuery } from "./buildResearchQuery";
import type { ResearchProvider, ResearchSource } from "./types";

type WikipediaSearchResponse = {
  query?: {
    search?: Array<{
      title: string;
      pageid: number;
      snippet: string;
    }>;
  };
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export const wikipediaProvider: ResearchProvider = {
  name: "wikipedia",
  async search(request) {
    const maxResults = request.maxResults ?? 4;
    const query = buildResearchQuery(request);
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: query,
      format: "json",
      origin: "*",
      srlimit: String(maxResults)
    });

    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`, {
      headers: { "User-Agent": "homeschool-ai-assistant-mvp/0.1" }
    });

    if (!response.ok) {
      throw new Error(`Wikipedia research failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as WikipediaSearchResponse;
    const results = data.query?.search || [];

    return results.map<ResearchSource>((result, index) => ({
      id: `R${index + 1}`,
      title: result.title,
      url: `https://en.wikipedia.org/?curid=${result.pageid}`,
      snippet: stripHtml(result.snippet),
      provider: "wikipedia"
    }));
  }
};
