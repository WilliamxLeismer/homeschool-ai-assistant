import { ProviderStatus } from "@/components/ProviderStatus";
import { saveSettings } from "@/app/actions";
import { getProviderStatus } from "@/lib/llm/getProvider";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const status = getProviderStatus();

  return (
    <div className="stack narrow">
      <section className="intro compact">
        <h1>Settings</h1>
        <p>Provider configuration is read from environment variables so local startup stays simple.</p>
      </section>
      <ProviderStatus />
      <form className="settings-form" action={saveSettings}>
        <label>
          Provider
          <select name="provider" defaultValue={status.provider}>
            <option value="mock">mock</option>
            <option value="ollama">ollama</option>
            <option value="openai_compatible">openai_compatible</option>
          </select>
        </label>
        <label>
          Ollama model
          <input name="ollamaModel" defaultValue={status.settings.ollamaModel || process.env.OLLAMA_MODEL || "llama3.1:8b"} />
        </label>
        <label>
          OpenAI-compatible model
          <input name="openAiCompatibleModel" defaultValue={status.settings.openAiCompatibleModel || process.env.OPENAI_COMPATIBLE_MODEL || "openai/gpt-5-mini"} />
        </label>
        <label className="checkbox-row">
          <input name="debugShowPrompts" type="checkbox" defaultChecked={status.debugShowPrompts} />
          Show debug prompts
        </label>
        <button className="button" type="submit">Save Settings</button>
      </form>
      <section className="note">
        <h2>Provider note</h2>
        <p>
          Settings are saved in <code>data/settings.json</code>. Environment variables in <code>.env.local</code> remain the default fallback.
          Mock and Ollama run locally; OpenAI-compatible providers send prompts to the configured API endpoint.
        </p>
      </section>
      <section className="note">
        <h2>Privacy note</h2>
        <p>No login, child accounts, payments, cloud sync, or file uploads are implemented in this MVP.</p>
      </section>
    </div>
  );
}
