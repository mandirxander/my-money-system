# Session 3: Reflect, Tool Up & Design Your Build

## Session Information

- **Duration:** 1.5 hours
- **Date:** [Date]
- **Facilitator:** [Name]
- **Source workflows:** `user_research` (light) + `implementation` — assigned as homework
- **Format:** Debrief/share → technical working session → homework walkthrough

## Learning Objectives

By the end of this session, participants will be able to:

- Reflect on their Session 2 build (experiment + spike) and what it taught them about their quality risk
- Pull the latest course files into their project and clean out workflows they don't need yet
- Right-size user research for their project — skip, speed-run, or run it with Claude's help
- Understand the homework path: light user research → designing their build (the `implementation` workflow) → first-version specs

## Prerequisites

- Session 2 complete
- Session 2 homework substantially done: `docs/problem_definition.md` (with Requirements Mapping), `prompts/testing_prompt.md`, `docs/evaluation_design_report.md`, `data/evaluations_data.csv`, and a working spike in `docs/research/spike/`
- Common stack installed (or in progress)
- `CLAUDE.md` at project root, Project Phase set to Prototyping

## Session Outline

### Opening (5 min)

- Schedule check and quick framing: *"This week we reflect on what we built, tidy our tools, and design the first version of the real thing."*
- Note the shift: Session 2 homework was your first build (the disposable spike); from here on you design and build the **POC** — the real product you'll keep extending through the rest of the course.

### Debrief / Share — Session 2 Homework (~30 min)

Each participant pulls up their `docs/problem_definition.md`, `docs/reports/session_log.md`, and `docs/reports/decisions.md`. Move through these prompts as a group — keep it quick:

1. **The evaluation work** — What did you test and prioritize? What were your top **quality risks**, and **how did the spike go** (what broke once the data was real and connected, versus hand-fed)?
2. **What changed in your thinking** — Did the experiment or spike shift your scope, direction, or core capabilities?
3. **Tech-stack setup** — How did installing the stack go? **Any outstanding issues** we should troubleshoot today?
4. **Working with Claude** — Are you directing it more (asking it to review/simplify, surface counter-arguments and edge cases, plan before executing)? How has your `CLAUDE.md` changed? What "/" commands or skills did you build (`session-start`, `wrap-up`, sync) — and how are they working?
5. **Journaling nudge** — Are you logging `decisions.md` + `session_log.md` every session? We pull from these later, so keep them current.

### Technical Working Session (~40 min)

Hands-on, live in Claude Code. Help anyone who's stuck.

1. **Get the latest course files + build the sync skill together (~15 min)** *(reference: `sessions/session_02/handouts/git_cheat_sheet.md` → "Getting course updates into your project")*
   - Walk the group through pulling updated/new course files, and have everyone build (or run) their reusable course-sync skill.
   - **Confirm everyone succeeded** — no one should leave without the current Session 3 files.
   - *(Reminder: a newly created/edited skill won't appear until they start a new session or `/clear` — Claude Code only discovers skills at startup.)*

2. **Clean out the workflows you don't need yet (~5 min)**
   - After syncing, participants should have **only the workflows through Session 3**. Delete everything past `implementation` — those get rewritten and re-released as their session arrives, so a stale copy now would only mislead you.
   - **Keep:** `orientation`, `ideation`, `evaluation_dataset`, `user_research`, `implementation`
   - **Delete:** `context_management`, `architecture`, `context_architecture`, `user_experience`, `evaluation_at_scale`, `first_deployment`, `demoing_your_agent`
   - Simple rule: *delete every workflow file past `implementation`; you'll re-sync each one when its session comes up.*

3. **How to use Claude for the next homework (~12 min)**
   - **Light user research:** show how Claude can draft a behavioral conversation guide and synthesize findings — so research is fast (or skippable) rather than a chore. Set expectations: skip if you're building only for yourself, speed-run if you're already expert in the domain.
   - **Designing your build:** preview kicking off the `implementation` workflow — it turns your research + evaluation work into an interaction model, a data-flow map, a scoped first version, and build-ready specs (`poc_specs.md`). **No code yet** — this week is design.

4. **Tooling Q&A — time-boxed, pick by group (~8 min)**
   - `/init` vs. this project's file structure (why ours is planning-first; folders get added as you build)
   - git in the command line — how's it going? quick troubleshooting
   - `.gitignore` — ask Claude what file types you're missing for your project
   - Cursor vs. VS Code; Cursor agent mode vs. Claude Code as the agent
   - Content files people created on their own (`TODO.md`, `plan.md`, idea parking lots) — what's working
   - **Stack install troubleshooting — only if time remains** (otherwise it carries to homework)

### Homework Walkthrough + Q&A (~15 min)

- Walk through `homework.md` (below) and field questions.
- Emphasize the order: **light user research first** (the build design reads its findings), then the `implementation` workflow.
- Reassure on scope: `poc_specs.md` is the blueprint for the **first version**, not a locked final spec — the system keeps evolving in later sessions.

### Closing (≤5 min)

- Reminder to run `/wrap-up` at the end of the homework to log `session_log.md` + `decisions.md`.
- Preview Session 4: build the POC from your specs + put a first UI on it.

## Artifacts Produced (in session)

- Course-sync skill committed (`.claude/skills/`), workflows cleaned up
- `.gitignore` reviewed; stack installs advanced/finished where possible
- *(The build-design artifacts are produced in homework — see below.)*

## Homework

*See `homework.md` for full details — four parts, ~3–5 hrs.*

- **Light/optional user research** (`user_research`) → `docs/user_research_findings.md` (skip → quick assumption-check; speed-run → let Claude draft the guide and synthesize)
- **Design your build** (`implementation` workflow) → `docs/implementation_design.md` + `docs/specs/poc_specs.md` (no code this week)
- **Finish stack setup + scaffold your app shell** — get an empty, running app in place so you are set up and ready to build out the UI in Session 4
- **Update `CLAUDE.md`** and post the Teams reflection
