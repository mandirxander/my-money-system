# Demo Prep Guide

A quick reference for the two ideas behind `demoing_your_agent.md` — keep this open while you work through the workflow.

---

## The 3-act structure

Almost every good demo, pitch, or project story follows the same shape:

| Act | What it does | Ask yourself |
|-----|--------------|---------------|
| **1. Setup** | Establish the starting point — the problem, who's affected, why it mattered | What was broken or missing before this existed? |
| **2. Confrontation** | The hard part — what made this genuinely difficult | What almost didn't work? What did you have to figure out? |
| **3. Resolution** | The payoff — what's possible now that wasn't before | What changed? What can you show, not just tell? |

The order matters less than the shape: don't open with the solution — open with why anyone should care, then earn the reveal.

---

## Show, don't tell

For each beat, prefer the realest thing you can put on screen. In order of preference:

1. **The actual system working** — a screen recording of a real interaction, real output
2. **A real artifact** — a screenshot, a chart with your real numbers, an actual before/after
3. **A diagram or mockup** — only when there's genuinely nothing real to show for that beat (e.g. explaining an architecture decision)

If you find yourself reaching for a diagram everywhere, that's a sign to go find or record something real first.

---

## Worked example

**Project:** A security-camera classifier that reduces false alerts.
**Audience:** A hiring manager.
**Key achievement:** Cut false-positive alerts from testing without missing real threats.

| Act | Beat | On screen | Say |
|-----|------|-----------|-----|
| 1 — Setup | The problem | Screenshot: a flood of low-value notifications | "Security cameras are supposed to help you feel safe — but most systems just spam you until you stop paying attention." |
| 2 — Confrontation | The hard part | Screen recording: an ambiguous event (a delivery van) being classified | "The hard part wasn't detecting motion — it was telling apart a real threat from a delivery, without ever missing the real thing." |
| 3 — Resolution | The result | Real chart: false-positive rate before/after | "After building in a fail-safe rule and testing it against real cases, false alerts dropped — and nothing real ever got suppressed." |

That's three beats, under two minutes read aloud, and every visual is something real from the actual build — not a mockup.

---

## Before you record or present

- Read your script out loud once, timed. If it's over 8 minutes, cut a beat rather than speeding up.
- Say what you'll say — don't describe what's already visible on screen.
- If nerves are the real issue, not the content: run through it once with someone else in the room, even if their only job is to listen.
