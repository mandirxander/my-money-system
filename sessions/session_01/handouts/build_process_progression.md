# Build Process Progression

*Course map for AI Mentor Circle — Track 1: AI as a Collaborator*

---

## The Journey at a Glance

```
PHASE 1 — DEFINE THE PROBLEM
  |
  +-- Session 1: Setup
  |   Set up your environment, meet Claude Code, profile yourself,
  |   and build your CLAUDE.md collaboration contract.
  |   KEY OUTPUT: participant_profile.md + CLAUDE.md
  |
  +-- Session 2: Ideation
  |   Frame your problem, design your agentic use case,
  |   map where AI acts and where the human stays in control.
  |   KEY OUTPUT: problem_definition.md
  |
  v

PHASE 2 — VALIDATE BEFORE BUILDING
  |
  +-- Session 3: Quality + User Research
  |   Test your core assumption, identify what could go wrong,
  |   and plan how to validate with real users.
  |   KEY OUTPUT: testing_prompt + evaluation_design_report + user_research_plan
  |
  +-- Session 4: What Good Looks Like
  |   Define output rubrics, anchor examples, UX context map,
  |   and ownership rules for every part of the system.
  |   KEY OUTPUT: evaluations_data.csv + user_experience_spec.md
  |
  v

PHASE 3 — BUILD WITH INTENTION
  |
  +-- Session 5: Requirements and Specs  <-- BUILD GATE
  |   Turn validated understanding into buildable specs.
  |   After this session: build your rough POC with Claude Code.
  |   KEY OUTPUT: implementation_design.md + mvp_specs.md
  |
  +-- Session 6: Making It Rigorous  (time-permitting)
      Review the POC, understand why it works,
      and start making it consistent and reliable.
      KEY OUTPUT: architecture notes + system spec
```

---

## Artifact Flow — How Each Session Feeds the Next

```
Session 1                Session 2               Session 3
participant_profile  -->  problem_definition  -->  quality_risk
CLAUDE.md                 (use case, autonomy)     test_cases
                                |                      |
                                v                      v
                         Session 4              Session 5
                         rubrics + anchors  -->  mvp_specs
                         UX spec                implementation_design
                                                      |
                                                      v
                                               [YOU BUILD THE POC]
                                                      |
                                                      v
                                               Session 6 (if time)
                                               architecture review
```

---

## The Build Gate

Everything in Sessions 1–4 is **design and thinking work** — you're defining the problem, validating assumptions, and deciding what good looks like before writing a single line of code.

Session 5 is the **build gate**: you write the specs, then use them to build a rough proof of concept with Claude Code.

The goal is a working POC you can actually test your evaluation dataset against — not polished, not production-ready, but real enough to learn from.

---

## Session Overview

| Session | Focus | Core Question |
|---------|-------|---------------|
| 1 | Setup + Profile | How do I set up Claude Code as a collaborator and teach it who I am and what I'm building? |
| 2 | Ideation | Where should the system run autonomously, and where should the human stay in control? |
| 3 | Quality + Research | What could go wrong, and what do real users actually need? |
| 4 | Evaluation + UX | What does good output look like, and what does the user need to feel oriented? |
| 5 | Specs + Build Kickoff | What is the minimum I need to build to test my core hypothesis? |
| 6 | Making It Rigorous | Why does it work, and how do I make it consistent? *(time-permitting)* |
