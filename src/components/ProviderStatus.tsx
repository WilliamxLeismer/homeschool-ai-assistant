import { getProviderStatus } from "@/lib/llm/getProvider";

export function ProviderStatus() {
  const status = getProviderStatus();

  return (
    <aside className="provider-status" aria-label="Provider status">
      <span>Provider: <strong>{status.provider}</strong></span>
      <span>Model: <strong>{status.model}</strong></span>
      <span>{status.appLocalOnly ? "Local-only mode" : "Network provider mode"}</span>
    </aside>
  );
}
