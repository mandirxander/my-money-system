# Recommended Project File Structure
### AI Design Mentorship — Claude Code Setup Guide

---

## Contents

**Phase 1 — Start With This**
1. [The Starting Structure](#phase-1-start-with-this)
2. [CLAUDE.md — Claude's Briefing Doc](#claudemd--claudes-briefing-doc)
3. [.claude/commands/ — Slash Commands](#claudecommands--slash-commands)
4. [.env.example and .gitignore](#envexample-and-gitignore)
5. [src/ — Your Source Code](#src--your-source-code)
6. [public/ — Static Files](#public--static-files)
7. [prompts/ — Your Prompt Library](#prompts--your-prompt-library)
8. [docs/ — Project Context and Planning](#docs--project-context-and-planning)
9. [decisions.md and session_log.md — Your Project Memory](#decisionsmd-and-session_logmd--your-project-memory)
10. [workflows/ — Documented AI Workflows](#workflows--documented-ai-workflows)

**Phase 2 — Add Later**

11. [Folders to Introduce as You Need Them](#phase-2-add-these-later)
12. [Quick Reference: Where Does This File Go?](#quick-reference-where-does-this-file-go)

---

## Phase 1: Start With This

This is the structure you should set up at the beginning of every project.

```
my-project/
│
├── CLAUDE.md                    ← Claude's briefing doc (what this project is, rules, key files)
│
├── .claude/
│   └── commands/                ← Custom slash commands (type /command-name in Claude Code)
│
├── .env.example                 ← Template showing what secret variables are needed (safe to share)
├── .gitignore                   ← Tells Git what to never track or upload (e.g. .env, node_modules)
├── README.md                    ← Human-readable project overview
│
├── src/                         ← All your source code lives here
│   ├── components/              ← Reusable UI pieces (buttons, cards, nav bars)
│   ├── pages/                   ← Full page layouts
│   ├── styles/                  ← Global CSS, Tailwind config
│   ├── utils/                   ← Helper functions (formatting, validation, calculations)
│   └── assets/                  ← Images and icons imported directly in your code
│
├── public/                      ← Static files served as-is (favicon, og-image, robots.txt)
│
├── prompts/                     ← Saved prompt templates for Claude.ai chat (your prompt library)
│   └── example_prompt.md
│
├── docs/                        ← All project context, research, and planning documents
│   ├── problem_definition.md
│   ├── workflow_design_spec.md
│   ├── decisions.md             ← Why you made key choices (append-only, never overwrite)
│   ├── session_log.md           ← What you did and tried each session (running narrative)
│   ├── research/                ← Background reading, user research notes
│   └── specs/                   ← Feature requirements, design specs
│
└── workflows/                   ← Documented AI workflows and process diagrams
    └── ideation_workflow.md
```

---

## What Each Key File/Folder Does

### `CLAUDE.md` — Claude's Briefing Doc

This file lives at the root and is the **first thing Claude Code reads automatically at the start of every session.** You do not need to tell Claude to read it.

Keep it short and focused. It should orient Claude to your project, your conventions, and your current focus — not document everything. Think of it as Claude's onboarding brief, not a full wiki.

> 💡 **Tip:** At the start of a new session, direct Claude to any other docs it should know about:
> *"Before we begin, read docs/decisions.md and docs/session_log.md"*
> Claude reads CLAUDE.md automatically, but not the rest of your docs folder.

**When to update it:**
- When the project phase changes (e.g., Ideation → Building)
- When a new tech or design decision becomes a standing convention
- When the current focus shifts to a new feature or problem
- At the end of a work session: *"Does anything in CLAUDE.md need updating based on what we just built?"*

**How to update it:**
Claude does not update CLAUDE.md on its own — it reads it but treats it as your document to maintain. You can ask Claude to make specific updates:
> *"Update the Current Focus section in CLAUDE.md — we've moved from ideation to prototyping"*

You can also edit it manually like any other file, or create an `/update-claude` slash command that prompts Claude to review and suggest updates at the end of each session.

---

### `CLAUDE.md` — Starter Template

Copy this into your project and fill it in. Delete any section that isn't relevant yet.

```markdown
# [Project Name]

## What This Project Is
[1–2 sentences. What problem does it solve and for whom?]

## Tech Stack
- Frontend: [e.g. React, Next.js, plain HTML]
- Styling: [e.g. Tailwind CSS, CSS modules]
- Backend / API: [e.g. Node.js, Supabase, none yet]
- Key tools: [e.g. Claude API, Anthropic SDK]

## Project Phase
[Planning / Ideation / Prototyping / Building / Evaluating / Deployed]

## Key Files to Read
- `docs/problem_definition.md` — what we're solving and why
- `docs/decisions.md` — choices made and the reasoning behind them
- `docs/session_log.md` — what happened in recent sessions
- `docs/workflow_design_spec.md` — how the system is designed to work

## Conventions
- [e.g. Use camelCase for variable names]
- [e.g. All components are functional, no class components]
- [e.g. Keep components under 150 lines — split if longer]
- [e.g. Write a comment above any function that isn't self-explanatory]

## What Claude Should Always Do
- Ask before making large structural changes
- APPEND new dated entries to docs/decisions.md — never edit or remove past entries
- APPEND new entries to docs/session_log.md at the end of each session
- Log significant decisions to docs/decisions.md
- Keep solutions simple — prefer the most straightforward approach
- Explain what you're doing before writing code for complex tasks

## What Claude Should Never Do
- Add features or code not explicitly asked for
- Delete or rename files without confirmation
- Overwrite or edit previous entries in decisions.md or session_log.md
- Assume — ask if something is unclear

## Current Focus
[What are we working on right now? Be specific.]
[e.g. "Building the homepage layout — navigation and hero section only"]
```

---

### `decisions.md` and `session_log.md` — Your Project Memory

These two files work as a pair. Together they tell the full story of your project.

| | `decisions.md` | `session_log.md` |
|---|---|---|
| **Captures** | Why you chose something | What you did and tried |
| **Tone** | Reasoned, deliberate | Narrative, chronological |
| **Written by** | You or Claude when a choice is made | Claude at the end of each session |
| **Use later for** | Justifying past choices, avoiding repeated mistakes | Reconstructing context, building personal workflows |

Both files are **append-only** — entries are never edited or removed. This is what makes them reliable as a project history. The instruction in CLAUDE.md enforces this behavior.

---

#### `decisions.md` — Starter Template

```markdown
# Decisions Log

> Append-only. Add new entries at the bottom. Never edit past entries.

---

## [YYYY-MM-DD] — [Short decision title]
**Decision:** [What you decided]
**Why:** [The reasoning — what problem it solves or what tradeoff it resolves]
**Alternatives considered:** [What else you looked at]
**Tradeoffs:** [What you gave up or accepted]

---

## [YYYY-MM-DD] — [Short decision title]
**Decision:**
**Why:**
**Alternatives considered:**
**Tradeoffs:**
```

---

#### `session_log.md` — Starter Template

```markdown
# Session Log

> Append-only. Add new entries at the bottom. Never edit past entries.

---

## Session [#] — [YYYY-MM-DD]

**Goal for this session:** [What you set out to do]

**What we did:**
- [Key action or step taken]
- [Another action]

**What we tried that didn't work:**
- [Approach or idea that failed, and why]

**What we learned:**
- [Insight, pattern, or realization worth remembering]

**Blockers or open questions:**
- [Anything unresolved going into the next session]

**Next session focus:** [What to pick up on next time]

---
```

> 💡 **At the end of every session, ask Claude:**
> *"Summarize what we did today and append a new entry to docs/session_log.md"*
> This takes 30 seconds and is one of the highest-value habits you can build.

---

#### Using Your Logs to Build a Personal Workflow

After 2–3 projects, your logs become source material for something more valuable than documentation — a personal workflow. Ask Claude:

> *"Read docs/decisions.md and docs/session_log.md. What patterns do you see in how I work, what tradeoffs I keep facing, and what steps I take on every project? Draft a reusable workflow checklist based on this history."*

This is how your own way of working becomes legible, repeatable, and teachable.

---

### `.claude/commands/` — Slash Commands

Custom shortcuts Claude Code executes when you type `/command-name` in the terminal.
Each command is a markdown file with instructions Claude will carry out automatically.

**Examples:**
- `/audit` → runs a full code review
- `/summarize` → summarizes recent changes into decisions.md
- `/plan` → asks Claude to outline the next steps before writing any code
- `/update-claude` → prompts Claude to review and suggest updates to CLAUDE.md
- `/log-session` → triggers Claude to write a session_log.md entry for the current session

---

### `.env.example` and `.gitignore` — Handled, But Worth Understanding

**In most cases, these are created for you.** When you scaffold a project using a framework (like Next.js or Vite), a `.gitignore` is generated automatically. Claude Code can also create one if you ask it to set up a project from scratch.

What Claude cannot do automatically is know what secrets your specific project needs — so `.env.example` still requires your input once you know what services you're connecting to.

**`.env`** stores sensitive configuration values your app needs to run:
```
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_URL=postgres://...
```
Your code reads from it. This file **never** gets shared or uploaded.

**`.env.example`** is the safe, shareable version — same structure, no real values:
```
ANTHROPIC_API_KEY=your_key_here
DATABASE_URL=
```

**`.gitignore`** tells Git which files to never track or upload to GitHub:
```
.env
node_modules/
.DS_Store
dist/
```

> ⚠️ Even when these files are generated for you, understand what they do. Accidentally committing a real `.env` file to a public GitHub repo is one of the most common and costly beginner mistakes.

---

### `src/` — Your Source Code

All the code you write lives here. Keeping it organized from the start avoids a messy project later.

| Folder | What goes here |
|---|---|
| `components/` | Reusable UI pieces: buttons, cards, headers, modals |
| `pages/` | Full page layouts that assemble components together |
| `styles/` | Global CSS, Tailwind configuration, design tokens |
| `utils/` | Helper functions used across the project (don't put these inside components) |
| `assets/` | Images or icons **imported in your code** with `import logo from './assets/logo.png'` |

---

### `public/` — Static Files

Files here are served directly to the browser with no processing.
Use this for: `favicon.ico`, social preview images, `robots.txt`, or any file you want accessible via a direct URL like `yoursite.com/logo.png`.

**Simple rule:**
- Referenced in your code with `import`? → `src/assets/`
- Linked to by URL or in an HTML file directly? → `public/`

---

### `prompts/` — Your Prompt Library

Saved prompt templates you've written and refined for use in **Claude.ai chat**.
Think of these as reusable starting points — not throwaway messages, but crafted artifacts worth keeping and improving.

**Examples of what to save here:**
- Your ideation kickoff prompt
- A prompt for generating test cases
- A prompt for writing a problem definition
- Prompts you've iterated on and found effective

> Each prompt is a `.md` file. You can paste it into Claude.ai, share it with teammates, or hand it off to someone using a different tool. Prompts are transferable — they work anywhere.

---

### `docs/` — Project Context and Planning

All non-code documents that define, shape, and record your project.

| File | Purpose |
|---|---|
| `problem_definition.md` | Clear articulation of the problem you're solving |
| `workflow_design_spec.md` | How the system or process is designed to work |
| `decisions.md` | *Why* you made key choices — append-only log |
| `session_log.md` | *What* you did each session — append-only narrative |
| `research/` | Background reading, interview notes, competitive analysis |
| `specs/` | Feature requirements, design specs, acceptance criteria |

---

### `workflows/` — Documented AI Workflows

Written documentation of the AI-assisted workflows your project uses or follows.
This is not a tool export — it's a place to make your process legible and repeatable.

**Examples:**
- `ideation_workflow.md` — steps from problem framing to solution selection
- `evaluation_workflow.md` — how you test and evaluate outputs
- `diagrams/` — flowcharts or visual maps of how your system works

> This folder reinforces a core habit: **document your process, not just your output.** A workflow written down can be handed to someone else, improved, or reused on a future project.

---

## Phase 2: Add These Later

Don't add these on day one. Introduce them when you actually need them.

| Folder / File | Add When | Why |
|---|---|---|
| `src/hooks/` | Building interactive features with React | Custom hooks; premature before understanding state |
| `src/context/` | Running into prop-drilling problems | Teach the problem before the solution |
| `src/types/` | Adopting TypeScript | Not needed for JavaScript beginners |
| `tests/` | You have something worth testing | Keep scope tight in early sessions |
| `data/` | Mocking API responses before real data is ready | Useful for prototyping |
| `docs/eval/` | Evaluation phase of your project | Test cases, results, evaluation reports |
| `reports/` | Sharing findings or progress externally | Summaries, evaluation reports, demo deliverables |

---

## Quick Reference: Where Does This File Go?

| Document Type | Location |
|---|---|
| Claude's orientation / project rules | `CLAUDE.md` |
| Secret API keys | `.env` (never commit this) |
| Template for secrets | `.env.example` |
| Reusable Claude.ai chat prompts | `prompts/` |
| Claude Code slash commands | `.claude/commands/` |
| Problem definition, specs, research | `docs/` |
| Why you made key choices | `docs/decisions.md` |
| What you did and tried each session | `docs/session_log.md` |
| Process documentation, AI workflow steps | `workflows/` |
| UI components and code | `src/components/` |
| Imported images / icons | `src/assets/` |
| Direct-URL static files (favicon, etc.) | `public/` |
| Evaluation reports, demo deliverables | `reports/` |
