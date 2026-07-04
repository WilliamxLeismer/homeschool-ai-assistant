import type { WorkflowDefinition } from "./types";
import { citationModeQuestion, constraintsQuestion, gradeBandQuestion, lessonLengthQuestion, materialsQuestion, parentChecklistItems, priorKnowledgeQuestion, sourceNeedQuestion, sourceTitleQuestion, supportingSourceTextQuestion, worldviewQuestion } from "./shared";

export const oneDayLesson: WorkflowDefinition = {
  id: "one-day-lesson",
  title: "One-Day Lesson Plan",
  shortDescription: "Build a complete lesson for one homeschool day.",
  outputType: "Lesson plan",
  questions: [
    { id: "topic", label: "What topic do you want help teaching?", type: "text", required: true },
    gradeBandQuestion,
    { id: "studentCount", label: "Is this for one student, multiple students, or a co-op group?", type: "select", options: ["one student", "multiple students", "co-op group"] },
    lessonLengthQuestion,
    priorKnowledgeQuestion,
    { id: "desiredOutcome", label: "What is the main goal for this lesson?", type: "select", options: ["introduce the topic", "build understanding", "practice a skill", "review before moving on", "prepare for a worksheet or discussion"] },
    materialsQuestion,
    { id: "learningStyle", label: "Any learning style preference?", type: "select", options: ["no preference", "hands-on", "discussion", "reading and narration", "visual"] },
    sourceNeedQuestion,
    sourceTitleQuestion,
    supportingSourceTextQuestion,
    citationModeQuestion,
    worldviewQuestion,
    { id: "worksheetDesired", label: "Do you want worksheet ideas included?", type: "boolean" },
    { id: "parentPrepDesired", label: "Do you want a parent prep section?", type: "boolean" },
    constraintsQuestion
  ],
  systemPromptTemplate: "Create a practical one-day homeschool lesson that fits the time and materials provided.",
  userPromptTemplate: "Create a One-Day Lesson Plan for {{topic}}.",
  outputTemplate: `# One-Day Lesson Plan: {{topic}}

## Lesson Snapshot

## Source Basis and Limits

## Additional Context Needed Before Teaching

## Parent Prep

## Learning Goals

## Materials

## Warm-Up

## Teach

## Guided Practice

## Hands-On Activity

## Discussion Questions

## Independent Work

## Wrap-Up

## Optional Christian Worldview Connection

## Assessment / Check for Understanding

## Adaptations for Younger or Older Students

## Parent Review Checklist`,
  validationChecklist: [
    ...parentChecklistItems,
    "Keeps the lesson realistic for the stated time",
    "Includes safety notes for activities",
    "Includes simpler and harder versions if the grade band is mixed"
  ]
};
