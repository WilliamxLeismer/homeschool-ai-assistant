export type GradeBand = "ages 5-7" | "ages 8-10" | "ages 11-13" | "mixed ages";

export type WorldviewLevel = "none" | "light" | "moderate";

export type WorkflowId =
  | "teach-me-first"
  | "one-day-lesson"
  | "one-week-plan"
  | "worksheet"
  | "curriculum-review";

export type InterviewQuestion = {
  id: string;
  label: string;
  helpText?: string;
  type: "text" | "textarea" | "select" | "multiselect" | "number" | "boolean";
  required?: boolean;
  options?: string[];
};

export type WorkflowDefinition = {
  id: WorkflowId;
  title: string;
  shortDescription: string;
  outputType: string;
  questions: InterviewQuestion[];
  systemPromptTemplate: string;
  userPromptTemplate: string;
  outputTemplate: string;
  validationChecklist: string[];
};

export type InterviewAnswers = Record<string, string | string[] | number | boolean>;

export type GeneratedArtifact = {
  id: string;
  workflowId: WorkflowId;
  title: string;
  markdown: string;
  answers: InterviewAnswers;
  researchSources?: Array<{
    id: string;
    title: string;
    url: string;
    snippet: string;
    provider: string;
    relevanceScore?: number;
  }>;
  provider: string;
  model: string;
  createdAt: string;
  repairAttempted?: boolean;
  repairSucceeded?: boolean;
  validationNotes?: string[];
  systemPrompt?: string;
  userPrompt?: string;
};
