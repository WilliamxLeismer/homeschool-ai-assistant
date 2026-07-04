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
      const missing = [
        !baseUrl ? "OPENAI_COMPATIBLE_BASE_URL" : "",
        !apiKey ? "OPENAI_COMPATIBLE_API_KEY or AI_GATEWAY_API_KEY" : ""
      ].filter(Boolean);

      if (missing.length) {
        throw new Error(`OpenAI-compatible provider is missing: ${missing.join(", ")}. For Vercel AI Gateway, add AI_GATEWAY_API_KEY to .env.local and restart the dev server.`);
      }

      if (!baseUrl || !apiKey) {
        throw new Error("OpenAI-compatible provider configuration is incomplete.");
      }

      const configuredBaseUrl = baseUrl;
      const configuredApiKey = apiKey;

      const response = await fetch(`${configuredBaseUrl.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${configuredApiKey}`
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
