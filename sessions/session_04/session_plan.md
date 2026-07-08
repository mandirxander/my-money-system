# Session 4: Build Your POC + First UI

## Session Information

- **Duration:** 1.5 hours
- **Date:** [Date]
- **Facilitator:** [Name]
- **Source:** Build from `docs/specs/poc_specs.md` (no new workflow) + a first UI pass — assigned as homework
- **Format:** Debrief/share → guided hands-on build (screen-shared, step-by-step) → homework walkthrough

## Learning Objectives

By the end of this session, participants will be able to:

- Reflect on their Session 3 design work (build design + first-version specs) and confirm their scaffold and Supabase setup are sound
- Get the shared class Anthropic API key working in `.env.local` and keep it (and the Supabase `service_role` key) **server-side**, never exposed to the browser
- Build a first capability end-to-end from their own `poc_specs.md` with Claude Code in a guided, hands-on walk-through — a vertical slice from UI → server → database/LLM → back to the screen
- Explain in plain language how their app reads and writes Supabase, and what *server-side*, *service_role*, *RLS*, and *authorization* mean for their project
- Apply a first shadcn/ui theme to the POC, live, and see a basic first UI/UX demoed on your main screen (the one for your primary quality risk) — homework builds it out fully and extends it to the rest of the app
- Understand the homework path: finish the in-class slice and build out the POC from `poc_specs.md`, then finish and extend your first UI pass across the rest of the app

## Prerequisites

- Session 3 complete
- Session 3 homework substantially done: `docs/user_research_findings.md`, `docs/implementation_design.md`, `docs/specs/poc_specs.md`, and a **scaffolded empty app shell running locally** (Next.js + TypeScript, Tailwind + shadcn/ui, Supabase wired **server-side** per `sessions/session_03/handouts/supabase_security.md`)
- `CLAUDE.md` updated with the confirmed primary quality risk, the interaction/data-flow decisions, and the build-first scope
- **Shared class Anthropic API key** in hand (from Sunday) — *not* expected to be working yet; we set it up together in session (see Technical Readiness section). Supabase Project URL + `service_role` key already wired server-side from Session 3.

## Session Outline

### Opening (5 min)

