"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { generateArtifact } from "@/app/actions";
import { QuestionRenderer } from "./QuestionRenderer";
import type { InterviewAnswers, WorkflowDefinition } from "@/workflows/types";

export function InterviewWizard({ workflow }: { workflow: WorkflowDefinition }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<InterviewAnswers>({});
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const question = workflow.questions[step];
  const progress = `${step + 1} of ${workflow.questions.length}`;

  const canContinue = useMemo(() => {
    if (!question.required) return true;
    const value = answers[question.id];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== "";
  }, [answers, question]);

  function updateAnswer(value: InterviewAnswers[string]) {
    setAnswers((current) => ({ ...current, [question.id]: value }));
    setError("");
  }

  function next() {
    if (!canContinue) {
      setError("Please answer this required question before continuing.");
      return;
    }
    setStep((current) => Math.min(current + 1, workflow.questions.length - 1));
  }

  function submit() {
    if (!canContinue) {
      setError("Please answer this required question before generating.");
      return;
    }
    startTransition(async () => {
      const result = await generateArtifact(workflow.id, answers);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="wizard-shell">
      <div className="wizard-header">
        <Link href="/">Back to workflows</Link>
        <p>{progress}</p>
      </div>
      <section className="intro compact">
        <p className="eyebrow">{workflow.outputType}</p>
        <h1>{workflow.title}</h1>
        <p>{workflow.shortDescription}</p>
      </section>
      <div className="progress-bar" aria-label={`Question ${progress}`}>
        <span style={{ width: `${((step + 1) / workflow.questions.length) * 100}%` }} />
      </div>
      <form className="wizard-card" action={submit}>
        <QuestionRenderer question={question} value={answers[question.id]} onChange={updateAnswer} />
        {error ? <p className="form-error">{error}</p> : null}
        <div className="button-row">
          <button type="button" className="button secondary" disabled={step === 0 || isPending} onClick={() => setStep((current) => current - 1)}>
            Previous
          </button>
          {step < workflow.questions.length - 1 ? (
            <button type="button" className="button" disabled={isPending} onClick={next}>Next</button>
          ) : (
            <button type="submit" className="button" disabled={isPending}>{isPending ? "Generating..." : "Generate"}</button>
          )}
        </div>
      </form>
    </div>
  );
}
