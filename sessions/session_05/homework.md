# Session 5 Homework

This week you **refine the real thing**. Last week you got the quality-risk core working; now you **measure it against the quality bar you set in Sessions 2–3 — for the first time on the real system** — then give it clear rules and limits, and design and polish the experience on top. Both workflows are **post-build** — they read your actual code in `src/` and apply changes directly. By the end you'll have a leaner, safer POC with an interface that matches the design in your head.

**Suggested order:** Part 1 (measure + refine the system) → Part 2 (design + polish the experience) → Part 3 (build your toolbelt — extract cards for the moves you've run) → Part 4 (tidy up). Total ~**5.5–6.5 hrs**. *(If time is tight: the design pass is main screen only, and the cross-screen consistency check is optional — don't skip the test run or the guidelines/guardrails.)*


| Part                                                        | Est. time  |
| ----------------------------------------------------------- | ---------- |
| Part 1 — Measure + refine your system (`agent_behavior`)    | ~2–2.5 hrs |
| Part 2 — Design + polish the experience (`user_experience`) | ~2.5–3 hrs |
| Part 3 — Build your toolbelt (extract your workflow cards)  | ~45–60 min |
| Part 4 — Update `CLAUDE.md` + reflection                    | 10–15 min  |


**🔄 Standing habit — restart your dev server each new Claude Code session.** Use the `/restart-dev-server` slash command you created in Session 4 every time you open a new Claude Code session (or run `/clear`) to keep working — the dev server doesn't carry over between sessions.

**Optional — if your changes still aren't showing up** (a Windows/WSL quirk), make sure the command starts the server with `WATCHPACK_POLLING=true npm run dev`:

> *"Update my* `/restart-dev-server` *command to start the dev server with* `WATCHPACK_POLLING=true npm run dev` *— keep the variable exactly."*

Then `/clear`.

**First — close any requirements gap from class.** In the Session 5 debrief you checked your project-specific requirements against the build. If your **user return loop** or **closed-loop feedback** wasn't implemented yet (even a first pass), or your **data source** isn't fully working, fold that in this week as you go — don't let it slip to the end.

---



## Part 1: Measure + Refine Your System

Open `@workflows/agent_behavior.md` and work through it with Claude. It's two steps:

1. **Ground in what you built — and measure it** — Claude reads your real `src/`, summarizes what the POC actually does, and finds where your primary quality risk shows up now that it runs. Then run **3–5 of your own test cases** (from `data/evaluations_data.csv`) through the real POC and score the outputs against your own rubric — eyeball scoring is fine. This is critique against criteria you set before you built: where it misses is exactly what the next step responds to.
2. **Guidelines + guardrails (+ a validation check)** — write the system's operating rules (**guidelines**) and runtime safety limits (**guardrails**) into the code and `CLAUDE.md`, starting from the misses your test run surfaced, and add one cheap **agent-validation check** that would catch the system being *confidently wrong* on its riskiest output.

**Output:** `docs/agent_behavior_design.md` + applied changes in `src/` and `CLAUDE.md`.

**Concept refresher as you go:** if the "loops" blur together (return / agentic / validation / closed-loop feedback), read the handout `handouts/the_four_loops.md`. Where your system sits on the RAG → service → agent → agentic-system spectrum is a *concept*, not a step you build — see the Session 1 handout `rag_vs_agents_reference.md` if you want the picture.

---



## Part 2: Design + Polish the Experience

Open `@workflows/user_experience.md` and work through it with Claude. It designs the **real** UX on the POC you built, then makes that design visible on screen:

