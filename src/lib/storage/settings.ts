import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export type LocalSettings = {
  provider?: "mock" | "ollama" | "openai_compatible";
  ollamaModel?: string;
  openAiCompatibleModel?: string;
  debugShowPrompts?: boolean;
};

const dataDir = path.join(process.cwd(), "data");
const settingsFile = path.join(dataDir, "settings.json");

function ensureSettingsFile() {
  mkdirSync(dataDir, { recursive: true });
  if (!existsSync(settingsFile)) {
    writeFileSync(settingsFile, "{}", "utf8");
  }
}

export function readLocalSettings(): LocalSettings {
  ensureSettingsFile();
  try {
    return JSON.parse(readFileSync(settingsFile, "utf8")) as LocalSettings;
  } catch {
    return {};
  }
}

export function writeLocalSettings(settings: LocalSettings) {
  ensureSettingsFile();
  writeFileSync(settingsFile, JSON.stringify(settings, null, 2), "utf8");
}

export function effectiveProviderName() {
  return readLocalSettings().provider || process.env.LLM_PROVIDER || "mock";
}

export function effectiveDebugShowPrompts() {
  const setting = readLocalSettings().debugShowPrompts;
  return setting ?? process.env.DEBUG_SHOW_PROMPTS === "true";
}
