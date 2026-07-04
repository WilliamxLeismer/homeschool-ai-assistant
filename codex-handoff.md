
# Codex Handoff: Christian Homeschool Lesson Helper MVP

## 1. Project Summary

Build a locally hostable MVP for a minimalist AI-assisted homeschool lesson preparation tool.

The product is for budget-conscious Protestant Christian homeschool parents, guardians, and co-op teachers serving K through middle school students.

The MVP should help parents turn vague teaching needs into usable teaching documents without requiring them to understand:

* prompt engineering
* context engineering
* workflow engineering
* AI harness design
* template design
* model behavior tuning
* output validation

This is not a general chatbot. It is not a student tutor. It is not a full homeschool planner. It is a parent-only guided workflow tool that interviews the parent, gathers the right context, runs a hidden prompt/template workflow, validates the result, and produces a clean teaching artifact.

The core product idea:

> Pick a teaching document. Answer simple interview questions. Receive a printable homeschool artifact.

The initial implementation should prioritize local usability, simplicity, low cost, and clean architecture over polish or scale.

---

## 2. Problem Definition

Budget-conscious Christian homeschool parents are curious about AI, but many cannot reliably turn a vague teaching need into a safe, trustworthy, age-appropriate, ready-to-use homeschool artifact because they lack the task framing, context gathering, output evaluation, and workflow scaffolding required for effective AI use.

The product should solve this by embedding AI operating literacy into the app itself.

The user should not need to know what to ask the AI. The app should ask the parent the right questions.

The user should not need to know what context matters. The app should gather the required context.

The user should not need to build a custom GPT, NotebookLM source pack, prompt chain, rubric template, or lesson-plan harness. The app should handle the workflow.

---

## 3. MVP Positioning

Working positioning:

> A simple Christian homeschool lesson helper for parents who need help preparing lessons, worksheets, and teaching notes without learning how to prompt AI.

Alternative concise positioning:

> Five-button lesson prep for Christian homeschool parents.

More precise positioning:

> A parent-led AI teaching workflow tool that creates printable homeschool materials through guided interviews, while handling the prompt, context, template, and quality-checking work behind the scenes.

---

## 4. Target User

Primary user:

* Protestant Christian homeschool parent
* Co-op teacher
* Guardian or parent-teacher
* K through middle school focus
* Budget-conscious
* Not highly technical
* Not interested in learning AI prompting
* Wants practical teaching help
* Wants parent-reviewed, faith-aware outputs
* Wants to teach better, not outsource parenting or teaching to a chatbot

Secondary user:

* Co-op organizer
* Parent teaching a subject outside their comfort zone
* Parent adapting existing curriculum
* Parent creating supplemental lessons around a child’s interest

Not the MVP user:

* High school parent needing advanced course planning
* Public/private classroom teacher with standards-heavy classroom needs
* Student using the tool directly
* Church curriculum department
* Full online school
* Full homeschool records/planner user

---

## 5. Core Product Principles

1. Parent-only by default.
2. No child accounts in MVP.
3. No general chat box as the primary interface.
4. No prompt engineering required from the user.
5. No context engineering required from the user.
6. No workflow or harness engineering required from the user.
7. No complicated setup.
8. Minimalist black-and-white UI.
9. Fast local testing.
10. Low-cost model strategy.
11. Output should be practical, printable, and editable.
12. Parent remains the final reviewer.
13. Biblical/worldview content should be broad Protestant, parent-reviewed, and non-denominational in the MVP.
14. The MVP should be useful even before payments, accounts, file uploads, or cloud hosting exist.

---

## 6. MVP Scope

Build a local web app with five guided workflows:

1. Teach Me First
2. One-Day Lesson Plan
3. One-Week Lesson Set
4. Worksheet and Answer Key
5. Curriculum Review and Adaptation

Each workflow should:

1. Start from a simple button/card.
2. Interview the parent using clear questions.
3. Build a structured context object.
4. Generate a hidden prompt from a workflow template.
5. Call an LLM provider through an adapter.
6. Return a clean artifact.
7. Run a lightweight validation/checklist pass.
8. Display the result in a print-friendly view.
9. Allow copy to clipboard.
10. Allow download as Markdown.
11. Save to local history.

