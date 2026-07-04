import type { InterviewQuestion } from "./types";
import { sourceGroundingChecklistItems } from "@/lib/prompting/sourceGroundingRules";

export const gradeBandQuestion: InterviewQuestion = {
  id: "gradeBand",
  label: "What age group is this for?",
  type: "select",
  required: true,
  options: ["ages 5-7", "ages 8-10", "ages 11-13", "mixed ages"]
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
  type: "multiselect",
  options: [
    "none",
    "avoid messy activities",
    "avoid internet research for the student",
    "avoid controversial claims",
    "avoid advanced vocabulary",
    "avoid expensive materials",
    "avoid long writing assignments"
  ]
};

export const priorKnowledgeQuestion: InterviewQuestion = {
  id: "priorKnowledge",
  label: "What does the student already know?",
  type: "select",
  options: [
    "not sure",
    "new to this topic",
    "knows a few basics",
    "has studied this before",
    "needs review because it has been confusing"
  ]
};

export const timeAvailableQuestion: InterviewQuestion = {
  id: "timeAvailable",
  label: "How much time do you have?",
  type: "select",
  options: ["10-15 minutes", "20-30 minutes", "45 minutes", "60 minutes", "more than 60 minutes"]
};

export const lessonLengthQuestion: InterviewQuestion = {
  id: "lessonLength",
  label: "How much time do you have?",
  type: "select",
  required: true,
  options: ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "90 minutes"]
};

export const minutesPerDayQuestion: InterviewQuestion = {
  id: "minutesPerDay",
  label: "How many minutes per day?",
  type: "select",
  required: true,
  options: ["10-15 minutes", "20-30 minutes", "45 minutes", "60 minutes"]
};

export const materialsQuestion: InterviewQuestion = {
  id: "materials",
  label: "What materials do you already have available?",
  type: "multiselect",
  options: [
    "not sure",
    "paper and pencils",
    "whiteboard or chalkboard",
    "books or printed curriculum",
    "computer or tablet",
    "printer",
    "basic household supplies",
    "hands-on kit or manipulatives"
  ]
};

export const sourceNeedQuestion: InterviewQuestion = {
  id: "sourceNeed",
  label: "Do you have source material ready to paste?",
  helpText: "Choose no if you want the app to do lightweight research first.",
  type: "select",
  options: [
    "no, use app research",
    "yes, I will paste a short excerpt",
    "yes, I have a textbook or curriculum title",
    "not sure"
  ]
};

export const sourceTitleQuestion: InterviewQuestion = {
  id: "sourceTitle",
  label: "What source should this be based on, if any?",
  helpText: "Example: textbook title/chapter, curriculum lesson, article, Bible passage, parent notes.",
  type: "text"
};

export const supportingSourceTextQuestion: InterviewQuestion = {
  id: "supportingSourceText",
  label: "Optional: paste source text, textbook pages, teacher notes, or curriculum excerpts.",
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