1. **The four lenses** — what the user provides, sees, controls, and approves.
2. **Ownership** — user-owned / agent-owned / co-authored, so edits don't vanish and the system doesn't overwrite intent.
3. **AI-risk checks** — where hallucination, stochasticity, context loss, instruction-following, and overconfidence could bite, and how the user catches each.
4. **Interaction flow, then the design pass** — lay out the experience step by step (start → while it works → checkpoints → if something's off → done). Then work the design pass in order (mechanics in `guides/shadcn_design_system_guide.md`):
  - **Apply the typography ramp** (one-time) — the guide's copy-paste snippet, handed to Claude verbatim.
  - **Design pass with a visual reference on your main screen** — hand Claude a reference image (Figma frame export, sketch photo, or a screenshot of an app whose layout you admire; save it in the project and `@`-reference it — no plugins needed) and iterate by screenshot until the screen matches your intent. Skip if you're already happy with the screen.
  - **Add a UI cue for each point of ownership and AI risk** from above — e.g. an "AI-drafted, please review" label and an approve/edit button on a drafted output.
  - **Check every screen is visually consistent** (colors, styles, components, type ramp); this is a review, not new styling — optionally screenshot a screen next to your main one and ask Claude to fix anything that doesn't match.
  - **Record your UI conventions in** `CLAUDE.md` — write it yourself or use the guide's prompt to have Claude write it from your real code; either way, review it. If your system has a return loop, make sure the flow leads the user back to it.

**Output:** `docs/user_experience_design.md` + the design pass, ownership/AI-risk cues, and any consistency fixes applied in `src/`, and a UI Conventions section in your `CLAUDE.md`.

---



## Part 3: Build Your Toolbelt

Every workflow you've run so far is a repeatable **move** — a play you can reuse on this project or at work. This week you turn the ones you've already done into **workflow cards**, so you finish the course with most of your toolbelt built. (Your `workflow_toolbelt_map.md` guide lists each move and the card name it becomes.)

Extract a card for each move you've run through Session 5:

- **Set the Context** (S1) — configuring the AI to your product
- **Simplest Prototype** (S2–S3) — proving/killing an idea as cheaply as possible
- **Prioritize by Risk** (S4) — sequencing the build so the riskiest slice comes first
- **Behavior Design** (S5) — shaping how the system acts, its limits, and how it handles uncertainty
- **Experience Design** (S5) — designing what the user provides / sees / controls / approves, then polishing it

**Problem Framing** (S2) and **Interview Synthesis** (S3) already come written as worked examples in `guides/workflow_cards.md` — read those to see the shape, then adapt them into your own cards too if useful.

**Do it as a batch, with Claude.** Point Claude at `guides/workflow_cards.md` (the extraction meta-prompt + template) and the workflows you ran, and have it draft the set in one pass; then review and tighten each card so it reflects how *you* actually ran the move. Save them all in your `workflows/cards/` folder (your own cards live here, separate from the course workflows).

> **Reserved for Session 6:** the moves you haven't run yet — **Evaluation and Improvement** and **Pilot With Users** — plus a **Loops Audit** critique card. You'll extract those next session, once you've done the work they come from. By the end you'll have a full set of reusable plays you can take to your own work.

---



## Part 4: Update Your [CLAUDE.md](http://CLAUDE.md)

Update your `CLAUDE.md` with the guidelines and guardrails you set this week, and anything else that changes how Claude should work on the project. (See `handouts/design_docs_explained.md` for why keeping these docs current matters.)

**Then give it a quick cleanup pass.** Your `CLAUDE.md` has been growing for five weeks — and this week it gained guidelines, guardrails, *and* UI conventions. A briefing doc only works if Claude can actually follow it, so have Claude review its own briefing:

> *"Read my* `CLAUDE.md` *top to bottom and help me clean it up. Look for: (1) anything **stale** — statements that are no longer true of the project; (2) **contradictions or duplicates** — rules that clash or say the same thing twice; (3) **status notes masquerading as instructions** — progress updates or one-time reminders that belong in my* `session_log.md` *or* `decisions.md` *instead of a standing briefing (move them there, leaving at most a one-line pointer); (4) anything so long you'd skim it — shrink it to only what actually changes how you behave. Walk me through what you found and why before changing anything, then apply only the edits I approve."*

This is a quick pass, not the deep review — Session 6 has a full CLAUDE.md retrospective where you'll assess what's reusable for your next project.

---



## Extra Resources (optional)

A couple of participants asked for more on the command line, git, and skills. These are **extra**, not required for the homework — dip in if they'd help:

- **Using the command line + git commands**
  - **Git Concepts for Beginners** (course guide) — `guides/git_concepts_guide.md`, a plain-language primer on what git is and the core commands
  - **Git tutorial video** — ++[Git Tutorial for Absolute Beginners](https://www.youtube.com/watch?v=CvUiKWv2-C0&t=896s)++
- **Agent** **skills**
  - **Skills article** — ++[Agent Skills Overview - Agent Skills](https://agentskills.io/home)++
  - **Video 1** — ++[How AI agents & Claude skills work](https://www.youtube.com/watch?v=S_oN3vlzpMw)++   
  ~30min but very good info about how to think about and approach building Skills
  - **Video 2** — ++[Claude Skills clearly explained in under 10 minutes](https://www.youtube.com/watch?v=DB_t1v4xOfQ)++   
  some examples of creating skills - can be done in [claude.ai](http://claude.ai) as demoed, but same steps apply in Claude Code/Cursor)

---



## Reflection (bring to the Session 6 debrief)

After completing the parts above, write a short reflection (a few sentences each) — you'll share it live at the start of Session 6, where a share-out prompt pulls it up from your session log:

1. **What did measuring against your own rubric show you?** Did the misses land where you predicted the quality risk would be — and what did the guidelines/guardrails you wrote in response change?
2. **How did the design work go?** Did the visual reference get the screen close to the one in your head — and what was your hardest call between user control and system autonomy?
3. **Which of the four loops does your project actually have?** Are any worth adding (a validation check, a stronger return loop, closed-loop feedback)?

Ask Claude to save your reflection to your `session_log.md` — that's where the Session 6 debrief share-out prompt will find it.