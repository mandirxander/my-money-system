# Personalizing Your CLAUDE.md

*Session 1 — AI as a Thinking Partner*

---

## Two Files, One Purpose

You will create two documents in Session 1. They work together:

**`docs/participant_profile.md`**
Your full profile — the detailed record of who you are, what you're building, how you think, and what you want from this experience. This is the context your CLAUDE.md draws from. You'll add to it throughout the course.

**`CLAUDE.md`** (at the root of your project)
The distilled instructions Claude reads at the start of every conversation. Not a biography — a collaboration contract. Specific, actionable directions Claude can actually follow.

**How they reference each other:**

- Your `CLAUDE.md` should include a line: `Full profile: docs/participant_profile.md`
- Your `participant_profile.md` should include a line at the top: `Active collaboration instructions: CLAUDE.md`

Think of it this way: the profile is the full picture; the CLAUDE.md is what Claude acts on.

---

## Step 1 — The Profile Conversation

Before writing either document, have a conversation with Claude. Let it ask you questions. This conversation is the raw material.

Start with this prompt:

```
I'm starting a new project and I want to build a working relationship with you.
Ask me questions to understand my background, what I'm building, how I like to work,
and what I need from you as a collaborator. One question at a time.
```

Claude will ask about:
- Your background and expertise
- What you're hoping to build or explore in this course
- How you like to receive feedback (direct? options first? devil's advocate?)
- Technical comfort level and what you need explained vs. assumed
- What you want Claude to challenge vs. just support

Let the conversation run. The goal is enough material to write both documents.

---

## Step 2 — Write participant_profile.md

Save your profile at `docs/participant_profile.md`. Structure:

```markdown
# Participant Profile

*Active collaboration instructions: CLAUDE.md*

## Background
[Your professional background, domain expertise, years of experience]

## Why I'm Here
[What brought you to this course, what you're hoping to learn or build]

## My Project
[What you're building — this will grow as the course progresses]
[For now: your initial thinking about your project idea and return loop]

## How I Think
[How you process information — visual? systematic? exploratory? example-driven?]

## How I Like to Work With Claude
[What works for you — e.g., "give me a direct answer first, then explain"
or "show me multiple options before converging"]

## Technical Context
[What tools you know, what you're comfortable with, what you're learning]

## What I Want Claude to Challenge
[Where you want pushback, where you want Claude to question your assumptions]

## What I Want Claude to Support
[Where you want encouragement, where you want Claude to help execute vs. critique]

## Open Questions
[Things you're not sure about yet — update this each session]
```

---

## Step 3 — Write CLAUDE.md

Translate the profile conversation into instructions Claude can actually follow. Save at the root of your project as `CLAUDE.md`.

```markdown
# Claude Instructions — [Your Name]

*Full profile: docs/participant_profile.md*

## My Context
[2-3 sentences: who you are, what you're building, what stage you're at]
Example: "I'm a UX designer with 5 years of experience, building a personal knowledge
system that helps me synthesize ideas from books and articles. I'm new to AI development."

## Project Goals
[Placeholder for Session 2 — update after ideation workflow]
[For now: "Exploring my project idea — to be defined after the ideation workflow."]

## Working Preferences
[Specific instructions Claude should follow every conversation]
Examples:
- "Give me a direct answer first, then explain the reasoning."
- "When brainstorming, give me 3 divergent options before we converge."
- "Don't hedge — pick a direction and tell me why."
- "Ask me one clarifying question before starting a large task."

## Communication Style
[How you want Claude to talk to you]
Examples:
- "Use plain language. Define technical terms when you use them."
- "Use UX analogies when explaining technical concepts."
- "Keep responses concise unless I ask for depth."

## Quality Standards
[What 'good work' means to you — this gets more specific each session]
Example: "Good enough to share with my team. Clear structure, no jargon, actionable."

## Things I'm Learning
[Update this after each session with what you're figuring out]
Example: "Claude gives better results when I share my success criteria upfront."
```

---

## How CLAUDE.md Grows Each Session

| Session | What Gets Added |
|---------|----------------|
| Session 1 | Personal context, working preferences, communication style |
| Session 2 | Project-specific goals, problem framing, use case context |
| Session 3 | Quality risk awareness, experiment instructions |
| Session 4 | Evaluation criteria, what good output looks like |
| Session 5 | Build workflow, technical constraints, implementation context |
| Session 6 | System-level notes, reliability requirements *(time-permitting)* |

---

## Tips for Writing Good Instructions

**Specific beats vague:**

| Vague | Specific |
|-------|----------|
| "Be helpful" | "When I ask a question, give me a direct answer first, then explain" |
| "Be creative" | "When brainstorming, give me 5 divergent ideas before we narrow down" |
| "Be concise" | "Keep responses under 200 words unless I ask for detail" |

**Test your CLAUDE.md after writing it:**
Give Claude a small task. Did it follow your instructions? If not, update the instruction — make it more specific or add an example.

**The iteration loop:**
Write → Test → Observe → Update. This is the skill you'll use all course long. Your CLAUDE.md is never "done" — it gets better every time you use it.
