import type { GenerateResponse, LlmProvider } from "./types";
import { readLocalSettings } from "@/lib/storage/settings";

export function createOpenAiCompatibleProvider(): LlmProvider {
  const settings = readLocalSettings();
  const baseUrl = process.env.OPENAI_COMPATIBLE_BASE_URL;
  const apiKey = process.env.OPENAI_COMPATIBLE_API_KEY || process.env.AI_GATEWAY_API_KEY;
  const model = settings.openAiCompatibleModel || process.env.OPENAI_COMPATIBLE_MODEL || "openai/gpt-5-mini";

  return {
    name: "openai_compatible",
    model,
    async generate(request): Promise<GenerateResponse> {
      if (!baseUrl || !apiKey) {
        throw new Error("OpenAI-compatible provider requires OPENAI_COMPATIBLE_BASE_URL, OPENAI_COMPATIBLE_API_KEY or AI_GATEWAY_API_KEY, and OPENAI_COMPATIBLE_MODEL.");
      }

      const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          temperature: request.temperature ?? 0.4,
          max_tokens: request.maxTokens ?? 1800,
          messages: [
            { role: "system", content: request.system },
            { role: "user", content: request.user }
          ]
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let detail = errorBody;
        try {
          const parsed = JSON.parse(errorBody) as { error?: { message?: string; type?: string } };
          detail = [parsed.error?.message, parsed.error?.type ? `(${parsed.error.type})` : ""]
            .filter(Boolean)
            .join(" ");
        } catch {
          detail = errorBody.slice(0, 500);
        }
        throw new Error(`OpenAI-compatible request failed: ${response.status} ${response.statusText}. ${detail}`);
      }

      const raw = await response.json();
      return {
        text: String(raw.choices?.[0]?.message?.content || ""),
        provider: "openai_compatible",
        model,
        raw
      };
    }
  };
}
