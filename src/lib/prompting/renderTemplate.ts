import type { InterviewAnswers } from "@/workflows/types";

export function renderTemplate(template: string, answers: InterviewAnswers): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = answers[key];
    if (Array.isArray(value)) return value.join(", ");
    if (value === undefined || value === null || value === "") return "not specified";
    if (typeof value === "boolean") return value ? "yes" : "no";
    return String(value);
  });
}
