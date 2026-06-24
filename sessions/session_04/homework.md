# Session 4 Homework

This week you **build the real thing**. In class you started your riskiest slice; now you finish it, build out the rest of your `poc_specs.md`, and put a directed first screen on your main feature. By the end you'll have the first version of your POC running locally — not polished, but real.

**Suggested order:** finish and build out your POC (Part 1), then finish and extend your first UI pass (Part 2), then wrap up (`CLAUDE.md` + reflection). Total is **~4–5 hrs**:


| Part                                                     | Est. time |
| -------------------------------------------------------- | --------- |
| Part 1 — Finish your in-class slice + build out your POC | 3–4 hrs   |
| Part 2 — First UI pass (Tailwind + shadcn/ui)            | 30–45 min |
| Wrap up — Update `CLAUDE.md` + reflection                | 5–10 min  |


> **🔄 Standing habit — restart your dev server each new Claude Code session.** Use the **`/restart-dev-server`** slash command you created in class every time you open a new Claude Code session (or run `/clear`) — the dev server doesn't carry over, and that command also catches a known snag where a leftover process from an earlier session stays bound to the dev port, making the page seem stale or the server fail to start. **Didn't get to it in class?** Create it now:
> *"Two things: first, if my dev script in package.json uses Turbopack (the `--turbo` flag), switch it to webpack instead — slightly slower rebuilds, but reliable hot-reload, which fixes a whole class of 'I don't see my changes' issues. Second, create a slash command called `restart-dev-server` in `.claude/commands/` that starts my dev server with `npm run dev`. If port 3000 is already in use, or the page still doesn't reflect my latest changes after that, it should check for and kill any orphaned node/next-server processes still bound to that port — including leftover build workers — then start fresh."*
>
> **Then start a new Claude Code session (or run `/clear`)** before trying it — Claude Code only discovers new slash commands at startup, so it won't show up in the session you created it in.

---

## Part 1: Build the First Version of Your POC

This is the main work this week: build the **first version of your POC** — everything in your `docs/specs/poc_specs.md` — running end to end, with Claude Code.

**Your spec is already the right scope.** Back in Session 3 you deliberately scoped it down to a small first version that tests your **primary quality risk** first — so building the whole spec *is* building the right first version. It's not your entire idea: extra features, edge cases, and anything you parked as `future_state_beyond_class` come in later sessions.

**How you build it:** one **feature** at a time, each built end to end (a "vertical slice"), following the four habits — point Claude at the spec, ask for one feature not the whole spec, review what it writes, run and check it. The handout `**handouts/building_from_your_poc_spec.md`** walks through the terms and the habits — keep it open as you go. Quick version of the two terms:

- **Feature** — one thing your system does (e.g., "summarize an uploaded note").
- **Vertical slice** — one feature built all the way through: UI trigger → server route → Supabase/Claude → result on screen. Building one slice at a time keeps each step working and reviewable.

### a) Finish the slice you started in class

In class you picked your **riskiest feature** — the one that most directly tests your **primary quality risk** (the heart of your `definition_of_done` in `implementation_design.md`) — and started building it end to end. **First job this week: finish that slice** if it isn't already working, using the same four habits. Review each step, run it (`npm run dev`), and for anything saved to the database, confirm the row landed in your **Supabase dashboard → Table Editor**. If something's off, have Claude fix it before continuing.

> 🧰 **Tool — *Prioritize by Risk.*** Building the one slice that proves or disproves your biggest risk *before* the rest is a move you can reuse on any project. To name it on a new one: *"Read [my spec] and [my definition-of-done]. Name the ONE end-to-end slice — input → processing → output — that would prove or disprove [the risk]. Don't build it yet."* See `guides/workflow_cards.md`.

### b) Build out the rest of your spec

Now repeat the same loop for the **remaining features in your `poc_specs.md`** — one slice at a time, pointing Claude at the spec each time, in roughly priority order. Starter prompt:

> *"Read `docs/specs/poc_specs.md` and `docs/implementation_design.md`. We're building one vertical slice: [name the feature]. Build it end-to-end on the common stack — a way to trigger it in the UI → a server route → the Supabase read/write and/or Claude API call → the result back on the screen. Work in small steps and check with me before each next piece — don't build the whole spec at once."*

Review each step before moving on, run it (`npm run dev`), and confirm any database writes in the **Table Editor**. **You're done when the whole spec works end to end** — every feature in your first version runs, and you can see how your quality risk actually plays out. If you genuinely run out of time, leave the least-important feature for the check-in week — but aim to finish the spec.

