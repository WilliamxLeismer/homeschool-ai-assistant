import type { WorkflowDefinition } from "./types";
import { citationModeQuestion, gradeBandQuestion, parentChecklistItems, sourceTitleQuestion, supportingSourceTextQuestion, worldviewQuestion } from "./shared";

export const worksheet: WorkflowDefinition = {
  id: "worksheet",
  title: "Worksheet and Answer Key",
  shortDescription: "Create a printable worksheet with an optional answer key.",
  outputType: "Worksheet",
  questions: [
    { id: "topic", label: "What topic should the worksheet cover?", type: "text", required: true },
    gradeBandQuestion,
    { id: "purpose", label: "What is the worksheet for?", type: "select", options: ["practice", "review", "assessment", "introduction"] },
    { id: "questionCount", label: "How many questions?", type: "number", required: true },
    { id: "questionTypes", label: "What question types should be included?", type: "multiselect", options: ["matching", "multiple choice", "fill in the blank", "short answer", "narration prompt", "drawing/labeling", "vocabulary", "word problems", "review questions"] },
    { id: "difficulty", label: "How difficult should it be?", type: "select", options: ["easy", "medium", "challenging"] },
    { id: "includeVocabulary", label: "Include vocabulary?", type: "boolean" },
    { id: "includeShortAnswer", label: "Include short answer?", type: "boolean" },
    { id: "includeAnswerKey", label: "Include an answer key?", type: "boolean" },
    { id: "includeParentNotes", label: "Include parent notes?", type: "boolean" },
    sourceTitleQuestion,
    supportingSourceTextQuestion,
    citationModeQuestion,
    worldviewQuestion
  ],
  systemPromptTemplate: "Create a printable worksheet. Avoid ambiguous answer keys.",
  userPromptTemplate: "Create a Worksheet and Answer Key for {{topic}}.",
  outputTemplate: `# Worksheet: {{topic}}

## Student Instructions

## Source Basis and Limits

## Additional Context Needed Before Teaching

## Questions

## Optional Challenge

## Answer Key

## Parent Notes

## Parent Review Checklist`,
  validationChecklist: [
    ...parentChecklistItems,
    "Keeps formatting printable",
    "Includes an answer key when requested",
    "Keeps instructions short for younger students"
  ]
};
