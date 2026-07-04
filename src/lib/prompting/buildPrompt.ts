import type { InterviewAnswers, WorkflowDefinition } from "@/workflows/types";
import { sharedSystemRules } from "./sharedSystemRules";
import { safetyRules } from "./safetyRules";
import { renderTemplate } from "./renderTemplate";
import { worldviewRules } from "./worldviewRules";
import { sourceGroundingRules } from "./sourceGroundingRules";
import { formatResearchNotes } from "@/lib/research/researchForWorkflow";
import type { ResearchSource } from "@/lib/research/types";

export function buildPrompt(workflow: WorkflowDefinition, answers: InterviewAnswers, researchSources: ResearchSource[] = []) {
  const context = workflow.questions
    .map((question) => {
      const value = answers[question.id];
      const printable = Array.isArray(value)
        ? value.join(", ")
        : typeof value === "boolean"
          ? value ? "yes" : "no"
          : value || "not specified";
      return `- ${question.label}: ${printable}`;
    })
    .join("\n");

  const system = [
    sharedSystemRules,
    safetyRules,
    worldviewRules,
    sourceGroundingRules,
    workflow.systemPromptTemplate
  ].join("\n\n");

  const user = renderTemplate(
    `${workflow.userPromptTemplate}

Parent-provided context:
${context}

App research notes:
${formatResearchNotes(researchSources)}

Output requirements:
Use this exact section structure:
${workflow.outputTemplate}

Quality checklist:
${workflow.validationChecklist.map((item) => `- ${item}`).join("\n")}

Follow-up limit:
- If you include "Additional Context Needed Before Teaching", keep it short.
- Use no more than three bullet points in that section.
- If the parent can use the artifact today, say so and avoid adding unnecessary homework.`,
    answers
  );

  return { system, user };
}
