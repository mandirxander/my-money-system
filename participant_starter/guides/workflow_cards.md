# Workflow Cards
**AI Mentor Circle — Reference Guide**

Everything you've built so far came from running a handful of repeatable moves — framing a problem, validating an idea, making sense of an interview, deciding what the system does vs. what the human does. None were one-offs. Each turned messy input into a named artifact.

A **workflow card** is one of those moves written down so you can run it again — on this project, on a different project, or at your job on Monday. It is *not* a saved prompt. A prompt is one ingredient; a card captures the **thinking**: what you bring in, the moves you make, how you know it worked, and what it produces.

The value isn't the tool — it's that you can now name and re-run your own process. Most designers can't yet.

Cards are **portable**: plain text, work in Claude.ai with zero developer tooling. (If you use Claude Code, a card can later become a slash command or a skill — see the end. You lose nothing if you stop at text.)

---

## The card — blank template

```
# [Card Name]

**Trigger** — Use this when… (the situation that makes you reach for it)

**Inputs** — What you bring:
-

**Moves** — The thinking steps, in order (3–5):
1.
2.
3.

**Driver prompt** — The reusable prompt that does the heavy lifting:
> (prompt with [PLACEHOLDERS])

**"Good enough" gate** — You know it worked when:
(the test that tells you to stop)

**Output** — What it produces: (e.g. problem_definition.md)
```

---

## Worked example 1 — Problem Framing
*(the move behind your `ideation` work)*

```
# Problem Framing

**Trigger** — A fuzzy idea or vague pain point that needs a sharp,
scoped problem before you design anything.

**Inputs** — A rough idea or observed frustration; who it's for; any
constraints you already know.

**Moves**
1. State the raw idea in one sentence; name the frustration under it.
2. Break the goal into the sub-problems that must be solved.
3. Pick the painful core — the one sub-problem worth solving first.
4. Scope it: what's IN for a v1, what's explicitly OUT.
5. Write a one-paragraph problem statement + one signal it's working.

**Driver prompt**
> Help me turn a fuzzy idea into a sharp, scoped problem definition.
> Raw idea: [PASTE]  ·  Who it's for: [WHO]  ·  Constraints: [CONSTRAINTS]
> Do these in order and show your work:
> 1. Restate my idea in one sentence, then name the frustration under it.
> 2. Break the goal into the sub-problems that must be solved.
> 3. Tell me which single sub-problem is the painful core to solve first, and why.
> 4. Propose what's in scope and explicitly out of scope for a v1.
> 5. Write a one-paragraph problem statement and one measurable
>    "we'll know it's working when…" signal.
> Ask up to 3 clarifying questions first if something essential is missing.

**"Good enough" gate** — A stranger could read your problem statement and
explain who it's for, what hurts, and what "solved" looks like — without you there.

**Output** — problem_definition.md
```

---

## Worked example 2 — Interview Synthesis
*(the move behind your `user_research` work)*

```
# Interview Synthesis

**Trigger** — You've talked to a user (or have messy notes) and need to
turn it into what you actually learned and what it means for the design.

**Inputs** — Raw notes or a transcript; the assumptions you went in testing.

**Moves**
1. Before reading the notes, list the assumptions you were testing.
2. Separate what they said/did (evidence) from your interpretation.
3. Mark each assumption validated / invalidated / unclear — with evidence.
4. Surface surprises: things you didn't ask about that matter.
5. Translate into 2–3 design implications ("because X, we should Y").

**Driver prompt**
> Help me turn raw interview notes into honest insights.
> Assumptions I went in testing: [LIST]  ·  Raw notes: [PASTE]
> Do these in order:
> 1. Separate what the person actually said or did (evidence) from interpretation.
> 2. For each assumption, mark validated / invalidated / unclear and cite the evidence.
> 3. Flag anything surprising they raised that I wasn't testing for.
> 4. Give 2–3 design implications, each as "because [evidence], we should [move]."
> Be skeptical: if I'm reading something into the notes that isn't there, say so.

**"Good enough" gate** — Every conclusion traces back to something the user
actually said — not what you hoped they'd say.

**Output** — user_research_findings.md
```

---

## The extraction meta-prompt — make your own cards

This is the engine: it turns any step you already did into a card. Portable — paste it into Claude.ai with your own material.

> I want to turn something I already did into a reusable workflow card so I
> can run it again on a new project.
>
> Here's what I did: [paste your notes, your `session_log.md` entry, or the
> artifact you produced — plus the prompt(s) you used, if you kept them].
>
> Reverse-engineer it into this template, filling each part from what I
> ACTUALLY did:
> - **Name + Trigger** — when would I reach for this?
> - **Inputs** — what did I have to bring?
> - **Moves** — the 3–5 thinking steps I took, in order (the decisions, not just the prompt).
> - **Driver prompt** — a clean, reusable version of the prompt that did the work, with [placeholders].
> - **"Good enough" gate** — how did I know it was done / good?
> - **Output** — what artifact did it produce?
>
> Keep the Moves in my words. If a step was vague or I skipped something,
> point it out and tell me what would make it repeatable next time.

---

## Optional: speed up a card you run a lot

A card is already useful as plain text. If you're in Claude Code and run one often:

- **Slash command** — save the driver prompt in `.claude/commands/`, invoke it with `/problem-framing`. Best for prompts you fire repeatedly.
- **Skill** — save the whole card (moves + prompt + output) in `.claude/skills/`; Claude loads it automatically when the task comes up. Skills also work in Claude.ai and Claude Desktop, not just Claude Code.

You lose nothing by staying at plain text — this is only for speed.
