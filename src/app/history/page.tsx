import Link from "next/link";
import { listArtifacts } from "@/lib/artifacts/listArtifacts";
import { getWorkflow } from "@/workflows";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const artifacts = await listArtifacts();

  return (
    <div className="stack">
      <section className="intro compact">
        <h1>History</h1>
        <p>Saved local artifacts from this machine.</p>
      </section>
      {artifacts.length === 0 ? (
        <p>No artifacts saved yet.</p>
      ) : (
        <div className="history-list">
          {artifacts.map((artifact) => {
            const workflow = getWorkflow(artifact.workflowId);
            return (
              <Link className="history-item" key={artifact.id} href={`/artifact/${artifact.id}`}>
                <strong>{artifact.title}</strong>
                <span>{workflow?.title || artifact.workflowId}</span>
                <span>{new Date(artifact.createdAt).toLocaleString()}</span>
                <span>{artifact.provider}/{artifact.model}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
