# Agent Behavior Workflow — Complete Reference

**ID:** agent_behavior
**Description:** Refine the POC you built — ground in what's actually running, measure it against your own quality bar, then give your system clear operating guidelines and runtime guardrails

> **Note (restructure):** This workflow was lightened in the S5 rework. Two former steps moved to class/other sessions: **trimming LLM calls** (now a cost/refinement note in Session 6 with deployment) and the **agent-vs-service decision** (now a *conceptual* comparison taught in the Session 5 demo, using the S1 `rag_vs_agents_reference.md` handout — participants no longer run a classification step here). The agentic-loop vs. user-return-loop disambiguation now lives in the Session 5 loops handout. What remains is the part that needs to be *applied to the build*: ground in the real system, then write its guidelines and guardrails into the code + `CLAUDE.md`.

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the agent behavior workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete", let the participant know the workflow is complete, and remind them to update `docs/reports/session_log.md` and `docs/reports/decisions.md`

- Keep tone conversational and collaborative; explain why each refinement matters
- Use Socratic questioning — don't prescribe an architecture; help them reason to it
- **This is a post-build refinement of a POC that already exists.** Read their actual code in `src/`, not just their design docs. Changes here get applied directly to the build — they are not specced "for later."
- Plain language throughout. No field matrices, Mermaid flowcharts, Pydantic classes, or JSON schemas — the point is clear thinking, not formalism. When reading their code back to them, match their technical level from `docs/reports/participant_profile.md` — describe behavior and flow for non-technical participants, real terms for technical ones.
- Key principles: Reality over plan, Claude is the agent, Simple over clever, Quality risk is the lens
- Reads from: `docs/implementation_design.md`, `docs/specs/poc_specs.md`, `docs/evaluation_design_report.md`, `data/evaluations_data.csv`, `docs/problem_definition.md`, `docs/reports/participant_profile.md`, and the built code in `src/`

---

## Steps

### Step 1: Ground in what you built
**Goal:** Reality-check the POC as it actually exists now, measure it against the quality bar you set before building, and locate where the primary quality risk is showing up once it's running — not where you predicted it would

## Conversation Flow

You designed this in the implementation workflow and then built it. Things always shift between spec and code. This step looks at what's *actually* there.

### 1. Read the real thing

- The built code in `src/` — what the system actually does, end to end
- `docs/specs/poc_specs.md` and `docs/implementation_design.md` — what you set out to build, plus your carried-forward primary quality risk (`updated_quality_risk_focus`)
- `docs/evaluation_design_report.md` and `data/evaluations_data.csv` — your rubric and scored test cases from Sessions 2–3; you'll use them in the test run below

Summarize it back plainly: "Here's what your POC actually does right now: [main path]. The quality risk you were building around was [X]."

### 2. Compare build to plan

- "Is what you built the same shape as what you specced, or did it drift? What changed, and why?"
- "Now that it runs, where does [their quality risk] actually show up — same place you expected, or somewhere new?"

Note any deviation briefly. Don't re-litigate the design — just get an honest picture of the current system to refine from.

### 3. Measure it against your own quality bar

You defined what good looks like *before* you built — the rubric and scored test cases in `docs/evaluation_design_report.md` and `data/evaluations_data.csv`. Now that the system actually runs, use them for the first time on the real thing (~20–30 min, no tooling):

- Pick **3–5 test cases** from your evaluation set — include at least one you expect the system to struggle with.
- Run each through the real POC and score the output against your own rubric. Eyeball scoring is fine. (Use the running app, or have Claude call the same code path directly with the test input — whichever is faster; the point is the real system's output, not the button.)
- **No real inputs yet?** If your system takes inputs you don't have real samples of (camera frames, customer emails, uploaded documents), stand-ins are fine — a web or phone photo that matches the scenario, an email you write in the right shape. Stand-ins genuinely test the live system; just note in your scores that real-world input conditions (your actual camera, real senders' writing) stay untested until real data arrives.
- "Where did it hit the bar? Where did it miss — and do the misses land where you predicted the quality risk would show up, or somewhere new?"

This is design critique against criteria you set before designing — the same move as reviewing any design against its brief, applied to an AI system. Note the misses concretely: they're exactly what Step 2's guidelines, guardrails, and validation check should respond to.

