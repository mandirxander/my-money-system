# Implementation Design — My Money System

---

## learning_since_last_interaction

**carried_forward_summary:**
- Spike proved the happy path works: CSV upload → Claude API → structured check-in advice is functional. When data is clean, output is genuinely good.
- CSV validation logic catches malformed files correctly — bad format surfaces an error rather than silently producing bad advice.
- Non-determinism is real: identical input (currency-symbol CSV) produced different outcomes across runs — one blocked, one gave advice.
- User research surfaced two distinct data categories with different natural input paths: budget data lives in Excel (CSV upload), debt data lives in a phone notes app (conversational input). Both are frequent and both need validation.
- Non-determinism is unacceptable in two areas: input validation and Baby Steps facts.
- Visual progress as a motivation mechanic is a design instinct, not validated — deferred to V2. The check-in conversation is the V1 engagement mechanic.

**updated_quality_risk_focus:**
Any data input — CSV upload or conversational — may not be validated consistently, and silent failures produce financial advice the user will act on.

Two failure modes:
1. Bad CSV format slipping through validation without being caught
2. LLM applying validation inconsistently on identical input (non-determinism)

The POC needs to harden what the spike exposed: consistent validation across both input paths, and deterministic behavior on things that shouldn't vary (validation outcomes, Baby Steps facts).

---

## delivery_context_design

**where_it_fits:**
Bi-weekly check-in session — triggered by a calendar reminder the user sets themselves. The app is a sit-down conversation, not a quick-glance tool. The user opens it when the check-in is due, not throughout the day.

**interaction_model:**
The system opens with the user's current goal (debt paydown or budget adherence) — no catching up required. Advice is delivered piece by piece: budget status → debt progress → what to focus on. Each piece surfaces before the next to avoid overwhelming the user.

**agency_vs_autonomy:**
| Action | Mode | Reasoning |
|---|---|---|
| CSV validation | Autonomy → Agency on failure | Mechanical check runs automatically; flips to agency if issues are found so the user approves before advice runs |
| Missing data detection | Agency | If required data is absent (no CSV uploaded, debt figures missing), the system asks the user for it before proceeding — never skips silently or generates advice on incomplete input |
| Goal-framing the opening | Autonomy | Auto-populated from saved data — no need to ask |
| Advice generation | Agency | High financial stakes; user reads each piece and can respond before the next surfaces |

**user_touchpoints:**
- **Input:** CSV upload (budget data from Excel) + conversational text entry (debt data)
- **Output:** On-screen, structured, delivered piece by piece
- **Review points:** (1) Validation issues — user approves or dismisses before advice runs; (2) Advice — user reads and responds to each piece sequentially

**v2_parking:**
- In-app reminders: email, calendar invites, text message
- Output delivery as a saved user preference (all at once vs. piece by piece)
- Receipt photo upload for budget categorization
- Mobile app
- Debt CSV upload as an alternative to conversational input

---

## data_flow

**main_path:**
1. First use — system asks which Baby Step the user is on and saves it; never asks again unless user signals advancement
2. User opens app → system reads saved Baby Step → determines check-in focus automatically (no explicit goal-setting required)
3. System checks for required data; prompts for anything missing before continuing
4. User uploads budget CSV → system validates automatically
5. Validation failure → surfaces issues, user approves fix or re-uploads before continuing
6. System asks for debt figures conversationally ("What's your current balance on each debt?") → parses and saves the response; prompts if anything is unclear or missing
7. System calls Claude API → generates check-in advice scoped to their Baby Step
8. Advice surfaces piece by piece on screen (budget status → debt progress → what to focus on); user reads and responds to each

**external_connections:**
| Connection | What it's for | V1 or V2 | Notes |
|---|---|---|---|
| Claude API (Anthropic SDK) | Generates check-in advice scoped to Baby Step | V1 | Already wired from spike |
| Supabase | Stores Baby Step, debt figures, budget history | V1 | Server-side, service_role key — already wired |
| SendGrid | Email reminders | V2 | Not needed for POC |

**self_chosen_components:**
- CSV upload for budget data (user exports from Excel)
- Conversational text input for debt figures (mirrors how user tracks today — phone notes)
- Baby Step as the goal-setting mechanism — no explicit goal entry required

**human_judgment_points:**
- Onboarding: user sets their Baby Step once
- Validation failure: user approves before advice runs
- Missing data: user provides before system continues
- Advice delivery: user reads and responds to each piece before the next surfaces
- Baby Step advancement: user tells the system when they've moved to the next step

---

## poc_scope_definition

**build_first_target:**
Harden validation across both input paths (CSV and conversational debt input) and prove it behaves deterministically — then deliver Baby Step-scoped advice on clean data.

**core_path_only:**
1. Onboarding: user sets Baby Step once, saved to Supabase
2. Budget CSV upload → deterministic validation → gate on failure
3. Conversational debt input → parsing → prompt if unclear or missing
4. Missing data gate: system asks before proceeding
5. Claude API call scoped to Baby Step → advice delivered piece by piece on screen

**feature_justification:**
| Feature | Verdict | Reason |
|---|---|---|
| Baby Step onboarding | Essential | Drives check-in focus — without it the advice is generic |
| CSV validation (deterministic) | Essential | Core quality risk — must prove this works before anything else |
| Conversational debt input + parsing | Essential | Second input path; quality risk applies here too |
| Missing data gate | Essential | Prevents advice running on incomplete input |
| Piece-by-piece advice delivery | Essential | Core interaction model; tests whether the format reduces overwhelm |
| Budget history over time | Defer | Doesn't change what the POC teaches; add in a later session |
| Debt progress over time | Defer | Same — current figures are enough to test the quality risk |
| UI polish / loading states | Defer | Doesn't affect learning |

**simplified_elements:**
- Test with your own data first — no user accounts or multi-user support in V1
- Current check-in only — no historical tracking yet

**definition_of_done:**
"I can give it a budget CSV and debt figures entered conversationally, it produces Baby Step-scoped advice (budget status → debt progress → what to focus on), and I can see that validation ran consistently — bad data was caught every time, good data went through cleanly."

**future_state_beyond_class:**
- SendGrid email reminders
- Calendar invite / text message reminders
- Receipt photo upload for budget categorization
- Mobile app
- Output delivery as a saved user preference (all at once vs. piece by piece)
- Multi-user support / user accounts

---

## implementation_approach

**Key architectural decision:** CSV validation runs as rule-based code server-side — not the LLM. This directly eliminates the non-determinism the spike exposed. The LLM is only called after data is confirmed clean.

**Build order (follows quality risk priority):**
1. Onboarding — Baby Step capture and Supabase storage
2. CSV upload + deterministic server-side validation
3. Conversational debt input + Claude API parsing with structured output
4. Missing data gate across both paths
5. Full check-in: Claude API call (Baby Step + budget + debt) → piece-by-piece advice on screen

**Full specs:** `docs/specs/poc_specs.md`

---
