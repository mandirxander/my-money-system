# Session Log

> Append-only. Add new entries at the bottom. Never edit past entries.
> At the end of every session, ask Claude: "Summarize what we did today and append a new entry to docs/reports/session_log.md"
>
> **Before writing a new entry:** Ask the user these three questions first and wait for their answers:
> 1. What did you try that didn't work this session?
> 2. What did you learn?
> 3. What do you want to focus on next session?
>
> Then combine their answers with a summary of what was accomplished, present the full draft for review, and only write it once they approve.

---

## Session 1 — 2026-05-28

**Goal for this session:** Complete orientation and ideation workflows — set up the workspace, build the participant profile, and define the project problem and solution direction.

**What we did:**
- Completed orientation workflow: profile conversation, goal setting, initial project exploration, personalized CLAUDE.md
- Completed ideation workflow: framed the problem (current state → desired state), challenged core assumptions, generated four solution hypotheses, selected Hypothesis 4 (AI as Collaborative Monitor — Level 2.5), designed a prompt-based experiment
- Created: `participant_profile.md`, `CLAUDE.md`, `docs/problem_definition.md`, `prompts/testing_prompt.md`

**What we tried that didn't work:**
- In the orientation conversation, sharing what she wanted out of the course led Claude to start shaping a project idea too early — the profile captured what was said in the moment rather than drawing out what she actually wanted to build

**What we learned:**
- You should have a pretty good idea of what you want to build with strong opinions on it — without that, what gets captured feels spotty and shaped by the conversation rather than by the builder

**Blockers or open questions:**
- Experiment not yet run — four test scenarios ready in `prompts/testing_prompt.md`, to be tested in Claude.ai or ChatGPT before Session 3

**Next session focus:** Details and product design

---

## Session 2 — 2026-05-29

**Goal for this session:** Build out custom Claude commands and craft an initial prompt for the check-in feature.

**What we did:**
- Created /start-session command — generates a project brief at the top of each session from session log, decisions, git history, and problem definition
- Created /build-prompt command — interactive prompt-building conversation that outputs a copyable, optimized prompt
- Used /build-prompt to draft the check-in prompt (saved to prompts/checkin_prompt.md)
- Created /wrap-up command — guides end-of-session reflection and appends entries to session_log.md and decisions.md

**What we tried that didn't work:**
- Nothing notable this session.

**What we learned:**
- How to create custom commands and skills in Claude Code

**Blockers or open questions:**
- Experiment not yet run — four test scenarios ready in prompts/testing_prompt.md, to be tested before Session 3
- Check-in prompt is a starting point and may evolve as the build progresses

**Next session focus:** Testing prompts

---

## Session 3 — 2026-06-08

**Goal for this session:** Work through Session 2 homework: map project requirements, install the common stack, and begin the evaluation dataset workflow.

**What we did:**
- Completed Part 1: mapped all 8 project requirements (4 stack, 4 project-specific) and saved to docs/problem_definition.md
- Completed Part 2: scaffolded Next.js + Tailwind + shadcn/ui, created .env.local with Anthropic and Supabase credentials (Node already installed)
- Began Part 3 (evaluation dataset workflow, Step 1): ran Scenarios 1, 2, and 3 from prompts/testing_prompt.md in Claude.ai
- Captured experiment findings in docs/evaluation_design_report.md
- Updated docs/problem_definition.md with new finding: cognitive load at point of emotional stress
- Began Step 2: surfaced quality dimensions from testing (consistency, emotional calibration, output format/structure)

**What we tried that didn't work:**
- The testing scenarios revealed a critical gap: the conversational piece needs significant work — response length and structure are not ready for a user who is emotionally overwhelmed

**What we learned:**
- Testing assumptions is vital — the experiment made concrete what planning couldn't. The conversational quality of the check-in is the hardest and most important problem to solve. This approach (test before build) is one to carry into all future projects.

**Blockers or open questions:**
- Sensitivity level question unresolved: should emotional calibration be explicit (user sets it) or inferred (system reads it from input)?
- Step 2 of evaluation dataset workflow not yet complete
- Vercel not yet connected (waiting until spike is ready to deploy)
- API keys shared in chat — both Anthropic and Supabase keys should be regenerated

**Next session focus:** Finish the sensitivity level question and the spike build (Rung 2)

---

## Session 4 — 2026-06-16

**Goal for this session:** Finish the sensitivity level question and build the spike (Rung 2)