---

## 7. Non-Goals for MVP

Do not build these yet:

* student accounts
* child-facing tutor chat
* login/authentication
* cloud sync
* payment system
* subscription billing
* full homeschool planner
* gradebook
* attendance tracking
* state standards mapping
* high school transcript tools
* mobile app
* sophisticated doctrinal profile system
* full file upload pipeline
* vector database
* long-term memory
* marketplace
* multi-family co-op administration
* collaborative editing
* PDF generation dependency if browser print is enough
* complex analytics
* polished SaaS landing page

---

## 8. Recommended Tech Stack

Use this default stack unless the existing repo suggests otherwise.

Frontend and app:

* TypeScript
* Next.js
* React
* plain CSS modules or simple global CSS
* no heavy component library
* no complex design system

Backend:

* Next.js server actions or API routes
* SQLite for local persistence
* Prisma or Drizzle if useful, but avoid overcomplication
* local filesystem export for Markdown artifacts

LLM providers:

* Mock provider for offline testing
* Ollama-compatible provider for local or hosted open-source models
* OpenAI-compatible provider abstraction for future flexibility

Local hosting:

* `npm install`
* `npm run dev`
* app runs at `http://localhost:3000`

The project should run without an API key in mock mode.

---

## 9. Environment Variables

Create `.env.example` with:

```env
# Provider options: mock, ollama, openai_compatible
LLM_PROVIDER=mock

# Ollama or compatible local endpoint
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b

# Generic OpenAI-compatible endpoint for future use
OPENAI_COMPATIBLE_BASE_URL=
OPENAI_COMPATIBLE_API_KEY=
OPENAI_COMPATIBLE_MODEL=

# App behavior
APP_LOCAL_ONLY=true
DEBUG_SHOW_PROMPTS=false
```

Do not require real credentials for MVP startup.

---

## 10. Local Model Strategy

The architecture should support low-cost operation.

For MVP:

* mock provider first
* Ollama adapter second
* OpenAI-compatible adapter third

Use the provider interface to avoid locking the app to one model vendor.

Provider interface should support:

```ts
type GenerateRequest = {
  system: string;
  user: string;
  temperature?: number;
  maxTokens?: number;
  metadata?: Record<string, unknown>;
};

type GenerateResponse = {
  text: string;
  provider: string;
  model: string;
  raw?: unknown;
};
```

Later cost-reduction strategies:

* small models for simple worksheets
* larger models only for curriculum review and unit synthesis
* templates to reduce prompt length
* no unnecessary context dumping
* cache common support text
* prebuilt output structures
* validator pass only when needed
* optional “quick” and “thorough” generation modes

---

## 11. App Navigation

Minimum pages:

1. `/`

   * workflow selection
   * five large minimalist cards/buttons

2. `/workflow/[workflowId]`

   * guided interview
   * progress indicator
   * previous/next buttons
   * generate button

3. `/artifact/[artifactId]`

   * generated artifact
   * parent review checklist
   * copy button
   * download Markdown button
   * print button
   * optional debug prompt view if enabled

4. `/history`

   * list saved artifacts
   * title, workflow, created date

5. `/settings`

   * provider selection
   * model name
   * debug toggle
   * local-only privacy note

---

## 12. Minimal Visual Style

Use an intentionally minimal black-and-white aesthetic.

Design direction:

* white background
* black text
* generous spacing
* plain typography
* thin borders
* no gradients
* no illustrations
* no animations required
* no dashboard clutter
* no gamification
* no kid-themed UI

The tool should feel more like a quiet writing utility than a flashy SaaS product.

Reference vibe:

* plain
* fast
* serious
* minimal
* trustworthy
* low friction

---

## 13. Core Data Structures

Use simple types first.