> **🔄 Do this first — sync the latest course files.** The course content has been updated since last session. Before anything else, have everyone run their **course-sync skill** (built in Session 3) to pull the latest workflows, handouts, and homework into their project, and confirm everyone succeeds. *(Reminder: a freshly synced or edited skill won't load until they start a new session or `/clear` — Claude Code only discovers skills at startup.)*

- Schedule check and quick framing: *"Last week you designed the real thing; this week you start building it. We'll build one slice live, decode how your app talks to its database, and apply a first UI theme to it."*
- Note the shift: design week is over — from here you're building the **POC** from your own specs, and you'll keep extending it through the rest of the course. **No pressure to reach production quality** — this is the real first build for learning.

### Debrief / Share — Session 3 Homework (~20 min)

This is a **group share and discussion**, not a status check — the goal is to surface how the design work *changed their thinking*. No need to prep anything ahead of time — share from memory or reference your files, whichever is easier.

> **Run this together — reflection as the share-out.** We run this prompt as an activity that feeds the discussion. Speak from memory or pull up your docs — whichever is easier — but everyone runs the prompt, then shares their screen so we also see different ways to use AI. Prompt participants can use:
>
> *"Read my `docs/problem_definition.md`, `docs/user_research_findings.md`, `docs/evaluation_design_report.md`, `docs/implementation_design.md`, my `docs/reports/session_log.md`, and `docs/reports/decisions.md`. Help me put together a short share-out for the group:*
>
> 1. *One or two sentences summarizing my problem definition, to set up the rest.*
> 2. *A few bullets on my user research findings (skip if I didn't do any) and the key points from my evaluation design report.*
> 3. *My top 2–3 key learnings or changes from the last session or two. To surface them, work through these reflection questions: how designing my build changed my idea, what I cut or simplified and why, and how user research (or my assumption-check) landed — pulling from my session log and decisions.*
> 4. *A brief overview of my implementation design, covering three things: my **interaction model** (what's doing what), my **delivery context** (where it fits in the user's routine and where they touch it), and my **data flow** (the main path, the external connections, and the human-judgment points).*
> 5. *A simple text/ASCII diagram showing those three — interaction model, delivery context, data flow — as boxes and arrows I can show on screen.*
>
> *Keep the whole thing short enough to talk through in two minutes."*
>
> **Then try your rendering options.** Once you've got the ASCII diagram, ask Claude for a **Mermaid** version of the same diagram and render it two ways so you can see the options side by side: paste the code into **mermaid.live**, and also drop it into **Claude.ai**. ASCII shows instantly right here in Claude Code; the rendered versions give you a cleaner visual when you want one. (Optional Mermaid walkthrough in the homework's extra resources.)

As people share their screens, use these themes to open up the discussion — let the prompt's output be the jumping-off point, not a script to read:

1. **What the spike changed** — What did you discover in your spike that **changed what you focused on** in the Session 3 homework? Did proving (or failing to prove) the risky part shift where you put your attention?
2. **User research findings** *(for those who did any)* — What significant findings came out of talking to / observing real users? Did anything **change your assumptions or your primary quality risk** — and if so, how did your specs move in response?
3. **What the implementation design taught you** — After scoping and prioritizing **what to build first**, has that changed your perspective on *how* you'll go about building it? Any new thoughts on your **interaction model** or your **data flow** that came out of making it concrete?

A few questions to put to the group as they share:

- "Creating a spec like this for the first time, what stood out about what actually goes into one? Did seeing your project laid out that way make anything click or change how you understand it?"
- "Where did you keep a human in the loop versus let the system run on its own, and what drove that call?"

Then a quick readiness sweep before the demo — keep these fast:

1. **The scaffold** — Did your empty app shell come up and run (`npm run dev`)? Any scaffold snags — e.g., an unstable Next.js version Claude had to move you off of?
2. **Supabase setup** — Did your Part 3c audit confirm the class's **server-side `service_role`** pattern? Any "Claude defaulted to the `anon` key" moments worth sharing?
3. **Journaling nudge** — Still logging `decisions.md` + `session_log.md` every session? We pull from these later — keep them current.

### Technical Readiness — everyone, hands-on (~5–10 min)

**Hands-on — everyone on their own machine, walking through it together** (the whole back half of class is hands-on; the instructor shares their screen and the group moves step-by-step). Before we send a feature into the app shell, make sure everyone can actually call the Claude API. We'll set up the shared class API key together *(full steps in `participant_starter/guides/llm_api_guide.md`)*:

- **Add the key.** Drop the shared key into `.env.local` as `ANTHROPIC_API_KEY=...`, then confirm `.env.local` is listed in `.gitignore` so the key never gets committed.
- **Confirm it's server-side only — and how to check.** Two things make this true: (1) the variable is named `ANTHROPIC_API_KEY`, *not* `NEXT_PUBLIC_ANTHROPIC_API_KEY` — Next.js only ships env vars to the browser when they start with `NEXT_PUBLIC_`, so this one stays on the server automatically; and (2) the key is only used inside server code (a route handler or server action), never in a `"use client"` component. To verify, ask Claude: *"Confirm my Anthropic key is only read server-side and never exposed to the browser — check where ANTHROPIC_API_KEY is used and that it has no NEXT_PUBLIC_ prefix."* Same pattern as the Supabase `service_role` key.
- **Heads-up for later — deploying to Vercel.** `.env.local` only exists on your laptop, so when you eventually deploy, Vercel won't see it. The keys don't change for deployment and they stay **server-side** either way — what changes is only *where the value is stored*: `.env.local` for local dev, and separately in Vercel's Environment Variables settings for the deployed app (Vercel Dashboard → your Project → **Settings → Environment Variables**). Same key, same server-side handling, two storage locations. When you deploy, just know the key has to be set in both places.
- **Verify nothing else is missing — ask Claude.** There's one more piece: the Anthropic SDK (`@anthropic-ai/sdk`) has to be installed for the slice to call the API. Have each person ask Claude: *"I want to build a feature that calls the Claude API in this Next.js project. Check that everything technical is in place — the dev server runs, Supabase is wired server-side, the Anthropic SDK is installed, and ANTHROPIC_API_KEY is set in .env.local. Tell me anything that's missing."* Whatever it flags, fix before building.
- **Create a `/restart-dev-server` slash command.** You'll be restarting your dev server constantly today and in homework — every time you open a new Claude Code session (or run `/clear`), the old server doesn't carry over. Two known snags worth fixing once, now: on **Windows + WSL**, file-change notifications don't cross the Windows↔Linux filesystem boundary, so the dev server silently never sees your edits ("I don't see my changes" — the fix is telling it to *poll* for changes); and a leftover process from an earlier session can stay bound to the dev port without looking like a running server. Ask Claude to fix both and turn the restart into a reusable command:
  > *"Three things: first, if my dev script in package.json uses Turbopack (the `--turbo` flag), switch it to webpack instead — the polling fix below needs it. Second, create a slash command called `restart-dev-server` in `.claude/commands/` that starts my dev server with `WATCHPACK_POLLING=true npm run dev` — keep that variable exactly; it makes the server poll for file changes, which is required because change notifications don't cross the Windows/WSL filesystem boundary. Third, before starting, the command should check for and kill any orphaned node/next-server processes still bound to port 3000 — including leftover build workers — then start fresh."*

  **Then start a new Claude Code session (or run `/clear`)** — Claude Code only discovers new slash commands at startup, so it won't show up yet in this session. Once you're in a fresh session, test it: run `/restart-dev-server`. Use it for the rest of today and in homework, anytime you need to restart your server.

### Guided Build — hands-on, together (~45 min)

Live in Claude Code — **everyone builds along on their own project** while the instructor shares their screen and the group walks each step together. The goal is to make the build feel approachable by doing it side-by-side.

#### 1. Build one slice from your specs (~15 min)

The instructor drives the build on a sample POC on the shared screen while everyone follows on **their own** project. Two moves:

**a) Pick the one capability (~3 min, narrate the reasoning).** Don't start from the whole spec — pick the single slice that lets you *see whether the quality risk happens.* Out loud:

