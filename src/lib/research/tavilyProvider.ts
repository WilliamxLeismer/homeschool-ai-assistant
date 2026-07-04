import { buildResearchQuery } from "./buildResearchQuery";
import type { ResearchProvider, ResearchSource } from "./types";

type TavilyResponse = {
  results?: Array<{
    title?: string;
    url?: string;
    content?: string;
    score?: number;
  }>;
};

export const tavilyProvider: ResearchProvider = {
  name: "tavily",
  async search(request) {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
      throw new Error("Tavily research requires TAVILY_API_KEY.");
    }

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: buildResearchQuery(request),
        search_depth: "basic",
        max_results: request.maxResults ?? 4,
        include_answer: false,
        include_raw_content: false
      })
    });

    if (!response.ok) {
      throw new Error(`Tavily research failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as TavilyResponse;
    return (data.results || [])
      .filter((result) => result.title && result.url && result.content)
      .map<ResearchSource>((result, index) => ({
        id: `R${index + 1}`,
        title: result.title || "Untitled source",
        url: result.url || "",
        snippet: (result.content || "").replace(/\s+/g, " ").trim(),
        provider: "tavily",
        relevanceScore: result.score
      }));
  }
};
