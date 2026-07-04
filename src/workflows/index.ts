import type { WorkflowId } from "./types";
import { curriculumReview } from "./curriculum-review";
import { oneDayLesson } from "./one-day-lesson";
import { oneWeekPlan } from "./one-week-plan";
import { teachMeFirst } from "./teach-me-first";
import { worksheet } from "./worksheet";

export const workflows = [
  teachMeFirst,
  oneDayLesson,
  oneWeekPlan,
  worksheet,
  curriculumReview
];

export function getWorkflow(id: string) {
  return workflows.find((workflow) => workflow.id === id);
}

export function isWorkflowId(id: string): id is WorkflowId {
  return workflows.some((workflow) => workflow.id === id);
}
