import type { GeneratedArtifact } from "@/workflows/types";

function validationPassed(notes: string[]) {
  return notes.length === 1 && notes[0] === "Basic validation passed.";
}

export function ParentReviewChecklist({ artifact }: { artifact: GeneratedArtifact }) {
  const notes = artifact.validationNotes || [];
  const passed = validationPassed(notes);

  return (
    <section className={`review-panel quality-panel no-print ${passed ? "quality-pass" : "quality-warning"}`}>
      <p className="eyebrow">Quality check</p>
      <h2>{passed ? "Passed basic structure checks" : "Needs parent review before use"}</h2>
      {artifact.repairAttempted ? (
        <p>
          Automatic repair was attempted{artifact.repairSucceeded ? " and fixed the validation issues." : ", but some validation issues remain."}
        </p>
      ) : (
        <p>No automatic repair was needed.</p>
      )}
      <ul>
        {(notes.length ? notes : ["No validation notes were saved."]).map((note) => <li key={note}>{note}</li>)}
      </ul>
    </section>
  );
}