```ts
type GradeBand = "K-2" | "3-5" | "6-8" | "mixed";

type WorldviewLevel = "none" | "light" | "moderate";

type WorkflowId =
  | "teach-me-first"
  | "one-day-lesson"
  | "one-week-plan"
  | "worksheet"
  | "curriculum-review";

type InterviewQuestion = {
  id: string;
  label: string;
  helpText?: string;
  type: "text" | "textarea" | "select" | "multiselect" | "number" | "boolean";
  required?: boolean;
  options?: string[];
};

type WorkflowDefinition = {
  id: WorkflowId;
  title: string;
  shortDescription: string;
  outputType: string;
  questions: InterviewQuestion[];
  systemPromptTemplate: string;
  userPromptTemplate: string;
  outputTemplate: string;
  validationChecklist: string[];
};

type InterviewAnswers = Record<string, string | string[] | number | boolean>;

type GeneratedArtifact = {
  id: string;
  workflowId: WorkflowId;
  title: string;
  markdown: string;
  answers: InterviewAnswers;
  provider: string;
  model: string;
  createdAt: string;
  validationNotes?: string[];
};
```

---

## 14. Shared Interview Questions

Most workflows should reuse these questions where relevant.

Required or common:

1. What topic do you want help teaching?
2. What age or grade band is this for?
3. Is this for one student, multiple students, or a co-op group?
4. What does the student already know?
5. What is the main goal for this lesson or document?
6. How much time do you have?
7. What materials do you already have available?
8. Should the output include a light Christian worldview connection?
9. Are there any topics, approaches, or assumptions to avoid?
10. How formal or casual should the output be?
11. Do you want a parent prep section?
12. Do you want an answer key or rubric?

Worldview question should be simple:

> Include Bible/worldview connection?
>
> * none
> * light
> * moderate

Do not ask for denominational profiles in MVP.

---

## 15. Workflow 1: Teach Me First

Purpose:

Help the parent understand a topic well enough to teach it.

User need:

“I do not understand this topic well, but I need to explain it to my child.”

Interview questions:

* topic
* grade band
* parent’s current comfort level
* student’s current knowledge
* desired depth
* time available
* confusing parts
* whether to include analogies
* whether to include common mistakes
* worldview level

Output sections:

```md
# Teach Me First: [Topic]

## Plain-English Overview

## What the Student Needs to Understand

## Parent Background Notes

## Simple Explanation to Use With the Student

## Analogy or Demonstration

## Key Vocabulary

## Common Misunderstandings

## Questions to Ask the Student

## Quick Check for Understanding

## Optional Christian Worldview Connection

## Parent Review Checklist
```

Important behavior:

* Write to the parent, not the student.
* Avoid sounding like a textbook.
* Include concrete analogies.
* Highlight what the parent should verify.
* If including Bible/worldview comments, keep them broad and parent-reviewed.

---

## 16. Workflow 2: One-Day Lesson Plan

Purpose:

Generate a complete lesson for one homeschool day.

Interview questions:

* topic
* grade band
* number of students
* lesson length
* student prior knowledge
* desired outcome
* materials available
* learning style preference
* worldview level
* worksheet desired?
* parent prep desired?

Output sections:

```md
# One-Day Lesson Plan: [Topic]

## Lesson Snapshot

## Parent Prep

## Learning Goals

## Materials

## Warm-Up

## Teach

## Guided Practice

## Hands-On Activity

## Discussion Questions

## Independent Work

## Wrap-Up

## Optional Christian Worldview Connection

## Assessment / Check for Understanding

## Adaptations for Younger or Older Students

## Parent Review Checklist
```

Important behavior:

* Make it practical for home use.
* Do not require specialized materials unless the user provided them.
* Keep the lesson realistic for the stated time.
* Include an optional simpler and harder version if mixed ages.

---

## 17. Workflow 3: One-Week Lesson Set

Purpose:

Generate a 3 to 5 day sequence around a topic.

Interview questions:

* topic
* grade band
* number of days
* minutes per day
* prior knowledge
* desired end result
* available materials
* whether to include reading
* whether to include activities
* whether to include review/assessment
* worldview level

Output sections:

```md
# One-Week Lesson Set: [Topic]

## Week Snapshot

## Goals for the Week

## Materials

## Day 1: Introduction

## Day 2: Build Understanding

## Day 3: Practice or Exploration

## Day 4: Apply or Create

## Day 5: Review and Assess

## Optional Christian Worldview Connection

## Vocabulary

## Simple Assessment

## Adaptations for Mixed Ages

## Parent Review Checklist
```

Important behavior:

* If user selects fewer than 5 days, adapt accordingly.
* Make the week coherent, not five disconnected lessons.
* Include a simple review loop.
* Keep prep burden low.

---

## 18. Workflow 4: Worksheet and Answer Key

Purpose:

Generate a printable student worksheet and answer key.

Interview questions:

* topic
* grade band
* worksheet purpose
* number of questions
* question types
* difficulty
* include vocabulary?
* include short answer?
* include answer key?
* include parent notes?
* worldview level

Question type options:

* matching
* multiple choice
* fill in the blank
* short answer
* narration prompt
* drawing/labeling
* vocabulary
* word problems
* review questions

Output sections:

```md
# Worksheet: [Topic]

## Student Instructions

## Questions

## Optional Challenge

## Answer Key

## Parent Notes

## Parent Review Checklist
```

Important behavior:

* Keep formatting printable.
* Avoid answer-key ambiguity.
* For younger children, use short instructions.
* For older children, allow short written explanations.
* If biblical/worldview content is included, keep it optional and labeled.

---

## 19. Workflow 5: Curriculum Review and Adaptation

Purpose:

Help a parent review or adapt existing lesson/curriculum material.

MVP input method:

* paste text into a textarea
* do not implement file upload yet

Interview questions:

* paste existing material
* what should be improved?
* grade band
* student needs
* time available
* desired output type
* concerns about the material
* worldview level
* make it simpler?
* make it more rigorous?
* add activity?
* add discussion?
* add assessment?

Output sections:

```md
# Curriculum Review and Adaptation

## Summary of Existing Material

## Strengths

## Gaps or Weak Spots

## Age-Level Fit

## Suggested Improvements

## Adapted Teaching Plan

## Optional Activity

## Optional Discussion Questions

## Optional Christian Worldview Review

## Assessment Idea

## Parent Review Checklist
```

Important behavior:

* Do not claim the pasted curriculum is wrong unless clearly so.
* Use gentle language.
* Focus on practical improvements.
* Flag possible concerns for parent review.
* Avoid heavy doctrinal critique in MVP.
* Do not rewrite large copyrighted pasted content verbatim unless user-provided text is short and the transformation is necessary.

---

## 20. Worldview and Theology Rules

MVP worldview posture:

* broadly Protestant
* Scripture-aware
* parent-reviewed
* non-denominational
* no narrow theological enforcement
* no replacement of parent, church, pastor, or curriculum authority

Rules:

1. If the workflow includes Bible/worldview content, label it clearly as optional.
2. If making a biblical claim, include a Scripture reference where possible.
3. Do not invent Bible references.
4. If uncertain, say the parent should verify.
5. Avoid resolving disputed denominational issues in MVP.
6. Flag disputed areas instead of taking a hard stance.
7. Avoid pastoral counseling.
8. Avoid presenting AI output as spiritual authority.
9. Keep the parent in charge.

Example standard disclaimer in outputs:

```md
Note for parent: Review all biblical connections before teaching. Scripture references are provided as starting points for parent review, not as a replacement for your own judgment, church, or curriculum.
```

---

## 21. Safety Rules

The app should include parent review and safety language, especially for activities.

General rules:

* No unsafe science experiments.
* No mains electricity activities.
* No chemicals beyond ordinary household-safe materials unless parent-supervised and clearly safe.
* No dangerous tools.
* No medical, legal, or psychological advice.
* No direct child counseling.
* No private child data required.
* No unsupervised internet research by children.
* No instruction to bypass parental authority.

Activity output should include:

* materials
* supervision level
* mess level if relevant
* safety notes
* cleanup notes if relevant

---

## 22. Prompt/Harness Architecture

Do not hardcode one giant prompt per workflow directly in a component.

