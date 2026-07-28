# Session 5 Share-Out — My Money System

## What the POC does now
Give it a budget CSV and debt figures entered conversationally, and it produces Baby Step-scoped advice — budget status, debt progress, and what to focus on — delivered piece by piece. The full quality-risk core works end to end: deterministic CSV validation, conversational debt parsing, a missing-data gate, and the Claude-generated check-in.

## Slice to walk live
**Conversational debt input → Claude parsing → Supabase → screen.** Type a debt in plain language ("my car loan is $8,400"), Claude parses it to structured JSON via tool use, it saves to the `debt_figures` table, and — if the input's incomplete or ambiguous — the system asks a clarifying question instead of guessing. Good one to demo because it shows the whole vertical slice plus the "never fail silently" behavior in one interaction.

## What changed from the initial build
- Moved CSV validation off the LLM entirely and into rule-based server-side code (`lib/validateCsv.ts`) — the spike showed identical input could get inconsistent results from an LLM validator, so validation had to become deterministic.
- Moved advice delivery off the main page and onto a dedicated `/results` page for a cleaner, less scroll-heavy experience.
- Applied the sage-garden theme (via tweakcn.com + shadcn CLI) — no visual reference or mockup used yet, that's the plan for the Session 5 UI/UX pass. Applying it exposed that the page was using hardcoded Tailwind colors instead of theme tokens, so semantic tokens (`bg-background`, `text-foreground`, etc.) had to be retrofitted across the page before the theme actually showed up.

## Reflection
- **Building changed the design:** theming needed more rework than expected — a spec or theme choice doesn't propagate until the code actually references the design system.
- **Riskiest slice held up:** CSV validation moved to deterministic rule-based code, which directly eliminated the non-determinism the spike exposed — Claude is only called once data's confirmed clean.
- **Still rough:** UI has no data visualizations yet, it's one-way output only (no conversational back-and-forth with the system), and Vercel deployment isn't connected — all next up.
