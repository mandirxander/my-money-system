# Session 5: Refine the System + Design the Experience

## Session Information

- **Duration:** 1.5 hours
- **Date:** [Date]
- **Facilitator:** [Name]
- **Source workflows:** `agent_behavior` (live, lightened) + `user_experience` — assigned as homework
- **Format:** Debrief/share → technical demo → homework walkthrough

## Learning Objectives

By the end of this session, participants will be able to:

- Reflect on their Session 4 build and confirm their **project requirements** carried through — data source working, user return loop and closed-loop feedback at least first-passed
- Place their system on the **RAG → service → agent → agentic-system** spectrum *conceptually*
- Tell the **four loops** apart — user return, agentic, agent validation, closed-loop feedback
- Run **3–5 of their own S2/S3 test cases** against the running POC and score them against their own rubric — the first real measurement of the quality bar they set before building
- Write the system's **guidelines** (operating rules) and **guardrails** (runtime safety), plus a light **agent-validation check**, into the code *and* `CLAUDE.md` — responding to the misses the test run surfaced
- Design the real UX across four lenses (provide / see / control / approve), assign **ownership**, and add **AI-risk** checkpoints
- Apply a **typography ramp** and run a **design pass with a visual reference** (Figma frame export, sketch photo, or screenshot) so the main screen matches the design in their head
- Make points of ownership and AI risk **visible to the user in the UI**, run a **consistency review** across every screen, and record their **UI conventions** in `CLAUDE.md` so styling becomes standing context
- Recognize the `design.md` **pattern** they've been producing and when to write/update one
- Build most of their **toolbelt** — extract reusable workflow cards for the moves they've run so far (the S6 moves and a Loops Audit card wait for Session 6)



## Prerequisites

- Session 4 complete
- Session 4 homework substantially done: the **quality-risk core of the POC + a first UI built and running** in `src/` (Next.js + TypeScript, Tailwind + shadcn/ui, Supabase server-side, Claude API call working)
- `CLAUDE.md` updated with what was actually built
- `docs/agent_behavior_design.md` and `docs/user_experience_design.md` **not yet started** — they're produced in this week's homework



## Session Outline



### Opening (5 min)

