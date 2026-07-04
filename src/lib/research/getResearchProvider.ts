import { tavilyProvider } from "./tavilyProvider";
import { wikipediaProvider } from "./wikipediaProvider";

export function getResearchProvider() {
  const provider = process.env.RESEARCH_PROVIDER || "wikipedia";
  if (provider === "none") return null;
  if (provider === "tavily") return tavilyProvider;
  return wikipediaProvider;
}
