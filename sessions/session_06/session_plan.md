# Session 6: Evaluate for Scale + First Deployment

## Session Information

- **Duration:** 1.5 hours
- **Date:** [Date]
- **Facilitator:** [Name]
- **Source workflows:** `evaluating_for_scale` + `first_deployment` — assigned as homework
- **Format:** Debrief/share → technical demo → homework walkthrough
- **Session theme: the loops, at scale.** Both demos are loops the participants already built, getting bigger: LLM-as-judge is the **agent-validation loop** with a cheaper reviewer; deploying to real testers is the **closed-loop feedback** loop getting its first real data (and the honest test of the **user return loop**).

> **🗒️ Load note:** this session's homework is internally uneven — `evaluating_for_scale` is light and reflective; `first_deployment` is the heavy lift. This is the last session, so there's no next-session window to spill into — if a participant is behind, it's fine for deployment to take an extra day or two after the program ends; the eval part shouldn't slip.

## Learning Objectives

By the end of this session, participants will be able to:

- Share what Session 5's refinement changed — what the scored test run surfaced, and what the guidelines/guardrails and design pass did about it
- **Revisit the quality bar as a second measurement** — they hand-scored the POC in Session 5; now check whether the refinement moved the misses
- Try **LLM-as-judge** — delegate the critique they just did by hand to Claude, and calibrate how far to trust it by comparing its verdicts to their own Session 5 scores
- Reflect on **what breaks at 100×** — where quality slips, how they'd notice, and where cost/speed pressure shows up (including which **LLM calls** to trim)
- Scope and plan a **first deployment to 5–10 real testers** on the class stack (Vercel), sized for learning — including **wiring tester feedback into their closed-loop mechanism** and planting the return-loop honesty check (*did anyone come back unprompted?*)
- Run a **CLAUDE.md retrospective** across all six sessions and **complete their toolbelt** — extract the final cards for this session's moves (Evaluation and Improvement, Pilot With Users) plus a **Loops Audit** critique lens they can run on any AI product at work

## Prerequisites

- Session 5 complete
- Session 5 homework substantially done: refined POC with the design pass applied in `src/`; `docs/agent_behavior_design.md` (including the `scored_test_run`) and `docs/user_experience_design.md` complete; UI conventions recorded in `CLAUDE.md`
- `data/evaluations_data.csv` and `docs/evaluation_design_report.md` from S2/S3 on hand (the quality bar)
- Workflow cards from S5 in `workflows/cards/` (most of the toolbelt — Set the Context, Simplest Prototype, Prioritize by Risk, Behavior Design, Experience Design)

## Session Outline

### Opening (5 min)

> **🔄 Do this first — sync the latest course files.** The course content has been updated since last session. Before anything else, have everyone run their **course-sync skill** (built in Session 3) to pull the latest workflows, handouts, and homework into their project, and confirm everyone succeeds. *(Reminder: a freshly synced or edited skill won't load until they start a new session or `/clear` — Claude Code only discovers skills at startup.)*

> **🔄 Standing habit** — `/restart-dev-server` at the start of each new Claude Code session.

- Quick framing: *"You've built it and refined it. Now two questions: is it actually good, and would it hold up in front of real people? This week you scale the measuring you did last week, then deploy to a few testers."*
- Name the arc: define quality (S2–S3) → build (S4) → **measure & refine (S5)** → **scale the measuring (S6)**. And name the theme: both halves of this session are **loops you already built, at scale**.

### Debrief / Share — Session 5 Homework (~20 min)

> **Run this together — reflection as the share-out.** Same move as the last two sessions: homework reflections are shared live, here. Everyone runs the prompt, then shares their screen. Prompt participants can use:
>
> *"Read my `docs/agent_behavior_design.md` (especially the scored test run and the guidelines/guardrails), my `docs/user_experience_design.md`, and my `docs/reports/session_log.md` and `docs/reports/decisions.md` entries from this refinement week. Help me put together a short share-out for the group:*
>
> 1. *What my scored test run showed — where my system hit or missed my own quality bar, and what I changed in response.*
> 2. *One before/after I can show live: a screen after the design pass, or an output after a guardrail/validation check.*
> 3. *My homework reflection, tightened to a few bullets: what measuring against my rubric showed, how the design work went (and my hardest ownership call), and which of the four loops my project actually has — pull it from my session log if I saved it there; otherwise ask me the three questions now.*
>
> *Keep the whole thing short enough to talk through in two minutes."*

As people share, use these themes to open up the discussion:

1. **What the measurement changed** — did the misses land where you predicted? What did the guidelines/guardrails/validation check do about them?
2. **The design pass** — quick show-and-tell: does the main screen now match the design in your head? What did the visual reference get right or wrong?
3. **The hardest ownership call** — where did you have to choose between user control and system autonomy?
4. **The loops** — which of the four does your project actually have now? *(This share feeds Part 3 of this week's homework — they'll extract it as a card.)*

### Technical Demo (~30 min)

Live in Claude Code on a sample POC.

**A. Evaluate for scale — `evaluating_for_scale` (~15 min)** *(`@workflows/evaluating_for_scale.md`)*
- **Frame it: this is your agent-validation loop, scaled.** In S5 you added one cheap hand-check and hand-scored a few outputs. Checking by hand doesn't scale — so you delegate that same critique to a cheaper reviewer and learn how far to trust it.
- **Revisit the quality bar — the second measurement.** Pull the S5 scored test run from `agent_behavior_design.md`, re-run one missed case: did the refinement move it? Restate the bar in three plain levels (excellent / acceptable / failing). **Revisit, don't re-derive.**
- **LLM-as-judge** — hand Claude the rubric + two real anchors and have it judge **3–5 real outputs**, a verdict + one-line reason each. Calibrate against your own scores from last week: where it agrees, lean on it; where it disagrees, the *rubric* was usually vague — tighten it. *(Designer framing: delegating a design critique — and learning how precisely the criteria must be written before a delegate applies them the way you would.)*
- **Scaling reflection** — what breaks at 100×: where quality slips first, how you'd even notice, and where **cost/speed** bites. **This is where the LLM-call review lives** — which calls genuinely need an LLM vs. a template/rule, and the levers (cheaper model for easy cases, caching, batching) you'd reach for *if* you needed them. One bullet, don't expand.

**B. First deployment — `first_deployment` (~15 min)** *(`@workflows/first_deployment.md`)*
- **Frame it: your closed-loop feedback gets its first real data — and your return loop gets its honest test.** The testers *are* the feedback source.
- **Talk through, don't demo (Steps 1–3 — no time to run these live):**
  - Why deploy at all — your own testing hides your quality risk (you spot the hallucinations, you stay inside safe boundaries, you format inputs carefully). Strangers don't. Deployment shows you what your testing can't.
  - Scope a minimal deployment to 5–10 real testers — ruthless about scope. Named commitments, not "some people."
  - Wire the feedback loop before deploying — where does a tester's reaction (accept/edit/reject) actually land? If the closed-loop mechanism was never wired, close that gap now, even minimally. Plant the return-loop question: *did anyone come back unprompted?*
  - What must work without you present — ruthless minimalism; manual is fine for a pilot, just name what's staying manual.
- **Demo live on the sample POC (Step 4, and Step 5 parts 1–3 — stop before the checklist/known-limitations write-up):**
  - **Step 4 — map onto the class stack:** delivery mechanism, runtime check, data/access, integrations. The one gotcha to actually show: **keys in `.env.local` don't deploy** — every key must also be added in Vercel → Settings → Environment Variables (callback to S4's `api_keys_reference.md`). Show it live in the dashboard: Settings → Environment Variables, paste each key, redeploy. Keep it to that path — the CLI alternative is a footnote in the workflow for anyone who needs it, not something to demo.
  - **Step 5, parts 1–3 — draft the deployment specs:** deployment context summary, infrastructure specifications, access & monitoring. Stop there — the deployment checklist and known-limitations sections are left for participants to finish themselves in homework. When you demo the health check, just open the app and click through it — say why an automated check (like curl) can be misleading here. Also point out Vercel's two links: the permanent project link goes to testers, not the one-off link tied to that specific deploy.

