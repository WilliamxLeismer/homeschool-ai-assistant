import { mockProvider } from "./mockProvider";
import { createOllamaProvider } from "./ollamaProvider";
import { createOpenAiCompatibleProvider } from "./openAiCompatibleProvider";
import { effectiveDebugShowPrompts, effectiveProviderName, readLocalSettings } from "@/lib/storage/settings";

export function getProvider() {
  const provider = effectiveProviderName();

  if (provider === "ollama") return createOllamaProvider();
  if (provider === "openai_compatible") return createOpenAiCompatibleProvider();
  return mockProvider;
}

export function getProviderStatus() {
  const provider = getProvider();
  const settings = readLocalSettings();
  return {
    provider: provider.name,
    model: provider.model,
    debugShowPrompts: effectiveDebugShowPrompts(),
    appLocalOnly: provider.name === "mock" || provider.name === "ollama",
    settings
  };
}
