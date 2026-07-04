import type { WorkflowDefinition } from "./types";
import { citationModeQuestion, gradeBandQuestion, parentChecklistItems, sourceTitleQuestion, supportingSourceTextQuestion, worldviewQuestion } from "./shared";

export const oneWeekPlan: WorkflowDefinition = {
  id: "one-week-plan",
  title: "One-Week Lesson Set",
  shortDescription: "Plan a coherent 3 to 5 day sequence around a topic.",
  outputType: "Weekly lesson set",
  questions: [
    { id: "topic", label: "What topic do you want help teaching?", type: "text", required: true },
    gradeBandQuestion,
    { id: "days", label: "How many days should this cover?", type: "number", required: true },
    { id: "minutesPerDay", label: "How many minutes per day?", type: "text", required: true },
    { id: "priorKnowledge", label: "What does the student already know?", type: "textarea" },
    { id: "desiredEndResult", label: "What should the student be able to do by the end?", type: "textarea" },
    { id: "materials", label: "What materials do you already have available?", type: "textarea" },
    { id: "includeReading", label: "Include reading suggestions?", type: "boolean" },
    { id: "includeActivities", label: "Include hands-on activities?", type: "boolean" },
    { id: "includeAssessment", label: "Include review or assessment?", type: "boolean" },
    sourceTitleQuestion,
    supportingSourceTextQuestion,
    citationModeQuestion,
    worldviewQuestion
  ],
  systemPromptTemplate: "Create a coherent homeschool week with low prep burden and a simple review loop.",
  userPromptTemplate: "Create a One-Week Lesson Set for {{topic}}.",
  outputTemplate: `# One-Week Lesson Set: {{topic}}

## Week Snapshot

## Source Basis and Limits

## Additional Context Needed Before Teaching

## Goals for the Week

## Materials

## Day 1: Introduction

## Day 2: Build Understanding

## Day 3: Practice or Exploration

## Day 4: Apply or Create

## Day 5: Review and Assess

## Optional Christian Worldview Connection

## Vocabulary

## Simple Assessment

## Adaptations for Mixed Ages

## Parent Review Checklist`,
  validationChecklist: [
    ...parentChecklistItems,
    "Adapts the number of days to the parent request",
    "Makes the week coherent rather than disconnected",
    "Includes review or assessment when requested"
  ]
};
