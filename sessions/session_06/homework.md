# Session 6 Homework

This week you answer the two questions that matter at the end of a build: **is it actually good, and does it hold up in front of real people?** Both parts are loops you already built, at scale — Part 1 scales your validation loop (you hand-scored outputs last week; now you delegate that critique to an AI judge and calibrate it), and Part 2 gives your closed-loop feedback its first real data by putting the app in front of 5–10 real testers. Part 3 closes the program's toolbelt thread: a CLAUDE.md retrospective and the final cards that complete your toolbelt. **This is the last session of the program** — Part 4 is an optional leave-behind for whenever you want to actually show this project to someone.

**Suggested order:** Part 1 (evaluate for scale — light) → Part 2 (first deployment — the heavy lift) → Part 3 (retrospective + card). Total ~**4.5–5.5 hrs**. *(If time is tight: don't let Part 1 slip — it's short and sharpens everything else. It's fine to take an extra day or two on deployment if you need it — there's no next session to catch up before.)*

| Part | Est. time |
| ---- | --------- |
| Part 1 — Evaluate for scale (`evaluating_for_scale`) | ~1–1.5 hrs |
| Part 2 — First deployment (`first_deployment`) | ~2.5–3 hrs |
| Part 3 — CLAUDE.md retrospective + complete your toolbelt | ~45–60 min |
| Part 4 — Prepare your demo (`demoing_your_agent`) — *optional, not in the total above* | ~30–40 min, whenever you're ready |

> **🔄 Standing habit — restart your dev server each new Claude Code session.** Use the **`/restart-dev-server`** slash command you created in Session 4 every time you open a new Claude Code session (or run `/clear`).

---

## Part 1: Evaluate for Scale

Open `@workflows/evaluating_for_scale.md` and work through it with Claude. It's three steps, and it builds directly on last week's scored test run — **this is your second measurement, not a restart**:

1. **Revisit what "good" looks like** — pull forward your quality bar from Sessions 2–3 and your Session 5 scored test run, re-run a case that missed, and check whether your refinement moved it. Restate the bar in three plain levels: excellent / acceptable / failing.
2. **Try LLM-as-judge** — hand Claude your rubric and two real anchor examples, have it judge 3–5 real outputs, then compare its verdicts to your own scores from last week. Where it disagrees, tighten the rubric. This is your **agent-validation loop with a cheaper reviewer** — the skill is learning how far to trust the delegate.
3. **The 100× reflection** — where does quality slip first at real usage, how would you even notice, and where does cost/speed bite (including which LLM calls genuinely need an LLM)? A short, honest watch-now-vs-defer list — thinking, not building.

**Output:** `docs/evaluating_for_scale_design.md`.

---

## Part 2: First Deployment

Open `@workflows/first_deployment.md` and work through it with Claude. Five steps, ending with your app live at a real URL in front of real testers:

1. **Ground in learning goals** — why your own testing hides your quality risk, and what deployment will show you that testing can't.
2. **Testers, commitments, and the feedback loop** — 5–10 named people with real commitments (not "some people, probably"). Then **wire the feedback loop**: decide where a tester's reaction (accept/edit/reject) actually lands in the feedback mechanism you built — and if it was never wired, close that gap in `src/` now, even minimally. Plant the return-loop question for the test window: *did anyone come back unprompted?*
3. **What must work without you** — ruthless minimalism; manual is fine for a pilot, just name what's staying manual.
4. **Map onto the class stack** — your app deploys to **Vercel**; the workflow walks delivery, runtime, data/access (the Case A/B check from Session 4's Supabase handout), integrations, and the big gotcha: **keys in `.env.local` don't deploy** — every key must also be set in Vercel → Settings → Environment Variables. The workflow walks the exact clicks for this.
5. **Write the deployment specs and ship** — `docs/specs/deployment_specs.md` is your second (and final) implementation-ready spec, alongside `poc_specs.md`. Then deploy from it, open the live app yourself and try it like a tester would, and send testers the **permanent project link** — not the one-off link tied to that specific deploy, which stops working once you deploy again.

**Output:** `docs/deployment_design.md` + `docs/specs/deployment_specs.md` + your app live at its Vercel URL, with testers invited.

---

## Part 3: CLAUDE.md Retrospective + Complete Your Toolbelt

Two closing moves — both about what you take with you.

**1. The CLAUDE.md retrospective (~30–40 min).** Your `CLAUDE.md` has evolved across all six sessions. Step back and review it with Claude:

> *"Read my `CLAUDE.md` top to bottom and help me review it in three passes: (1) what's **reusable** — instructions I'd carry into my next project, on any topic; (2) what actually **worked** — rules that changed how you behaved, and I could tell; (3) what needs **cleaning up** — stale, contradictory, or unused instructions. Walk me through your read one pass at a time, then help me update the file."*

Make the updates. What survives this review is, in effect, your personal way of working with an AI collaborator — that's a takeaway no one else in your next project will have.

**2. Complete your toolbelt — extract the final cards (~15–20 min).** In Session 5 you built most of your toolbelt. Now add the last few, for the moves you ran this week — extract them as a batch with the meta-prompt in **`guides/workflow_cards.md`**, run on your own work from this session, and save them to `workflows/cards/`:

- **Evaluation and Improvement** (Part 1) — setting and defending a quality bar, then measuring against it
- **Pilot With Users** (Part 2) — putting it in front of real testers and learning from how they actually use it
- **Loops Audit** — a critique card from the debrief question "which of the four loops does my project have?" Its four questions: *Why would anyone return? Does it decide and iterate, or run straight through — and should it? Would I catch it being confidently wrong? Does it get better with use?*

That completes your toolbelt.

> The **Loops Audit** is the card most likely to follow you to work: it's a critique lens you can run on any AI product — in a design review, on a competitor teardown, on a PM's spec — without writing a line of code.

---

## Part 4: Prepare Your Demo (Optional — Encouraged)

There's no more class after this, but the project doesn't have to stop being useful the moment the program ends. Whenever you're ready to actually show this to someone — a hiring manager, coworkers, a portfolio site — open `@workflows/demoing_your_agent.md` and work through it with Claude. It's self-paced, one sitting, ~30–40 min:

1. **Pick who this is for and the one thing you want them to remember.**
2. **Pick a narrative arc** — two quick options, converge on one.
3. **Apply the 3-act structure** (Setup / Confrontation / Resolution) and list what you actually have to show — a recording, a screenshot, real numbers from your eval or deployment.
4. **Build the outline and script together** — what's on screen and what you'll say for each beat, kept to 5–8 minutes.

Keep `handouts/demo_prep_guide.md` open alongside it — a one-page reference for the 3-act structure and the "show, don't tell" principle, with a worked example.

**Output:** `docs/demo_plans.md` — an outline you can record from or present live.

---

## Reflection

After completing Parts 1–3, write a short reflection (a few sentences each) — this is the closing entry for your `session_log.md` across the whole program:

1. **What did the second measurement and the AI judge teach you?** Did your refinement move the misses — and where would you trust the judge vs. keep yourself in the loop?
2. **What did deploying force you to make real?** The feedback wiring, the env-var move, the manual pieces — and during the window: did any tester come back unprompted?
3. **Look at your updated CLAUDE.md and your full set of workflow cards.** What are you actually taking back to your work from this program?

Ask Claude to save your reflection to your `session_log.md`.
