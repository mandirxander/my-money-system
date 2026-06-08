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