**🔄 Do this first — sync the latest course files.** The course content has been updated since last session. Before anything else, have everyone run their **course-sync skill** (built in Session 3) to pull the latest workflows, handouts, and homework into their project, and confirm everyone succeeds. *(Reminder: a freshly synced or edited skill won't load until they start a new session or* `/clear` *— Claude Code only discovers skills at startup.)*

**🔄 Standing habit — restart your dev server each new Claude Code session.** Use the `/restart-dev-server` slash command everyone created in Session 4 each time you open a new Claude Code session (or run `/clear`) to keep working — the dev server doesn't carry over between sessions.

**⬆️ Optional — update the** `/restart-dev-server` **command if "my changes don't show up" is still biting you (~1 min).** We traced this to its root cause: file-change notifications don't cross the Windows/WSL filesystem boundary, so the dev server must *poll* for changes. Anyone still hitting it runs:

> *"Update my* `/restart-dev-server` *command to start the dev server with* `WATCHPACK_POLLING=true npm run dev` *— keep the variable exactly."*

Then run `/clear` **once** — that single restart picks up both the synced course files *and* the edited command — and run `/restart-dev-server`, so the dev server is up before the debrief (participants pull up their running POC there). From here on, changes should appear without restarting; the command remains the fix for orphaned-port snags and new-session starts.

- Quick framing: *"Last week you got it working. This week you make it leaner, safer, and genuinely usable — first give the system clear rules and limits, then design the experience on top."*
- Name the arc: *"You defined what good looks like in Sessions 2–3, and built in Session 4. This week you **measure the real thing against your own bar** for the first time, then refine what the measurement shows you. Next week you'll scale that measuring."* (Define → build → measure & refine → scale the measuring.)
- Note the shift: both of this week's workflows are **post-build refinements** — they read your real code in `src/` and apply changes directly, not specs "for later."



### Debrief / Share — Session 4 Homework (~20 min)

Each participant pulls up their **running POC** (`npm run dev`) and `src/`. This is a **group share and discussion** — surface what building taught them. Keep it moving.

> **Run this prompt together — reflection as the share-out.** Same move as Session 4's debrief: homework reflections aren't posted anywhere — they're shared live, here. Everyone runs the prompt, shares the response on screen, then demos their app. Prompt participants can use:
>
> *"Read my* `docs/specs/poc_specs.md`*,* `docs/implementation_design.md`*, and my* `docs/reports/session_log.md` *and* `docs/reports/decisions.md` *entries from this build week. Help me put together a short share-out for the group:*
>
> 1. *One or two sentences on what my POC does now — which capabilities of the quality-risk core work end-to-end.*
> 2. *One slice I can walk live (UI → server → Supabase/Claude → screen).*
> 3. *What I changed from the initial build — and whether I worked with any shadcn components or a visual reference along the way.*
> 4. *My homework reflection, tightened to a few bullets: how building changed my design, how my riskiest slice actually performed, and what's still rough — pull it from my session log if I saved it there; otherwise ask me the three questions now.*
>
> *Keep the whole thing short enough to talk through in two to three minutes."*

As people share, use these themes to open up the discussion — let the prompt's output be the jumping-off point, not a script to read:

1. **What you built** — Which capabilities of the quality-risk core got working end-to-end? Walk one slice (UI → server → Supabase/Claude → screen).
2. **What changed from the initial build** — What did you rework after the first pass? Did you work with any shadcn components, or try a visual reference?
3. **What held / broke / surprised** — Where did the build go sideways? What did Claude Code do well or badly?
4. **Where the quality risk shows up now** — Now that it runs, is the primary quality risk where you expected, or somewhere new?

**Requirements carry-through check (~5 min).** Have everyone open their Requirements Mapping in `docs/problem_definition.md` and check their project-specific requirements against the actual build:

- **Data source** — is it connected and **working as intended** (real data flowing in, not stubbed)? *(Your MCP/external-API requirement folds in here — that's the connection.)*
- **User return loop** — is it **implemented at least as a first pass** (a reason to come back actually wired in), or still just planned?
- **Closed-loop feedback** — is feedback being **captured and fed back at least as a first pass**, or not yet? *(This is the same idea as memory — feedback that's stored and fed forward.)*

The point is to catch any requirement that quietly got dropped during the build, while there's still time to fold it in. Note gaps to address in this week's homework.



### Technical Demo (~30 min)

Live in Claude Code on a sample POC.

**A. Primer with examples — measuring quality + shaping behavior (~12 min)** *(concepts from* `@workflows/agent_behavior.md`*; the homework walks the full workflow on their own POC)*

This is a **primer with examples**, not a full live walkthrough — the homework leads participants through the whole `agent_behavior` workflow themselves. Here we just make the two hardest ideas concrete on the sample POC.

- **Evaluations — with an example.** What "measuring against your bar" actually means: pull one test case from `data/evaluations_data.csv`, run it through the sample POC, and score the output against the rubric from `evaluation_design_report.md`. Put one concrete **miss** on screen and name *why* it misses. *(Designer framing: critique against criteria you set before designing — a move you already own, applied to an AI system.)*
- **Guidelines & guardrails — with examples.** Two kinds of rule, each shown concretely:
  - a **guideline** — an operating rule, e.g. *"when unsure, ask rather than guess,"* written into the system prompt;
  - a **guardrail** — a runtime limit, e.g. max iterations, or what happens when a tool call fails, written into the code.
  Surface both in `CLAUDE.md`, and point back at the eval miss: *this* is what they respond to. **Non-happy-path lives here.** Then add one cheap **agent-validation check** — something that catches the system being *confidently wrong* on its riskiest output (a self-review pass, a rule, a visible "unsure" signal, or a human sign-off).
- **Note — where your system sits (ties into the above).** A quick framing, not a build step: **RAG+LLM** (retrieve & ground) → **service** (one straight-through path) → **agent** (reasons, acts, iterates) → **agentic system** (multiple coordinated agents). Most class POCs are a service or a light agent — **that's fine; don't add agentic complexity to "qualify."** This just names *what kind of behavior* your guidelines and guardrails are shaping. *(reference: S1 handout* `sessions/session_01/handouts/rag_vs_agents_reference.md`*)*

**B. Design + polish the experience —** `user_experience` **(~13 min)** *(*`@workflows/user_experience.md`*)*

- **The four lenses** — what the user **provides / sees / controls / approves**, grounded in the running POC. *(Designer framing: an interaction-design checklist you can run on any AI feature at work.)*
- **Ownership** — user-owned / agent-owned / co-authored, so user edits don't vanish and the system doesn't overwrite intent. *(Designer framing: the core new interaction-design decision AI introduces.)*
- **AI-risk checkpoints** — hallucination, stochasticity, context loss, instruction-following, overconfidence: where each shows up and how the user catches it. Pair with the guardrails + validation check from Part A. *(Designer framing: the failure modes you design* for *in any AI product.)*
- **Make it match your design (demo, ~4 min).** *(reference:* `guides/shadcn_design_system_guide.md`*)* Two moves from the guide:
  1. **Apply the typography ramp live** — paste the guide's snippet verbatim, same discipline as the S4 theme command. Restart the dev server; show headings/body stepping down consistently. *(Worth naming: shadcn styles the text inside its own components — your page's own `<h1>`/`<h2>`/`<p>` are bare HTML, so this ramp is the piece that gives them a shared hierarchy. That's the one bit of type you define yourself.)*
  2. **Design pass with a visual reference** — show the guide's "From your design to the screen" prompt on one screen, with a sample reference image ready (`@`-referenced from the project, no plugins). Emphasize: the lenses decided *what's on the screen*; the reference decides *how it looks*. This is the designer→AI handoff pattern itself.
- **Make points of ownership and AI risk visible in the UI (demo this, ~2 min).** Take the riskiest output you just flagged a moment ago — say, a draft summary the agent writes. Right now nothing on screen tells the user "this might be wrong, check it before it's used." Add that: a small label above the text like *"AI-drafted, please review"*, plus a button so the user can approve it or edit it first. Live prompt: *"This is the output we just flagged as needing user review. Add a small 'AI-drafted, please review' label above it, and a shadcn* `Button` *so the user can approve it — make the text editable first."* Run it, show the result.
- **Do a review pass for consistency (name it, don't demo it)** — make sure every screen is visually consistent (same colors, styles, components, and now the same type ramp), not just the one main screen from S4. Still optional: you can screenshot each other screen, put it next to your main screen, and ask Claude to fix anything that doesn't match — or just eyeball it and ask Claude directly. No time to run that across every screen live — tell participants to do it themselves in homework.
- **Record your UI conventions (name it, don't demo it)** — once theme/ramp/components settle, participants write a short "UI Conventions" section into their `CLAUDE.md` themselves or have Claude write it from the real code (the guide has the template + prompt). That's why future UI prompts stay consistent without re-explaining styling.

**Go over together — the four loops** *(handout:* `handouts/the_four_loops.md`*)* — read through and discuss the four loops as a group: user return, agentic, agent validation, closed-loop feedback. Which does the sample POC have? Which does each participant's? (Ties back to the agent-validation check in Part A.)

**Go over together — design docs vs. specs** *(handout:* `handouts/design_docs_explained.md`*)* — participants have now produced several `*_design.md` files (`implementation_design.md`, and this week `agent_behavior_design.md`, `user_experience_design.md`). Discuss the pattern: what a design doc is for vs. a spec, and when to write or update one.

### Homework Walkthrough + Q&A (~20 min)

- Walk through `homework.md` and field questions.
- Emphasize the order: `agent_behavior` **first** (ground the system + give it guidelines/guardrails/a validation check), **then** `user_experience` (design + polish the experience on top). Both are **post-build and applied to** `src/`.
- **Demo the workflow card (~3 min).** Point out that picking your riskiest slice first back in Session 4 used a repeatable move — **Prioritize by Risk**. Show turning *one* step into a reusable **workflow card** live: run the extraction meta-prompt from `participant_starter/guides/workflow_cards.md` on that step, and save the card to `workflows/cards/`. Frame it: *"Every workflow you've run is a play you can reuse — on this project or at your job. Homework Part 3 has you build your toolbelt: extract cards for all the moves you've run so far as a batch. Session 6 adds the last few, once you've done the work they come from."* Point them at `workflow_toolbelt_map.md` for the full list of moves and their card names.
- Remind anyone with a **requirements gap** from the debrief to close it (first-pass return loop or closed-loop feedback) as they go.
- Point them at the handouts: `the_four_loops.md` and `design_docs_explained.md`.
- **Skills aside (~1 min).** They already built one skill (course-sync) in Session 3 — remind them they can run `/skills` anytime to see every skill available in their project, and that there's a **Claude skill for *creating* skills** (a guided way to build their own). The homework's Extra Resources links a walkthrough for anyone who wants to go further.



### Closing (≤5 min)

- Reminder to run `/wrap-up` at the end of the homework to log `session_log.md` + `decisions.md`.
- Preview Session 6: evaluate your POC for scale (what good looks like, AI-as-judge, what breaks at 100× — including trimming/cost of LLM calls) and plan a **first deployment** to a few real testers.



## Artifacts Produced (in homework)

- `docs/agent_behavior_design.md` — build reality check + scored run of 3–5 of their own test cases, guidelines + guardrails + agent-validation check (with where they were applied)
- `docs/user_experience_design.md` — user needs across the four lenses, ownership rules, AI-risk checks, interaction flow, and the design-pass/visibility/consistency changes made
- Applied changes to `src/` and `CLAUDE.md`
- A set of reusable **workflow cards** in `workflows/cards/` — one for each move run through S5 (Set the Context, Simplest Prototype, Prioritize by Risk, Behavior Design, Experience Design), the bulk of their toolbelt



## Homework

See `homework.md`. Planned shape (~5.5–6.5 hrs): **Part 1** refine the system behavior, including scoring 3–5 of your own test cases against the running POC → **Part 2** design + polish the user experience (typography ramp, design pass with a visual reference, ownership/AI-risk cues, consistency review, record UI conventions) → **Part 3** build your toolbelt — extract workflow cards for the moves run so far (Set the Context, Simplest Prototype, Prioritize by Risk, Behavior Design, Experience Design) → **Part 4** update `CLAUDE.md` + reflection. Close any requirements gap (return loop / closed-loop feedback) flagged in the debrief.