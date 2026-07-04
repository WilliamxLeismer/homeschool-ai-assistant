export function ParentReviewChecklist({ notes }: { notes: string[] }) {
  return (
    <section className="review-panel no-print">
      <h2>Validation Notes</h2>
      <ul>
        {notes.map((note) => <li key={note}>{note}</li>)}
      </ul>
    </section>
  );
}