Create a workflow system:

```txt
/src/workflows/
  teach-me-first.ts
  one-day-lesson.ts
  one-week-plan.ts
  worksheet.ts
  curriculum-review.ts
  index.ts
```

Each workflow exports:

* metadata
* interview questions
* system prompt template
* user prompt builder
* output template
* validation checklist

Create a prompt builder:

```txt
/src/lib/prompting/
  buildPrompt.ts
  renderTemplate.ts
  sharedSystemRules.ts
  worldviewRules.ts
  safetyRules.ts
```

Create model adapters:

```txt
/src/lib/llm/
  types.ts
  mockProvider.ts
  ollamaProvider.ts
  openAiCompatibleProvider.ts
  getProvider.ts
```

Create validation:

```txt
/src/lib/validation/
  validateArtifact.ts
  checklistRules.ts
```

Validation can be simple in MVP:

* check required sections exist
* check parent review checklist exists
* check title exists
* check no empty artifact
* check worldview disclaimer appears when worldview level is light or moderate
* check answer key appears for worksheet when requested

No second LLM validation required in v0 unless easy.

---

## 23. Shared System Prompt Rules

All workflows should include a shared system prompt similar to this:

```txt
You are a parent-facing homeschool lesson preparation assistant.

Your user is a homeschool parent, guardian, or co-op teacher preparing teaching materials for K through middle school students.

You are not speaking directly to the child unless explicitly asked. Write primarily to the parent.

Your job is to create practical, ready-to-use homeschool teaching artifacts from the structured context provided.

Follow these rules:
- Keep the parent in control.
- Be practical and concrete.
- Prefer low-cost household materials.
- Avoid assuming classroom resources.
- Do not require the parent to understand AI prompting.
- Do not add unnecessary complexity.
- Respect a broad Protestant Christian worldview when requested.
- Keep biblical/worldview connections optional and parent-reviewed.
- Include Scripture references when making biblical claims, but do not invent references.
- Flag disputed theological issues instead of resolving them dogmatically.
- Do not give unsafe activity instructions.
- Do not provide medical, legal, psychological, or pastoral counseling.
- Include a parent review checklist.
- Format the output in clean Markdown.
```

---

## 24. User Prompt Builder Pattern

The app should convert answers into a structured prompt.

Example:

```txt
Create the requested homeschool artifact.

Workflow: One-Day Lesson Plan

Parent-provided context:
- Topic: {{topic}}
- Grade band: {{gradeBand}}
- Number of students: {{studentCount}}
- Lesson length: {{lessonLength}}
- Prior knowledge: {{priorKnowledge}}
- Desired outcome: {{desiredOutcome}}
- Materials available: {{materials}}
- Worldview level: {{worldviewLevel}}
- Constraints or things to avoid: {{constraints}}

Output requirements:
Use this exact section structure:
{{outputTemplate}}

Quality requirements:
- Make the lesson realistic for the time available.
- Include parent prep.
- Include practical teaching steps.
- Include assessment/check for understanding.
- Include adaptations if grade band is mixed.
- Include safety notes for any activity.
- Include optional worldview section only if requested.
- Include parent review checklist.
```

---

## 25. Artifact Quality Bar

Generated artifacts should be:

* specific
* practical
* printable
* age-appropriate
* parent-facing
* not generic filler
* not too long by default
* organized with clear headings
* easy to edit
* easy to copy into a document
* modest in assumptions
* safe
* parent-reviewed
* low-cost to execute

Bad output examples:

* vague “discuss the topic” instructions
* activities requiring special supplies without warning
* overlong academic prose
* unsupported biblical claims
* denominational assertions
* child-directed chatbot behavior
* generic worksheet questions with no answer key
* a lesson that cannot fit the requested time
* high-school-level content for young students
* no parent review checklist

---

## 26. History and Persistence

Use SQLite or simple local JSON persistence.

MVP fields:

```ts
type ArtifactRecord = {
  id: string;
  workflowId: string;
  title: string;
  markdown: string;
  answersJson: string;
  provider: string;
  model: string;
  createdAt: string;
};
```

