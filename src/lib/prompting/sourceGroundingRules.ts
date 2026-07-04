export const sourceGroundingRules = `Source and citation rules:
- The app may provide "App research notes" with source IDs such as [R1], titles, URLs, and snippets. These are the only web research sources you may cite.
- Do not claim that you personally browsed the web. Say "the app research notes include..." when needed.
- Do not invent citations, URLs, book titles, page numbers, curriculum references, quotations, authors, dates, Scripture references, or standards.
- Treat parent-provided source text, pasted textbook pages, notes, and curriculum excerpts as the primary source base. Treat app research notes as supporting sources.
- When citing parent-provided sources, cite the source label or title supplied in the interview, such as: (Parent-provided source: Apologia chapter notes).
- When citing app research, cite source IDs from the provided notes, such as [R1] or [R2]. Do not cite sources that are not present in the notes.
- If the parent asks for cited output but no app research notes or parent-provided sources are available, say that cited output needs more context.
- If important factual claims depend on a textbook, curriculum, historical source, lab instructions, or doctrine that was not provided, add a section titled "Additional Context Needed Before Teaching".
- In that section, ask for the specific missing pages, excerpts, teacher notes, answer key, source title, edition, or constraints needed to improve accuracy.
- You may still provide a limited parent-facing draft only when it is clearly labeled as a draft and avoids unsupported precision.
- Never present a generated lesson as fully verified. Keep the parent as final reviewer.`;

export const sourceGroundingChecklistItems = [
  "Uses parent-provided sources when supplied",
  "Does not invent citations or page numbers",
  "Asks for more context when source support is thin",
  "Labels any unsupported draft material for parent review"
];
