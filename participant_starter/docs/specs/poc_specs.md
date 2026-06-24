# POC Specs — My Money System

**Version:** First version — quality-risk core
**Stack:** Next.js + TypeScript, Tailwind + shadcn/ui, Supabase (server-side), Anthropic SDK, Vercel

---

## data_flow_specifications

**Input 1 — Budget CSV upload**
- User uploads CSV exported from Excel
- Parsed and validated server-side using rule-based code (not the LLM)
- Validation rules: required columns present, no empty rows, numeric fields are numeric, no unsupported characters in currency fields
- Validation result is deterministic — same input produces same result every run
- On failure: error surfaced to user with specific reason; user approves fix or re-uploads before proceeding
- On success: clean data passed to Claude API call

**Input 2 — Conversational debt entry**
- User types debt figures in natural language ("my car loan is $8,400, my credit card is $2,100")
- Parsed by Claude API with structured output (JSON) — amount and label extracted for each debt
- If input is unclear or incomplete, system prompts the user for the missing information before continuing
- Parsed figures saved to Supabase and used in the check-in

**State management**
- Baby Step: stored in Supabase at onboarding; never re-asked unless user triggers advancement
- Debt figures: stored in Supabase; updated each check-in
- Budget data: processed per check-in; not stored long-term in V1

**Output**
- Claude API call receives: Baby Step, clean budget data, current debt figures
- Response is structured (JSON) — budget status, debt progress, recommended focus
- Delivered on screen piece by piece: budget status → debt progress → what to focus on
- User can respond to each piece before the next surfaces

---

## integration_specifications

| Service | Purpose | Auth method |
|---|---|---|
| Anthropic SDK | Debt input parsing + check-in advice generation | `ANTHROPIC_API_KEY` in `.env.local` |
| Supabase | Store Baby Step + debt figures | `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`, server-side client only |

**No additional external connections in V1.** SendGrid deferred to V2.

**Supabase tables (minimum):**
- `user_profile`: `baby_step` (int), created/updated timestamps
- `debt_figures`: `label` (text), `amount` (numeric), `updated_at` (timestamp)

---

## quality_risk_testing_specifications

**Primary risk:** Inconsistent or silent validation failure on CSV or conversational input produces financial advice the user acts on.

**Determinism test (CSV validation):**
- Run the same CSV through validation 3+ times
- Result must be identical every run — no variation

**Test cases (reuse from `data/evaluations_data.csv`):**
| Case | Expected result |
|---|---|
| Well-formed CSV (baseline) | Passes validation, advice generated |
| Malformed structure | Blocked, specific error shown |
| Currency symbols in numeric fields | Blocked consistently (no variation) |
| Missing required columns | Blocked, column names called out |
| Empty rows | Blocked or stripped, not passed to LLM |

**Conversational debt input test cases (new):**
| Case | Expected result |
|---|---|
| Complete input ("car loan $8,400, credit card $2,100") | Parsed cleanly, saved, proceeds |
| Incomplete input ("I have a car loan") | System prompts for the amount |
| Ambiguous input ("some debt on my card") | System prompts for clarification |

**Success criteria:**
- CSV validation result is identical across all runs of the same input
- No bad data reaches the Claude API under any test case
- Advice is correctly scoped to the user's Baby Step in every run
- Missing or ambiguous debt input always triggers a prompt — never silently skips

---

## human_in_loop_requirements

| Moment | What happens |
|---|---|
| Onboarding | User selects their Baby Step (one time); saved to Supabase |
| CSV validation failure | Error shown with reason; user approves fix or re-uploads before advice runs |
| Missing data | System prompts user; waits for input before continuing |
| Advice delivery | Each piece shown sequentially; user can respond before next appears |
| Baby Step advancement | User-triggered; updates saved Baby Step in Supabase |

---

## success_criteria

"I can give it a budget CSV and debt figures entered conversationally, it produces Baby Step-scoped advice (budget status → debt progress → what to focus on), and I can see that validation ran consistently — bad data was caught every time, good data went through cleanly."

**Specifically:**
- Onboarding captures Baby Step and saves it
- CSV validation is deterministic — identical input, identical result, every time
- Conversational debt input is parsed correctly; incomplete input triggers a prompt
- A complete check-in runs end to end with clean data
- Advice is scoped to the correct Baby Step
