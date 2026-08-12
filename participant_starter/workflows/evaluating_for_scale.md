# Evaluating for Scale Workflow — Complete Reference

**ID:** evaluating_for_scale
**Description:** Now that your POC is built, take a clear-eyed look at its quality: define what "good" actually looks like, try having AI check AI's work, and think through what would happen if a lot of people used it. This is reflection and a light hands-on check — not a system to build.

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the evaluating for scale workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete", let the participant know the workflow is complete, and remind them to update `docs/reports/session_log.md` and `docs/reports/decisions.md`

- Keep tone collaborative and plain — this audience are non-expert builders. Define any term you introduce.
- This is a **post-build** workflow: the POC already exists and produces real outputs. Work from those real outputs, not hypotheticals.
- Engage as a thought partner, one thought at a time. Don't prescribe evaluation frameworks.
- **This is the second measurement, not the first.** The participant hand-scored 3–5 of their own test cases against the running POC in Session 5 (`agent_behavior` Step 1 — the `scored_test_run` section of `docs/agent_behavior_design.md`). Build on that baseline; don't restart from zero.
- **Reads from:** `docs/evaluation_design_report.md` and `data/evaluations_data.csv` (their Session 2/3 quality-risk work + scored test matrix), `docs/agent_behavior_design.md` (the Session 5 scored test run — their baseline), `docs/specs/poc_specs.md`, the built POC itself, and `CLAUDE.md`.

---

## Steps

### Step 1: Revisit what "good" looks like — now that it's built and refined

**Goal:** Pull forward the quality bar the participant *already* defined in `evaluation_dataset` and sharpen it against the POC's real output — **revisit, don't re-derive.**

They already did the core eval work in Session 2/3: named a primary **quality risk**, wrote **success criteria** for it, and ran a **test-case matrix** (`data/evaluations_data.csv`) that scored real spike output. That *is* their quality bar. And in Session 5 they **measured the real POC against it for the first time** (the scored test run in `docs/agent_behavior_design.md`), then wrote guidelines and guardrails in response. This step is the **second measurement**: has the bar moved now that the system's been refined?

**Conversation flow:**

1. **Pull forward what they already have.** Read their primary quality risk + success criteria from `docs/evaluation_design_report.md`, the scored examples in `data/evaluations_data.csv`, **and the Session 5 scored test run in `docs/agent_behavior_design.md`** — summarize their existing quality bar and last week's results back to them in a couple of sentences. (If something's missing because they skipped ahead, *then* fill the gap — but assume it's there.)

2. **Check what the build — and the refinement — changed.** Ask: "Last week's test run showed misses at [X], and you added guidelines/guardrails in response. Re-run one of those missed cases now — did the refinement move it? And is the primary quality risk still the right one to worry about, or did building and refining surface a failure mode your Session 2 criteria didn't name?" Update the risk/criteria **only where things genuinely changed.**

3. **Restate the bar in three plain levels.** Translate their (possibly updated) success criteria into three plain levels for the one output that matters most — no new scoring scale, just plain language:
   - **Excellent** — exactly what I'd want to ship.
   - **Acceptable** — not perfect, but I'd let it through.
   - **Failing** — the bad outcome my quality risk warned about.
   If their `evaluations_data.csv` ratings already imply these, just make them explicit.

4. **Reuse real outputs as anchors.** Carry over one **clearly good** and one **clearly bad** example straight from their existing test runs (`evaluations_data.csv` or the Session 5 run — only generate a fresh one from the built POC if neither has a good fit). These two anchor the bar for Step 2.

Keep it to the **single most important output**, and **reuse before you rewrite** — the goal is a sharper version of the bar they already built, not a redo of their earlier eval work.

**Deliver:** Save to `docs/evaluating_for_scale_design.md` with section:
- `what_good_looks_like` (quality risk + criteria, revisited and updated only where the build/refinement changed them; whether the Session 5 misses moved after the guardrails; the excellent / acceptable / failing levels; two real anchor examples with a sentence on why each lands where it does)

**User Context:**
- Provides: their judgment on whether the build and refinement changed the quality bar, and which real outputs anchor it
- Receives: a sharpened, current quality bar that reuses their existing eval work rather than redoing it

**Confirm before continuing:** "Does this still match what you'd accept or reject — and did the refinement week move anything?"

---

### Step 2: Try having AI check AI's work (LLM-as-judge — the idea, hands-on but light)

