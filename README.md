# Christian Homeschool Lesson Helper MVP

A locally hostable MVP for a parent-facing AI lesson preparation tool for Protestant Christian homeschool families and co-op teachers.

This MVP is a parent-facing lesson preparation tool. It is not a child-facing tutor, not a substitute for parental judgment, and not a replacement for church, curriculum, or professional advice.

## Current Status

This repository contains a working local MVP. It can guide a parent through structured interview workflows, generate Markdown teaching artifacts through a model provider, perform lightweight source research, run basic validation, and save artifacts to local JSON history.

It is not production-ready. The app still needs stronger evaluation, better source quality controls, better error recovery, tests, and a more robust persistence layer before it should be trusted for regular homeschool use.

## What The App Does

- Provides five parent-led workflows:
  - Teach Me First
  - One-Day Lesson Plan
  - One-Week Lesson Set
  - Worksheet and Answer Key
  - Curriculum Review and Adaptation
- Interviews the parent with workflow-specific questions.
- Builds a structured prompt behind the scenes.
- Supports mock, Ollama, and OpenAI-compatible model providers.
- Supports Vercel AI Gateway through the OpenAI-compatible provider settings.
- Runs lightweight pre-generation research using Wikipedia by default, or Tavily if configured.
- Injects research notes into the model prompt as citable `[R1]`, `[R2]` source notes.
- Asks the model to cite only app-provided research notes or parent-provided source material.
- Saves generated artifacts locally in `data/artifacts.json`.
- Displays artifacts as rendered Markdown.
- Supports copy to clipboard, Markdown download, browser print, and history.
- Runs a basic validation pass and one repair retry if required sections are missing.

## What The App Does Not Do Yet

- It does not guarantee factual accuracy.
- It does not perform deep research comparable to ChatGPT Deep Research, Claude Research, NotebookLM, or a human curriculum review.
- It does not rank sources by academic quality beyond the configured search provider's results.
- It does not verify citations against full source documents.
- It does not browse arbitrary pages and extract full article contents unless a future research adapter adds that.
- It does not know your textbook, curriculum edition, teacher guide, or answer key unless you paste that context.
- It does not prevent all hallucinations.
- It does not have authentication, accounts, payments, cloud sync, or multi-user storage.
- It does not include child accounts or a child-facing tutor.
- It does not generate PDFs beyond browser print.
- It does not implement file uploads.
- It does not provide medical, legal, psychological, pastoral, or professional educational advice.

## Research And Citation Behavior

The app performs a lightweight research step before generation. By default, it queries Wikipedia and passes short result snippets into the prompt as source notes. If `Tavily` is configured, it can use Tavily instead.

The model is instructed to:

- cite only app research notes such as `[R1]`;
- cite parent-provided sources only when the parent supplied source labels or pasted text;
- avoid inventing URLs, page numbers, textbook references, quotations, authors, Scripture references, or standards;
- add an `Additional Context Needed Before Teaching` section when source support is thin.

This is still a lightweight harness. Treat generated citations as leads for parent review, not as final academic verification.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

```env
# Provider options: mock, ollama, openai_compatible
LLM_PROVIDER=mock

# Ollama or compatible local endpoint
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b

# Generic OpenAI-compatible endpoint
OPENAI_COMPATIBLE_BASE_URL=
OPENAI_COMPATIBLE_API_KEY=
OPENAI_COMPATIBLE_MODEL=

# Vercel AI Gateway option
# OPENAI_COMPATIBLE_BASE_URL=https://ai-gateway.vercel.sh/v1
# OPENAI_COMPATIBLE_MODEL=openai/gpt-5-mini
# AI_GATEWAY_API_KEY=

# Lightweight research before generation
RESEARCH_PROVIDER=wikipedia
RESEARCH_MAX_RESULTS=4
TAVILY_API_KEY=

# App behavior
APP_LOCAL_ONLY=true
DEBUG_SHOW_PROMPTS=false
```

Never commit `.env.local`. It is ignored by Git.

## Provider Modes

### Mock

Mock mode requires no API key and returns deterministic sample artifacts:

```env
LLM_PROVIDER=mock
```

Use this for UI testing and local development.

### Ollama

Install and run Ollama, pull a model, then set:

```env
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

Ollama can keep model inference local, depending on your endpoint.

### Vercel AI Gateway

Use the OpenAI-compatible adapter:

```env
LLM_PROVIDER=openai_compatible
OPENAI_COMPATIBLE_BASE_URL=https://ai-gateway.vercel.sh/v1
OPENAI_COMPATIBLE_MODEL=openai/gpt-5-mini
AI_GATEWAY_API_KEY=
```

OpenAI-compatible providers send prompts, parent context, and research notes to the configured API endpoint. Do not enter sensitive child data.

## Research Modes

### Wikipedia

```env
RESEARCH_PROVIDER=wikipedia
RESEARCH_MAX_RESULTS=4
```

This is free and requires no key, but source quality is limited.

### Tavily

```env
RESEARCH_PROVIDER=tavily
TAVILY_API_KEY=
RESEARCH_MAX_RESULTS=5
```

Use this if you want broader web search. The current implementation uses basic search snippets, not full deep-research synthesis.

### None

```env
RESEARCH_PROVIDER=none
```

Use this when you only want parent-provided sources or no web research.

## Persistence

Artifacts and settings are stored locally under `data/` at runtime. Runtime JSON files are ignored by Git because they may contain parent prompts, student context, generated artifacts, provider settings, and debugging prompts.

There is no cloud sync and no multi-user data model.

## Validation

The app currently checks for:

- non-empty Markdown;
- title heading;
- required workflow sections;
- parent review checklist;
- worldview disclaimer when worldview content is requested;
- answer key when requested for worksheets;
- basic source-grounding expectations.

If validation fails, the app performs one repair retry. This improves completeness but does not prove factual accuracy.

## Safety And Parent Review

Generated materials must be reviewed by a parent before use. The prompt harness tells the model to avoid unsafe activities, mains electricity, dangerous tools, hazardous materials, direct child counseling, unsupervised child internet research, and professional advice.

Parents remain responsible for:

- checking facts;
- checking citations;
- checking age fit;
- checking theological/worldview content;
- checking activity safety;
- deciding whether to use, edit, or discard the artifact.

## Development Commands

```bash
npm run dev
npm run typecheck
npm run build
npm audit --omit=dev
```

## Adding A Workflow

1. Add a workflow file in `src/workflows/`.
2. Export a `WorkflowDefinition` with metadata, questions, prompts, output template, and validation checklist.
3. Add it to `src/workflows/index.ts`.
4. Run `npm run typecheck` and `npm run build`.

## Public Repository Hygiene

Before publishing or pushing:

- confirm `.env.local` is not present in Git;
- confirm no API keys are in tracked files;
- clear or ignore `data/*.json`;
- run a secret scan;
- run `npm run typecheck`;
- run `npm run build`;
- review `WIP.md` for known limitations.
