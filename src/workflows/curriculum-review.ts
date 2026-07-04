import type { WorkflowDefinition } from "./types";
import { citationModeQuestion, gradeBandQuestion, parentChecklistItems, sourceTitleQuestion, timeAvailableQuestion, worldviewQuestion } from "./shared";

export const curriculumReview: WorkflowDefinition = {
  id: "curriculum-review",
  title: "Curriculum Review and Adaptation",
  shortDescription: "Review pasted lesson material and adapt it for your home.",
  outputType: "Curriculum adaptation",
  questions: [
    { id: "sourceMaterial", label: "Paste the existing lesson or curriculum material.", type: "textarea", required: true },
    sourceTitleQuestion,
    citationModeQuestion,
    { id: "improvementGoal", label: "What should be improved?", type: "multiselect", required: true, options: ["make it simpler", "make it more rigorous", "make it more hands-on", "add discussion questions", "add assessment", "fit a shorter lesson time", "make it more parent-friendly"] },
    gradeBandQuestion,
    { id: "studentNeeds", label: "What student needs should this account for?", type: "multiselect", options: ["none", "younger sibling included", "mixed ages", "short attention span", "needs more review", "advanced student", "reading difficulty", "writing difficulty"] },
    timeAvailableQuestion,
    { id: "desiredOutputType", label: "What output do you want?", type: "select", options: ["adapted teaching plan", "review notes", "activity plan", "discussion guide"] },
    { id: "concerns", label: "Any concerns about the material?", type: "multiselect", options: ["none", "too difficult", "too easy", "too much prep", "unclear explanation", "not enough practice", "possible worldview concern", "safety concern"] },
    worldviewQuestion,
    { id: "makeSimpler", label: "Make it simpler?", type: "boolean" },
    { id: "makeRigorous", label: "Make it more rigorous?", type: "boolean" },
    { id: "addActivity", label: "Add an activity?", type: "boolean" },
    { id: "addDiscussion", label: "Add discussion questions?", type: "boolean" },
    { id: "addAssessment", label: "Add assessment?", type: "boolean" }
  ],
  systemPromptTemplate: "Review and adapt pasted curriculum gently. Do not rewrite large copyrighted text verbatim.",
  userPromptTemplate: "Create a Curriculum Review and Adaptation artifact.",
  outputTemplate: `# Curriculum Review and Adaptation

## Summary of Existing Material

## Source Basis and Limits

## Additional Context Needed Before Teaching

## Strengths

## Gaps or Weak Spots

## Age-Level Fit

## Suggested Improvements

## Adapted Teaching Plan

## Optional Activity

## Optional Discussion Questions

## Optional Christian Worldview Review

## Assessment Idea

## Parent Review Checklist`,
  validationChecklist: [
    ...parentChecklistItems,
    "Uses gentle language",
    "Focuses on practical improvements",
    "Flags concerns for parent review",
    "Avoids heavy doctrinal critique"
  ]
};
