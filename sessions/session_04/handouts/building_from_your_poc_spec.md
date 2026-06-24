# Building From Your POC Spec — Feature by Feature

A short guide to building your POC out of `docs/specs/poc_specs.md` with Claude Code — one piece at a time, in a way that stays reviewable and doesn't run ahead of you. Use it during the Session 4 build and whenever you add to your POC later.

## Two terms

- **Feature** — one thing your system *does* (e.g., "summarize an uploaded note," "save a draft," "tag an entry"). It's the *what*.
- **Vertical slice** — one feature built *all the way through*, end to end: a UI trigger → a server route → a Supabase read/write and/or a Claude API call → the result back on the screen. It's the *how*. Developers call it "vertical" because it cuts through every layer at once, instead of finishing one whole layer (say, all the UI) before any of it works.

The difference matters: a feature is the goal; a vertical slice is the way you build it so that *each* feature actually works before you start the next. (You may also hear "walking skeleton" or "tracer bullet" — same idea.) Building feature by feature, each one end to end, is a standard way to build software incrementally.

## Why build this way

Building one slice at a time — rather than asking Claude for the whole spec at once — keeps you in control:

- Each piece **runs and is reviewable** before you move on, so problems surface early and small.
- You **see your POC come alive** incrementally instead of waiting for one big reveal that may not work.
- It's how this actually goes well with an AI coding assistant: small, checked steps beat one giant request.

## The four habits

1. **Point Claude at the spec.** Tell it to read `docs/specs/poc_specs.md` (and `docs/implementation_design.md`) — don't have it build from memory or your paraphrase.
2. **Ask for one feature, not the whole spec.** One vertical slice at a time. Resist "build all of it at once."
3. **Review what it writes.** When Claude creates or edits a file, it shows you the code. Read the key parts — the route, the line that calls Claude, the line that saves to Supabase. You don't have to be fluent; skim for whether it matches what you asked, and ask Claude to explain any part in plain language.
4. **Run and check it.** Run it (`npm run dev`) and look at the result on screen. For anything saved to the database, also confirm it actually landed: open your **Supabase dashboard → Table Editor**, refresh the table, and look for the new row. If something's off, have Claude fix it before moving on.

## A starter prompt

> *"Read `docs/specs/poc_specs.md` and `docs/implementation_design.md`. We're building one vertical slice: [name the feature]. Build it end-to-end on the common stack — a way to trigger it in the UI → a server route → the Supabase read/write and/or Claude API call → the result back on the screen. Work in small steps and check with me before each next piece — don't build the whole spec at once."*

## What "done" looks like for one feature

You can trigger it in the UI, it runs through the server and the Claude/Supabase call, and you see the right result back on screen (and the right row in Supabase, if it saves). That's one slice done — repeat for the next feature.