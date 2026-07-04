"use server";

import { redirect } from "next/navigation";
import { buildPrompt } from "@/lib/prompting/buildPrompt";
import { getProvider } from "@/lib/llm/getProvider";
import { saveArtifact } from "@/lib/artifacts/saveArtifact";
import { validateArtifact } from "@/lib/validation/validateArtifact";
import { writeLocalSettings } from "@/lib/storage/settings";
import { researchForWorkflow } from "@/lib/research/researchForWorkflow";
import { getWorkflow } from "@/workflows";
import type { InterviewAnswers, WorkflowId } from "@/workflows/types";

function validationPassed(notes: string[]) {
  return notes.length === 1 && notes[0] === "Basic validation passed.";
}

function titleFromMarkdown(markdown: string, fallback: string) {
  const firstHeading = markdown.split("\n").find((line) => line.startsWith("# "));
  return firstHeading ? firstHeading.replace(/^#\s+/, "").trim() : fallback;
}

export async function generateArtifact(workflowId: WorkflowId, answers: InterviewAnswers) {
  const workflow = getWorkflow(workflowId);
  if (!workflow) throw new Error("Unknown workflow.");

  const researchSources = await researchForWorkflow(workflow, answers);
  const { system, user } = buildPrompt(workflow, answers, researchSources);
  const provider = getProvider();
  let response;
  try {
    response = await provider.generate({
      system,
      user,
      temperature: 0.35,
      maxTokens: 5000,
      metadata: { workflowId, ...answers }
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Generation failed."
    };
  }

  let markdown = response.text;
  let validationNotes = validateArtifact(markdown, workflow, answers);

  if (!validationPassed(validationNotes)) {
    try {
      const repairResponse = await provider.generate({
        system,
        user: `${user}

The previous draft failed validation.

Validation failures:
${validationNotes.map((note) => `- ${note}`).join("\n")}

Previous draft:
${markdown}

Repair task:
- Return a complete artifact in Markdown.
- Use the exact required section structure.
- Include every missing section.
- Preserve good content from the previous draft.
- Do not add citations that were not present in the app research notes or parent-provided sources.`,
        temperature: 0.2,
        maxTokens: 5000,
        metadata: { workflowId, repair: true, ...answers }
      });
      const repairedNotes = validateArtifact(repairResponse.text, workflow, answers);
      if (validationPassed(repairedNotes) || repairedNotes.length <= validationNotes.length) {
        response = repairResponse;
        markdown = repairResponse.text;
        validationNotes = repairedNotes;
      }
    } catch (error) {
      validationNotes = [
        ...validationNotes,
        `Repair attempt failed: ${error instanceof Error ? error.message : "Unknown error"}`
      ];
    }
  }

  const artifact = await saveArtifact({
    id: crypto.randomUUID(),
    workflowId,
    title: titleFromMarkdown(markdown, workflow.title),
    markdown,
    answers,
    provider: response.provider,
    model: response.model,
    createdAt: new Date().toISOString(),
    validationNotes,
    systemPrompt: system,
    userPrompt: user
  });

  redirect(`/artifact/${artifact.id}`);
}

export async function saveSettings(formData: FormData) {
  const provider = String(formData.get("provider") || "mock");
  if (!["mock", "ollama", "openai_compatible"].includes(provider)) {
    throw new Error("Invalid provider.");
  }

  writeLocalSettings({
    provider: provider as "mock" | "ollama" | "openai_compatible",
    ollamaModel: String(formData.get("ollamaModel") || "").trim() || undefined,
    openAiCompatibleModel: String(formData.get("openAiCompatibleModel") || "").trim() || undefined,
    debugShowPrompts: formData.get("debugShowPrompts") === "on"
  });

  redirect("/settings");
}
