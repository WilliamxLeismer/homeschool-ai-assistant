import { WorkflowCard } from "@/components/WorkflowCard";
import { ProviderStatus } from "@/components/ProviderStatus";
import { workflows } from "@/workflows";

export default function HomePage() {
  return (
    <div className="stack">
      <section className="intro">
        <p className="eyebrow">Parent-led local MVP</p>
        <h1>Five-button lesson prep for Christian homeschool parents.</h1>
        <p>
          Pick a teaching document, answer simple interview questions, and receive a printable artifact.
        </p>
      </section>
      <ProviderStatus />
      <section className="workflow-grid" aria-label="Workflow selection">
        {workflows.map((workflow) => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </section>
    </div>
  );
}
