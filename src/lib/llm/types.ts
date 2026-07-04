export type GenerateRequest = {
  system: string;
  user: string;
  temperature?: number;
  maxTokens?: number;
  metadata?: Record<string, unknown>;
};

export type GenerateResponse = {
  text: string;
  provider: string;
  model: string;
  raw?: unknown;
};

export type LlmProvider = {
  name: string;
  model: string;
  generate: (request: GenerateRequest) => Promise<GenerateResponse>;
};
