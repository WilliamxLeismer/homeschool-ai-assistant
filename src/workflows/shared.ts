import type { InterviewQuestion } from "./types";
import { sourceGroundingChecklistItems } from "@/lib/prompting/sourceGroundingRules";

export const gradeBandQuestion: InterviewQuestion = {
  id: "gradeBand",
  label: "What age or grade band is this for?",
  type: "select",
  required: true,
  options: ["K-2", "3-5", "6-8", "mixed"]
};

export const worldviewQuestion: InterviewQuestion = {
  id: "worldviewLevel",
  label: "Include Bible/worldview connection?",
  helpText: "Keep this simple in the MVP: none, light, or moderate.",
  type: "select",
  required: true,
  options: ["none", "light", "moderate"]
};

export const toneQuestion: InterviewQuestion = {
  id: "tone",
  label: "How formal or casual should the output be?",
  type: "select",
  options: ["plain and conversational", "somewhat formal", "very simple"]
};

export const constraintsQuestion: InterviewQuestion = {
  id: "constraints",
  label: "Are there topics, approaches, or assumptions to avoid?",
  type: "textarea"
};

export const sourceTitleQuestion: InterviewQuestion = {
  id: "sourceTitle",
  label: "What source should this be based on, if any?",
  helpText: "Example: textbook title/chapter, curriculum lesson, article, Bible passage, parent notes.",
  type: "text"
};

export const supportingSourceTextQuestion: InterviewQuestion = {
  id: "supportingSourceText",
  label: "Paste any source text, textbook pages, teacher notes, or curriculum excerpts you want the artifact grounded in.",
  helpText: "The model cannot look up sources by itself. Paste the important excerpt when accuracy or citations matter.",
  type: "textarea"
};

export const citationModeQuestion: InterviewQuestion = {
  id: "citationMode",
  label: "How should sources be handled?",
  type: "select",
  required: true,
  options: [
    "no citations needed",
    "cite parent-provided sources",
    "ask for more context if sources are thin"
  ]
};

export const parentChecklistItems = [
  "Includes a parent review checklist",
  "Uses practical, low-cost materials",
  "Keeps the parent in charge",
  "Labels worldview content as optional when included",
  "Avoids unsafe activities",
  ...sourceGroundingChecklistItems
];
