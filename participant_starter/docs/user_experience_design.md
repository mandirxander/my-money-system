# User Experience Design — My Money System

---

## user_needs

**Current experience, walked start to finish** (as the app runs today, post Session 5 changes):

1. First visit → onboarding screen: pick a Baby Step, save. Returning visits skip straight to the check-in screen, reading the saved step from Supabase.
2. Check-in screen, top to bottom: current Baby Step (with a "Change step" link) → Debt figures (typed rows, pre-filled with saved values, or CSV upload) → Investments & assets, optional (same pattern) → Budget (typed rows or CSV upload, not persisted — fresh each check-in) → mood selector → a readiness checklist (debt ✓/○, budget ✓/○) → "Run check-in" button, disabled until both required pieces are ready.
3. Submit → button reads "Running check-in…" → routes to `/results`.
4. Results screen: budget status → debt progress → recommended focus, revealed one at a time via "Continue →", dated header, link back to the check-in screen.

### what_user_provides
- Baby Step — once at onboarding, changeable anytime via "Change step"
- Debt figures — typed (label/amount rows) or CSV, editable in place since Session 5
- Investments/assets — same pattern, optional, not required to run a check-in
- Budget — typed (income/bill rows) or CSV, entered fresh every check-in (no history in V1)
- Mood (good / stressed / crisis) — set fresh every check-in, never stored

### what_user_sees
- A loading state while the profile check resolves
- The readiness checklist, which reflects live state (does it have debt figures? is budget filled in enough to submit?) rather than a static instruction list
- A disabled submit button as the only signal that something's still needed — no inline "why" until they look at the checklist
- The results screen only ever shows what Claude returned — no CSV preview, no echo of the debt/investment/budget figures that went into the advice

### what_user_controls
- Baby Step, at any time
- Input mode per section (type vs. CSV), independently for debt, investments, and budget
- Editing previously saved debt/investment values directly (Session 5 addition)
- Adding/removing rows in any typed editor
- Mood, per check-in

**Notably absent:** no way to regenerate a check-in result, no way to go back a step on the results screen once you've clicked "Continue," and no pause/retry if the Claude call itself fails mid-flow (surfaces as a generic error banner back on `/`).

### what_user_approves
- Nothing, explicitly, before advice is generated — once "Run check-in" is clicked (only possible once validation has already passed), Claude's output is displayed immediately with no intermediate "here's what we're about to consider" moment.
- Validation failures are the *de facto* approval gate today: bad CSV/typed data never reaches Claude, and the user must fix and resubmit. But once data is clean, the advice itself is never shown for confirmation — it's just delivered as fact.

### user_assumptions
- Baby Step is self-reported and never verified against the family's actual situation — the system takes it as ground truth.
- Debt/investment amounts are assumed accurate once they pass the sanity guardrail (`>0`, under the plausible ceiling) — a plausible-but-wrong number (typo'd to a nearby valid figure) would sail through silently.
- Budget figures are scoped to "this pay period" implicitly — there's no on-screen reminder of that scope, so a user could plausibly upload/enter a full month expecting month-level advice.

---

## Step 1 — confirmed gaps (2026-08-03)

Reviewed against the running app. The following are confirmed as gaps to close, not just observations:

- **Input echo on results:** the figures that drove the advice (debt/investment/budget) should be visible somewhere on or before the results screen — currently invisible.
- **Back navigation on results:** the user should be able to go back after clicking "Continue" on the piece-by-piece reveal, not just move forward.
- **Retry on Claude failure:** a failed check-in call should offer a retry, not just a generic error banner back on `/`.
- **Pre-submit confirmation moment:** add a "here's what we're about to consider" step before the Claude call fires — turns the current "clean data = implicit approval" gate into an explicit one.
- **Baby Step re-verification:** stop treating the once-set Baby Step as permanent ground truth; the system should periodically re-confirm it rather than only updating on manual "Change step."
- **Budget scope shown on screen:** make the "this pay period" scope explicit in the UI wherever budget is entered or displayed.
- **Data visualization:** add visual representation of the user's figures/progress (exact form TBD) — not just text-only results.

These will inform Step 2 (ownership rules) and the later design pass — noted here so the eventual build maps back to why each change exists.

---

## Step 2 — ownership_rules (2026-08-03, confirmed)

| Piece | Owner | Notes |
|---|---|---|
| Baby Step | User-owned | System reads it; the review-screen re-verification prompt suggests reconsidering it each check-in, but the user decides — the system never changes it on its own |
| Debt figures | User-owned | Typed or CSV, edited in place; system only reads and totals |
| Investments/assets | User-owned | Same pattern |
| Budget — planned amount | User-owned | Set once per period; CSV overwrite requires explicit user confirmation before it replaces existing data |
| Budget — actual amount | User-owned | Filled in manually; system never estimates or guesses it |
| Mood | User-owned | Set fresh each check-in, never stored |
| Check-in advice (budget status / debt progress / recommended focus) | Agent-owned | Generated fresh each run, not editable, not persisted — a one-shot output the user can discard by not acting on it, but doesn't revise in place |
| `checkin_snapshots` history | Agent-owned | Written automatically per completed check-in; append-only, no user edit surface |
| Review-screen summary / readiness checklist | Agent-owned display of user-owned data | Computed from the pieces above; if it's wrong, the fix is editing the underlying data, not the summary itself |

**Nothing is co-authored.** Every input is squarely user-owned, and the only agent-generated content (the advice text) is treated as disposable rather than something the user edits or the system persists as fact. Confirmed as the right shape — Session 3's earlier debt-parsing design had a co-authored moment (Claude's parse, user-correctable via clarification) that no longer exists post-Session 8's move to structured debt entry.

