"use client";

import type { InterviewAnswers, InterviewQuestion } from "@/workflows/types";

type Props = {
  question: InterviewQuestion;
  value: InterviewAnswers[string] | undefined;
  onChange: (value: InterviewAnswers[string]) => void;
};

export function QuestionRenderer({ question, value, onChange }: Props) {
  const id = `question-${question.id}`;

  if (question.type === "textarea") {
    return (
      <label className="question" htmlFor={id}>
        <span>{question.label}{question.required ? " *" : ""}</span>
        {question.helpText ? <small>{question.helpText}</small> : null}
        <textarea id={id} value={String(value || "")} onChange={(event) => onChange(event.target.value)} rows={8} />
      </label>
    );
  }

  if (question.type === "select") {
    return (
      <label className="question" htmlFor={id}>
        <span>{question.label}{question.required ? " *" : ""}</span>
        {question.helpText ? <small>{question.helpText}</small> : null}
        <select id={id} value={String(value || "")} onChange={(event) => onChange(event.target.value)}>
          <option value="">Choose one</option>
          {question.options?.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
    );
  }

  if (question.type === "multiselect") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <fieldset className="question">
        <legend>{question.label}{question.required ? " *" : ""}</legend>
        {question.helpText ? <small>{question.helpText}</small> : null}
        <div className="option-list">
          {question.options?.map((option) => (
            <label className="checkbox-row" key={option}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(event) => {
                  onChange(event.target.checked ? [...selected, option] : selected.filter((item) => item !== option));
                }}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (question.type === "boolean") {
    return (
      <label className="question checkbox-row">
        <input type="checkbox" checked={value === true} onChange={(event) => onChange(event.target.checked)} />
        <span>{question.label}{question.required ? " *" : ""}</span>
      </label>
    );
  }

  return (
    <label className="question" htmlFor={id}>
      <span>{question.label}{question.required ? " *" : ""}</span>
      {question.helpText ? <small>{question.helpText}</small> : null}
      <input
        id={id}
        type={question.type === "number" ? "number" : "text"}
        value={String(value || "")}
        onChange={(event) => onChange(question.type === "number" ? Number(event.target.value) : event.target.value)}
      />
    </label>
  );
}
