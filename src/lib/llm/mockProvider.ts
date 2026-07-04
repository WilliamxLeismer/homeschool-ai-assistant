import { worldviewDisclaimer } from "@/lib/prompting/worldviewRules";
import type { GenerateRequest, GenerateResponse, LlmProvider } from "./types";

function metadataValue(request: GenerateRequest, key: string) {
  const metadata = request.metadata || {};
  return typeof metadata[key] === "string" ? metadata[key] : "";
}

function parentChecklist() {
  return [
    "- Confirm the content fits your child before teaching.",
    "- Check all facts, examples, and answer key items.",
    "- Review any worldview connection before using it.",
    "- Adjust timing, difficulty, and materials for your home.",
    "- Supervise any hands-on activity."
  ].join("\n");
}

function worldviewSection(level: unknown) {
  if (level !== "light" && level !== "moderate") return "Use this section only if you choose to add one after review.\n";
  return `${worldviewDisclaimer}\n\nA possible connection is that learning can be received with gratitude and care for truth. For parent review, you might consider Proverbs 2:6 as a starting point.\n`;
}

function sourceBasis(request: GenerateRequest) {
  const title = metadataValue(request, "sourceTitle");
  const supportingText = metadataValue(request, "supportingSourceText") || metadataValue(request, "sourceMaterial");
  const citationMode = request.metadata?.citationMode;

  if (title || supportingText) {
    const label = title || "pasted parent-provided source text";
    return `This draft is grounded in the parent-provided source: ${label}. Citations, when used, should refer only to parent-provided material.`;
  }

  if (citationMode === "cite parent-provided sources" || citationMode === "ask for more context if sources are thin") {
    return "No parent-provided source text was supplied. Treat this as an uncited planning draft, not a verified lesson.";
  }

  return "No external source grounding was requested. Parent should verify factual details before teaching.";
}

function contextNeeded(request: GenerateRequest) {
  const title = metadataValue(request, "sourceTitle");
  const supportingText = metadataValue(request, "supportingSourceText") || metadataValue(request, "sourceMaterial");
  const citationMode = request.metadata?.citationMode;

  if (title || supportingText) {
    return "No additional context is required for a first draft. For higher confidence, add the exact textbook page or teacher note next time.";
  }

  if (citationMode === "cite parent-provided sources" || citationMode === "ask for more context if sources are thin") {
    return "- Paste the most relevant textbook or curriculum excerpt.\n- Add the source title or edition if you want closer alignment.\n- Add an answer key excerpt if the topic requires exact answers.";
  }

  return "If accuracy matters for a specific curriculum, paste the relevant source excerpt and regenerate.";
}

