# Decisions Log

> Append-only. Add new entries at the bottom. Never edit past entries.

---

## [YYYY-MM-DD] — [Short decision title]
**Decision:** [What you decided]
**Why:** [The reasoning — what problem it solves or what tradeoff it resolves]
**Alternatives considered:** [What else you looked at]
**Tradeoffs:** [What you gave up or accepted]

---

## 2026-05-29 — Check-in prompt direction
**Decision:** Drafted an initial prompt for the check-in feature using /build-prompt
**Why:** Needed a starting point for the core interaction pattern — the check-in is central to the return loop
**Alternatives considered:** None at this stage — this is a first draft, not a final direction
**Tradeoffs:** Committing to a structure early gives something concrete to test against, but it may change significantly once testing begins

---

## 2026-06-08 — Response length: shorter structured responses for V1
**Decision:** Constrain check-in responses to a tight, structured format (e.g. 3 short paragraphs max) for V1. Voice output flagged for V2.
**Why:** Rung 1 experiment showed that long AI responses actively worsen the experience for emotionally overwhelmed users — the medium was fighting the message.
**Alternatives considered:** Voice output, progressive disclosure in the UI
**Tradeoffs:** Shorter responses may lose nuance; structure may feel rigid in some scenarios. Accepted in exchange for reducing cognitive load at the point of stress.

---

## 2026-06-08 — External API: SendGrid for email notifications
**Decision:** Use SendGrid (email API) as the MCP/external API requirement for V1.
**Why:** Supports the return loop (bi-weekly check-in reminders) without the complexity of calendar OAuth or SMS setup.
**Alternatives considered:** Google Calendar integration, Twilio SMS
**Tradeoffs:** Email is lower friction to build but easier to ignore than a calendar event or text. Calendar integration moved to V2.

---

## 2026-06-08 — Data source: manual input + CSV upload
**Decision:** V1 data source is a combination of manual conversational input and CSV/spreadsheet upload from Excel.
**Why:** Matches how the family currently manages money (Excel budget, manual debt tracking) without requiring live bank account syncing.
**Alternatives considered:** Plaid or similar financial data API for live account syncing
**Tradeoffs:** Manual entry adds friction; CSV upload requires the user to export from Excel. Accepted as the right scope boundary for V1.

---

## 2026-06-16 — Sensitivity level: explicit mood check for V1
**Decision:** User sets emotional calibration explicitly before each check-in via a mood selector (Good / Stressed / Crisis). Inferred tone adjustment flagged for V2.
**Why:** Explicit is simpler to build and gives the system reliable signal without guessing. Inferred requires prompt logic to detect emotional cues and may misread tone.
**Alternatives considered:** Inferred from input text (system reads emotional state from what the user writes)
**Tradeoffs:** Slight upfront friction for the user; more reliable than inference for V1. Accepted in exchange for build simplicity and predictable behavior.

---

## 2026-06-16 — Model selection: Sonnet 4.6 for runtime API calls
**Decision:** Use claude-sonnet-4-6 for the app's Claude API calls at runtime.
**Why:** The check-in is conversational, instructional, and task-based — answering questions, tracking Baby Steps progress, giving feedback. Per the LLM API guide, Opus is warranted only when the core value depends on deep multi-step reasoning.
**Alternatives considered:** Claude Opus (4.7/4.8)
**Tradeoffs:** Sonnet is faster and cheaper; Opus would be stronger for complex synthesis but unnecessary for this use case.

---

## 2026-06-16 — Spike built into the Next.js app
**Decision:** The Rung 2 spike lives in the Next.js app (app/api/checkin/route.ts + app/page.tsx) rather than as a standalone script.
**Why:** The spike is a thin version of the actual product — same stack, same flow. Building it in the app means nothing gets thrown away; it's the starting point for the real build.
**Alternatives considered:** Standalone Node.js script in docs/research/spike/
**Tradeoffs:** Slightly more setup than a script, but produces a running UI that makes test case evaluation easier and doubles as the POC foundation.

---

## 2026-06-16 — V2 idea: AI-assisted CSV auto-fix with user confirmation
**Decision:** Parked for V2 — when the check-in flags a malformed CSV (missing income rows, embedded calculated rows, bad dates, multi-period stacking), have the AI propose specific fixes and let the user review/confirm before proceeding, rather than just telling the user to fix and re-export manually.
**Why:** Spike testing with a real personal CSV showed the validation logic correctly catches malformed data and refuses to give advice on it — but currently just punts the fix back to the user, adding friction at exactly the point the system is supposed to reduce it.
**Alternatives considered:** None yet — V1 stays as reject-and-explain; auto-fix is a V2 enhancement.
**Tradeoffs:** Auto-fixing risks misinterpreting ambiguous data (e.g., guessing which column is "Amount"); user confirmation step mitigates that risk but adds one more interaction.

---
