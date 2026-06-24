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

- **Budget data:** CSV upload from Excel → rule-based server-side validation → gate on failure
- **Debt data:** Conversational text input → Claude API parses to structured JSON → saved to Supabase
- **Claude API:** Generates check-in advice scoped to Baby Step; called only after clean data is confirmed
- **Supabase:** Server-side client, `SUPABASE_SERVICE_ROLE_KEY` only — stores Baby Step + debt figures
- **SendGrid:** Deferred to V2

## Cut or Simplified for V1

- No in-app reminders (email, calendar, text) — V2
- No budget or debt history over time — V1 uses current figures only
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