function templateArtifact(request: GenerateRequest) {
  const workflowId = String(request.metadata?.workflowId || "");
  const topic = metadataValue(request, "topic") || "the selected topic";
  const gradeBand = metadataValue(request, "gradeBand") || "the selected grade band";
  const worldviewLevel = request.metadata?.worldviewLevel;

  if (workflowId === "one-day-lesson") {
    return `# One-Day Lesson Plan: ${topic}

## Lesson Snapshot
Grade band: ${gradeBand}. Estimated time: ${metadataValue(request, "lessonLength") || "as provided"}. Keep the plan parent-led and practical.

## Source Basis and Limits
${sourceBasis(request)}

## Additional Context Needed Before Teaching
${contextNeeded(request)}

## Parent Prep
Read the steps, gather the listed materials, and decide which questions fit your student.

## Learning Goals
- Explain the main idea of ${topic}.
- Practice the idea with a parent-guided activity.
- Show understanding through a short check.

## Materials
Use the materials provided by the parent first. Avoid specialized supplies unless the parent listed them.

## Warm-Up
Ask what the student already knows and write down one question to answer today.

## Teach
Give a short explanation in plain language, then model one example.

## Guided Practice
Work through two examples together and ask the student to explain each step back to you.

## Hands-On Activity
Use only parent-approved materials. Supervision level: direct parent supervision. Safety notes: no mains electricity, no dangerous tools, and stop if anything seems unsafe. Cleanup: return supplies and clear the work area.

## Discussion Questions
- What was the most important idea?
- What part still feels confusing?
- How could you explain this to someone younger?

## Independent Work
Have the student complete a brief written or oral response.

## Wrap-Up
Review the goal and name one thing to revisit next time.

## Optional Christian Worldview Connection
${worldviewSection(worldviewLevel)}

## Assessment / Check for Understanding
Ask the student to explain the main idea and complete one fresh example without help.

## Adaptations for Younger or Older Students
For younger students, reduce writing and use more oral narration. For older students, add a short explanation or extension question.

## Parent Review Checklist
${parentChecklist()}`;
  }

  if (workflowId === "one-week-plan") {
    return `# One-Week Lesson Set: ${topic}

## Week Snapshot
This is a coherent sequence for ${gradeBand}, designed around short daily lessons and review.

## Source Basis and Limits
${sourceBasis(request)}

## Additional Context Needed Before Teaching
${contextNeeded(request)}

## Goals for the Week
- Build background knowledge.
- Practice the core idea across several days.
- End with a simple review or demonstration.

## Materials
Use books, paper, pencils, and parent-provided materials before adding anything new.

## Day 1: Introduction
Introduce the topic, define key vocabulary, and ask what the student already knows.

## Day 2: Build Understanding
Teach the main idea with examples and narration.

## Day 3: Practice or Exploration
Use a low-prep activity, map, timeline, model, or worked examples as appropriate.

## Day 4: Apply or Create
Have the student create a short explanation, drawing, paragraph, or demonstration.

## Day 5: Review and Assess
Review the week, correct misunderstandings, and complete a short assessment.

## Optional Christian Worldview Connection
${worldviewSection(worldviewLevel)}

## Vocabulary
Choose 4 to 6 words from the topic and review them each day.

## Simple Assessment
Ask for a brief oral narration and one written response.

## Adaptations for Mixed Ages
Younger students can narrate or draw. Older students can write, compare, or defend an answer.

## Parent Review Checklist
${parentChecklist()}`;
  }

  if (workflowId === "worksheet") {
    return `# Worksheet: ${topic}

## Student Instructions
Answer each question carefully. Ask your parent if a direction is unclear.

## Source Basis and Limits
${sourceBasis(request)}

## Additional Context Needed Before Teaching
${contextNeeded(request)}

## Questions
1. Define the main idea of ${topic}.
2. Write one example.
3. Solve or answer a practice question chosen by your parent.
4. Explain your reasoning in one sentence.
5. Circle the item that does not belong and tell why.

## Optional Challenge
Create one new question about ${topic} and answer it.

## Optional Christian Worldview Connection
${worldviewSection(worldviewLevel)}

## Answer Key
1. Answers should state the core meaning accurately.
2. Examples should fit the topic.
3. Parent should compare the answer with the lesson goal.
4. Explanation should be clear and age-appropriate.
5. Parent should accept a defensible answer with a good reason.

## Parent Notes
Adjust the number and difficulty of questions to match the requested count and age band.

## Parent Review Checklist
${parentChecklist()}`;
  }

  if (workflowId === "curriculum-review") {
    return `# Curriculum Review and Adaptation

## Summary of Existing Material
The pasted material appears to introduce a teaching topic and can be adapted for ${gradeBand}. Review this summary against the original text.

## Source Basis and Limits
${sourceBasis(request)}

## Additional Context Needed Before Teaching
${contextNeeded(request)}

## Strengths
- Gives the parent a starting point.
- Can be shaped into a practical home lesson.

## Gaps or Weak Spots
- The parent may need clearer goals, checks for understanding, or age-level adjustments.

## Age-Level Fit
Use shorter explanations for younger students and more discussion or writing for older students.

## Suggested Improvements
Add a clear objective, simple teaching steps, and a short assessment.

## Adapted Teaching Plan
Start with a brief explanation, ask one discussion question, complete a practical activity, and close with narration.

## Optional Activity
Use paper, pencil, and parent-approved materials. Supervision level: parent nearby. Safety notes: avoid unsafe supplies or unsupervised internet research.

## Optional Discussion Questions
- What is the main point?
- What evidence or example supports it?
- What should we review again?

## Optional Christian Worldview Review
${worldviewSection(worldviewLevel)}

## Assessment Idea
Ask the student to summarize the lesson and answer one application question.

## Parent Review Checklist
${parentChecklist()}`;
  }

  return `# Teach Me First: ${topic}

## Plain-English Overview
Here is a simple parent-facing overview of ${topic} for ${gradeBand}. Focus on the core idea before adding details.

## Source Basis and Limits
${sourceBasis(request)}

## Additional Context Needed Before Teaching
${contextNeeded(request)}

## What the Student Needs to Understand
The student should understand the main idea, one concrete example, and one way to check whether the idea makes sense.

## Parent Background Notes
Read this first, then decide what level of detail your student needs.

## Simple Explanation to Use With the Student
Use short sentences, pause often, and ask the student to explain the idea back to you.

## Analogy or Demonstration
Use a household object, quick sketch, or everyday comparison to make the idea visible.

## Key Vocabulary
- Main idea
- Example
- Evidence
- Review

## Common Misunderstandings
Watch for memorized words without understanding. Ask the student to give an example in their own words.

## Questions to Ask the Student
- What is the main idea?
- What is one example?
- What still feels unclear?

## Quick Check for Understanding
Have the student teach the idea back to you in two or three sentences.

## Optional Christian Worldview Connection
${worldviewSection(worldviewLevel)}

## Parent Review Checklist
${parentChecklist()}`;
}

export const mockProvider: LlmProvider = {
  name: "mock",
  model: "deterministic-mvp-mock",
  async generate(request): Promise<GenerateResponse> {
    return {
      text: templateArtifact(request),
      provider: "mock",
      model: "deterministic-mvp-mock",
      raw: { mode: "offline" }
    };
  }
};
