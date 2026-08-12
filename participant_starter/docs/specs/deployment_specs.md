# Deployment Specs — My Money System

Implementation-ready specs for deploying the POC to a small pilot group. Full reasoning behind each decision lives in `docs/deployment_design.md`; this file is the executable summary.

---

## deployment_context

**Why deploying:** The primary quality risk has moved to check-in advice generation — specifically a mood-acknowledgment consistency gap and general conciseness/groundedness (see `docs/evaluating_for_scale_design.md`). Only the builder has ever tested the app, with their own data, formatted the way they already know works — that can't expose how the system holds up against real, unrehearsed phrasing and varied household data.

**Who's testing:** 4–5 households — spouse, builder's family, spouse's family. **Not yet formally committed** — still "I will ask," not confirmed yeses. This section will need real names/commitments filled in before the deploy checklist below can be fully executed.

**What makes this successful:** Not adoption metrics. Two concrete signals: (1) do testers' `checkin_feedback` reactions (👍/👎) surface the mood-acknowledgment gap or anything like it — problems only visible in a side-by-side comparison the builder ran, not to a first-time user; (2) does anyone run a second check-in unprompted (the return-loop honesty check).

---

## infrastructure_specifications

**Vercel deployment:**
- Connect the GitHub repo to Vercel (deploys automatically on every push to `main`) — no CLI needed for this project.
- **Health check:** open the deployed app in a real browser and run one full check-in start to finish — pick a Baby Step, enter debt/budget figures, run the check-in, react on the results page. Do not use `curl` or another automated check — Next.js page code contains placeholder text that can look like an error to a naive script, and the form/button interactions need a real click to test.

**Delivery mechanism:**
- The deployed web app itself, at its **permanent** Vercel project link (e.g. `my-money-system.vercel.app`) — not the one-off link tied to a specific deploy, which stops working the next time the builder deploys. Send testers the permanent link only.

**Data persistence (Supabase):**
- Existing Supabase project carries over as-is. Case B (testers' data kept apart) is handled by the `household_key` column on all 6 tables (`user_profile`, `debt_figures`, `investment_figures`, `budget_figures`, `checkin_snapshots`, `checkin_feedback`) and the `x-household-key` header every route requires.
- No backup strategy beyond Supabase's own defaults — acceptable for a short pilot window.

**Anything staying manual:**
- No error-tracking/alerting service — Vercel's function logs, checked by hand.
- No automated tester onboarding — builder sends the permanent link and instructions directly.
- No dashboard for reading feedback — builder queries `checkin_feedback` directly in the Supabase dashboard.

---

## access_and_monitoring

**Tester access instructions** (to send once testers are confirmed):
1. Go to `[permanent-vercel-url]`
2. Type your household name when prompted (e.g. your first name) — no signup, no password, just a label so your numbers stay separate from everyone else testing
3. Pick your Baby Step, enter your debt and budget figures (typed or CSV), set your mood, and run a check-in
4. On the results screen, use the 👍/👎 to say whether it was helpful — that's the only feedback step needed

**Quality risk monitoring:**
- `checkin_feedback` table — 👎 reactions and any comments are the primary signal.
- Vercel function logs — any 500s on `/api/checkin` (e.g. a recurrence of the `tool_choice` failure mode, now fixed, or a new one).
- No raw-output logging exists yet — the builder can't currently see the *exact* advice text a tester received unless they screenshot it. **Known gap, not fixed for this pilot** (see below).

**Error visibility:** In-app error banners (the review screen's inline Retry) are the tester-facing signal in the moment; Vercel logs are the builder-facing signal after the fact.

**Feedback collection:** In-app thumbs up/down on the results page → `checkin_feedback` table, scoped by household key.

---

## deployment_checklist

**Independence verification:**
- [x] System runs without manual builder intervention (Vercel serverless; no restart needed)
- [x] Testers can access from their own devices (standard web app, no install)
- [x] No localhost references in code
- [x] API keys loaded from environment, not hardcoded
- [ ] Every key from `.env.local` also set in Vercel's Environment Variables — **do this at deploy time**: `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (skip `SENDGRID_API_KEY` — unused)
- [x] `service_role` key is server-side only — never `NEXT_PUBLIC_`-prefixed

**Remote access verification:**
- [ ] Test from a different network than the builder's — **do at deploy time**
- [ ] Test from a tester's actual device if possible — **do at deploy time**

**Quality signal verification:**
- [x] Quality risk indicators being captured (`checkin_feedback` table, live and verified)
- [x] Can see when quality issues occur (Vercel logs + in-app error banners)

**Rollback plan:**
- If a critical issue is found mid-pilot, redeploy the previous commit from the Vercel dashboard (Deployments → find last-good deploy → Promote to Production), or push a revert commit to `main`.
- The app can be paused entirely by removing the `ANTHROPIC_API_KEY` env var in Vercel if the check-in call itself needs to be shut off without taking the whole app down.

**Tester commitments:**
- [ ] Actual names and confirmed yeses from the 4–5 planned testers — **blocking, not yet done**

---

## known_limitations

- **Household key is not real auth.** It's a self-chosen text label with no verification — anyone who knows or guesses another household's key could read/write that household's data. Acceptable only because testers are trusted family, not the general public.
- **No raw-output logging.** The builder can't see the exact advice text a tester received without the tester screenshotting it or reporting a 👎 with a comment. A future iteration could log check-in outputs (with the household key) for the builder to review directly.
- **No feedback dashboard.** Reading `checkin_feedback` means querying Supabase directly.
- **No backup strategy** beyond Supabase's own defaults.
- **Tester commitments are not yet locked** — this spec is otherwise deploy-ready, but the actual pilot can't start until real yeses are in from the 4–5 planned households.

---
