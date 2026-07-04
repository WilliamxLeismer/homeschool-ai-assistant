# WIP / Known Gaps

This file tracks known gaps before the app should be considered more than an MVP.

## High Priority

- Add a stronger research pipeline:
  - retrieve full source pages where licensing and terms allow;
  - extract and store source snippets with stable URLs;
  - rank sources by quality and relevance;
  - prefer primary or reputable educational sources over general summaries;
  - filter low-quality or off-topic search results.
- Add citation verification:
  - validate that every `[R#]` citation appears in the app research notes;
  - validate that cited claims are supported by the cited snippet;
  - detect invented page numbers, titles, quotations, and URLs.
- Add artifact completeness guarantees:
  - prevent saving artifacts that still fail validation unless explicitly marked as incomplete;
  - show validation failures prominently to the parent;
  - support "regenerate missing sections" without losing good content.
- Improve model routing:
  - choose cheaper models for worksheets and simple drafts;
  - choose stronger models for curriculum review and source-heavy lessons;
  - add fallback models when a provider errors or returns incomplete output.

## Product Gaps

- Add a source-first workflow where the parent pastes textbook pages, lesson excerpts, or teacher notes before the model writes.
- Add clearer "confidence/source support" labels on artifacts.
- Add a pre-generation warning when the topic needs external context but no source was supplied.
- Reduce excessive parent follow-up tasks after generation. The first real run produced many "to do" items for the parent, which is hard to act on in the current interface. The product needs a more UX-friendly way to gather sufficient context before generation, ask only the most important follow-up questions, and avoid dumping a long unresolved task list into the final artifact.
- Limit open-ended interview questions. Questions such as "How much time do you have?" should use simple multiple-choice ranges instead of free text. Review all workflows and replace open text fields with select, multiselect, boolean, or constrained inputs wherever possible so busy homeschool parents and co-op teachers can move through the wizard quickly.
- Add editable artifact drafts in the browser.
- Add a better history management UI:
  - delete artifacts;
  - rename artifacts;
  - filter by workflow;
  - clear all local history.
- Add export options beyond Markdown/browser print only after the core artifact quality improves.

## Safety And Theology Gaps

- Add more explicit activity safety checks for science and hands-on lessons.
- Add a stronger disputed-theology detection path.
- Add parent-facing warnings for sensitive historical, medical, psychological, or pastoral topics.
- Add a workflow-specific checklist for biblical/worldview content.

## Engineering Gaps

- Add automated tests for:
  - prompt building;
  - provider adapters;
  - research adapters;
  - validation rules;
  - server actions;
  - workflow generation happy paths and failure paths.
- Replace local JSON persistence with SQLite if local history grows more complex.
- Add structured logging that does not leak prompts or secrets.
- Add better provider error messages in the UI.
- Add rate limiting and budget controls for paid providers.
- Add CI for typecheck, build, audit, and secret scanning.

## Current MVP Caveats

- The default research provider is Wikipedia, which is convenient but not always the best source for homeschool lesson preparation.
- Tavily support currently uses basic search result snippets, not full deep research.
- The model can still produce inaccurate or unsupported content.
- The validation pass checks structure and obvious omissions, not truth.
- Runtime data is local-only JSON and not designed for multi-user or production deployment.
