import { notFound } from "next/navigation";
import { InterviewWizard } from "@/components/InterviewWizard";
import { getWorkflow } from "@/workflows";

export default async function WorkflowPage({ params }: { params: Promise<{ workflowId: string }> }) {
  const { workflowId } = await params;
  const workflow = getWorkflow(workflowId);
  if (!workflow) notFound();

  return <InterviewWizard workflow={workflow} />;
}