> *"Open your `poc_specs.md` and the `definition_of_done` in `implementation_design.md`. The slice we build first is the shortest end-to-end path through your definition of done — the one that proves or disproves your primary quality risk. On this sample POC the risk is **[X]**, so the first slice is **[the capability that tests it]**. Everything else waits."*

For anyone unsure which capability that is, show the fallback prompt:

> *"Looking at my `poc_specs.md` and the `definition_of_done` in my `implementation_design.md`, which ONE capability should I build first to test my primary quality risk? Name the single vertical slice — input → processing → output — that would prove or disprove it. Don't build it yet."*

**b) Build that slice end-to-end (~12 min).** Build it as a vertical slice — a UI trigger → a server route → a Supabase read/write and/or a Claude API call → the result back on the screen — and **narrate the four habits as you go**, since this is the pattern they repeat solo in homework:

1. **Point Claude at the spec** — don't build from memory.
2. **Ask for ONE slice, not the whole spec.**
3. **Review what it writes** — when Claude creates or edits a file it shows you the code right there; read the key parts (the route, the line that calls Claude, the line that saves to Supabase). You don't have to be fluent — skim for whether it matches what you asked, and ask Claude to explain any part in plain language.
4. **Iterate in small steps** — run it (`npm run dev`) and check the result on screen. For a database write, you can also confirm the data actually landed by opening your **Supabase dashboard → Table Editor** and refreshing the table — the new row should be there. If the result isn't what you expected or the row didn't land, have Claude fix it before moving on to the next piece.

