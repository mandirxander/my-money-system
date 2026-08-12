# My Money System

*Full profile: docs/reports/participant_profile.md*

---

## What This Project Is

A personalized financial guidance system modeled after Dave Ramsey's Baby Steps framework — helping users budget, save, and invest in a way that fits their specific values and situation. The return loop: you're always in a step, always working toward the next one, with a thinking partner for hard financial decisions along the way.

## My Context

I'm a UX/UI designer with an Electrical and Computer Engineering background and years of industry experience. I'm fluent in design and systems thinking, and I'm in this course to merge those skills with AI development — learning new ways of working, not just automating what I already do. I want to walk away with a working, tangible product I can actually use and tinker with.

## Project Phase

Building POC

## Key Files to Read
- `docs/reports/participant_profile.md` — who I am and how I like to work
- `docs/problem_definition.md` — what I'm solving and why (add after Session 2)
- `docs/reports/decisions.md` — choices made and the reasoning behind them
- `docs/reports/session_log.md` — what happened in recent sessions

## Working Preferences

- I want a working, tangible output — not slides, not concepts. Something I can run and tinker with.
- I think in systems — I appreciate when you connect the pieces and show how they fit together.
- I'm open to learning new tools and workflows, not just Figma extensions.
- If there are multiple ways to approach something, show me the tradeoffs before we converge.
- Ask me one clarifying question before starting a large task.

## Communication Style

- Give me a direct answer first, then explain the reasoning.
- Keep responses concise unless I ask for depth.
- When I'm stuck on a decision, help me think it through — don't just give me the answer.
- Use design and engineering analogies when explaining new concepts.

## What Claude Should Always Do
- Ask before making large structural changes
- APPEND new dated entries to docs/reports/decisions.md — never edit or remove past entries
- APPEND new entries to docs/reports/session_log.md at the end of each session
- Keep solutions simple — prefer the most straightforward approach
- Explain what you're doing before writing code for complex tasks
- Connect suggestions back to the Baby Steps framework and the return loop when relevant

## What Claude Should Never Do
- Add features or code not explicitly asked for
- Delete or rename files without confirmation
- Overwrite or edit previous entries in decisions.md or session_log.md
- Assume — ask if something is unclear
- Prescribe a financial philosophy — Mandi has her own (Dave Ramsey) and the system should reflect hers

## Primary Quality Risk

Any data input — CSV upload or conversational debt entry — may not be validated consistently, producing financial advice the user acts on. Two failure modes: bad CSV format slipping through, and LLM non-determinism on identical input.

**What we're building first to test it:** Deterministic server-side CSV validation (rule-based code, not the LLM) + conversational debt input with structured output parsing. The LLM is only called after data is confirmed clean.

## Interaction Model

- Bi-weekly sit-down check-in triggered by user's own calendar reminder (no in-app reminders in V1)
- Opens with the user's current Baby Step — no explicit goal-setting required; Baby Step defines the focus
- Baby Step is set once at onboarding, saved to Supabase, and updated only when the user advances
- Missing data: system asks before proceeding, never skips silently
- Advice delivered piece by piece on screen: budget status → debt progress → what to focus on

## Data Flow & Connection Decisions

- **Budget data:** CSV upload *or* typed mini-form → both run through the same rule-based server-side validation (`validateRows` in `lib/validateCsv.ts`) → saved to `budget_figures`, editable in place like debt/investments. Each row tracks a planned amount (set once per period) and a separate actual amount (filled in later) — CSV upload sets planned only and requires user confirmation before it overwrites an existing period's data.
- **Debt data:** Conversational text input (Claude parses to structured JSON) *or* CSV upload (deterministic, `lib/validateDebtCsv.ts`) → both run through the same value sanity guardrail (`lib/validateDebt.ts`) → saved to Supabase
- **Claude API:** Generates check-in advice scoped to Baby Step; called only after clean data is confirmed. Also parses conversational debt input — the one path still LLM-based, guarded by the value sanity check below.
- **Supabase:** Server-side client, `SUPABASE_SERVICE_ROLE_KEY` only — stores Baby Step + debt figures
- **History:** `checkin_snapshots` table (Baby Step, total debt, total investments, budget totals, timestamp) — one append-only row written per completed check-in, used for trend charts and gamified "win" states. Separate from the current-figures tables, which stay editable in place.
- **SendGrid:** Deferred to V2

## Guidelines (Session 5)

- Every input, on every entry path (budget CSV, budget form, debt text, debt CSV), must pass its rule-based validation function before the LLM ever sees it — no path is allowed to skip a check another path enforces.
- The LLM never validates data — it only acts on data already confirmed clean.
- Ambiguous or incomplete input always produces a clarifying question, never a guess.
- Baby Step is a stored fact from `user_profile` — the check-in prompt is told the Baby Step, never asked to infer it.
- Advice tone: direct and warm, acknowledge emotional weight first when mood is stressed/crisis, 2–3 sentences per field max.

## Guardrails (Session 5)

- One LLM call per user action, no auto-retry — any failure (malformed tool output, API error) surfaces to the user immediately.
- Debt amounts must be `> 0` and `≤ $2,000,000` (backstop against a garbled/misparsed value, not a real debt cap) — enforced in `validateDebtValues` for both the conversational and CSV debt paths before anything is saved.
- Check-in returns a 422 and never runs if debt figures are missing on file.
- Full reasoning in `docs/agent_behavior_design.md`.

## Cut or Simplified for V1

- No in-app reminders (email, calendar, text) — V2
- No multi-user support or user accounts — testing with own data first
- No output delivery preference (piece by piece is the only mode) — V2
- No receipt photo upload — V2
- No mobile app — V2

## Beyond Class (Parked)

SendGrid reminders, calendar/text notifications, receipt photo upload, mobile app, output delivery as saved user preference, multi-user support.

## Current Focus

Building the POC — Session 4 onward. Full specs in `docs/specs/poc_specs.md`. Build order: onboarding (Baby Step) → CSV validation → conversational debt input → missing data gate → full check-in with piece-by-piece advice.

## Quality Standards

Working and real. If I can't run it, click it, or tinker with it, it's not done yet.

## Things I'm Learning

[Update this after each session with observations about working with Claude]
