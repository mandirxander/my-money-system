# Session 2: Foundations, Tools, and Project Ideas

## Session Information

- **Duration:** 1.5 hours
- **Date:** [Date]
- **Facilitator:** [Name]
- **Source workflows:** ideation (steps 1–6) — review only; `evaluation_dataset` + `user_research` assigned as homework

## Learning Objectives

By the end of this session, participants will be able to:

- Distinguish vibe coding from structured AI-assisted building
- Use hooks, /commands, and CLI tools to manage a project session efficiently
- Articulate their project idea, problem definition, and autonomy decisions to the group
- Identify the technical requirements for their project and begin setup
- Understand the build path ahead: how the homework moves them from a defined idea to a first running prototype (the Rung 1 experiment → Rung 2 spike)

## Prerequisites

- Session 1 complete
- `docs/reports/participant_profile.md` completed
- `docs/problem_definition.md` completed (ideation workflow)
- `CLAUDE.md` updated and tested
- CLI basics practiced
- `/start-session` or other command created and tested
- `build-prompt` or other skill created and tested

## Session Outline

### Opening (5 min)

- Schedule check: Do we need to reschedule Monday, June 8?
- Recap class purpose, goals, and the overall arc of the program. Review AI_Mentor_Circle_Overview.docx.
- Review core habits to practice every session:
  - Using Claude as a collaborator — ask it to review your work, suggest improvements, simplify, surface counter-arguments and edge cases
  - Plan before executing
  - Update your CLAUDE.md as you learn what you like or don't, your patterns
  - Create "/" commands and skills for repeated workflows
  - Keep a journal (session_log.md + decisions.md)

### Build Approaches (5 min)

- Walk through the curriculum progression
- Three common modes of building with AI — and where this course sits:
  1. **Vibe coding** — start building immediately, figure things out as you go; fast to start, common to get lost or end up rebuilding from scratch
  2. **AI-coding tool approach** — use Cursor, Claude Code, or similar to generate and iterate; AI writes the code, the human directs; how structured it gets depends on the person
  3. **Developer approach** — think through what you want to build, create a detailed plan, then use AI to help execute it and write tests to verify it works
- **This course adds a step before all of that: problem definition and decomposition**
  - Most builders — even structured ones — start planning too soon, before they've deeply defined *what* they're actually building
  - The ideation workflow you completed was this step: problem framing, assumption challenging, autonomy decisions, solution selection
  - Getting this right first means you don't get stuck redesigning mid-build or lose direction and purpose when things get complex

### Homework 2 Review: CLI, Slash Commands, and Skills (10 min)

- **Starting a new session:** ask Claude to summarize where you left off → this is what `/start-session` does; it can also be set up as a SessionStart hook so it runs automatically
- **Hooks vs. /commands vs. loops:**
  - /commands are triggered by you (type `/command-name`)
  - Hooks run automatically on a trigger (e.g., when a new session starts) — fires once per event
  - Loops run repeatedly on a schedule or interval (e.g., every 5 minutes, or until a condition is met) — the difference from a hook is that a loop keeps going; a hook just responds to one event
  - `/help` to view all commands; `/skills` to view all loaded skills
- **Git cheat sheet** *(reference: `handouts/git_cheat_sheet.md`)*
  - Walk through the four-place mental model: Working Directory → Staging → Local Repo → Remote
  - Cover the core commands: `git status`, `git add .`, `git commit -m`, `git push`, `git pull`
  - `git add .` vs. specific files — when each makes sense; `.gitignore` is what makes `git add .` safe
  - `git commit -am` shortcut — what it does and the one catch (new files still need `git add` first)
  - Using the CLI for basic operations saves tokens vs. asking Claude
  - Pull from the public repo now to get session 2 files
- **Move `CLAUDE.md` to your project root:** Claude Code reads `CLAUDE.md` automatically only from the root of your project — if it's inside `participant_starter/`, Claude won't see it. Move it now if you haven't already:
  ```
  # from the repo root
  mv participant_starter/CLAUDE.md ./CLAUDE.md
  ```
- **Folder structure — why it looks different from a developer's:**
  - The starter structure is intentionally planning-first because participants are in Phase 1 (Define) — `docs/`, `prompts/`, `workflows/` dominate, and that's correct
  - When building starts in Phase 2, code directories (`src/`, `data/`, `.env`) get added alongside the planning folders
  - The principles that hold at any phase: nothing gets dumped at the root, every folder has a clear purpose, and the structure is also for Claude's orientation — it navigates the project via `CLAUDE.md`
  - Structure follows the project, not the other way around — a Python project looks different from a Node project; both are fine
