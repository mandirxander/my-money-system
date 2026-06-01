# Session 2 Homework

Aim to complete all five parts before Session 3, then post your reflection to the Teams channel. (If your week runs short, Part 4 is the one you can push to the following week — see its note.) This is the session where you start building — by the end you'll have a small working prototype that connects real tools and data. Developers call this kind of prototype a **spike**: a quick, bare-bones build that tests one risky part of an idea so you can learn from it. Treat it as disposable — its job is to teach you, not to become your product (the real build comes later, from your specs). You'll see the word "spike" throughout this homework; that's all it means.

**Suggested order:** do Part 1 (plan), then Part 2 (install the common stack — we may get a head start in class). Then Part 3, the main build work: run the experiment and risk/test design first, confirm and set up your project-specific connection mid-way, and finish with the spike. Wrap up with Parts 4–5. Hold off on creating project-specific accounts and keys until Part 3 tells you to — the experiment may change what you need.

---

## Part 1: Map Your Project to the Requirements

Every project in this course must include the eight things below. **Four of them are already answered by our common tech stack** — the stack we all use means those pieces are decided for you. Your real work is the other four: write **one line for each** saying how *your specific project* satisfies it, turning this generic checklist into a concrete plan and flagging anything you can't answer yet as a gap to resolve before building.

**Already settled by the common tech stack:**

1. **LLM integration** → **Claude API** (Anthropic SDK) as the reasoning engine, not just as a build tool
2. **Persistence layer** → **Supabase** for storing outputs, user interactions, and feedback over time
3. **UI + live URL** → a **Next.js** frontend (styled with **Tailwind + shadcn/ui**) deployed to **Vercel** for a real public URL
4. **Secrets management** → the `**.env.local`** file already in your project folder, updated with your API keys, never committed to GitHub

**Up to you — these depend on your specific idea:**

1. **Data source or stream** — at least one external source the system connects to and leverages
2. **User return loop** — a reason to come back, and something different each time
3. **Closed-loop feedback** — interactions or data flow back in and improve or personalize the system over time
4. **MCP or external API** — at least one service the system connects to beyond the LLM

**Do this with Claude.** The first group is already mapped — paste those in as given. Open a conversation and let Claude walk you through the four that are up to you, one at a time:

> "Four of my 8 requirements are already set by my tech stack: LLM = Claude API, persistence = Supabase, UI + live URL = Next.js (Tailwind + shadcn/ui) on Vercel, secrets = `.env.local`. Help me with the other four: data source, user return loop, closed-loop feedback, and MCP/external API. Ask me about my product idea one requirement at a time, help me figure out which piece of my idea satisfies each one, and build a mapping table. Flag anything I can't answer yet as a gap."

**Your output is a mapping table.** Here's an example for a reading-companion system — yours will look different. The first group is filled in from the stack; the rest are the project-specific choices:


| Requirement          | How my project meets it                         |
| -------------------- | ----------------------------------------------- |
| LLM integration      | Claude API (Anthropic SDK)                      |
| Persistence          | Supabase                                        |
| UI + live URL        | Next.js (Tailwind + shadcn/ui) on Vercel        |
| Secrets              | API keys in `.env.local`                        |
| Data source          | Ex: My Readwise highlights export               |
| Return loop          | Ex: Weekly digest email                         |
| Closed-loop feedback | Ex: Thumbs up/down on digests tunes future ones |
| MCP / external API   | Ex: Readwise API                                |


As you fill in the table, take extra care with the four that are up to you — make these concrete and specific, not generic.

The connection one takes a little untangling. Work out *what* external service or data source you need first — Readwise, a weather API, a Notion workspace, a Google Calendar — and only then *how* you'll connect to it. Most services connect through an API; some also offer a ready-made MCP server. MCP vs. API is just the connection method, so settle on the service first. Not sure which connector you need, or what the difference between an API and an MCP even is? Ask Claude to explain and to help you figure out the right one for each service. You can connect to more than one, but keep it to one or two — every extra connection adds real complexity. Pick the single most important one to build into your spike first.

**Treat your data source and connection choices here as a first draft.** Running the experiment in Part 3 (especially Rung 1) often reveals you need a different source or service than you first guessed — so don't create those project-specific accounts or keys yet. You'll confirm and set them up mid-way through Part 3.

Save your mapping to `docs/problem_definition.md` (add a "Requirements Mapping" section) so Claude can reference it when you build your spike. Note any gaps — bring them to Session 3.

---

## Part 2: Install the Common Stack

These pieces are locked for everyone and don't depend on your idea, so get them in place now — we may begin some of this in class; finish whatever isn't done. (Your project-specific accounts and keys come later, in Part 3, once the experiment confirms what you actually need.)

- Node.js installed (`node -v` to verify)
- Anthropic API key obtained (console.anthropic.com)
- Supabase account created (supabase.com)
- Vercel account connected to GitHub (vercel.com)
- `.env.local` file created at project root with API keys (never commit this file)