### Homework Walkthrough + Q&A (~20 min)

- Walk through `homework.md` and field questions.
- Order: **`evaluating_for_scale` first** (light — second measurement, AI judge, 100× reflection), **then `first_deployment`** (the heavy lift — scope and ship to testers), **then the retrospective + final toolbelt cards** (Part 3). Name the imbalance honestly.
- **Point at the final toolbelt cards (~2 min).** In the debrief everyone just answered "which loops does my project have?" — that's a repeatable critique move. Homework Part 3 has them complete their toolbelt (built mostly in S5) by extracting the last few cards with the meta-prompt in `guides/workflow_cards.md` — this session's moves (Evaluation and Improvement, Pilot With Users) plus the **Loops Audit** critique card. Frame that last one: *"This one you'll use at work — in a design review, on a competitor teardown, on a PM's spec: does this AI product have a reason to return, a way to iterate, a way to catch itself being confidently wrong, and a way to get better with use?"*
- Flag Part 3's other half: the **CLAUDE.md retrospective** — six sessions of accumulated instructions; time to see what's reusable, what worked, and what needs cleaning out.

### Closing (≤5 min)

- Reminder to run `/wrap-up` at the end of the homework to log `session_log.md` + `decisions.md` — this is the final entry.
- **This is the last session of the program.** Name what they're leaving with: a deployed app, a full toolbelt, and an updated `CLAUDE.md`. Point at homework Part 4, `demoing_your_agent` — optional, self-paced, a leave-behind for whenever they're ready to actually show this project to someone (a hiring manager, coworkers, a portfolio site).

## Artifacts Produced (in homework)

- `docs/evaluating_for_scale_design.md` — the revisited quality bar (second measurement), the AI-judge calibration, the scaling reflection
- `docs/deployment_design.md` — testing reality check, deployment purpose, tester profile, scope, feedback wiring, independence requirements, stack mapping
- `docs/specs/deployment_specs.md` — implementation-ready deployment specs (the second and final spec of the course, alongside `poc_specs.md`)
- The deployed app at its Vercel URL, in front of 5–10 testers
- An updated, cleaned-up `CLAUDE.md` (the retrospective)
- The final **workflow cards** in `workflows/cards/` — Evaluation and Improvement, Pilot With Users, and a **Loops Audit** critique card — completing the toolbelt started in S5
- Optional: `docs/demo_plans.md` — a demo outline, whenever they run the Part 4 leave-behind

## Homework

See `homework.md`. Planned shape (~4.5–5.5 hrs): **Part 1** evaluate for scale (second measurement + AI judge + 100× reflection) → **Part 2** first deployment (wire feedback, map onto Vercel, ship to 5–10 testers) → **Part 3** CLAUDE.md retrospective + complete the toolbelt (extract the final cards: Evaluation and Improvement, Pilot With Users, Loops Audit) → **Part 4** (optional, not in the time total) prepare a demo with `demoing_your_agent`, a self-paced leave-behind for showing this project off later.
