import { getResearchProvider } from "./getResearchProvider";
import type { ResearchSource } from "./types";
import type { InterviewAnswers, WorkflowDefinition } from "@/workflows/types";

export async function researchForWorkflow(workflow: WorkflowDefinition, answers: InterviewAnswers): Promise<ResearchSource[]> {
  const provider = getResearchProvider();
  if (!provider) return [];

  const maxResults = Number(process.env.RESEARCH_MAX_RESULTS || 4);
  try {
    return await provider.search({ workflow, answers, maxResults });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function formatResearchNotes(sources: ResearchSource[]) {
  if (!sources.length) {
    return "No app research sources were found. If source-grounded output is required, ask the parent for textbook pages, curriculum excerpts, source titles, or other context before presenting the artifact as high confidence.";
  }

  return sources
    .map((source) => `[${source.id}] ${source.title}\nURL: ${source.url}\nProvider: ${source.provider}\nRelevant note: ${source.snippet}`)
    .join("\n\n");
}
