# AI Mentor Circle
### Designing in the Age of Agents
*6 Sessions · 6 Weeks · 9 Participants*

> **Note:** This is a Markdown mirror of `AI_Mentor_Circle_Overview.docx` for easy reading/editing in Cursor. The `.docx` is the formatted, participant-facing version. This content lives in several places — the `.docx` and this `.md` here in `participant_starter/`, plus a working `.docx` copy in `reference files/`. To avoid drift, **change one and re-mirror to the others** rather than editing them independently.

---

**PURPOSE**

## Why We're Here

AI Mentor Circle is a 6-week hands-on program for designers who want to understand how AI-powered products are actually built — and develop the skills and vocabulary to contribute to that work. Over six sessions, you will design, validate, and ship a real, working application using a modern AI development stack.

---

**THE CORE IDEA**

## From Interface Design to Behavior Design

Designing AI-native products requires a different way of thinking. Instead of defining screens and flows, you are defining behavior — what an agent knows, what it remembers, how it decides, and what happens when it fails. This program is built around that shift.

> *A user flow describes what happens. A behavioral system describes why, when, and under what conditions — and what to do when things go wrong.*

---

**LEARNING OBJECTIVES**

## What You Will Learn

### Mindset & Mental Models
- Understand what makes AI-native product design different from traditional UX
- Think in systems: agents, context, memory, trust, and failure modes
- Develop intuition for what AI tools can and cannot do — and where design judgment is irreplaceable

### Skills & Practice
- Design and define an agentic experience end to end — including the return loop that gives users a reason to come back
- Define what "good" looks like before you build: quality risks, test cases, rubrics, and AI-assisted evaluation
- Direct Claude to draft the specific prompts your project needs, grounded in the context you gather as you go — and judge when a draft is good enough
- Write behavior-based specs: context, memory, success criteria, and failure handling
- Build, iterate, and deploy a working app using Claude Code inside a real development environment
- Build reusable workflows you can apply to future projects

### Perspective & Influence
- Gain a meaningful working understanding of how developers think about building
- Broaden your sense of what is possible with current AI tools
- Develop marketable skills and language to lead AI-related initiatives at work
- Build confidence operating at the intersection of design, technology, and intelligence

---

**OUTCOMES**

## What You Will Walk Away With

By the end of six sessions, you will have:

- A deployed, working AI-powered product of your own choosing — designed, built, and shipped by you, with a return loop that brings users back
- An end-to-end understanding of the full build process — from concept to production
- Experience defining quality before building — quality risks, test cases, and evaluation — not just shipping and hoping
- Experience writing behavioral specs, not just wireframes or user flows
- Hands-on familiarity with a professional AI development stack
- A mental model for designing agentic systems that is measurable, testable, and scalable
- Reusable workflows and prompting patterns you can apply immediately
- A peer community of designers learning on the same edge

---

**HOW IT WORKS**

## Session Structure

Each session runs about 90 minutes and follows a consistent rhythm:

| Part | What Happens |
| ---- | ------------ |
| Group Conversation | We open with discussion on the session topic — concepts, frameworks, and questions that set context for what we are about to do. |
| Share & Discuss | Participants share work, experiments, and what broke from the previous week. This is where the group learns from each other. |
| Teach + Demo | A short, focused teach-through and demonstration of the tool, technique, or concept at the center of the session. |
| Hands-on Activity | You work on your own project during the session — defining, prompting, testing, or building — with help on hand. |
| Homework | Each session closes with a clear assignment for the week — something to define, build, or research that feeds directly into the next. |

Outside of sessions, expect to spend 4–7 hours per week on homework and independent exploration.

---

**CURRICULUM**

## Session Overview

The program moves through three phases — Define, Validate, Build. Each session produces artifacts that feed directly into the next, so the work compounds week over week.

| # | Session | Focus |
| - | ------- | ----- |
| 01 | Setup: AI as a Thinking Partner | Getting started with Cursor and Claude Code. Mental models and vocabulary — RAG vs. agents vs. agentic systems — and the shift from interface thinking to behavioral thinking. Set up your workspace and your CLAUDE.md, and choose a project built around a return loop. |
| 02 | Foundations, Tools & Project Ideas | Vibe coding vs. structured AI-assisted building. Hooks, slash commands, and the CLI. Share and pressure-test your project idea, map it to the project requirements, and install the common tech stack. |
| 03 | Quality Thinking + User Research | Define what "good" means before you build. Work with Claude to draft the prompts your project needs, identify and prioritize quality risks, design test cases, and run a first validation experiment. Connect a quality risk to a user research question. |
| 04 | What Good Looks Like | Output rubrics and anchor examples. Using an LLM as a judge to evaluate at a scale humans can't. Map UserContext → AgentContext with ownership rules, and design the interaction flow between user and agent. |
| 05 | Requirements & Specs | Delivery context and agency vs. autonomy. Cost-aware design. Scope an MVP against your evaluation dataset, generate full specs for a coding agent, and kick off the build. |
| 06 | From Prototype to Reliable System | Demo your working prototype. Make it rigorous: system specification, context management, and architecture at a conceptual level. A CLAUDE.md retrospective and a reusable workflow you can take to your next project. |

---

**TOOLS**

## What We Use and Why

Every tool in this program was chosen deliberately. We are not learning tools for their own sake — we are using them to understand how AI-powered systems are built, and to develop intuition for the decisions behind them.

| Layer | Tool | Why |
| ----- | ---- | --- |
| AI model + coding agent | Claude API + Claude Code in Cursor | Claude is the intelligence layer of your app. Claude Code, running inside Cursor, lets you build with AI in real time — prompting your way through a codebase is a core skill of this program. |
| Code editor | Cursor | An AI-native editor built for working alongside a coding agent. This is your primary build environment, with Claude Code running as the agent inside it. |
| Frontend + backend | Next.js + TypeScript | A full-stack framework that handles both your UI and server-side logic in one codebase. TypeScript adds structure and reduces errors as your app grows. |
| UI components | Tailwind + shadcn/ui | Tailwind handles styling; shadcn/ui provides a library of accessible, composable components. Together they let you build polished interfaces quickly. |
| Database + storage | Supabase | Your app's persistent memory — user data, stored state, files, and vector search for RAG, all in one free account. Understanding how data persists is essential to designing agent behavior. |
| Deployment | Vercel | Where your application runs in the world. One-click deploy from GitHub gives you a live URL on every push — a milestone and a mindset shift. |
| Secrets management | `.env.local` | Keeps API keys and credentials out of your codebase, never committed to GitHub. A small but important habit for building responsibly. |

*Upgrade path: Railway can be added for projects that need persistent servers or background jobs — but most prototypes won't need it.*

---

**EXPECTATIONS**

## How to Get the Most Out of This

This program is what you put into it. Here is what will set you up to succeed:

### Show up prepared
Complete your homework before each session. The group discussions are richer when everyone has spent time with the material.

### Build something personal
Your project should be something you genuinely want to exist. The more it matters to you, the better your design decisions will be.

### Embrace not knowing
You will get stuck. You will not understand things on the first pass. That is the process. Ask questions, try things, break things.

### Transfer the thinking
The specific tools we use may not be the tools at your job. That is fine. The goal is not tool proficiency — it is a way of thinking. Every concept and mental model in this program is transferable.

### Contribute to the group
Nine people learning the same hard things at the same time is a rare resource. Share what you find, what breaks, and what surprises you. The group is part of the curriculum.

---

*AI Mentor Circle · Internal Program · 6 Weeks*