**What we did:**
- Ran /sync-upstream — pulled in new Session 3 guides (LLM API guide, workflow cards, workflow toolbelt map, Supabase security handout)
- Resolved sensitivity level question: explicit mood check before each check-in for V1, inferred tone adjustment flagged for V2
- Completed Steps 2–7 of evaluation dataset workflow: quality dimensions, risk hypotheses, prioritization, test case design (8 cases), learning objectives, CSV evaluation matrix
- Installed Anthropic SDK (@anthropic-ai/sdk v0.104.2)
- Built the spike: CSV upload → Claude API call → structured check-in response (app/api/checkin/route.ts + updated app/page.tsx)
- Created 7 test CSV variations in docs/research/spike/test-data/
- Hit API key blocker — personal key has no credits, shared key from Sunday not received

**What we tried that didn't work:**
- Running spike test cases — blocked by API key with no credits. Discovered that the Claude API requires a separate paid subscription from Claude Pro.

**What we learned:**
- There's a lot that goes into building a product that isn't visible until you're in it. Testing assumptions with AI as a coworking partner is genuinely useful in a way that was surprising.

**Blockers or open questions:**
- API key unresolved: need Sunday's shared key to run spike test cases
- Spike test cases not yet run — all 8 CSV variations ready, waiting on key
- Vercel not yet connected

**Next session focus:** Get Sunday's key and finish the spike tests

---

## Session 5 — 2026-06-23

**Goal for this session:** Get a working API key and finish running the spike test cases

**What we did:**
- Resolved API key blocker — updated .env.local with working Anthropic key
- Confirmed spike is live and functional (dev server running at localhost:3000)
- Ran all 8 evaluation test cases against the spike and logged results in data/evaluations_data.csv
- Tested with real personal Excel budget — system correctly blocked and identified all formatting issues
- Created CSV_BASELINE_WELLFORMED.csv and confirmed the happy path delivers valid structured advice
- Captured key finding: LLM non-determinism caused inconsistent validation behavior on CSV_FORMAT_CURRENCY_SYMBOLS (one run blocked, one gave advice)
- Logged V2 decision: AI-assisted CSV auto-fix with user confirmation
- Completed Session 2 homework reflection (all 3 questions) — saved to sessions/session_02/reflection.md

**What we tried that didn't work:**
- API key had to be copy-pasted carefully — hand-transcribing keys introduces character ambiguity (l vs I, _ vs __) that causes auth failures
- A duplicate .gitignore was created in participant_starter/ in addition to the root — needs to be resolved

**What we learned:**
- You have to put bounds on how you want AI to talk to you — tone, verbiage, and response length need to be explicitly defined; the AI should emulate a specific character or voice you have in mind
- The flow breaks when AI gives emotionally flat or overly long responses, especially to users already coming in overwhelmed
- CSV parsing was the top quality risk and it proved more impactful than expected — bad data fed to the AI can push financial advice in a genuinely harmful direction
- When data was real, output was good; when scenarios were AI-generated, edge cases broke more easily
- The experience of reading what went wrong and manually fixing a CSV is too much friction — the AI should handle the fix with user approval (V2)

**Blockers or open questions:**
- Double .gitignore file in participant_starter/ — needs to be cleaned up
- Supabase gap not yet addressed (server-side pattern not confirmed)
- Vercel not yet connected
- CLAUDE.md not yet updated with V2 CSV auto-fix instruction or Project Phase change

**Next session focus:** Start Session 3 homework — fix the Supabase gap, resolve the double .gitignore, and begin implementation design workflow

---

## Session 6 — 2026-06-24

**Goal for this session:** Complete Session 3 homework — finish the implementation workflow (Parts 2–4) and verify the Supabase setup

**What we did:**
- Completed implementation workflow Steps 2–5:
  - Step 2: Designed the interaction model (bi-weekly check-in, Baby Step drives focus, piece-by-piece advice, missing data gate)
  - Step 3: Mapped the data flow (CSV upload + conversational debt input, Supabase for storage, Claude API for advice)
  - Step 4: Scoped the POC (defined what to build first, applied the ruthless filter, wrote the definition of done)
  - Step 5: Generated POC specs — saved to docs/specs/poc_specs.md
- Updated docs/implementation_design.md with all workflow outputs
- Updated CLAUDE.md — project phase changed to "Building POC", added quality risk, interaction model, data flow decisions, cut/simplified/parked features
- Verified Supabase server-side pattern is correct (service_role key, no anon key in browser code)
- Removed NEXT_PUBLIC_SUPABASE_ANON_KEY from .env.local
- Confirmed double .gitignore issue from Session 5 was already resolved

**What we tried that didn't work:**
- Pausing and coming back mid-session didn't resume exactly where expected — need to wrap up after every session to preserve state cleanly

**What we learned:**
- Building a POC involves constantly revisiting and iterating on the original idea at much greater depth — there are more assumptions to surface and more decisions to make than planning suggests

**Blockers or open questions:**
- Vercel not yet connected
- Supabase tables not yet created (user_profile, debt_figures)
- Session 4 homework not yet started

**Next session focus:** Session 4 homework

---
