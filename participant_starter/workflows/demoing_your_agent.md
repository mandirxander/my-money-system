# Demoing Your Agent Workflow — Complete Reference

**ID:** demoing_your_agent
**Description:** A leave-behind, self-paced guide — build a simple, compelling demo narrative for what you built, so you can show it off in a portfolio, to coworkers, or to a hiring manager

---

## How to Use This Workflow

**This is optional, encouraged, and self-paced — there's no session built around it.** The course is over after Session 6; this is something to come back to whenever you want to actually show this project to someone. Run it in one sitting (~30–40 min) whenever you're ready.

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the demoing your agent workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete" and let the participant know they're ready to record or present

- Keep this fast and low-friction — one clear question per beat, not multiple rounds of probing. The goal is a usable demo, not a perfect one.
- Use Socratic questioning, but don't loop on it — offer a recommendation if they're unsure rather than open-ending every question.
- Reads from: `docs/reports/participant_profile.md`, `docs/problem_definition.md`, `docs/implementation_design.md`, `docs/agent_behavior_design.md`, `docs/user_experience_design.md`, `docs/deployment_design.md`, `docs/reports/session_log.md`, `docs/reports/decisions.md`

---

## Steps

### Step 1: Pick who this is for and the one thing you want them to remember
**Goal:** Identify the audience and the single key achievement to highlight

## Conversation Flow

Before asking, skim `docs/reports/session_log.md` and `docs/reports/decisions.md` for candidate achievements — a hard problem worked through, a real finding from testing, a tradeoff they reasoned through and could defend. These are usually more concrete than what comes to mind on the spot.

Ask directly, in one pass:
- "Who's most likely to actually see this — a hiring manager, coworkers, a portfolio site, potential collaborators, someone else?"
- "What's the one thing you want them to remember about this project?" Push for something specific, not "it works" — the hardest problem you solved, or the concrete impact it has. If they're drawing a blank, offer 1–2 candidates you found in their logs: "Your session log mentions [X] — is that the kind of thing you mean, or something else?"

If they're still unsure, offer a default based on what you know of their goals from `participant_profile.md` and suggest it rather than asking more questions.

**Deliver:** Save to `docs/demo_plans.md` with section:
- audience_focus (audience, key_achievement and why it matters)

**Confirm before continuing:** "Does this focus feel right?"

---

### Step 2: Pick a narrative arc
**Goal:** Choose a high-level story shape for the demo

## Conversation Flow

Present **two** narrative options (not three) — high-level story beats only, tailored to their audience and achievement from Step 1. Example shapes to draw from:
- "Problem First" → the pain point → your approach → the result
- "Achievement First" → lead with what you're proudest of → how it works → why it matters

Show both as a short bullet list each. Ask which fits better, or whether they want a mix. Converge in one pass — don't do a separate "what works/doesn't" round per option.

**Deliver:** Append to `docs/demo_plans.md` with section:
- narrative_architecture (chosen_narrative with story beats)

**Confirm before continuing:** "Does this capture the story you want to tell?"

---

### Step 3: Apply the 3-act structure and list what you have to show
**Goal:** Add story structure, then inventory supporting materials

## Conversation Flow

Map their chosen narrative onto three acts:
- **Act 1 — Setup:** the starting point / the problem
- **Act 2 — Confrontation:** the hard part, what made it tricky
- **Act 3 — Resolution:** the solution and what it makes possible now

Then ask once: "What do you actually have to show — screen recordings, screenshots, real numbers from your eval or deployment, before/after examples?" Take the list as given; don't probe deeper on each item.

**Deliver:** Append to `docs/demo_plans.md` with section:
- 3_act_structure (Act 1/2/3 beats, supporting_materials list)

**Confirm before continuing:** "Does this structure make sense, and do you have enough to show?"

---

### Step 4: Build the outline and script together
**Goal:** Turn the structure into something they can actually record or present from

## Conversation Flow

For each beat from Step 3, produce one line combining what's shown and what's said:
- **On screen:** the real thing if it exists (a recording or screenshot of the actual working app) — a diagram only if there's nothing real to show for that beat.
- **Say:** 2–3 bullet points of talking points, not a full word-for-word script. Plain language, their voice — narrate the *why*, not a click-by-click description of what's already visible.

Keep the whole thing to a length that plays out in **5–8 minutes**. Once drafted, ask: "Does this sound like you, and does it lead with what you actually want people to remember?"

**Deliver:** Append to `docs/demo_plans.md` with section:
- demo_outline (table or list: beat → what's on screen → talking points)

**Confirm before continuing:** "Ready to record or present from this?"

---

## Workflow Complete

All steps are complete. Let the participant know their outline is ready — no need to log this to `session_log.md`/`decisions.md`, since it's a personal leave-behind rather than course work.

---

## Output Artifacts

| File | Location | Description |
|------|----------|--------------|
| `demo_plans.md` | `docs/` | Audience + key achievement, chosen narrative, 3-act structure with supporting materials, and a beat-by-beat outline (what's on screen + talking points) ready to record or present from |
