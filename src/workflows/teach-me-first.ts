import type { WorkflowDefinition } from "./types";
import { citationModeQuestion, gradeBandQuestion, parentChecklistItems, priorKnowledgeQuestion, sourceNeedQuestion, sourceTitleQuestion, supportingSourceTextQuestion, timeAvailableQuestion, worldviewQuestion } from "./shared";

export const teachMeFirst: WorkflowDefinition = {
  id: "teach-me-first",
  title: "Teach Me First",
  shortDescription: "Understand a topic well enough to teach it clearly.",
  outputType: "Parent teaching notes",
  questions: [
    { id: "topic", label: "What topic do you want help teaching?", type: "text", required: true },
    gradeBandQuestion,
    { id: "parentComfort", label: "What is your current comfort level with this topic?", type: "select", required: true, options: ["low", "medium", "high"] },
    priorKnowledgeQuestion,
    { id: "desiredDepth", label: "How deep should this explanation go?", type: "select", options: ["simple overview", "solid working understanding", "deeper background"] },
    timeAvailableQuestion,
    { id: "confusingParts", label: "What parts are confusing or concerning?", type: "multiselect", options: ["not sure", "vocabulary", "how to explain it simply", "common mistakes", "how to make it hands-on", "how to check understanding"] },
    { id: "includeAnalogies", label: "Include concrete analogies or demonstrations?", type: "boolean" },
    { id: "includeMistakes", label: "Include common mistakes to watch for?", type: "boolean" },
    sourceNeedQuestion,
    sourceTitleQuestion,
    supportingSourceTextQuestion,
    citationModeQuestion,
    worldviewQuestion
  ],
  systemPromptTemplate: "Create parent-facing background notes that are plain, accurate, and teachable.",
  userPromptTemplate: "Create a Teach Me First artifact for {{topic}}.",
  outputTemplate: `# Teach Me First: {{topic}}

## Plain-English Overview

## Source Basis and Limits

## Additional Context Needed Before Teaching

## What the Student Needs to Understand

## Parent Background Notes

## Simple Explanation to Use With the Student

## Analogy or Demonstration

## Key Vocabulary

## Common Misunderstandings

## Questions to Ask the Student

## Quick Check for Understanding

## Optional Christian Worldview Connection

## Parent Review Checklist`,
  validationChecklist: [
    ...parentChecklistItems,
    "Writes to the parent, not the student",
    "Includes concrete analogies",
    "Highlights what the parent should verify"
  ]
};
