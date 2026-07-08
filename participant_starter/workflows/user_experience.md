# User Experience Workflow — Complete Reference

**ID:** user_experience
**Description:** Design the real UX for your POC — what the user provides, sees, controls, and approves; who owns each piece; the AI-specific risks the user needs to catch; and the interaction flow — then polish the interface

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the user experience workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete", let the participant know the workflow is complete, and remind them to update `docs/reports/session_log.md` and `docs/reports/decisions.md`

- Keep tone conversational and collaborative; explain why each UX decision matters
- Use Socratic questioning — don't prescribe UX patterns or interface designs; help them reason to it
- **This is a post-build refinement.** The participant already built the POC and a first UI (in the implementation workflow). Read their actual code in `src/` — this designs the *real* interface, not a hypothetical one, and changes get applied to the build.
- Plain language throughout. Describe what the user needs in everyday terms — no Pydantic classes, JSON schemas, or field-mapping tables. The point is a clear, usable interface, not formalism.
- Match the participant's technical level from `docs/reports/participant_profile.md` — behavior and flow for non-technical participants, real terms for technical ones.
- **Watch for structural gaps in Step 3.** If a flagged AI-specific risk needs more than a visible UI cue — a retry cap, a validation check, a code-level guardrail — don't let the participant patch it as just a UX checkpoint. Proactively say so, and help them open `docs/agent_behavior_design.md` to add the fix there, then apply the guardrail in `src/` alongside the UX checkpoint.
- Reads from: `docs/implementation_design.md`, `docs/agent_behavior_design.md`, `docs/specs/poc_specs.md`, `docs/problem_definition.md`, `docs/reports/participant_profile.md`, and the built code in `src/`

---

## Steps

### Step 1: Design the real UX — what the user provides, sees, controls, and approves
**Goal:** Define what the user needs from the interface, grounded in the POC they actually built — across four lenses: provide, see, control, approve

## Conversation Flow

