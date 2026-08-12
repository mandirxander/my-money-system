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

## 2026-06-24 — Baby Step as the goal-setting mechanism
**Decision:** The user's current Baby Step, set once at onboarding and saved to Supabase, determines the check-in focus automatically — no explicit goal entry required.
**Why:** The Baby Step already encodes the goal (e.g. BS2 = debt paydown, BS3 = emergency fund). Asking the user to also state a goal is redundant and adds friction.
**Alternatives considered:** Explicit goal entry at the start of each check-in
**Tradeoffs:** System must know the Baby Step is accurate; user is responsible for updating it when they advance.

---

## 2026-06-24 — Piece-by-piece advice delivery (V1 only mode)
**Decision:** Advice surfaces sequentially — budget status → debt progress → what to focus on — with no option to change delivery mode in V1.
**Why:** Reduces cognitive load for a user who may already be emotionally overwhelmed when opening the app.
**Alternatives considered:** All advice shown at once; output delivery as a saved user preference
**Tradeoffs:** Less flexibility for users who prefer a full summary upfront. Delivery preference deferred to V2.

---

## 2026-06-24 — CSV validation uses rule-based code, not the LLM
**Decision:** Budget CSV validation runs as deterministic server-side code. The LLM is only called after data is confirmed clean.
**Why:** The spike exposed that LLM-based validation produces inconsistent results on identical input (non-determinism). Rule-based code eliminates that failure mode entirely.
**Alternatives considered:** LLM-driven validation (tested in spike)
**Tradeoffs:** Rule-based validation is less flexible for edge cases the rules don't anticipate, but determinism is non-negotiable for financial data.

---

## 2026-06-24 — Conversational debt input only in V1
**Decision:** Debt figures are entered conversationally in V1 (natural language, e.g. "my car loan is $8,400"). CSV upload for debt deferred to V2.
**Why:** Matches how the user already tracks debt today (phone notes). CSV export for debt adds friction without improving the V1 learning.
**Alternatives considered:** Debt CSV upload as a parallel input path
**Tradeoffs:** Conversational input requires reliable parsing and a follow-up prompt for incomplete entries. Accepted as the right V1 tradeoff.

---

## 2026-07-08 — Results delivered on a dedicated /results page
**Decision:** Moved piece-by-piece advice delivery to its own /results page instead of rendering inline on the main page below the form.
**Why:** Reduces scrolling and keeps the user focused on the advice — the main page stays focused on inputs, the results page stays focused on output.
**Alternatives considered:** Inline display below the check-in form (built first, then replaced)
**Tradeoffs:** Requires sessionStorage to pass data between pages; slight added complexity in exchange for a meaningfully cleaner experience.

---

## 2026-07-08 — Staying on Next.js 16 with Turbopack
**Decision:** Kept Next.js 16 with Turbopack as the default bundler rather than downgrading to get webpack.
**Why:** Next.js 16 doesn't support --no-turbopack as a flag or config option — there's no clean way to opt out. Turbopack is stable enough for the POC.
**Alternatives considered:** Downgrading to Next.js 14 where webpack was the default
**Tradeoffs:** Turbopack may have occasional hot-reload quirks; the /restart-dev-server command exists to recover from those.

---

## 2026-07-08 — CSV validation is deterministic rule-based code, not the LLM
**Decision:** Replaced LLM-based CSV validation (in the system prompt) with rule-based server-side code in lib/validateCsv.ts. Claude is only called after the CSV is confirmed clean.
**Why:** The spike proved LLM validation is non-deterministic — identical input produced different outcomes across runs. Rule-based code eliminates that failure mode entirely.
**Alternatives considered:** LLM-driven validation (tested and rejected in spike)
**Tradeoffs:** Rule-based validation is less flexible for edge cases the rules don't anticipate, but determinism is non-negotiable for financial data.

---

## 2026-07-28 — Dual-input support for budget, debt, and investments
**Decision:** Budget, debt, and investment figures can each be entered via typed structured rows or CSV upload — every path validated by the same deterministic, rule-based checks with no LLM involved in validation.
**Why:** Session 5's quality-risk measurement showed the deterministic CSV path had fully closed the non-determinism risk; extending that same guarantee to every input path (rather than letting a new path reopen it) keeps the whole system at one quality bar.
**Alternatives considered:** LLM-based parsing for typed budget entry or debt CSV upload (mirroring the original conversational debt pattern).
**Tradeoffs:** More validation code to maintain across input types, in exchange for full determinism everywhere data enters the system.

---

## 2026-07-28 — Conversational debt input replaced with structured rows
**Decision:** Removed the Claude-based conversational debt parsing entirely; typed debt entry now uses the same label/amount row editor as budget, not free text.
**Why:** Requested for UI/UX consistency across sections, and it happens to close the last remaining non-deterministic input path in the system.
**Alternatives considered:** Keeping conversational parsing as a secondary option alongside structured rows.
**Tradeoffs:** Reverses the Session 4 decision "Conversational debt input only in V1" — debt entry is now less free-form/conversational than originally designed, in exchange for full determinism and pattern consistency with budget.

