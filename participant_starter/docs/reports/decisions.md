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
