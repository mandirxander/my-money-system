# Spike — My Money System Check-In

**Built:** 2026-06-16
**Rung:** 2 (code spike — one real data source + one LLM call)
**Risk tested:** CSV formatting (Risk 2) — does the system catch bad data before giving advice?

---

## What was built

A minimal Next.js page + API route that connects a CSV budget upload to the Claude API and returns a structured check-in response.

**Files:**
- `app/app/page.tsx` — UI: mood selector, Baby Step selector, CSV upload, response display
- `app/app/api/checkin/route.ts` — POST handler: parses CSV, calls Claude, returns response

**The flow:**
1. User selects mood (good / stressed / crisis) and current Baby Step
2. User uploads a CSV budget export
3. Claude validates the CSV structure first — flags problems before giving advice
4. If valid, Claude returns a structured response: What's on track / What needs attention / One action (under 150 words)
5. CSV preview is shown alongside the response so you can see what was parsed

---

## How to run

```bash
cd participant_starter/app
npm run dev
```

Open http://localhost:3000

---

## Running the test cases

Open `data/evaluations_data.csv` for the full test case matrix. For each case:

1. Prepare the CSV variation described in `input_description`
2. Upload it to the running spike
3. Record in the CSV: `actual_output`, `quality_rating` (1–5), `notes`, `patterns_observed`, `improvement_ideas`

**Rating guide:**
- 5 — Handled perfectly (parsed correctly or flagged the issue clearly)
- 4 — Mostly correct, minor issue
- 3 — Partial — some useful output but missed something important
- 2 — Poor — gave advice but shouldn't have, or flagged wrong thing
- 1 — Silent failure — gave confident advice based on bad data

**What to watch for:** Silent failures (rating 1–2) are the most important to catch. A clear error message is always better than bad advice delivered confidently.

---

## What the spike does NOT do

- No Supabase — data is not persisted
- No authentication
- No multi-turn conversation
- No PDF or Excel uploads — CSV only
- No deployment — local only for now