---

## Step 3 — ai_ux_risks (2026-08-03, confirmed)

The system has exactly one LLM call left (check-in advice generation) — everything else (debt, investments, budget) went fully deterministic after Session 8.

| Risk | Where it could happen | User's catch mechanism | Gap? |
|---|---|---|---|
| Hallucination | Advice text could assert a figure or claim not actually supported by the real numbers | Review screen shows the exact figures before the call; results screen echoes debt/budget breakdowns alongside the advice text for eyeball cross-check | No structural check that advice figures match real ones — relies on the user noticing. Flagged as optional, not urgent. |
| Stochastic behavior | Same inputs could produce a different result on a re-run | The Retry button doubles as an implicit regenerate | No dedicated "regenerate" affordance on a *successful* result — only surfaces via a failure retry |
| Context loss | N/A within a single check-in (one-shot, not multi-turn) | `checkin_snapshots` carries prior totals forward across check-ins | No gap — already mitigated |
| Instruction-following | Misreading mood/Baby Step/figures | Tool-forced structured output constrains shape; Baby Step and mood passed as explicit stored facts, never inferred | Low risk, no gap found |
| Overconfidence | Advice stated flatly even on incomplete data (e.g. planned-only budget) | None today — no visible signal this is AI-generated output that could be wrong | **Real gap, tied to the primary quality risk** — needs a visible cue in Step 4, not new code (data is already fully validated before Claude sees it) |

Clarification: guardrail #1 in `agent_behavior_design.md` ("no retry loops, no silent auto-retry") isn't contradicted by the manual Retry button — that's a user-initiated single retry, not a silent automatic one.

Confirmed — the overconfidence gap is the one to fix with a visible UI cue in Step 4.

---

## Step 4, Part A — interaction_flow (2026-08-03, confirmed)

1. **Start** — user opens `/`; system checks for a saved profile/debt/investments/budget in the background (loading state), and confirms what it found by pre-filling those sections and showing a live readiness checklist. If nothing's saved yet, onboarding asks for the Baby Step first.
2. **While it works** — after "Confirm and run check-in," the button reads "Running check-in…"; no intermediate progress detail beyond that (single API call).
3. **Checkpoints** — two: (a) the review screen, confirming Baby Step + every figure + mood before Claude is called; (b) the readiness checklist gating the button, so an incomplete state can't reach (a) at all.
4. **When something's off** — a failed Claude call surfaces inline on the review screen with a Retry button; a validation failure on any data entry surfaces inline next to that section with a specific message. The overconfidence gap from Step 3 has no answer yet — that's Part B's job.
5. **Done, and the return loop** — results deliver piece-by-piece with back/continue nav; "← Back to check-in" returns to `/`, which is also where the user naturally lands for their next bi-weekly check-in. No separate "session complete" state — being back on the main screen, ready for the next visit, *is* the return loop.

---

## Step 4, Part B — design pass (in progress, 2026-08-03)

Done so far:
- Applied the typography ramp (verbatim snippet from `guides/shadcn_design_system_guide.md`) to `app/globals.css`.
- Removed one-off size classes from the three "My Money System" `<h1>` instances and the onboarding "Which Baby Step are you on?" `<h2>` so the ramp governs.
- Decided the compact section labels (Current debt figures / Investments & assets / Budget) let the full ramp apply rather than keeping their old `text-sm font-medium` override — confirmed via a side-by-side screenshot comparison (denser-but-small vs. clearer-but-bigger); bigger/clearer won.

Still open, to resume next session:
- Visual reference pass on the main screen (no reference image supplied yet — either bring one, or explicitly confirm the current look is good and skip this move).
- UI cue for the Step 3 overconfidence gap (no visible "AI-generated, verify the numbers" signal anywhere on the results screen yet — this is the one real gap identified).
- Cross-screen consistency check (onboarding / main check-in / review / results).
- Record UI Conventions section in `CLAUDE.md`.