History page should show:

* title
* workflow
* date
* provider/model
* open link

Do not implement multi-user storage yet.

---

## 27. Export Requirements

MVP export:

* copy Markdown
* download `.md`
* print via browser

Optional:

* print-friendly CSS
* hide buttons while printing

Do not add complex PDF generation unless trivial. Browser print to PDF is acceptable for MVP.

---

## 28. Debug Mode

If `DEBUG_SHOW_PROMPTS=true`, artifact page should show:

* system prompt
* user prompt
* provider
* model
* raw-ish request metadata

If false, hide prompt internals.

This is important because the product value is hidden prompt/context/harness engineering, but the developer needs to inspect it during testing.

---

## 29. MVP Acceptance Criteria

The MVP is acceptable when:

1. App runs locally with `npm run dev`.
2. App works without API keys using mock provider.
3. User can select each of the five workflows.
4. Each workflow asks interview questions.
5. User can move backward and forward through questions.
6. User can generate an artifact.
7. Artifact displays in clean Markdown-rendered format.
8. Artifact includes a parent review checklist.
9. Worksheet workflow can include an answer key.
10. Curriculum review workflow accepts pasted source material.
11. Output can be copied.
12. Output can be downloaded as Markdown.
13. Output can be printed cleanly.
14. Artifact is saved to local history.
15. LLM provider can be switched through env config.
16. Ollama provider is implemented or stubbed clearly.
17. No login is required.
18. No child data is required.
19. No payments are implemented.
20. UI remains minimal and uncluttered.

---

## 30. Suggested Repo Structure

```txt
homeschool-lesson-helper/
  README.md
  CODEx_HANDOFF.md
  .env.example
  package.json
  tsconfig.json
  next.config.js

  src/
    app/
      page.tsx
      layout.tsx
      globals.css
      workflow/
        [workflowId]/
          page.tsx
      artifact/
        [artifactId]/
          page.tsx
      history/
        page.tsx
      settings/
        page.tsx

    components/
      WorkflowCard.tsx
      InterviewWizard.tsx
      QuestionRenderer.tsx
      ArtifactViewer.tsx
      ParentReviewChecklist.tsx
      ProviderStatus.tsx

    workflows/
      index.ts
      types.ts
      teach-me-first.ts
      one-day-lesson.ts
      one-week-plan.ts
      worksheet.ts
      curriculum-review.ts

    lib/
      prompting/
        buildPrompt.ts
        sharedSystemRules.ts
        worldviewRules.ts
        safetyRules.ts
      llm/
        types.ts
        mockProvider.ts
        ollamaProvider.ts
        openAiCompatibleProvider.ts
        getProvider.ts
      artifacts/
        saveArtifact.ts
        getArtifact.ts
        listArtifacts.ts
        downloadMarkdown.ts
      validation/
        validateArtifact.ts
      storage/
        db.ts

    styles/
      print.css
```

---

## 31. Implementation Sequence for Codex

Implement in this order.

### Phase 1: Skeleton

1. Create Next.js TypeScript app.
2. Add minimal global styling.
3. Create home page with five workflow cards.
4. Create workflow definitions.
5. Create route for workflow wizard.
6. Create mock provider.

Stop and verify local app works.

### Phase 2: Workflow Engine

1. Build `InterviewWizard`.
2. Render questions from workflow definition.
3. Store answers in local state.
4. Build prompt from answers.
5. Generate using mock provider.
6. Render artifact page.

Stop and verify all five workflows generate mock artifacts.

### Phase 3: Real LLM Adapter

1. Add provider interface.
2. Add Ollama provider.
3. Add OpenAI-compatible provider.
4. Use env to select provider.
5. Add error handling for unavailable provider.

Stop and verify mock still works without credentials.

### Phase 4: Persistence and Export

1. Save generated artifact.
2. Add history page.
3. Add artifact retrieval.
4. Add copy to clipboard.
5. Add Markdown download.
6. Add print-friendly CSS.

Stop and verify a complete local test cycle.

### Phase 5: Polish and Validation

