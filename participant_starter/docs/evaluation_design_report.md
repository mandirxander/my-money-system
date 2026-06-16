# Evaluation Design Report — My Money System

---

## chat_experiment_results

**what_was_tested:**
- Ran Scenarios 1 (Major Setback Recovery) and 2 (New Long-Term Goal) from `prompts/testing_prompt.md` in Claude.ai
- Prompt: full check-in coach prompt with family context, Baby Steps framework, and structured response format
- Method: pasted prompt + scenario into a fresh Claude.ai conversation for each scenario

**what_failed:**
- Response length: AI generated very long, dense replies in every turn — walls of text that would overwhelm a user who is already emotionally stressed or time-constrained
- The medium fights the message: the system is meant to reduce cognitive load, but verbose responses add to it
- This is a user problem not fully accounted for in the original problem definition: **cognitive load at the point of emotional stress**

**what_worked:**
- Stayed closely grounded in the Baby Steps framework throughout — naturally reframed crisis situations in terms of which step the user is actually on
- Gave genuine perspective shift in hard situations (setback, short sale) — felt like a coach helping you find your footing, not a calculator giving generic advice
- Next steps were relevant and connected to the family's real situation, not boilerplate

**assumptions_revised:**
- Original assumption: conversational AI responses would feel natural and reduce friction
- Revised: response length must be explicitly constrained in the prompt — the AI's default verbosity actively undermines the check-in experience, especially in emotionally heavy scenarios

**flow_changes:**
- V1: Add explicit length and structure constraints to the check-in prompt (e.g. 3 short paragraphs max, tight format)
- V2: Explore voice output as an alternative to reading — flagged for future exploration, not in scope for V1

---

## prompt_testing_experience

**testing_scope:**
- Scenarios 1, 2, and 3 tested across two separate Claude.ai conversations
- Scenario 3 (Spending Drift) run in a fresh chat — produced different output format than Scenarios 1 and 2

**quality_observations:**
- **Response verbosity:** All scenarios produced walls of text by default — the AI's natural output length is too long for an emotionally stressed user
- **Output format inconsistency:** Scenario 3 in a fresh chat produced visual cards with badges rather than prose — noticeably different from the other scenarios. The card format was preferred but was not reliably reproduced
- **Emotional acknowledgment:** AI did recognize emotional difficulty before jumping to solutions — this worked as intended
- **Baby Steps grounding:** Consistently strong — the framework showed up naturally and helped reframe hard situations (e.g. short sale → which step are you actually on now?)
- **Actionability:** Next steps were relevant and specific to the family's situation, not generic

**edge_cases_discovered:**
- Vague or emotionally-driven input with no real data attached (e.g. "we've been spending too much, I don't know the numbers") — not yet tested; likely to produce generic responses without concrete data to work with
- Sensitivity calibration: no way to tune how much emotional weight the system gives to a situation — resolved for V1 as an explicit mood check before each check-in

## quality_dimensions

1. **Response length and structure** — output must be constrained to avoid cognitive overload; AI's default verbosity is a direct quality risk
2. **Output format consistency** — must produce the same structured format reliably across sessions; card vs. prose variance is not acceptable in a product
3. **Emotional calibration** — V1: explicit mood check before each check-in sets the tone; V2: inferred from input
4. **Baby Steps grounding** — working well; non-negotiable quality standard across all prompt iterations
5. **Actionability with sparse input** — must handle vague or data-light inputs without defaulting to generic advice; untested risk

---

## quality_risk_hypotheses

**input_variability_risks:**
- **Risk 2 — CSV formatting risk ⭐ TOP PRIORITY:** Budget uploads with inconsistent formatting, missing columns, or unexpected structures cause the system to misread the data and give advice based on a wrong picture of the family's finances. In personal finance, downstream advice built on bad data can lead to genuinely harmful decisions — wrong debt payoff order, inaccurate budget assessment, false sense of progress.

