import type { GeneratedArtifact } from "@/workflows/types";

export type SourceSupport = {
  level: "High" | "Moderate" | "Low";
  label: string;
  detail: string;
};

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export function getSourceSupport(artifact: GeneratedArtifact): SourceSupport {
  const hasPastedSource =
    hasText(artifact.answers.supportingSourceText) ||
    hasText(artifact.answers.sourceMaterial);
  const hasSourceTitle = hasText(artifact.answers.sourceTitle);
  const researchCount = artifact.researchSources?.length || 0;

  if (hasPastedSource && researchCount > 0) {
    return {
      level: "High",
      label: "Parent source plus app research",
      detail: "This artifact used pasted parent material and app research notes. Parent review is still required."
    };
  }

  if (hasPastedSource) {
    return {
      level: "High",
      label: "Parent-provided source",
      detail: "This artifact was grounded in pasted parent material. Verify that the adaptation preserves the source accurately."
    };
  }

  if (researchCount > 0 && hasSourceTitle) {
    return {
      level: "Moderate",
      label: "Source title plus app research",
      detail: "This artifact used the named source context and app research notes, but no pasted excerpt."
    };
  }

  if (researchCount > 0) {
    return {
      level: "Moderate",
      label: "App research only",
      detail: "This artifact used lightweight app research notes. Treat citations as starting points, not final verification."
    };
  }

  if (hasSourceTitle) {
    return {
      level: "Low",
      label: "Named source only",
      detail: "A source title was supplied, but no excerpt or app research sources were saved with this artifact."
    };
  }

  return {
    level: "Low",
    label: "General draft",
    detail: "No parent source text or app research sources were saved with this artifact. Verify facts before teaching."
  };
}
