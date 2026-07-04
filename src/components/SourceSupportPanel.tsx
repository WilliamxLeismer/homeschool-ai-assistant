import { getSourceSupport } from "@/lib/artifacts/sourceSupport";
import type { GeneratedArtifact } from "@/workflows/types";

export function SourceSupportPanel({ artifact }: { artifact: GeneratedArtifact }) {
  const support = getSourceSupport(artifact);
  const sources = artifact.researchSources || [];

  return (
    <section className="source-panel no-print">
      <div>
        <p className="eyebrow">Source support</p>
        <h2>{support.level}: {support.label}</h2>
        <p>{support.detail}</p>
      </div>
      {sources.length > 0 ? (
        <details>
          <summary>App research sources ({sources.length})</summary>
          <ol>
            {sources.map((source) => (
              <li key={source.id}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.id}: {source.title}</a>
                <p>{source.snippet}</p>
                {source.relevanceScore !== undefined ? <small>Relevance score: {source.relevanceScore}</small> : null}
              </li>
            ))}
          </ol>
        </details>
      ) : (
        <p className="muted">No app research sources were saved with this artifact.</p>
      )}
    </section>
  );
}
