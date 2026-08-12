# Agent Behavior Design — My Money System

---

## build_reality_check

**what_it_actually_does:**

The POC (in `app/`) runs this path today:
1. On load, `GET /api/profile` + `GET /api/debt` check for a saved Baby Step and existing debt figures. No profile → onboarding screen (pick a Baby Step, `POST /api/profile`, saved to `user_profile`).
2. Debt figures are entered as free text → `POST /api/debt` → Claude (`claude-sonnet-4-6`, tool use) parses to `{label, amount}[]`. If anything's ambiguous, `needs_clarification: true` comes back with a follow-up question instead of guessing. On success, existing rows are deleted and the new set is inserted into `debt_figures` (full replace, not merge).
3. User uploads a budget CSV. `validateCsv()` in `lib/validateCsv.ts` — plain TypeScript, no LLM — checks for a real header row, a required `Amount` column, no pay-period header stacking, no calculated/summary rows (Total, Remaining, etc.), no currency symbols, and not more than half the rows missing an Amount. Any failure returns a specific error and the flow stops before Claude is ever called.
4. If validation passes, `POST /api/checkin` loads saved debt rows (gates with a 422 if none exist), builds a prompt with mood + Baby Step + debt summary + raw CSV text, and calls Claude with a `deliver_checkin` tool to force structured output: `budget_status`, `debt_progress`, `recommended_focus`.
5. Results are pushed to `sessionStorage` and shown one at a time on `/results` (Continue → reveals the next card), then routes back to `/`.

**deviations_from_spec:**
- Spec called for "empty rows... stripped, not passed to LLM"; the real code doesn't strip blank rows — `.filter(l => l.length > 0)` removes them before any column-shift check even runs, so a blank separator row is a non-issue by construction rather than something explicitly detected and stripped. Same outcome, different mechanism than what was speced.
- Spec's required-columns list is "Income, Bills, Due Date, Amount, Paid" but the code only ever checks for `Amount`. The other four are recognized as header-detection *signals* (`RECOGNIZED_HEADERS`), not required fields — see the miss below.
- Everything else matches the spec shape: rule-based CSV gate → conversational debt parse with a clarification loop → missing-data gate → Claude call → piece-by-piece delivery.

**where_quality_risk_shows_up:**
The primary quality risk was framed as "any data input may not be validated consistently, producing financial advice the user acts on," with two named failure modes: bad CSV format slipping through, and LLM non-determinism on identical input. Running the real code (below) shows:
- The **non-determinism** failure mode is fully closed for CSV. `validateCsv` is pure, synchronous TypeScript — there's no LLM in the loop, so "same input, same result" is true by construction now, not just by observation.
- The **bad-format-slipping-through** failure mode still has one open gap: a CSV missing the `Paid` column entirely passes validation, even though the spec and the original test matrix called that out as a required column. It doesn't fail loud or silent-produce-wrong-advice (the CSV data itself is otherwise clean), but it's a spec/code gap worth closing since "Paid" status is something the check-in could reasonably speak to.
- A second-order risk now sits in **conversational debt input**, which is the one input path still going through Claude (`/api/debt`) rather than deterministic code. It has a clarification loop, but no explicit guardrail yet on what happens if Claude's tool call itself is malformed or the amount is nonsensical (e.g., a negative balance, a wildly implausible number from a mis-parsed sentence) — nothing checks the *values* Claude extracts before they're saved and used as fact in the check-in.

---

## scored_test_run

Ran all 8 CSV cases from `data/evaluations_data.csv` directly through the real `validateCsv()` (not the old spike), 3× each, to check both correctness and determinism:

| Case | Result now | Deterministic (3 runs)? | Matches expectation? |
|---|---|---|---|
| CSV_BASELINE_WELLFORMED | Valid — passes | Yes | ✅ |
| CSV_STRUCTURE_PAYPERIOD_HEADER | Blocked — "pay period header row... delete that row" | Yes | ✅ (spike scored this a 3/5 — flagged but let advice through; current code blocks outright) |
| CSV_FORMAT_CURRENCY_SYMBOLS | Blocked — "Currency symbols found... remove $ signs and commas" | **Yes** | ✅ — this is the case the spike scored a 3/5 for being *non-deterministic* (curl run gave advice, browser run blocked). Rule-based code closes that gap completely. |
| CSV_COLUMNS_MISSING_PAID | **Valid — passes** | Yes | ❌ — spec requires a Paid column; code never checks for it, only checks for `Amount`. Same miss the spike had (scored 2/5), just for a different reason: spike got distracted by an unrelated issue, current code doesn't check for the column at all. |
| CSV_ROWS_CALCULATED_TOTALS | Blocked — "Calculated row found: Total Income..." | Yes | ✅ |
| CSV_SHEETS_MULTIMONTH | Blocked — "pay period header row... delete that row" | Yes | ✅ outcome (blocked), though the message only names the first embedded header — a user who fixes just that one will hit the "multiple pay period sections" error on the next embedded header on re-upload rather than seeing all of them named up front. Minor, not a silent failure. |
| CSV_CELLS_EMPTY_AMOUNTS | Blocked — "3 of 6 rows have empty Amount values" | Yes | ✅ |
| CSV_ROWS_BLANK_SEPARATORS | Valid — passes | Yes | Data is genuinely clean once blank lines are dropped — no column shift actually occurs in this fixture. Spike blocked it (scored 5/5 at the time); current code correctly lets it through. Not a miss — the current behavior is arguably more correct than what was scored before. |