**As you hit database reads and writes,** read the handout `**handouts/supabase_reads_writes_explained.md`** — it decodes what *server-side*, *service_role*, *RLS*, and *authorization* mean for your project, and when (if ever) you need to worry about who's allowed to see what.

**Keys:** now that you're building features, your Claude and Supabase keys actually get used — see `**handouts/api_keys_reference.md`** if you're unsure what you need.

---

## Part 2: First UI Pass

Turn your placeholder home page into a real first screen for every feature you built in Part 1 — using Tailwind + shadcn/ui. **In class you already applied a theme live** — your whole app should already have that new color, radius, and font. (If it didn't carry over, see `guides/shadcn_design_system_guide.md`.) If you want to push the theme further than the Graphite preset gave you, **tweakcn.com** is another visual shadcn theme builder you can explore — optional, not required — just bring the resulting values back to Claude the same way you did in class. You also saw a **basic first UI** demoed live on your **main screen — the one for your primary quality risk** — there wasn't time to finish a whole screen in class, so building it out the rest of the way is this step's main job, then quickly doing the same for your other screens. **This is deliberately a rough first pass** — the same build-before-design instinct behind the rest of this course, just enough of a real interface to build toward. Session 5 (`user_experience`) is where the actual design work happens. **This is a *first* UI, not polish.**

The point of this pass is to **direct** the design instead of accepting whatever Claude generates — the same way a designer hands a reference or a brief to an AI design tool, except here you're directing Claude Code straight on the real stack.

1. **Work through it with Claude, one question at a time.** *(reference: `guides/shadcn_design_system_guide.md` — "Deciding which components to use")* Pick up where the live demo left off — most of your main screen's components probably still need building. Use the driver prompt from the guide: it has Claude ask what the user needs to give, see, change, and approve, one question at a time, offering you a couple of component options for each instead of deciding for you or leaving you to figure it all out alone. If you have a reference (a screenshot, an exported design, a sketch) you didn't use live, mention it up front — it can inform the options Claude offers.
  > *"I'm building the UI for my main screen. Walk me through it one question at a time: what does the user need to give this screen, see while it works, change mid-task, and approve before it continues. For each one, once I answer, give me 2–3 shadcn component options that could fit and the tradeoff between them — including the LLM-specific patterns in the guide where relevant — so I can decide. Once I've picked, add it, then move to the next question. Don't move on until I've confirmed. [If you have one: here's a reference for the look/layout: [image].]"*
  Review what Claude adds before moving to the next component — the same "one piece at a time" habit from Part 1, just applied to the UI.
2. **Quickly do the same for your other screens.** For every other feature from Part 1, run the same driver prompt — you already locked the theme and component vocabulary on your main screen, so each repeat is fast and Claude can keep things consistent with it.
3. **Check each one against what you intended.** If something's off — a component doesn't match what you pictured, or it drifted from a reference — just say so (providing a screenshot of a design mockup or sketch is fine if that's easier than describing it) and ask Claude to adjust, continue the conversation back-and-forth.

Worth a line in this week's `session_log.md` or `decisions.md` — your component choices and why you made them are useful to look back on.

This isn't the same exercise repeated — here you're just getting a basic, working interface in place. Session 5 is the real design pass: the **four lenses**, used fully for the first time, auditing the whole experience once your system is actually running — cross-screen consistency, ownership rules, and AI-specific risks (hallucination, stochastic output, overconfidence) you can only judge once you've seen it behave.

---

## Wrap Up: Update Your CLAUDE.md

Update your `CLAUDE.md` with what you actually built this week and anything you learned that changes how Claude should work on the project — e.g. stack decisions that are now real, where your quality risk landed, and conventions to follow in future edits.

---

## Extra Resources (optional — by request)

A couple of participants asked for more on the command line, git, and skills. These are **extra**, not required for the homework — dip in if they'd help:

- **Using the command line + git commands** — [video link TBD]
- **Creating your own skills** — [video link TBD]
- **Rendering diagrams with Mermaid** — turning an ASCII diagram into a clean rendered chart via mermaid.live and Claude.ai — [video link TBD]

---

## Reflection (post to Teams channel)

After completing the parts above, write a short reflection (a few sentences each):

1. **How did building change your design?** What did you have to rethink once it was real code instead of a spec?
2. **How did your riskiest slice actually perform?** Did the thing you were most worried about hold up?
3. **What's still rough or unfinished?** What do you want to refine next?

Post your reflection in the Teams channel before Session 5. (And ask Claude to save your reflection to your `session_log.md`!)