---

## 2026-07-28 — Investments & assets as a new optional data category
**Decision:** Added an Investments & assets section (optional, not required to run a check-in), backed by a new `investment_figures` Supabase table, supporting the same type-it-in/CSV pattern as debt.
**Why:** Baby Steps 4–7 involve investing and building wealth; the system had no way to track this data at all.
**Alternatives considered:** Folding investment tracking into the existing debt table with a type flag.
**Tradeoffs:** A second nearly-identical table/route to maintain, in exchange for a clean separation between debt and asset data.

---

## 2026-07-28 — Value-sanity guardrails on debt and investment figures
**Decision:** Debt amounts must be >0 and ≤$2,000,000; investment amounts must be >0 and ≤$10,000,000 — enforced before saving, regardless of entry path.
**Why:** Closes the "confidently wrong" risk identified in Step 1 of the agent behavior workflow — a garbled or mistyped figure could otherwise be saved and treated as fact in every future check-in.
**Alternatives considered:** No upper bound (relying only on a >0 check); a shared single ceiling for both debt and investments.
**Tradeoffs:** The ceilings are backstops, not real caps — a legitimately large debt or asset outside the range would need a manual override, though this hasn't come up yet.

---

## 2026-07-28 — Saved debt/investment figures editable in place
**Decision:** The typed entry form for debt and investments now pre-fills with the currently saved values (rather than starting blank), so a single value can be edited and re-saved without retyping everything.
**Why:** Requested to support real use cases like paying down a debt or updating an asset value — retyping the full list every time was unnecessary friction.
**Alternatives considered:** Keeping the form blank on load and relying on the read-only saved list as the only view of current data.
**Tradeoffs:** None significant — this replaced a redundant duplicate display (the read-only list) with the editable rows serving double duty as both display and edit surface.

---

## 2026-08-03 — Closed the six Step 1 UX gaps: review screen, back nav, retry, scope label
**Decision:** Added a review stage between "Run check-in" and the Claude call — shows a Baby Step re-verification prompt ("Still on Baby Step X?" with a Change link), a figures summary (debt/investment totals, planned budget totals, mood), and a "Confirm and run check-in" action, replacing the old direct-submit flow. A failed check-in now shows an inline Retry button on that same screen rather than just a banner. The results page gained back-navigation (paired with the existing Continue) at each reveal step, plus a mood echo in the header. The budget section now explicitly labels its scope ("this pay period") next to the heading.
**Why:** Session 8's UX audit (Step 1, four lenses) flagged these as confirmed gaps: no confirmation moment before advice generation, no way to undo "Continue," no retry path, Baby Step trusted indefinitely, and budget's implicit period scope. Baby Step re-verification and the "what we're about to consider" moment turned out to be one screen, not two.
**Alternatives considered:** A modal instead of a full review screen; re-verifying Baby Step on a time/count-based cadence instead of every check-in.
**Tradeoffs:** One more click between "ready" and "advice delivered" — accepted since the previous flow had no confirmation step at all. Baby Step re-verification asks every single check-in rather than tracking elapsed time or count, which is simpler but may feel repetitive if it never changes; revisit if that friction shows up in practice.

---

## 2026-08-03 — Budget figures now persisted, with planned vs. actual tracking
**Decision:** Reverses the earlier decision that budget is "entered fresh every check-in, no history in V1." Budget moves to a new `budget_figures` table (type, label, planned_amount, actual_amount, due_date, paid), persisted and editable in place — same pattern as debt/investments. Each row keeps a planned amount (set at period start) and a separate actual amount (filled in later, once known), rather than overwriting one with the other. CSV upload still enters planned amounts only (bulk initial entry); actual spend is filled in via the typed editor in later sessions. Uploading a new CSV to start a new period requires an explicit user confirmation first, since it wipes any actual amounts entered for the old period — no silent overwrite. Merging/preserving old-period actuals against a new CSV is parked for V2.
**Why:** The check-in is supposed to help track real progress against a plan; a budget that resets to blank every session couldn't ever show whether the user stayed on plan. Keeping planned and actual separate (rather than overwriting) preserves the original plan as a reference point for spend-vs-plan advice.
**Alternatives considered:** Single-amount edit-in-place model (matching debt/investments exactly, overwriting planned with actual); allowing CSV upload to silently overwrite without confirmation, matching debt/investments' existing pattern.
**Tradeoffs:** More fields to validate and display per row; the check-in route now reads saved budget figures instead of receiving them fresh per submission, which also changes the readiness gate (saved budget on file, not "filled in this session").

---