1. Add parent review checklist display.
2. Add basic validation.
3. Add settings page.
4. Add debug prompt view.
5. Clean UI.
6. Update README.

---

## 32. README Requirements

Create a README that includes:

* project purpose
* local setup
* env variables
* how to run mock mode
* how to run with Ollama
* how to add a workflow
* current limitations
* privacy note
* safety note
* parent review note

Include this statement:

```md
This MVP is a parent-facing lesson preparation tool. It is not a child-facing tutor, not a substitute for parental judgment, and not a replacement for church, curriculum, or professional advice.
```

---

## 33. First Local Test Script

After implementation, manually test:

### Test 1: Teach Me First

Input:

* Topic: photosynthesis
* Grade band: 3-5
* Parent comfort: low
* Student prior knowledge: knows plants need sunlight and water
* Desired depth: simple but accurate
* Worldview: light

Expected:

* parent-facing explanation
* analogy
* vocabulary
* questions
* optional worldview connection
* parent review checklist

### Test 2: One-Day Lesson

Input:

* Topic: simple electric circuits
* Grade band: mixed
* Time: 45 minutes
* Materials: AA battery pack, LED, switch, wires
* Constraints: no wall power, no soldering
* Worldview: light

Expected:

* safe low-voltage framing
* no mains electricity
* clear activity steps
* assessment
* adaptations

### Test 3: One-Week Plan

Input:

* Topic: American Revolution causes
* Grade band: 6-8
* Days: 5
* Time: 30 minutes/day
* Worldview: moderate

Expected:

* coherent 5-day sequence
* discussion questions
* review activity
* no partisan overreach
* parent review checklist

### Test 4: Worksheet

Input:

* Topic: fractions
* Grade band: 3-5
* Question types: word problems, short answer
* Number of questions: 10
* Include answer key: yes

Expected:

* printable worksheet
* answer key
* no ambiguous answers

### Test 5: Curriculum Review

Input:

Paste a short existing lesson paragraph.

Expected:

* summary
* strengths
* gaps
* adapted teaching plan
* activity idea
* parent review checklist

---

## 34. Future Features After MVP

Only consider these after the local MVP proves useful.

Near-term:

* unit study builder
* rubric generator
* discussion guide generator
* activity/lab generator
* saved parent profile
* saved student age bands without names
* reusable household materials list
* simple source pack system
* “make this simpler” regenerate button
* “make this more rigorous” regenerate button
* “make it printable” cleanup pass

Later:

* account system
* hosted version
* co-op group mode
* donation-supported model
* optional paid supporter tier
* curriculum upload
* vector retrieval
* document library
* parent-approved worldview preferences
* state standards optional add-on
* church/co-op sponsorship
* multi-model routing
* quality validator LLM pass

Avoid until much later:

* child tutor mode
* full student dashboard
* lesson calendar
* gradebook
* social features
* marketplace

---

## 35. Strategic Constraint

This product should not try to beat larger Christian AI platforms by becoming a broader platform.

The wedge is:

* simpler
* cheaper
* parent-only
* document-first
* minimal
* guided
* low-friction
* no AI expertise required

The app should feel like a useful homeschool utility, not a startup chasing enterprise SaaS complexity.

---

## 36. Build Philosophy for Codex

Prefer:

* boring code
* small files
* explicit types
* simple state
* easy local testing
* low dependencies
* clean prompts
* plain Markdown
* readable workflow definitions
* extensibility through workflow files

Avoid:

* overabstracting too early
* complex auth
* complicated database modeling
* fancy UI libraries
* AI-agent overengineering
* hidden magic
* cloud assumptions
* building for scale before usefulness is validated

---

## 37. Final MVP Goal

The MVP succeeds if a homeschool parent can locally open the app, click one of five document types, answer plain-English questions, and get a useful teaching artifact that feels easier, safer, and more structured than using a blank AI chat box.

The local MVP should prove or disprove this core thesis:

> A minimalist guided workflow layer can make AI useful for budget-conscious Christian homeschool parents who would otherwise struggle with prompt engineering, context engineering, and workflow engineering.
