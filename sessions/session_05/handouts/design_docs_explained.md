# Design Docs (`*_design.md`) — What They're For
**AI Mentor Circle — Session 5 Reference**

By now you've produced several files ending in `_design.md`. You may not have noticed they're all the same *kind* of thing. They are — and recognizing the pattern makes them far more useful.

## What a design doc is

A **design doc** captures the *thinking* behind a part of your system — the decisions, the reasoning, and what you're building toward — separately from the code that implements it. Code says *what* the system does; a design doc says *why it's shaped that way* and *what you decided*.

It's not a file you write once and freeze. It's a **living record** you update as the system changes.

## Design doc vs. spec — two different jobs

Your project has exactly **two specs** (`docs/specs/`): `poc_specs.md` (Claude builds the POC from it) and, in Session 6, `deployment_specs.md` (Claude deploys from it). Everything else is a design doc. The test:

> **A spec is a work order — Claude *executes* it. A design doc is a decision record — Claude *consults* it.**

- A **spec** is implementation-ready instructions for producing something. Its success test: could Claude do the work from this file alone? You write it, hand it off, and verify the result against it.
- A **design doc** is your project's memory: findings, decisions, reasoning, and where changes were applied. Nothing is "built from" it — but you and Claude read it constantly so new work respects old decisions.
- A useful tell: if what you wrote was **applied the moment you wrote it** (a guardrail added to the code, a UI cue added to a screen), the file is a design doc *recording* the applied change — not a spec waiting to be executed.

## The design docs you've already written

| File | What it captures | Produced in |
|---|---|---|
| `docs/implementation_design.md` | How you'll build it — interaction model, data flow, what's in/out of scope | S4 homework (`implementation`) |
| `docs/agent_behavior_design.md` | Your scored test run, and the system's guidelines, guardrails, and behavior check — with where they were applied | S5 homework (`agent_behavior`) |
| `docs/user_experience_design.md` | User needs, ownership, AI-risk checks, interaction flow, the design pass | S5 homework (`user_experience`) |

## Why they matter

- **Claude Code reads them.** Pointing Claude at a design doc gives it the reasoning, not just the code — so its edits respect your decisions.
- **They survive your memory.** Three weeks from now you won't remember why you made a call. The doc will.
- **They make changes safe.** When you change the system, you update the doc — so the *why* never drifts from the *what*.

## When to write or update one

- **When you make a decision worth keeping** — a real choice with a reason behind it (not every tiny tweak).
- **When the system changes shape** — you added a guardrail, changed the data flow, reworked the UX. Update the relevant doc in the same pass.
- **Before you hand work to Claude** — a quick doc update first means Claude builds against your current intent, not last week's.

> Rule of thumb: if you'd have to *re-explain it to Claude or to future-you*, it belongs in a design doc.