## 2026-08-03 — Reopened the "no history" V1 cut for data visualization
**Decision:** Reverses the earlier V1 cut ("No budget or debt history over time — V1 uses current figures only"). Added an append-only `checkin_snapshots` table (Baby Step, total debt, total investments, budget totals, timestamp), written once per completed check-in. Debt/investment *current* figures stay editable in place as before — snapshots are a separate historical layer, not a change to that model.
**Why:** Scoping data visualization (Baby Step ladder, debt/budget/investment breakdowns, gamified "win" moments for debt paydown and budget met) surfaced that trend charts and gamification both require comparing against a prior state, which the current-figures-only model can't support.
**Alternatives considered:** Keeping visualization to snapshot-only (no trends, no gamification) and parking trend/gamification for V2.
**Tradeoffs:** New table and snapshot-write logic to maintain. First check-in ever run has no prior snapshot to compare against, so trend lines and gamified "win" states are skipped on that first run and only appear from the second check-in onward.

---

## 2026-08-12 — Reversing sage-garden for a bold, high-contrast palette on the main check-in screen
**Decision:** Moving away from the sage-garden shadcn theme applied in Session 7 toward a bolder, higher-contrast color palette (deep purple, magenta/pink, lime green, dark plum — direction set by a reference screenshot of another app's insights screens), applied to the main check-in screen. The original interaction design, copy, and component structure from the UX workflow stay as-is — this is a palette change, not a flow or content change. Actual hex values are deferred until a design system currently being built in Claude Design is ready to export from, rather than extracting an approximate palette from the reference screenshot now.
**Why:** Reviewing the reference against the current sage-garden look, the bolder palette was the clear preference — the earlier theme choice (picked via tweakcn.com in Session 7, before any real design pass) no longer matches the direction. Waiting for the Claude Design export avoids doing the palette-matching work twice — once approximated from a screenshot, once for real.
**Alternatives considered:** Extracting approximate hex values from the reference screenshot immediately, staying within sage-garden and treating the reference as structure-only inspiration (the workflow's default move, rejected here in favor of adopting the palette itself).
**Tradeoffs:** The visual reference pass (Step 4 Part B of the user_experience workflow) is now blocked on an external dependency (the Claude Design system) rather than finishing in this session — structure/layout borrowed from the reference can proceed, but final color application waits.

---

## 2026-08-12 — AI-generated UI cue added, then reverted on the results screen
**Decision:** Added a small "AI-generated" pill next to the three advice labels on the results screen (Budget status, Debt progress, What to focus on) to address the Step 3 overconfidence gap, then reverted it after seeing it live in favor of the plain report text.
**Why:** Preferred how the results screen read without the visual cue — the badge felt like it undercut the plain, direct advice text rather than supporting it.
**Alternatives considered:** A less visually intrusive treatment (e.g. folded into the review-screen confirmation instead of the results screen) — not built, left as a future option.
**Tradeoffs:** The Step 3 overconfidence gap is now open again with no UI mitigation in place — accepted for now in favor of the cleaner read.

---

## 2026-08-12 — Baby Step ladder labels reworded from BS-codes to short plain-language labels
**Decision:** Replaced the ladder's rung labels (`BS1`, `BS2`, … `BS7`) with short 1–2 word labels: Starter fund, Debt payoff, Full fund, Retirement, College, Payoff home, Build wealth.
**Why:** Surfaced during the cross-screen consistency check — `BS`-codes assume the user already knows the Baby Steps framework's shorthand, which isn't a safe assumption for a glanceable progress visual.
**Alternatives considered:** Keeping the `BS#` codes as-is (the framework's own shorthand) and relying on the "Step 1 — ..." Baby Step label already shown above the ladder for full context.
**Tradeoffs:** None significant — this is a pure readability improvement with no functional change.

---

## 2026-08-12 — Forced tool_choice on the check-in LLM call, closing a live reliability gap
**Decision:** Changed `checkin/route.ts`'s Claude call from `tool_choice: { type: 'auto' }` to `tool_choice: { type: 'tool', name: 'deliver_checkin' }`, forcing every check-in call to return structured output.
**Why:** Discovered while pulling a real anchor example for the `evaluating_for_scale` homework — live-tested against real saved data, `"good"` mood check-ins failed with a generic 500 (`"Could not generate check-in. Try again."`) roughly 60% of the time. With `tool_choice: auto`, Claude was sometimes replying in plain text instead of calling the `deliver_checkin` tool, leaving the route with no structured output to read. `"stressed"` mood succeeded 3/3 in the same test; `"good"` failed 2/3. Forcing the tool eliminated the failure outright — 5/5 on a live re-run after the fix.
**Alternatives considered:** Adding a retry on the no-tool-use case (rejected — guardrail #1 in this doc is explicitly "no silent auto-retry"); leaving `auto` and just improving the error message (doesn't fix the underlying reliability gap, only makes the failure friendlier).
**Tradeoffs:** None identified — there was never a legitimate case where a plain-text reply instead of the structured tool call was the right outcome for this call, so forcing it has no downside found so far.

---