**output_quality_risks:**
- **Risk 3 — Verbosity risk:** Without explicit length constraints baked into the prompt, the system defaults to long responses that overwhelm emotionally stressed users. Observed directly in Rung 1. Makes check-ins feel like a chore rather than a relief.

**context_sensitivity_risks:**
- **Risk 6 — Stale Baby Steps risk:** After a major life event (short sale, job change, new debt), the system continues advising based on the user's previous step rather than recognizing a reset is needed. Feels out of touch and damages trust in the system as a coach.

**consistency_risks:**
- **Risk 7 — Wording sensitivity risk:** The same financial situation described differently across two check-ins (different phrasing, different level of detail) produces noticeably different advice. Undermines trust over time — a system that gives different answers to the same question doesn't feel reliable enough to act on.

**risk_impact_analysis:**
| Risk | Impact if frequent | Priority |
|---|---|---|
| CSV formatting (2) | Harmful — advice built on wrong data | Highest |
| Verbosity (3) | High — users stop engaging | High |
| Stale Baby Steps (6) | High — feels out of touch at critical moments | High |
| Wording sensitivity (7) | Medium — erodes trust gradually | Medium |

---

## priority_quality_risk

**risk_statement:** When a user uploads a budget CSV with unexpected formatting, missing columns, calculated rows, or multi-sheet structure, the system processes it without flagging the issue and generates financial advice based on an incorrect picture of the family's finances.

**prioritization_rationale:** Highest impact risk — silent failures produce harmful financial advice, not just a degraded experience. Likely to occur given the complexity of real Excel budget exports. Actionable through prompt validation and upload pre-processing. Directly relevant to the spike build.

**testing_approach:** Real-world sampling and variation — export actual Excel budget and create 8 variations targeting specific formatting edge cases.

**success_criteria:** System either parses the CSV correctly OR flags the problem clearly enough for the user to act on it. Silent failures (bad advice with no warning) are unacceptable.

---

## test_case_design_methodology

**chosen_generation_approach:** Real-World Sampling and Variation (Option 4) — test cases derived from the user's actual Excel budget export and its known quirks.

**test_case_framework:** 8 test cases targeting CSV formatting edge cases specific to this budget structure: pay period header row, calculated totals rows, multi-sheet exports, empty cells, currency formatting, blank separator rows, missing columns, and a well-formed baseline.

**target_scenarios:** All cases target Risk 2 (CSV formatting). Cases progress from baseline → structural quirks → data quirks → missing data.

**success_criteria_design:** Each case passes if the system either handles the variation correctly or surfaces a clear, actionable error. Fails if it silently produces advice from a misread file.

---

## learning_objectives

**learning_outcomes:**
- **How the risk manifests** — whether failures are silent (bad advice, no warning) or loud (error the user can act on)
- **When it occurs** — which specific CSV quirks trigger it: pay period header, calculated totals, empty cells, currency formatting, multi-sheet exports
- **How severe it is** — whether malformed CSVs produce slightly off or completely wrong advice; determines how hard to guard against each case
- **What to improve** — whether the fix lives in the prompt (instruct Claude to validate input), the upload handler (pre-process before Claude sees it), or both

---

## Evaluation Artifacts Generated

- `data/evaluations_data.csv` — 8 test cases ready to run against the spike, with pre-populated metadata and empty execution columns
- `docs/evaluation_design_report.md` — full evaluation design: experiment results, quality dimensions, risk hypotheses, prioritization, test cases, and learning objectives

## Next Steps After Evaluation

1. Export your actual Excel budget to CSV — this is your baseline (`CSV_BASELINE_WELLFORMED`)
2. Create the 7 variations listed in the matrix
3. Build the spike (Rung 2) — one CSV upload → one Claude API call → output
4. Run each test case against live output and fill in: actual_output, quality_rating (1–5), notes, patterns_observed, improvement_ideas
5. Look for the pattern: silent failure vs. surfaced error — that tells you where to build guardrails

---