**Let Claude Code do the heavy lifting.** Don't work through this list alone — open Claude Code in your project and have it drive. There's a split in what it can do:

- **Claude can do these directly:** check whether Node is installed and help you install it, create your `.env.local` file and confirm it's listed in `.gitignore`, install client packages, and scaffold the Next.js app with Tailwind + shadcn/ui. Just ask.
- **You do these in the browser, Claude guides:** creating the Anthropic, Supabase, and Vercel accounts and generating your API keys. Claude can't click through sign-up or OAuth, but it'll give you exact step-by-step instructions and help when something doesn't look right.

A good starting prompt:

> "Walk me through setting up the common stack for my project: Node, an Anthropic API key, Supabase, Vercel connected to GitHub, and a gitignored `.env.local`. Do whatever you can directly, and for the account sign-ups give me exact steps to follow in the browser. Check each piece is working before moving to the next."

---

## Part 3: Run the Evaluation Dataset Workflow — your first build

This is the main work this week. Open `@workflows/evaluation_dataset.md` and work through it with Claude. It takes you from a hand-run experiment all the way to a small running prototype — with a setup checkpoint in the middle:

- **Rung 1 (Step 1):** Run the experiment you designed in ideation — a minimal simulation or prototype of your main system/agent flow. It's a prototype, but not a code one: a by-hand stand-in, usually a chat. Test as much of your flow as you reasonably can — for some projects that's simulating several steps, for others a single well-crafted prompt is enough. Find where it fails, what assumptions you missed, and what user problems surface. Feed those gaps back into your `problem_definition.md`.
- **Steps 2–7:** Identify and prioritize your quality risks, then design test cases against your top risk.
- **Set up your project-specific connection (before Step 8):** Now that the experiment has confirmed what you actually need, revisit the data source / MCP / API rows in your Part 1 mapping and update them if Rung 1 changed your mind. Then set up *just that connection* for your spike:
  - Create any accounts and obtain any API keys for your chosen service, and add them to `.env.local`
  - Install any packages your project needs
  - Ask Claude: *"Based on the connection I'm building into my spike, what accounts, API keys, or packages do I need to set up?"*
  - Keep it to the single most important connection — you don't need to wire up everything from your mapping.
- **Rung 2 (Step 8):** Wire up a minimal spike — one real data source + one LLM call — and run your test cases against live output. This is your first prototype connecting real tools and data.

**Outputs:** `docs/evaluation_design_report.md`, `data/evaluations_data.csv`, and a working spike in `docs/research/spike/`.

**Roughly how long this takes** (a guide, not a stopwatch — the spike is the variable):

| Stage | Est. time |
| ----- | --------- |
| Rung 1 — chat experiment (Step 1) | 30–60 min |
| Quality risks + test-case design (Steps 2–7) | 1.5–2.5 hrs |
| Project-specific connection setup (before Step 8) | 20–45 min |
| Rung 2 — build the spike + run your test cases (Step 8) | 1–3 hrs |
| **Total** | **~3.5–7 hrs** |

If the spike is eating your time, get *something* running rather than something complete — a single test case against live output beats a perfect setup you never finish. Bring whatever you have to Session 3.

> Rung 1 (the chat experiment) and Steps 2–7 need nothing installed — start there even if your setup isn't finished. The spike (Rung 2) needs the common stack from Part 2 plus the project-specific connection you set up at the checkpoint above.

---

## Part 4: Kick Off User Research Recruitment

Recruiting real people takes time, so start now — don't wait until Session 3. Open `@workflows/user_research.md` and complete **Steps 1–2 only** with Claude**:**

- Frame your research goals around your quality risk
- Pick one recruitment channel and send 2–3 outreach messages

Aim for **2–3 participants** — keep it lightweight. **Stop after Step 2.** You'll build the interview guide, run the conversations, and analyze them after Session 3.

> **Short on time?** This is the one part you can push to next week if the build work runs long — it's the least time-critical this week, and the user-research work proper doesn't start until after Session 3. Recruiting does have lead time, though, so send the outreach messages now if you possibly can.

---

## Part 5: Update Your CLAUDE.md

Now that you've built a first spike and learned from it, update your CLAUDE.md so Claude has the right context every session:

- Update your **Project Phase** to Prototyping
- Project-specific goals and what "done" looks like for the prototype
- Tech stack in use
- Your **top quality risk** and what running the experiment + spike taught you about it
- Key constraints and decisions already made, including anything the chat experiment or spike changed

---

## Reflection (post to Teams channel)

After completing the parts above, write a short reflection (a few sentences to a paragraph for each):

1. **What did running your chat experiment (Rung 1) reveal?** Where did your flow fail, or what assumption turned out to be wrong?
2. **What is your top quality risk, and did building the spike (Rung 2) change how you see it?** What broke when the data was real and connected versus hand-fed?
3. **One instruction you added to your CLAUDE.md** based on something you learned building this week — what was it and why?

Post your reflection in the Teams channel before Session 3.