**Where the misses land vs. where the risk was predicted:** Squarely in the predicted spot — the one gap (missing `Paid` column) is exactly the "bad format slips through" failure mode, and it's the same test case that beat the spike too. The non-determinism failure mode, which was the *harder* half of the original risk, is now fully closed by moving validation out of the LLM. Conversational debt input hasn't been test-run yet against the live Claude API in this pass — that's the one path where non-determinism/wording-sensitivity (Risk 7) could still be live, and it also writes to real Supabase data, so it's flagged for Step 2 guardrails rather than a live test run against production data.

---

## guidelines

Operating rules, applied in the system prompt and enforced in code:

1. **Both input paths, one bar.** Budget and debt figures can each now arrive two ways (CSV upload or typed in) — but every path for a given data type runs through the *same* rule-based validation function before the LLM ever sees it. No entry mode is allowed to skip a check the other mode enforces.
2. **The LLM never validates — it only acts on data already confirmed clean.** Reiterated and now literally true for four input paths (budget CSV, budget form, debt text, debt CSV), not just the original one.
3. **Ambiguous or incomplete input always produces a question, never a guess.** Applies to conversational debt parsing (`needs_clarification`) and to the budget mini-form (empty label/amount blocks submission client-side, and `validateRows` blocks it server-side too).
4. **Baby Step is a stored fact, not something the LLM infers.** Advice is scoped to whatever Baby Step is on record in `user_profile` — the check-in prompt is told the Baby Step, never asked to guess it.
5. **Tone stays tight.** Direct and warm, acknowledge emotional weight first when mood is stressed/crisis, 2–3 sentences per field — carried over from the Session 3 verbosity finding, unchanged this session.

## guardrails

Runtime safety limits, applied in code this session:

1. **No retry loops.** Each user action triggers exactly one LLM call (one debt parse, one check-in). On any failure — malformed tool output, API error — the error surfaces to the user immediately. No silent auto-retry, no fallback guess.
2. **Validation gate, now covering all four input paths:** `validateCsv` / `validateRows` (budget) and `validateDebtCsv` / `validateDebtValues` (debt) all run before their respective Claude call. A 422 with a specific, actionable error blocks the flow on failure.
3. **Value sanity guardrail (new):** debt amounts must be `> 0` and `≤ $2,000,000` (a backstop against a garbled or misparsed number, not a real cap on debt size). Applied in `validateDebtValues`, which both the conversational and CSV debt paths run through before anything is saved.
4. **Missing-data human checkpoint, unchanged:** check-in returns a 422 if no debt figures are on file — it never runs on incomplete state.

## validation_check

**Riskiest output:** conversational debt parsing is the one remaining path where Claude produces a number that gets saved and then treated as financial fact in every future check-in — a "confidently wrong" parse (e.g., mishearing "$8,400" as $84,000, or a sign error) would look completely normal downstream and nobody would flag it.

**The check:** `validateDebtValues()` runs as a self-review pass on Claude's own structured output *before* it's saved — rejecting `≤ 0` and `> $2,000,000` values, and any debt missing a label. It's applied uniformly, so the same guard also covers a hand-typed or CSV-uploaded amount that's mistyped (an extra zero, a missing decimal). Cheap (no extra LLM call — pure arithmetic on the parsed result) and catches the exact failure mode named in Step 1's risk analysis.

## applied_changes

| Change | Where |
|---|---|
| Required-columns check (Income/Bills/Due Date/Amount/Paid), refactored into a shared `validateRows()` | `lib/validateCsv.ts` |
| Extracted CSV line-parsing into a shared helper | `lib/csv.ts` |
| New debt value sanity guardrail | `lib/validateDebt.ts` |
| New deterministic debt CSV validation | `lib/validateDebtCsv.ts` |
| Debt route now branches on content-type: CSV upload (deterministic) vs. conversational (Claude) — both run through the same value guardrail before saving | `app/api/debt/route.ts` |
| Check-in route now accepts either a CSV file or typed budget rows, both validated by the same `validateRows()` before the Claude call | `app/api/checkin/route.ts` |
| Forced tool use (`tool_choice: { type: 'tool', name: 'deliver_checkin' }`, was `'auto'`) — with `auto`, Claude would sometimes reply in plain text instead of calling the tool, most often on "good" mood input, producing a generic 500 on ~60% of live-tested runs; forcing the tool closed it, verified 5/5 on a live re-run | `app/api/checkin/route.ts` |
| Added upload/type toggles for both budget and debt sections | `app/page.tsx` |
| Guidelines and guardrails documented for future edits | `CLAUDE.md` |
