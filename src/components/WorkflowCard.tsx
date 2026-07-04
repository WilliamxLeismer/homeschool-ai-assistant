import Link from "next/link";
import type { WorkflowDefinition } from "@/workflows/types";

export function WorkflowCard({ workflow }: { workflow: WorkflowDefinition }) {
  return (
    <Link className="workflow-card" href={`/workflow/${workflow.id}`}>
      <span>{workflow.outputType}</span>
      <h2>{workflow.title}</h2>
      <p>{workflow.shortDescription}</p>
    </Link>
  );
}
