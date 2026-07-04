import type { ResearchRequest } from "./types";

export function buildResearchQuery({ workflow, answers }: ResearchRequest) {
  const topic = typeof answers.topic === "string" ? answers.topic : "";
  const sourceTitle = typeof answers.sourceTitle === "string" ? answers.sourceTitle : "";
  const improvementGoal = typeof answers.improvementGoal === "string" ? answers.improvementGoal : "";

  const core = topic || sourceTitle || improvementGoal || workflow.title;
  return core;
}