**Deliver:** Save to `docs/agent_behavior_design.md` with sections:
- build_reality_check (what_it_actually_does, deviations_from_spec, where_quality_risk_shows_up)
- scored_test_run (which cases you ran, scores against the rubric, where it missed and why that matters)

**User Context:**
- Provides: An honest account of what they actually built and where it's rough
- Receives: A concise, accurate baseline of the running POC to refine against

**Confirm before continuing:** "Does this match the system you actually have running — and do the scored results square with where you thought the quality risk was?"

---

### Step 2: Define your agent's guidelines and guardrails
**Goal:** Give the system clear operating rules (guidelines) and runtime safety limits (guardrails) — then apply them to the build and document them so Claude Code respects them going forward

## This applies even to a simple "Claude is the agent" setup

Whether your system behaves more like an agent (it reasons and decides across a run) or more like a straight-through service, it still needs to know how to behave and where its limits are. Keep both in plain language — no diagrams or schemas.

- **Guidelines** = operating instructions / behavioral rules. *What should it do and not do?* Scope ("only handle X, don't touch Y"), how to handle uncertainty (say "I'm not sure" vs. guess), when to ask the user vs. act on its own.
- **Guardrails** = runtime safety. *What stops it going wrong?* Max iterations / no infinite loops, what happens when a tool or API call fails, and where a human checkpoint is required before it continues.

## Conversation Flow

### 1. Write the guidelines

- "In plain terms, what is this system allowed to do, and what should it never do?"
- "When it's unsure, should it ask you or make its best guess? When does it need your sign-off before acting?"
- Tie back to the quality risk — and start from the misses in your Step 1 test run: every observed failure should map to a guideline, a guardrail, or the validation check below.

### 2. Set the guardrails

- "If it loops or retries, what's the hard cap?" (max iterations — even '1' is a valid answer for a service)
- "When a tool or API call fails, what should happen — stop, retry once, fall back, tell the user?"
- "Where must a human approve before it continues?" (ties to the review points from implementation Step 2)
- This is where the **non-happy-path** lives: tool failures, bad input, the model going off-track. Name what should happen in each case.

### 3. Build in a check on the agent's own behavior (the agent validation loop)

A guardrail stops the system from running away; a **validation check** catches it doing the *wrong* thing while still looking fine. For the riskiest output, ask:
- "How would you know if the agent produced a confidently-wrong result? What would you (or the user) see?"
- "Is there a cheap check — a self-review pass, a rule, a visible signal, or a human sign-off — that would catch it?"
Add one lightweight check where the quality risk is highest. (This is one of the four loops — see the Session 5 loops handout.)

### 4. Apply and document — don't just spec it

Because this is a real POC, these are changes you make now, not notes for later:
- **Apply directly:** write the guidelines into the system prompt / agent instructions, and add the guardrails and the validation check in code (the iteration cap, the failure handling, the approval checkpoint).
- **Document:** surface the key operating rules and limits in the project's `CLAUDE.md`, so Claude Code respects them in every future edit.

Walk through the changes with the participant and make them in `src/` together. Then close the loop: **re-run the Step 1 test cases** against the updated system — a few minutes and a handful of API calls turns "we wrote rules" into "we watched the rules change behavior," and catches a rule that didn't land. (This define → measure → refine → measure-again rhythm is exactly what Session 6 scales up.)

**Deliver:**
1. Append to `docs/agent_behavior_design.md` with sections: guidelines, guardrails, validation_check, applied_changes (where each was written into `src/` and `CLAUDE.md`)
2. Apply the guidelines, guardrails, and validation check to the code in `src/` and add the key rules to `CLAUDE.md`

**User Context:**
- Provides: Their judgment on how the system should behave and where its limits are
- Receives: Guidelines, guardrails, and a behavior check written into the running system and documented for future work

**Confirm before continuing:** "Are these the right operating rules and safety limits, and are they now in your code and CLAUDE.md?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection, add any key decisions and their reasoning to `docs/reports/decisions.md`, and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `agent_behavior_design.md` | `docs/` | Build reality check + a scored run of 3–5 of your own test cases, and the agent's guidelines, guardrails, and behavior-validation check with where they were applied in `src/` and `CLAUDE.md` |
