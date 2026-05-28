# RAG vs. Agents vs. Agentic Systems

*Reference diagram for Session 1 — AI Architecture Overview*

---

## RAG — Retrieval-Augmented Generation

*LLM answers grounded in your own data*

```
User Query
    |
    v
[Retriever] -----> [Knowledge Base]
    |                (your notes, docs,
    |                 stored content)
    v
[Augmented Prompt]
(query + retrieved context)
    |
    v
  [LLM]
    |
    v
Response (grounded in your data)
```

**When to use:** You have a body of content the LLM should reference. The LLM doesn't act — it retrieves and responds.

---

## Agent

*LLM that can take actions and loop until a goal is reached*

```
Input / Goal
    |
    v
  [LLM]  <-----------+
  (reason)            |
    |                 |
    v                 |
[Tool / Action]       | (observe result,
(search, write,       |  decide next step)
 call API, etc.)      |
    |                 |
    v                 |
  Result  ------------+
    |
    v
  Done (goal reached)
```

**When to use:** You need the system to make decisions, use tools, and take sequential steps to complete a goal.

---

## Agentic System — Multiple Coordinated Agents

*Specialized agents with defined roles and handoffs*

```
                 [Orchestrator]
                 (routes tasks,
                  manages flow)
                /      |      \
               /       |       \
              v        v        v
    [Ingestion    [Digest      [Loop
     Agent]        Agent]       Agent]
    (monitors    (summarizes, (decides when
     new notes)   connects,    to prompt
                  generates    the user)
                  questions)
              \       |       /
               \      |      /
                v      v     v
              [Shared Knowledge Base]
                       |
                       v
              Response / Prompt to User
```

**When to use:** The task is too complex for one agent. Different roles need different tools, prompts, or decision logic.

---

## Side-by-Side Comparison

| | RAG | Agent | Agentic System |
|---|---|---|---|
| **What it does** | Retrieves relevant content to ground LLM responses | Reasons and takes actions to complete a goal | Coordinates multiple agents across a complex workflow |
| **Decision-making** | None — retrieval is deterministic | Yes — LLM decides next action | Yes — orchestrator + each agent decides |
| **Tool use** | No | Yes | Yes, per agent |
| **Loop / iteration** | No | Yes (reason → act → observe) | Yes, across agents |
| **Complexity** | Low | Medium | High |
| **Personal knowledge system example** | Surfacing relevant past notes when you ask a question | Deciding when enough material has accumulated to trigger a digest | Full loop: monitor → retrieve → synthesize → prompt user → ingest response |

---

## How These Work Together in Your Project

Most real AI products use all three layers:

```
Your Personal Knowledge System

[RAG Layer]      — retrieves relevant notes when needed
     +
[Agent Layer]    — reasons about what to do with them
     +
[Agentic Loop]   — coordinates the full return loop
                   (capture → surface → prompt → respond → repeat)
```

The design question is: **where do you put the reasoning?**
That's where things can go wrong — and where your quality work in Sessions 3–4 will focus.
