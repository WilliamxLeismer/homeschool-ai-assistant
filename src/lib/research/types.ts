import type { InterviewAnswers, WorkflowDefinition } from "@/workflows/types";

export type ResearchSource = {
  id: string;
  title: string;
  url: string;
  snippet: string;
  provider: string;
};

export type ResearchRequest = {
  workflow: WorkflowDefinition;
  answers: InterviewAnswers;
  maxResults?: number;
};

export type ResearchProvider = {
  name: string;
  search: (request: ResearchRequest) => Promise<ResearchSource[]>;
};
