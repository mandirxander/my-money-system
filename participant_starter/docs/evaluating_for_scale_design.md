# Evaluating for Scale — My Money System

---

## what_good_looks_like

**Quality risk, revisited:** The original top risk (Risk 2 — CSV formatting) is now closed by construction: every input path (debt, investments, budget) is fully deterministic, zero LLM involvement, since Session 8 removed conversational debt parsing. The live risk has moved entirely to the one remaining LLM call — check-in advice generation — which covers both the original Risk 3 (verbosity/cognitive load at emotional stress) and a reliability dimension the original criteria never named: does the call return usable output at all.

**Did the Session 5 miss move?** Yes — `CSV_COLUMNS_MISSING_PAID` now correctly blocks with `"Missing required column(s): Paid."`, confirmed on a live re-run against `validateCsv.ts`.

**A new failure mode surfaced today, not on the original list, and already fixed:** Live-testing the check-in against real saved data to pull anchor examples found `tool_choice: auto` letting Claude skip the structured-output tool on roughly 60% of "good"-mood runs, producing a generic 500 (`"Could not generate check-in. Try again."`). "Stressed" mood succeeded 3/3 in the same test; "good" failed 2/3. Forced tool_choice (`{ type: 'tool', name: 'deliver_checkin' }`) closed it — verified 5/5 on a live re-test. See `docs/reports/decisions.md`, 2026-08-12, and `docs/agent_behavior_design.md`'s `applied_changes` table.

**The bar, in three plain levels** (for check-in advice content, now that availability is no longer the open question):
- **Excellent** — acknowledges mood first when stressed/crisis, states real figures from the data on file (not generic), gives one clear actionable focus, stays to 2–3 tight sentences per field.
- **Acceptable** — correct and mood-appropriate but a little generic or slightly over length; still usable, not what I'd hold up as the standard.
- **Failing** — the Session 3 pattern: a wall of text, no mood acknowledgment, generic advice disconnected from the real numbers. The exact failure mode the original prompt-length constraint was built to prevent.

**Two anchors:**
- *Excellent* (real, live output, crisis mood, 2026-08-12): *"First — take a breath. You're in a hard moment, but you showed up for this check-in, and that matters. Your paycheck of $3,200 covers your $1,200 rent with room to work with, but we're missing actuals, so we can't yet confirm how the month really landed — tracking those real numbers this week is critical."* Followed by a debt section naming the real snowball order ($1,100 credit card, then $8,400 car loan) and one focused recommendation. Acknowledges the mood first, cites real figures, stays tight — exactly the standard.
- *Failing* (constructed — no verbatim transcript was saved from the Session 3 Claude.ai testing that first found this pattern): a multi-paragraph response that opens with a generic disclaimer, walks through every Baby Step in turn regardless of relevance, and buries the one actionable recommendation in the fourth paragraph — the "wall of text" pattern Session 3's `chat_experiment_results` described, with no mood acknowledgment and no reference to the real debt/budget figures on file.

---

## ai_judge_check

**Rubric handed to the judge:** the three-level bar above (excellent / acceptable / failing) plus the two anchor examples, applied to 5 real check-in outputs pulled live from the running app (real saved debt/budget data, Baby Step 2) — including a repeat of the same "stressed" mood input to test consistency.

| # | Mood | Output (trimmed) | Judge verdict | Reason |
|---|------|---|---|---|
| 1 | good | "Great news — your rent is planned at $1,200 against a $3,200 paycheck..." | Excellent | Cites real figures, one clear focus, tight, tone matches "good" mood without over-acknowledging a non-issue |
| 2 | stressed | "First, take a breath — feeling stressed about money is completely normal..." | Excellent | Acknowledges mood first, real figures, tight, actionable |
| 3 | stressed | "First — take a breath. Feeling stressed about money is completely normal..." | Excellent | Same shape as #2 — acknowledges mood, grounded, tight |
| 4 | crisis | "First — take a breath. You're in a hard moment, but you showed up..." | Excellent | Strongest emotional acknowledgment of the set, real figures, actionable |
| 5 | stressed | "It looks like actuals haven't come in yet for this period, so we're working from your plan..." | Acceptable, not Excellent | Accurate and tight, but skips the mood acknowledgment entirely — jumps straight to budget analysis despite "stressed" mood |

**Judge vs. own scoring:** Scored the same 5 outputs independently before running the judge pass — matched on all five, including flagging #5 the same way. Full agreement here suggests the rubric is precise enough to delegate first-pass screening.

**What the agreement surfaced, not just calibrated:** #5 is the same mood input as #2/#3, word-for-word "stressed," and it's the one run that dropped the "take a breath" opening entirely. Not a rubric-wording problem — the rubric was clear and the judge (and I) agreed on the verdict. It's a real, reproducible content-consistency gap: on identical mood input, the model sometimes skips the required emotional acknowledgment. This is Session 3's Risk 7 (wording sensitivity) showing up live in the one remaining LLM call. **Flagged for Step 3's scaling reflection, not fixed here** — a system-prompt tweak (e.g. making mood acknowledgment a required field in the tool schema rather than an instruction) is the likely fix, but deferred pending the 100× reflection on where this actually matters most.

**Where to trust the judge vs. keep myself in the loop:** Full agreement on all 5 suggests I'd trust an automated judge for first-pass screening — flagging anything that skips mood acknowledgment or runs long. I'd still want my own eyes on borderline Acceptable-vs-Failing calls, and on anything the judge flags as inconsistent across repeated identical input (like #5) — that's a signal worth a human look, not just a score.

---
