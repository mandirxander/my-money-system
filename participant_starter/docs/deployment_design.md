# Deployment Design — My Money System

---

## testing_reality_check

- **Who tested:** Only the builder — no outside tester has ever opened the app.
- **How:** On localhost, across Claude Code sessions, using the builder's own real financial data (car loan $8,400, credit card $1,100, $3,200 paycheck, $1,200 rent).
- **What got tested:** All 8 CSV edge cases against `validateCsv`/`validateRows`; live check-in advice across good/stressed/crisis moods (Session 10, which surfaced and fixed the `tool_choice` bug — see `docs/reports/decisions.md`, 2026-08-12); a full end-to-end Playwright pass in Session 8.
- **What didn't get tested:** Anyone else's data — different debt counts, unfamiliar budget structures, different phrasing habits; any device or network besides the builder's own; and the mood-acknowledgment inconsistency just found in `evaluating_for_scale` Step 2 was only caught because the builder deliberately re-ran identical input side-by-side — a real tester wouldn't do that, they'd just see one output and either trust it or not.

## deployment_purpose

My quality risk is check-in advice reliability and content quality — specifically the mood-acknowledgment consistency gap and general conciseness/groundedness. Testing so far hasn't exposed how often that gap (or anything like it) actually shows up in real use, because I only test with my own data, formatted the way I already know works, and I deliberately re-run identical inputs to go looking for inconsistency — a real user never does that; they see one output, once. Deployment will help by putting real varied financial data and real, unrehearsed phrasing in front of the system, and giving me a signal — via tester reactions — of whether output quality actually bothers someone in practice, not just in a side-by-side comparison only I would run.

## tester_profile (partial — commitments not yet locked)

4–5 testers planned: spouse, my family, spouse's family. Not yet formally committed — still "I will ask," not confirmed yeses. Everyone will enter their **own real household's numbers**, not view the builder's data as a demo. Per the workflow's own rule, this step isn't closed until real commitments exist — flagged here rather than papered over. Resume once actual yes/no answers are in.

## household_isolation_gap (found and closed, 2026-08-12)

Confirming "own real data" as the plan surfaced a blocking gap: the app had zero data separation between users — every Supabase table was a single shared dataset with no per-user scoping. Deploying to 4–5 households as originally scoped would have had each household silently overwrite the last. Closed with minimal per-household isolation (not real auth) — see `docs/reports/decisions.md`, 2026-08-12, "Minimal per-household data isolation." Verified end-to-end live: two households (`mandi`, `testfamily`) writing and running check-ins concurrently with zero data bleed between them, including the check-in's Claude call and snapshot write.

## deployment_mapping

- **Delivery:** The deployed web app itself, at its Vercel URL — no other touchpoint. Matches `implementation_design.md` (no in-app reminders, bi-weekly check-in via the user's own calendar).
- **Runtime check:** Everything runs on page load or a button click — no scheduled jobs, no background workers, no cron. Fits serverless as-is; nothing to trigger manually.
- **Data & access:** Case B (testers' data must be kept apart) — handled by the household-key isolation above. Access approach: no login/signup, just a typed household name — a lightweight middle ground answering Step 3's shared-account-vs-individual-signin question. Both standing rules hold: Supabase calls are server-only (`app/api/*/route.ts`), and `SUPABASE_SERVICE_ROLE_KEY` carries no `NEXT_PUBLIC_` prefix.
- **Integrations:** Anthropic API + Supabase — both cloud services, nothing tied to the builder's machine or a local file path. Nothing to proxy.
- **Environment variables for Vercel** (Project → Settings → Environment Variables):

  | Key | Prefix | Exposure |
  |---|---|---|
  | `ANTHROPIC_API_KEY` | none | server-only |
  | `NEXT_PUBLIC_SUPABASE_URL` | `NEXT_PUBLIC_` | browser-exposed (correct, safe) |
  | `SUPABASE_SERVICE_ROLE_KEY` | none | server-only — never rename to add `NEXT_PUBLIC_` |

  `SENDGRID_API_KEY` is in `.env.local` but unused anywhere in the code (SendGrid deferred to V2) — skip adding it to Vercel.

- **Cost check:** 4–5 testers, bi-weekly check-ins, one short Sonnet call per check-in (512 max_tokens) — trivially cheap, Vercel Hobby + Supabase free tier cover this comfortably. No cost/speed levers needed at this scale.
- **Validated against Steps 2–3 — one gap remains:** the rest of Step 3 (manual dependencies beyond auth, which the household-key approach already answers) hasn't been walked yet. Feedback wiring is now closed — see below.

## feedback_wiring (closed, 2026-08-12)

**Where a tester's reaction lands:** A thumbs up/down widget ("Was this check-in helpful?") on the results page, once all three advice cards are revealed. Posts to `/api/feedback`, which writes one row to a new `checkin_feedback` table (`household_key`, `reaction`, optional `comment`, `created_at`) — scoped by household key like every other table. Verified live: valid reactions save correctly per household, missing header blocked, invalid reaction value rejected. See `docs/reports/decisions.md`, 2026-08-12.

**Before this fix:** the mechanism didn't exist at all — no feedback capture anywhere in the code, despite closed-loop feedback being one of the four original project requirements. Tester reactions would have gone nowhere.

**Reading feedback during the pilot:** No dashboard — the builder queries the `checkin_feedback` table directly in Supabase during/after the test window. Sufficient for 4–5 households.

**The return-loop honesty check — planted here, to answer during the test window:** *Did any tester come back and run a second check-in unprompted, without being asked to?* If nobody returns without a nudge, that's a real finding about the return loop, not a failure of the testers — the whole product's argument rests on a bi-weekly habit forming on its own. Answer this in the Session 6 reflection once the pilot has actually run.

## current_manual_dependencies

Only `npm run dev` on the builder's own machine — this goes away entirely once deployed to Vercel, which restarts and scales on its own. Supabase is already a hosted service; nothing else in the system touches the builder's laptop.

## independence_requirements

- **Runtime:** Vercel is serverless — nothing to restart manually, no 2am-crash scenario to plan for.
- **Data persistence:** Supabase persists automatically; no session-loss risk, no "start fresh each session" tradeoff needed.
- **Auth:** the household key (see `household_isolation_gap` above) — no demo account, no admin approval step, no login system to build or maintain.
- **Integrations:** Anthropic API + Supabase are both fully hosted; nothing proxied through the builder.
- **Observability:** staying manual, deliberately — no alerting dashboard. The builder checks the `checkin_feedback` table and Vercel's function logs directly if a tester reports something; in-app error banners (the review screen's Retry) are the tester-facing signal in the moment.
- **Minimum viable independence, confirmed met:** testers reach it without the builder starting anything; it won't crash from being left alone; a link + household name needs no hand-holding; errors are visible somewhere (in-app + Vercel logs).

**Staying manual, explicitly:**
- No error-tracking/alerting service — Vercel's own logs, checked by hand
- No automated tester onboarding — the builder sends the link directly (consistent with SendGrid staying deferred to V2)
- No backup strategy beyond Supabase's own defaults

---
