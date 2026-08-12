# Deployment Design — My Money System

---

## testing_reality_check

- **Who tested:** Only the builder — no outside tester has ever opened the app.
- **How:** On localhost, across Claude Code sessions, using the builder's own real financial data (car loan $8,400, credit card $1,100, $3,200 paycheck, $1,200 rent).
- **What got tested:** All 8 CSV edge cases against `validateCsv`/`validateRows`; live check-in advice across good/stressed/crisis moods (Session 10, which surfaced and fixed the `tool_choice` bug — see `docs/reports/decisions.md`, 2026-08-12); a full end-to-end Playwright pass in Session 8.
- **What didn't get tested:** Anyone else's data — different debt counts, unfamiliar budget structures, different phrasing habits; any device or network besides the builder's own; and the mood-acknowledgment inconsistency just found in `evaluating_for_scale` Step 2 was only caught because the builder deliberately re-ran identical input side-by-side — a real tester wouldn't do that, they'd just see one output and either trust it or not.

## deployment_purpose

My quality risk is check-in advice reliability and content quality — specifically the mood-acknowledgment consistency gap and general conciseness/groundedness. Testing so far hasn't exposed how often that gap (or anything like it) actually shows up in real use, because I only test with my own data, formatted the way I already know works, and I deliberately re-run identical inputs to go looking for inconsistency — a real user never does that; they see one output, once. Deployment will help by putting real varied financial data and real, unrehearsed phrasing in front of the system, and giving me a signal — via tester reactions — of whether output quality actually bothers someone in practice, not just in a side-by-side comparison only I would run.

---
