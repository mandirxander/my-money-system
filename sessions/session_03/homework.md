# Session 3 Homework

Aim to complete the parts below before Session 4, then post your reflection to the Teams channel. This week you **design the real thing**. Session 2's spike was a disposable test; now you turn what you learned into the plan and specs for your **POC** — the product you'll actually build (starting in Session 4) and keep extending through the rest of the course. **You're not building features this week** — it's design, plus scaffolding an empty app so next week's build has a running start. By the end you'll have a build design, a set of first-version specs, and a blank app shell ready to build on.

**Suggested order:** do Part 1 (light user research) first, because Part 2 reads its findings. Then Part 2 (the main work — design your build). Finish with Parts 3–4. Total is **~3.5–5.5 hrs**:

| Part | Est. time |
| ---- | --------- |
| Part 1 — Light/optional user research | 0.5–2 hrs |
| Part 2 — Design your build (`implementation`) | 2–3 hrs |
| Part 3 — Finish stack setup + scaffold the app shell | 30 min–1 hr |
| Part 4 — Update `CLAUDE.md` + reflection | 5–10 min |

---

## Part 1: User Research — Light and Right-Sized

Real conversations with users can sharpen your build — but how much you need depends on your project. Pick the mode that fits, and let Claude do the heavy lifting either way.

- **Skip it (building only for yourself)?** You're the user. Do a quick **assumption-check** instead: open `@workflows/user_research.md`, tell Claude *"I'm building this for myself — skip recruitment and interviews. Help me write down the assumptions I'm making about what I need, and which ones are risky,"* and save the result.
- **Already expert in this area?** **Speed-run it.** Use convenient testers (a colleague, a friend, yourself as the target user) and have Claude move fast — draft a short conversation guide, then synthesize.
- **Want the real signal?** Run it properly with 2–3 people — just keep it lightweight.

**However you do it, work through `@workflows/user_research.md` with Claude.** You can **skip Step 2 (recruitment)** if you already have people or you're testing with friends/family/yourself — just tell Claude "skip Step 2, I already have testers." If you're short on time, ask Claude to keep the guide and analysis minimal.

> **Tip:** the workflow's last step has Claude **synthesize** your conversations (or your assumption-check) into findings. That's the part Part 2 actually uses, so don't skip the synthesis even if you skip the interviews.

**Output:** `docs/user_research_findings.md` (plus `docs/user_research_plan.md` and `prompts/interview_analysis_prompt.txt` if you ran real conversations).

---

## Part 2: Design Your Build — the `implementation` Workflow

This is the main work this week. Open `@workflows/implementation.md` and work through it with Claude. It takes everything you've learned — your findings from Part 1, your quality risks, your spike — and turns it into a concrete plan and specs for the first version of your POC. **No code yet.** You're deciding *what* to build and *how* it fits together, so Claude Code can build it next week.

What the workflow walks you through:

- **Ground in what you've learned** — confirm the primary quality risk you're designing around (it reads your own findings and evaluation report — you won't re-derive it from scratch).
- **Design the interaction model** — where the system fits into the user's routine, and how much it decides on its own vs. asks the user.
- **Map the data flow** — how information moves through the system, and which external connections it actually needs (Claude helps you judge MCP vs. API for each).
- **Scope your first version** — decide **what to build first**: the core that tests your quality risk. The rest of your idea you'll keep building over the coming sessions; only **park** something as a *future, beyond-class* idea if the whole thing is too big to deliver in the time left. (This is where you decide what to **cut or simplify** to fit your scope.)
- **Generate your specs** — Claude drafts build-ready specs on the common stack, and you review and correct them.

> **These are not your final, locked specs.** `poc_specs.md` is the blueprint for your **first version** — the quality-risk core. Later workflows (context & architecture, user experience, scaling, deployment) refine and extend the same system from here. So scope confidently: you're choosing what comes *first*, not capping your idea.

**Outputs:** `docs/implementation_design.md` and `docs/specs/poc_specs.md`.

---

## Part 3: Finish Stack Setup + Scaffold Your App Shell

Two things here, both to give Session 4 a running start. **This is setup, not building your POC** — you're getting an empty, working app in place so next week you build features on a canvas instead of from zero.

**a) Finish your common tech stack setup** if you didn't in class:

- Node.js (`node -v`), Anthropic API key, Supabase account, Vercel connected to GitHub, and a gitignored `.env.local`.
- Let Claude Code drive — it can check Node, create `.env.local`, and install packages; it'll give you exact browser steps for the account sign-ups.

You don't need to set up any new APIs or MCPs yet — your one project-specific connection is already wired from your Session 2 spike, and any *additional* connections your POC needs get set up when you build in Session 4.

**b) Scaffold your app shell** — have Claude Code generate the empty starter app: a Next.js + TypeScript project with Tailwind + shadcn/ui set up, a placeholder home page, and the Supabase client wired to your `.env.local`, running locally (`npm run dev`). **No features yet — just a blank app that runs.** A good prompt:

> "Scaffold an empty app shell for my project on the common stack: Next.js + TypeScript, Tailwind + shadcn/ui initialized with a couple of base components, a placeholder home page, and the Supabase client wired to my `.env.local`. Get it running locally with `npm run dev` — no features yet, just a clean starting point I'll build on in Session 4."

Optional: deploy it to Vercel now for a live URL, so your very first deploy is the easy (empty) one.

---

## Part 4: Update Your CLAUDE.md

Now that you've designed your build, have Claude update your `CLAUDE.md` so it has the right context every session:

- Your **confirmed primary quality risk** and what you're building first to test it
- The interaction model and the key data-flow / connection decisions
- What you decided to **cut or simplify** (and anything parked as beyond-class)
- Update **Current Focus** to building the POC in Session 4

---

## Reflection (post to Teams channel)

After completing the parts above, write a short reflection (a few sentences each):

1. **How did designing your build change your idea?** What got clearer, or what did you rethink once you had to make it concrete?
2. **What did you cut or simplify to fit your scope, and why?** What's in your first version vs. coming later (or parked as beyond-class)?
3. **How did user research (or your assumption-check) land?** Did anything about what your user actually needs surprise you?

Post your reflection in the Teams channel before Session 4. (And ask Claude to save your reflection to your `session_log.md`!)
