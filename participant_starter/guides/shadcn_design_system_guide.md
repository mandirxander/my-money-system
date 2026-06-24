# Using shadcn/ui — Theme & Components

**AI Mentor Circle — Reference Guide**

shadcn/ui is your design system for this course — components that get copied straight into your own repo, plus a theme layer of CSS variables that every component reads from. This guide covers the mechanics of how to use it.

---

## How it actually works

- **Components live in your repo.** Adding one (a button, a card, a dialog) copies its real source into `components/ui/` — you can open and edit it like any other file in your project. There's no hidden library version to update.
- **Theming is just CSS variables.** Colors, corner radius, and font are set as CSS variables in your global stylesheet (usually `src/app/globals.css` or `app/globals.css`). Every shadcn component reads from those same variables — change them once, and buttons, cards, and accents update everywhere automatically. That's the entire trick behind "applying a theme."

---

## Applying or changing a theme

**Recommended — let the shadcn CLI apply it directly.** No values for Claude to interpret, nothing for it to look up:

1. On **[ui.shadcn.com/create?preset](https://ui.shadcn.com/create)**, start from the **Graphite** preset and tweak a few basic options — primary color, radius, font.
2. Click **Get Code → Existing Project → Full preset**, pick **npm**, and **Copy command**.
3. Hand Claude the exact copied command:
  > *"Run this exact command in my project to apply my shadcn theme. Don't modify it, and don't look up or fetch a theme from anywhere else, including tweakcn or any other generator — just run it as copied: [paste the command]."*

**Fallback — copy the raw values instead.** If you'd rather not run a CLI command, on the same "Get Code" panel choose **Theme tokens → Copy theme**, and paste the result straight into the prompt (this also works for exact values you already know — a hex color, a radius, a font name):

> *"Set up my shadcn theme using exactly these values: [paste the copied theme, OR say: primary color [hex], radius [value], font [name]]. Use only what I've given you — don't look up or fetch a theme from anywhere else, including tweakcn or any other generator. Find my global stylesheet, update the theme variables there, and make sure it applies across the whole app. Tell me which file you changed."*

**Check it worked:** restart `npm run dev` — your buttons, cards, and accents should pick up the new look.

- If the **color or radius** didn't change, the variables aren't wired to shadcn's tokens; ask Claude to fix that before moving on.
- If the **font** specifically didn't change, look in your global stylesheet for a circular reference like `--font-sans: var(--font-sans)` — that means the "sans" token was never actually bound to a real font (a known scaffolding quirk). The fix: wherever the font is loaded (usually `layout.tsx`), name the actual loaded font variable directly as `--font-sans`, not a self-reference.

---

## Adding and using components

- **See what's available:** **[ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)** for the full component vocabulary with live previews, and **[ui.shadcn.com/blocks](https://ui.shadcn.com/blocks)** for pre-built sections (dashboards, forms, sidebars) you can drop in instead of building from scratch.
- **Add one with Claude:**
  > *"Add the shadcn [component name] component to my project and use it for [where/what it's for]."*
- You don't need to know the CLI command yourself — Claude runs it and wires the component in; just review what gets added like you would any other code change.

---

## Deciding which components to use

When you're deciding what a screen needs, four quick questions cover most cases — what does the user need to **give**, **see**, **change**, and **approve**. Each one suggests a kind of component, and since your output is AI-generated, a few patterns matter more than they would in ordinary software:

| Question | Component options | LLM-specific pattern to consider |
|---|---|---|
| What does the user need to **give** the system? | `Input`, `Textarea` | — |
| What do they need to **see** while it works? | `Progress` bar, loading state, `Badge`, `Card` | A confidence cue ("AI-drafted, please review") if the result could be wrong |
| What can they **change** mid-task? | `Switch`, `Select`, `Button` | An edit/refine `Button` so they can adjust or regenerate instead of accepting a one-shot answer |
| What do they need to **approve** before it continues? | `Button`, confirm `Dialog` | Actionable error copy if something fails — tell them what to do next, not just "error" |

Work through these four questions **with Claude** to determine what components to use, one question at a time — instead of deciding everything alone or letting Claude decide for you:

> *"I'm building the UI for [screen name]. Walk me through it one question at a time: what does the user need to give this screen, see while it works, change mid-task, and approve before it continues. For each one, once I answer, give me 2–3 shadcn component options that could fit and the tradeoff between them — including the LLM-specific patterns above where relevant — so I can decide. Once I've picked, add it, then move to the next question. Don't move on until I've confirmed."*

This keeps you making the actual decision — Claude's job is to surface options and reasoning, not to pick for you.

---

## Where this shows up in the course


| Session                       | What you do with it                                                                                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Session 4 (first UI pass)     | Apply a theme live in class — Graphite preset via `ui.shadcn.com/create?preset`, personalize color/radius/font — then use "Deciding which components to use" above to build out each screen |
| Session 5 (`user_experience`) | Extend the same theme and components consistently across the rest of the app                                                                                                            |


Each session's homework links back here rather than re-explaining the mechanics — if you forget how to apply a theme or add a component, this is the page to come back to.