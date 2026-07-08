# The Four Loops, Disambiguated
**AI Mentor Circle — Session 5 Reference**

We've used the word "loop" for several different things across the course, and they're easy to mix up. They live at different layers of your project — one is a product feature, one is an architecture shape, one is a quality safeguard, one is a system requirement. Here's each, with how to tell them apart.

## 1. User return loop *(product / UX)*
**A reason for the user to come back — and something different each time.**
This is requirement #2 from your Session 2 mapping. It's about engagement, not code: a weekly digest, a new prompt when fresh data arrives, a streak. It lives in your **ideation** work, `implementation` Step 2 ("what brings them back"), and the **`user_experience`** interaction flow.

> Example: a reading companion emails you a new weekly digest. The *reason to return* is the loop.

## 2. Agentic loop *(architecture, within one run)*
**Does the system reason → act → observe → decide the next step, iterating until done?**
This is what makes something an *agent* rather than a straight-through *service*. Only some systems have it. A service runs one fixed path and returns; an agent keeps going until a goal is reached. See the Session 1 handout `rag_vs_agents_reference.md`.

> Example: an agent that searches, reads a result, decides it needs more, searches again — that's the agentic loop. A weekly digest that runs one call on fresh data has **no** agentic loop, even though it has a great *return* loop. (Don't confuse the two.)

## 3. Agent validation loop *(quality / oversight)*
**How you check the system did the *right* thing — and catch it when it didn't.**
Confidently-wrong output is the danger: it looks fine but isn't. The validation loop is the cheap check that catches it — a self-review pass, a rule, a visible "I'm unsure" signal, or a human sign-off. It's the runtime cousin of your **guardrails** (`agent_behavior` Step 2), aimed at your primary quality risk.

> Example: before showing a generated answer, the system flags any claim it can't ground in your data so you can catch a hallucination.

## 4. Closed-loop feedback *(system requirement)*
**User interactions and data flow back in to improve or personalize the system over time.**
This is requirement #3 from your Session 2 mapping. It's about the system getting *better with use* — feedback that's captured, stored, and fed forward. It connects directly to **memory** (what the system persists across runs, via Supabase).

> Example: thumbs up/down on each digest is stored and tunes future digests. The feedback closing the loop is the requirement.

---

## Quick tell-them-apart table

| Loop | Layer | The question it answers |
|---|---|---|
| **User return** | Product / UX | Why does the user come back? |
| **Agentic** | Architecture (one run) | Does it iterate and decide, or run straight through? |
| **Agent validation** | Quality / oversight | Would I catch it if the system got it wrong? |
| **Closed-loop feedback** | System requirement | Does it get better the more it's used? |

A single project can have all four — or just some. A simple service (no agentic loop) can still have a strong return loop, a validation check, and closed-loop feedback.
