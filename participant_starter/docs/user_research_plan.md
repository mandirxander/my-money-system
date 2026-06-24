# User Research Plan — My Money System

---

## quality_risk_focus_for_user_research

**current_quality_risk:**
Any data input — CSV upload or conversational hand-fed data — may not be validated consistently, and silent failures produce financial advice the user will act on.

This sharpens the original CSV formatting risk in two ways:
1. **Input path gap:** The spike only tested CSV uploads. A user who hand-feeds data (typing numbers, describing their budget conversationally) bypasses the CSV entirely — the existing validation logic doesn't cover that path.
2. **Non-determinism:** Spike testing revealed the LLM applies validation inconsistently on identical inputs (one run blocked a currency-symbol CSV, the next gave advice on it). The failure mode isn't just "bad format triggers error" — it's "same input, different outcome," which is unpredictable and worse in a financial context.

**why_user_validation:**
Building for myself — running an assumption-check instead of external interviews. Goal: surface the assumptions being made about what I need as a user, and identify which ones are riskiest going into the build.

---

## assumption_check

Six assumptions surfaced and stress-tested. Full findings in `docs/user_research_findings.md`.

| Assumption | Status |
|---|---|
| CSV as primary input | Partially valid — two paths: CSV (budget) + conversational (debt) |
| Users arrive stressed sometimes | Confirmed — frequency tracked via mood check over time |
| Both partners engage | Confirmed with caveat — solo works; per-user profiles flagged for V2 |
| Bi-weekly cadence | Confirmed — default for V1 |
| Baby Steps familiarity assumed | Confirmed — zero non-determinism on framework facts; onboarding resources in V2 |
| Visual progress as motivator | Design instinct, not validated — V2 exploration |