**Goal:** Introduce the concept that you can use Claude to evaluate your system's output at a scale you couldn't by hand — and see how far to trust it.

This is the one genuinely new idea in this workflow. They don't build an evaluation system — they **try the concept** on a handful of real outputs and see what they learn.

**Conversation flow:**

1. **Explain the idea in one breath — it's a loop they already built.** In Session 5 they added an **agent-validation check** and hand-scored outputs against their own rubric — a human-powered validation loop. Checking every output by hand doesn't scale. LLM-as-judge is **that same loop with a cheaper reviewer**: hand Claude the rubric from Step 1 and ask it to score new outputs the same way, so a machine does the first pass and you spot-check. Using AI to evaluate AI — delegating a critique you already know how to do yourself.

2. **Do a tiny live run.** Take the excellent/acceptable/failing rubric and the two anchor examples from Step 1, and have Claude judge **3–5 real outputs** from their POC against that bar — a short verdict and one-line reason for each. No code, no JSON, no pipeline — just Claude reading the rubric and giving its read. Include at least one case they scored themselves in Session 5, so there's a direct comparison.

3. **Calibrate — where does the judge agree with you?** Compare Claude's verdicts against their own judgment — including their own Session 5 scores where the same cases overlap. Where Claude's verdict matches theirs, the judge is trustworthy enough to lean on. Where it **disagrees**, that's the interesting part: usually the *rubric* was vague, not Claude being wrong. Tighten the rubric wording and note it.

4. **Name the takeaway.** They now know whether — and how much — they could trust an automated quality check, and what they'd still want a human eye on. That's the real deliverable, not a built judge. *(Designer framing: this is delegating a design critique — and learning how precisely you have to write the criteria before a delegate applies them the way you would.)*

**Deliver:** Append to `docs/evaluating_for_scale_design.md` with section:
- `ai_judge_check` (the rubric prompt they handed Claude, the 3–5 outputs with Claude's verdict vs. their own, and what they learned about where to trust it / what to keep a human on)

**User Context:**
- Provides: their own judgment to calibrate against
- Receives: a felt sense of how far automated evaluation can be trusted for their system

**Confirm before continuing:** "Do you have a sense of where you'd trust an AI judge and where you'd keep yourself in the loop?"

---

### Step 3: What breaks at 100×? (the scaling reflection)

**Goal:** Get them thinking about quality and cost under real usage — without building anything for it.

Their POC works for them, a few times. The point of this step is to think one honest step ahead: *if a lot of people used this tomorrow, where would it strain first?*

**Conversation flow — talk through these, capture the answers:**

1. **Where does quality slip first?** At 100× the usage, which kind of input or edge case would start producing the *failing* output from Step 1? What haven't they seen yet because they've only tested on themselves?

2. **How would you even know?** Right now they catch bad output by looking. At scale they can't watch every one. What few signals would tell them quality had dropped — complaints, a metric, a spot-check routine, the AI-judge from Step 2 running on a sample?

3. **What gets expensive or slow?** More users means more Claude API calls and more database reads/writes. Where's the cost or speed pressure — and is there an obvious lever (cheaper model for easy cases, caching, batching) they'd reach for *if* they needed it? (Reach for, not build now.)

4. **What would you watch, and what would you defer?** Land on a short, honest list: the 1–2 things genuinely worth keeping an eye on, and the things that are real but **not now** (future-state-beyond-class).

This is a reflection. The value is the thinking, not a monitoring system.

**Deliver:** Append to `docs/evaluating_for_scale_design.md` with section:
- `scaling_reflection` (where quality slips first; how they'd notice; cost/speed pressure points + the lever they'd reach for; the short "watch now vs. defer" list)

**User Context:**
- Provides: honest judgment about their system's limits
- Receives: a clear-eyed picture of what scaling would demand, and what's safe to defer

**Confirm before continuing:** "Does this capture what you'd actually want to watch if this got real usage?"

---

## Workflow Complete

All steps are complete. You've got a concrete quality bar, a felt sense of how far to trust automated evaluation, and an honest read on what scaling would take. Update `docs/reports/session_log.md` with your reflection, add any key decisions and their reasoning to `docs/reports/decisions.md`, and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `evaluating_for_scale_design.md` | `docs/` | What good looks like (rubric + two real anchor examples, checked against the Session 5 baseline), the AI-judge calibration check, and the scaling reflection (quality/cost limits + watch-now-vs-defer) |
