import type { GenerateResponse, LlmProvider } from "./types";
import { readLocalSettings } from "@/lib/storage/settings";

export function createOllamaProvider(): LlmProvider {
  const settings = readLocalSettings();
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
  const model = settings.ollamaModel || process.env.OLLAMA_MODEL || "llama3.1:8b";

  return {
    name: "ollama",
    model,
    async generate(request): Promise<GenerateResponse> {
      const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          prompt: `${request.system}\n\n${request.user}`,
          stream: false,
          options: {
            temperature: request.temperature ?? 0.4,
            num_predict: request.maxTokens ?? 1800
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
      }

      const raw = await response.json();
      return {
        text: String(raw.response || ""),
        provider: "ollama",
        model,
        raw
      };
    }
  };
}