**Starter prompt** to drive it (the same one they'll use in homework, for continuity):

> *"Read `docs/specs/poc_specs.md` and `docs/implementation_design.md`. We're building the first vertical slice that tests my primary quality risk: **[capability]**. Build it end-to-end on the common stack — a way to trigger it in the UI → a server route → the Supabase read/write and/or Claude API call → the result back on the screen. Work in small steps and check with me before each next piece — don't build the whole spec at once."*

#### 2. How your app reads & writes Supabase — decode the jargon (~12 min)

*(reference: `handouts/supabase_reads_writes_explained.md`)*

- **When** a read or write actually happens (anytime data needs to *survive* — save = write, load = read; the empty shell did neither).
- **Plain-language decode** of the terms Claude will leave in code comments: *server-side*, `anon` key vs. `service_role` key, *RLS / RLS-on*, *"service_role bypasses RLS,"* *defense-in-depth*, and *authorization*. The one idea to land: **your server code — not Supabase — decides who's allowed to do what.**
- **When authorization actually matters:** *Case A* (single-user / personal POC — a non-issue, build freely) vs. *Case B* (data kept separate per person — the server must check first). Most class POCs are Case A. Use the one-question test from the handout.
- *(reference: `handouts/api_keys_reference.md`)* — for which keys each feature needs and the Vercel deploy-sync gotcha when they ship.

#### Share — Your Working Slice, Before the UI (~3 min)

Quick round of screen-shares: people show their **functional but unstyled** slice — that it runs, and (if it writes data) the row landed in the **Supabase Table Editor**. Keep it low-stakes — *"show where you got."* This is the "before" half of a before/after.

#### 3. Apply a theme, live (~5 min)

*(reference: `guides/shadcn_design_system_guide.md`)* Everyone applies a real theme to their own slice, together: open `**ui.shadcn.com/create?preset`**, the official shadcn tool, start from the **Graphite** preset, and tweak a few basic options (primary color, radius, font) to make it your own. Click **Get Code → Existing Project → Full preset**, pick **npm**, and **Copy command** — hand that exact command to Claude and have it run it as-is, don't just say "use Graphite" and let Claude go fetch it itself (in testing, given the preset name alone, Claude wandered off to tweakcn and other sources instead of using the actual values). Restart `npm run dev` and confirm your buttons, cards, and accents picked up the new look — if the font specifically didn't change, see the guide's note on a circular `--font-sans` reference, a known scaffolding quirk.

#### 4. Build a basic first UI, live (~8 min)

This is a **demo, not a full build** — there isn't time to finish a whole screen live. **The key move: work through it with Claude one question at a time, and let it help you reason through the component choice — don't have it decide for you.** *(reference: `guides/shadcn_design_system_guide.md` — "Deciding which components to use")* On the sample POC's **main screen — the one for the primary quality risk** — the instructor runs the driver prompt from the guide: Claude asks what the user needs to give it, offers a couple of component options once answered (including the LLM-specific patterns from the guide where they fit — a confidence cue, an edit/refine button, actionable error copy), the instructor picks one, Claude adds it, then asks the next question (see / change / approve) — one at a time.

Everyone tries the same on their own main screen at the same time, as far as time allows. Most people won't finish in 8 minutes, and that's expected — the point is everyone has now seen and tried the move once. **Building out the rest of the main screen is homework Part 2's job**, then quickly doing the same for your other screens.

Set the expectation clearly: **this is a *first* UI, not polish** — making it genuinely good across the rest of the app comes in Session 5's `user_experience` work, continuing with the shadcn UI theme and design system.

#### Share — Your Themed Slice, After the Theme (~3 min)

Now the "after": a quick second round where people show the **same slice, now themed** — same functionality, a real look and feel instead of the default. Put it next to the before from a moment ago — the value is *seeing* the jump from plain-default to a styled app, and the range of looks across the room. Keep it celebratory and low-stakes — *"show where you got,"* not *"show it finished."* (Building out each screen's actual components is homework Part 2 — that's the next "after.")

### Homework Walkthrough + Q&A (~10 min)

- Walk through `homework.md` and field questions.
- Emphasize the path: **finish the slice you started here**, then build out the rest of `poc_specs.md` one slice at a time. Your main screen's theme is set and you've seen a basic first UI/UX demoed live — homework Part 2 builds out the rest of your main screen, then quickly does the same for your other screens.
- Reassure on scope: you're building the **first version**, not the finished product — Session 5 refines the system behavior and the user experience. Build confidently and keep it simple.
- Point them at the two handouts — `supabase_reads_writes_explained.md` (when their build hits database reads/writes) and `api_keys_reference.md` (keys now in play).

### Closing (≤5 min)

- Reminder to run `/wrap-up` at the end of the homework to log `session_log.md` + `decisions.md`.
- Preview Session 5 (two weeks out): refine the system behavior you built and design + polish the user experience — where the UI goes from first-pass to good.

## Artifacts Produced (in session)

- Each participant's **first working vertical slice** of their POC, with a first theme applied live and a basic first UI/UX demoed/started on their main screen — started in session on their own project, then built out fully and extended to the rest of the app in homework
- The instructor's shared-screen slice — the step-by-step pattern the group follows

## Homework

*See `homework.md` (~4–5 hrs):*

- **Part 1 — Finish your in-class slice + build out your POC** from `docs/specs/poc_specs.md` with Claude Code, one vertical slice at a time, on the common stack.
- **Part 2 — First UI pass** — build out your main screen (demoed live in class; theme already applied), then quickly do the same for your other screens (Tailwind + shadcn/ui).
- **Wrap up** — update `CLAUDE.md` with what you built, and write the reflection (saved to your session log — it gets shared live in Session 5's debrief, not posted to Teams).
- **Reference handouts as you build:** `handouts/supabase_reads_writes_explained.md` and `handouts/api_keys_reference.md`.