Start grounded in the real thing. Read `src/` (the POC and its first UI), plus `docs/implementation_design.md` (the interaction model from implementation Step 2) and `docs/agent_behavior_design.md` (whether it's an agent or a service). Summarize the current experience back:
- "Here's how a user interacts with your POC today: [walk the current flow]."

Then ask if that's accurate and work through the four lenses. Keep it in plain language — what the *user* needs, not internal data structures.

### 1. What the user provides

- "What does the user give the system to start — and do they hand over everything up front, or does the system ask for more along the way?"
- "Are there preferences or constraints they'll always want to set (tone, format, rules)?"

### 2. What the user sees

- "While the system is working, what does the user need to see to feel oriented? (Where am I? What's been done? What's next?)"
- "What does the system show them at the end?"

### 3. What the user controls

- "What should the user be able to change mid-task — and can they pause, retry, or undo?"
- "Which settings affect how the system behaves?"

### 4. What the user approves

- "What does the system produce that the user needs to check or sign off on before it continues?"
- "What would be costly if the system got it wrong and the user *didn't* catch it?" (ties to their quality risk)

Capture all four in plain language. Note any assumptions the user brings or anything they already know the system can't do.

**Deliver:** Save to `docs/user_experience_design.md` with section:
- user_needs (what_user_provides, what_user_sees, what_user_controls, what_user_approves, user_assumptions)

**User Context:**
- Provides: Their understanding of what the user needs to do, see, and decide
- Receives: A plain-language map of the user's needs across the four lenses

**Confirm before continuing:** "Does this capture what your user needs to feel oriented and in control?"

---

### Step 2: Decide who owns each piece — user, agent, or co-authored
**Goal:** For each thing the user provides, sees, controls, or approves, decide who's allowed to change it — so user edits don't vanish and the system doesn't override the user's intent

## Why this matters

Without clear ownership, user edits disappear or the system overwrites what the user meant. Three plain options for each piece:
- **User-owned** — the user sets it; the system only reads it.
- **Agent-owned** — the system sets it; the user only views it.
- **Co-authored** — both can change it, with an explicit rule for how.

## Conversation Flow

Go through the pieces from Step 1. For each, ask:
- "Who should be able to change this?"
- "If the user edits it, should the system respect that edit? If the system updates it, can the user override?"
- "What happens if they disagree?"

### Co-authoring patterns (for the pieces that really are shared)

- **System proposes, user approves/edits** — system drafts it; the user accepts, edits, or rejects (plans, drafts, summaries).
- **User provides, system refines** — user writes it; the system normalizes/expands; the user can see and revert (queries, inputs).
- **User controls, system suggests** — the user owns it; the system offers suggestions as proposals (preferences, constraints).
- **System tracks, user corrects** — the system maintains it; the user can submit corrections (progress, status, result lists).

**Keep co-authored pieces to a minimum** — they're the most complex. Prefer clear single ownership wherever you can.

**Deliver:** Append to `docs/user_experience_design.md` with section:
- ownership_rules (per-piece owner: user-owned / agent-owned / co-authored, plus the co-authoring rule where it applies)

**User Context:**
- Provides: Their decisions about what the user must control vs. what the system can manage
- Receives: Clear ownership rules that prevent accidental overwrites or authority confusion

**Confirm before continuing:** "Do these ownership rules match your expectations for user control vs. system autonomy?"

---

### Step 3: Check the AI-specific risks the user needs to catch
**Goal:** Walk the AI-specific ways the system can go wrong, and make sure each one is visible to the user and catchable through the interface

## Why this matters

LLM-powered systems have failure modes ordinary software doesn't. The UX is the user's safety net — for each risk, the user needs to *see* it and be able to *catch* it.

## The risks to check

For each, ask: **where in your flow could this happen, what does the user see when it does, and how can they catch and correct it?**

- 🔍 **Hallucination** — making up plausible-but-false content. Where does the system generate facts? Do users see sources or a way to verify?
- 🎲 **Stochastic behavior** — same input, different output. Where does it generate or decide? Can the user regenerate if a result is off?
- 🔄 **Context loss** — forgetting earlier parts of the interaction. Does it keep history? Can the user see what context it's working from?
- 🎯 **Instruction-following failures** — misreading what the user asked for. Where does it interpret intent? Can the user correct a misunderstanding mid-task?
- 📊 **Overconfidence** — presenting uncertain output as certain. How does it signal when it's unsure?

Tie this back to their **primary quality risk** — that's usually where the most important oversight checkpoint belongs.

If any risk has no way for the user to catch it, flag it and add a checkpoint or control to the relevant piece from Steps 1–2.

**Some gaps need more than a UI checkpoint.** A visible cue (a warning, a "this might be off" label) helps the user *notice* a risk. But some risks need a *structural* fix underneath — a cap on retries, a validation check, a guardrail in the code — or the visible cue is just decoration over a real hole. If a gap you find is structural rather than visible, don't just patch it here: go back to `docs/agent_behavior_design.md` and add the fix there, then apply the guardrail in `src/` itself, alongside whatever UI checkpoint you add.

**Deliver:** Append to `docs/user_experience_design.md` with section:
- ai_ux_risks (per risk: where it occurs + the user oversight mechanism; note any new checkpoints added)

**User Context:**
- Provides: Their sense of where these risks show up in their system
- Receives: A risk check with concrete user-oversight mechanisms for each

**Confirm before continuing:** "Are there any other risks or gaps you foresee that need the user in the loop?"

---

### Step 4: Design the interaction flow, then make ownership and AI risk visible
**Goal:** Lay out the experience as a step-by-step flow, then make the ownership and AI-risk decisions from Steps 2–3 visible on screen, and check that every screen looks consistent

## Part A — The interaction flow

Using the pieces, ownership, and risk checkpoints from Steps 1–3, walk the experience start to finish in plain language:

1. **Start** — what the user provides, and how the system confirms it got it.
2. **While it works** — what the user sees (progress, status) while the system runs.
3. **Checkpoints** — where the system pauses for the user to approve, edit, or steer (from the ownership rules and the agency/autonomy balance in implementation Step 2).
4. **When something's off** — what the user sees and can do when an AI risk from Step 3 shows up (regenerate, correct, override).
5. **Done** — the final state, and what the user can do next (restart, modify). If the system has a **return loop** (a reason to come back, from ideation), make sure the flow leads the user toward it.

Show the flow back to them: "Does this match how you imagine the experience? What would you change?" Iterate until it feels right.

## Part B — The design pass — Make it match your design, make ownership and AI risk visible, then check consistency

Now refine your first UI pass into the experience you actually designed. Your component choices from Session 4 stay — this pass is about form, visibility, and consistency. Work through these in order (mechanics for the first two are in `guides/shadcn_design_system_guide.md`):

1. **Apply the typography ramp** (one-time, if you haven't) — the copy-paste snippet from the guide's "A typography ramp" section, handed to Claude verbatim. This gives every screen the same text hierarchy.
2. **Design pass with a visual reference on your main screen.** Your Steps 1–3 decisions drive *what's on the screen*; a visual reference drives *how it looks*. Hand Claude a reference image — a Figma frame export, a photo of a sketch, or a screenshot of an app whose layout you admire (no plugins needed; save it in the project and `@`-reference it, per the guide) — using the guide's "From your design to the screen" prompt, and iterate by screenshot until it matches your intent. If you're happy with how the screen already looks, say so and skip to the next move — the reference is a channel for *your* design, not an obligation.
3. **Add a UI cue for each point of ownership and AI risk from Steps 2–3.** For each one, show it on screen — e.g. a small "AI-drafted, please review" label above a drafted output, with a button so the user can approve it or edit it first. The user should be able to see and act on these without you having to explain them.
4. **Check that every screen is visually consistent** — same colors, styles, components, and now the same type ramp, not just the main screen. This is a review, not new styling. Optional: screenshot a screen next to your main one and ask Claude to fix anything that doesn't match — or just eyeball it and ask Claude directly.
5. **Record your UI conventions in `CLAUDE.md`** — theme, ramp, component vocabulary, layout container. Write it yourself or have Claude do it: the guide's "Record your UI conventions" section has a template plus a prompt that makes Claude read the real code and write the section for you — either way, review it. From here on, Claude styles new work from this standing context instead of you re-explaining it each prompt.

Walk the changes through with the participant and **apply them to `src/`** together — this is real, applied to the running POC, not a spec for later.

*(Optional, advanced — not required: an AI UI builder, e.g. Claude Design or Figma Make, as an ideation aid only for anyone stuck on a blank-canvas screen — bring what you like back into Claude Code and build it on the real stack, don't replace the in-loop workflow with it. Or, for anyone wanting to go further, swapping shadcn for a different design system entirely, e.g. Material Design — shadcn/ui already is a full design system, so this is optional, not expected.)*

**Deliver:**
1. Append to `docs/user_experience_design.md` with sections: interaction_flow (step-by-step walkthrough, checkpoints, error/uncertainty handling, return-loop hook), ui_visibility (the ownership/AI-risk cues added, the design-pass and consistency changes made)
2. Apply the design pass, ownership/AI-risk cues, and any consistency fixes to the interface in `src/`, and add the UI-conventions section to `CLAUDE.md`

**User Context:**
- Provides: Their design intent (a visual reference where they have one) and their sense of the experience's pacing and checkpoints
- Receives: A clear interaction flow, a main screen that matches their design, ownership and AI risk visible on screen, and every screen looking consistent

**Confirm before continuing:** "Does the flow feel intuitive, does the main screen match the design in your head, are the ownership/AI-risk cues clear, and does everything look consistent?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection, add any key decisions and their reasoning to `docs/reports/decisions.md`, and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `user_experience_design.md` | `docs/` | User needs across the four lenses, ownership rules, AI-specific UX risk checks, the interaction flow, and the ownership/AI-risk visibility + consistency changes made |
