import type { InterviewAnswers, WorkflowDefinition } from "@/workflows/types";

function requiredHeadings(template: string) {
  return template
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => line.replace(/\{\{topic\}\}/g, "").trim())
    .filter(Boolean);
}

function sectionText(markdown: string, heading: string) {
  const pattern = new RegExp(`## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`, "i");
  return markdown.match(pattern)?.[1] || "";
}

function bulletCount(text: string) {
  return text
    .split("\n")
    .filter((line) => /^\s*[-*]\s+/.test(line))
    .length;
}

export function validateArtifact(markdown: string, workflow: WorkflowDefinition, answers: InterviewAnswers) {
  const notes: string[] = [];

  if (!markdown.trim()) notes.push("Artifact is empty.");
  if (!markdown.trim().startsWith("#")) notes.push("Artifact should start with a title heading.");
  if (!/Parent Review Checklist/i.test(markdown)) notes.push("Parent review checklist is missing.");

  for (const heading of requiredHeadings(workflow.outputTemplate)) {
    const normalized = heading.replace(/:\s*$/, "");
    if (!markdown.includes(normalized)) {
      notes.push(`Expected section may be missing: ${normalized}`);
    }
  }

  if ((answers.worldviewLevel === "light" || answers.worldviewLevel === "moderate") && !/Note for parent: Review all biblical connections/i.test(markdown)) {
    notes.push("Worldview disclaimer is missing.");
  }

  if (workflow.id === "worksheet" && answers.includeAnswerKey === true && !/## Answer Key/i.test(markdown)) {
    notes.push("Answer key is missing.");
  }

  const wantsSources =
    answers.citationMode === "cite parent-provided sources" ||
    answers.citationMode === "ask for more context if sources are thin";
  const hasSourceText =
    typeof answers.supportingSourceText === "string" && answers.supportingSourceText.trim().length > 0 ||
    typeof answers.sourceMaterial === "string" && answers.sourceMaterial.trim().length > 0;
  const hasSourceTitle = typeof answers.sourceTitle === "string" && answers.sourceTitle.trim().length > 0;

  if (wantsSources && !/## Source Basis and Limits/i.test(markdown)) {
    notes.push("Source basis section is missing.");
  }

  if (wantsSources && !hasSourceText && !hasSourceTitle && !/## Additional Context Needed Before Teaching/i.test(markdown)) {
    notes.push("Missing-source context request is missing.");
  }

  if (wantsSources && !hasSourceText && !hasSourceTitle && /page\s+\d+|pp\.\s*\d+|according to\s+[A-Z][A-Za-z]+/i.test(markdown)) {
    notes.push("Artifact may contain unsupported citation-like claims.");
  }

  const additionalContext = sectionText(markdown, "Additional Context Needed Before Teaching");
  if (bulletCount(additionalContext) > 3) {
    notes.push("Additional context section should contain no more than three bullet items.");
  }

  return notes.length ? notes : ["Basic validation passed."];
}
