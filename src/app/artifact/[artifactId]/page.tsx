import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtifactViewer } from "@/components/ArtifactViewer";
import { ParentReviewChecklist } from "@/components/ParentReviewChecklist";
import { SourceSupportPanel } from "@/components/SourceSupportPanel";
import { getArtifact } from "@/lib/artifacts/getArtifact";
import { getProviderStatus } from "@/lib/llm/getProvider";
import { getWorkflow } from "@/workflows";

export default async function ArtifactPage({ params }: { params: Promise<{ artifactId: string }> }) {
  const { artifactId } = await params;
  const artifact = await getArtifact(artifactId);
  if (!artifact) notFound();
  const workflow = getWorkflow(artifact.workflowId);
  const status = getProviderStatus();

  return (
    <div className="stack">
      <div className="artifact-header no-print">
        <div>
          <p className="eyebrow">{workflow?.title || artifact.workflowId}</p>
          <h1>{artifact.title}</h1>
          <p>{new Date(artifact.createdAt).toLocaleString()} · {artifact.provider}/{artifact.model}</p>
        </div>
        <Link className="button secondary" href="/history">History</Link>
      </div>
      <SourceSupportPanel artifact={artifact} />
      <ArtifactViewer artifact={artifact} />
      <ParentReviewChecklist notes={artifact.validationNotes || []} />
      {status.debugShowPrompts ? (
        <details className="debug-panel no-print">
          <summary>Debug prompt view</summary>
          <h2>System Prompt</h2>
          <pre>{artifact.systemPrompt}</pre>
          <h2>User Prompt</h2>
          <pre>{artifact.userPrompt}</pre>
          <p>Provider: {artifact.provider}</p>
          <p>Model: {artifact.model}</p>
        </details>
      ) : null}
    </div>
  );
}