- `**.gitignore`:** review what's excluded; ask Claude if any file types are missing for your specific project type
- **IDE context:** Cursor agent mode vs. Claude Code as agent in Cursor; Cursor vs. VS Code
- **Wrapping up a session:** use `/wrap-up` — Claude reviews the conversation and suggests entries for `docs/reports/session_log.md` and `docs/reports/decisions.md`, then prompts you to commit and push

### Share Ideas and Experience (30 min)

- **Check-in:** Has everyone landed on a project idea? Any questions or second thoughts?
- Each participant pulls up their `docs/problem_definition.md`, `docs/reports/session_log.md`, and `docs/reports/decisions.md` 
- **Discussion prompts:**
  - What surprised you during the ideation workflow?
  - What assumptions did you have to revisit or challenge?
  - Did Claude try to move too fast? Did you push back or ask more questions?
  - What tradeoffs did you consider when deciding on a design solution direction?
  - What decisions did you make about AI autonomy — what will AI handle vs. what does the human control?
  - Did you think about how that autonomy might evolve as the project matures?

### Technical Requirements and Tech Stack Setup (~40 min)

**Project requirements — every project must include:**

1. **LLM integration** — Claude API as the reasoning engine (not just as a build tool)
2. **Data source or stream** — at least one external source the system connects to and leverages
3. **Persistence layer** — somewhere to store outputs, user interactions, and feedback over time
4. **User return loop** — a reason to come back, and something different each time
5. **Closed-loop feedback** — interactions or data flow back in and improve or personalize the system over time
6. **MCP or external API** — at least one service the system connects to beyond the LLM
7. **UI + live URL** — a deployed frontend accessible via a real URL
8. **Secrets management** — API keys in `.env.local`, never committed to GitHub

Four of these are settled by the common stack (LLM, persistence, UI + live URL, secrets); participants map the remaining four — data source, return loop, closed-loop feedback, MCP/API — to their project in homework Part 1.

**Common tech stack:**


| Layer              | Tool                       | Purpose                                                            |
| ------------------ | -------------------------- | ------------------------------------------------------------------ |
| Frontend + backend | Next.js + TypeScript       | React UI + API routes in one codebase                              |
| UI components      | Tailwind + shadcn/ui       | Design-quality components, fast to build with                      |
| Database + storage | Supabase                   | Postgres, file storage, and pgvector (for RAG) in one free account |
| LLM                | Claude API (Anthropic SDK) | Called from Next.js API routes                                     |
| Deployment         | Vercel                     | One-click deploy from GitHub; live URL on every push               |
| Secrets            | `.env.local`               | Vercel manages in production                                       |


Each participant chooses their own MCP and external API based on what their system needs. If a project requires long-running background jobs or real-time connections (WebSockets), Railway is the upgrade path — but most prototypes won't need it.

**Common-stack setup checklist** *(the locked pieces — project-specific accounts/keys come later, mid-homework Part 3):*

- Node.js installed (`node -v` to verify)
- Anthropic API key (console.anthropic.com)
- Supabase account created (supabase.com)
- Vercel account connected to GitHub (vercel.com)
- `.env.local` file created at project root with API keys

## Artifacts Produced

- `CLAUDE.md` — updated with project goals, tech stack, and key decisions
- `.env.local` — created at project root with API keys (not committed)

## Homework

*See `homework.md` for full details — five parts*

- **Map your project to the 8 requirements** — four are settled by the common tech stack (LLM, persistence, UI + live URL, secrets); build a mapping table with Claude for the other four, being concrete about the easily-vague ones (data source, return loop, MCP/API connection, feedback), keeping external connections to one or two, and treating those connection choices as a first draft the experiment may change
- **Install the common stack** — Node, Anthropic key, Supabase, Vercel, `.env.local`; finish anything not completed in session (project-specific accounts/keys come later, in Part 3)
- **Run the `evaluation_dataset` workflow** — your first build: run the chat experiment (Rung 1), prioritize quality risks and design test cases, then set up just your confirmed project-specific connection (accounts/keys → `.env.local`, packages) before wiring up a minimal spike (Rung 2) connecting real data + one LLM call
- **Kick off user research recruitment** — `user_research` Steps 1–2 only; frame goals and send 2–3 outreach messages (the guide and interviews come after Session 3)
- **Update `CLAUDE.md`** — set Project Phase to Prototyping; add project goals, tech stack, and key decisions

