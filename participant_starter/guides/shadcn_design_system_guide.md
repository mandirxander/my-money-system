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

## A typography ramp (one-time setup)

A **typography ramp** is your fixed set of text sizes — page title, section heading, subsection, body, caption — so every screen uses the same hierarchy instead of one-off font sizes. shadcn styles the text *inside* its own components (buttons, cards, inputs), but your page's own `<h1>`/`<h2>`/`<p>` are bare HTML — this ramp is what gives them a shared hierarchy. shadcn doesn't ship one as an installable component (its "typography" docs page is just CSS classes), so you define your own once, in the same global stylesheet as your theme. No library to install.

Copy this snippet exactly (tweak the numbers later if you want a different feel — the point is that the ramp is defined *once*):

```css
/* Typography ramp — one hierarchy for the whole app */
@layer base {
  h1 { font-size: 1.875rem; font-weight: 600; letter-spacing: -0.025em; line-height: 1.2; }
  h2 { font-size: 1.5rem;   font-weight: 600; letter-spacing: -0.025em; line-height: 1.3; }
  h3 { font-size: 1.25rem;  font-weight: 600; line-height: 1.4; }
  p  { line-height: 1.6; }
  small { font-size: 0.875rem; color: var(--muted-foreground); }
}
```

Hand it to Claude with the same discipline as the theme — verbatim, nothing to look up:

> *"Add exactly this typography ramp to my global stylesheet, in the same file where my shadcn theme variables live. Don't fetch or install anything, and don't restyle anything else. If my theme's color variables need a wrapper (like `hsl(...)`) for the `small` color line, adjust only that one line and tell me. Then go through my screens and remove one-off text size/weight classes from headings and body text (like `text-2xl font-semibold` on an `h1`) so the ramp takes over — those utility classes override it. Don't touch any other classes. From now on, use `h1`/`h2`/`h3`/`p`/`small` semantically for text instead of one-off font sizes: [paste the snippet]"*

**Check it worked:** restart the dev server — page titles, section headings, and body text should now step down in size consistently on every screen. **If a heading didn't change**, it almost certainly still carries a one-off utility class (`text-xl`, `text-2xl`, `font-semibold`, …) — utility classes beat the ramp, so ask Claude to remove the size/weight classes from that element.

---

## Adding and using components

- **See what's available:** **[ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)** for the full component vocabulary with live previews, and **[ui.shadcn.com/blocks](https://ui.shadcn.com/blocks)** for pre-built sections (dashboards, forms, sidebars) you can drop in instead of building from scratch.
- **Add one with Claude:**
  > *"Add the shadcn [component name] component to my project and use it for [where/what it's for]."*
- You don't need to know the CLI command yourself — Claude runs it and wires the component in; just review what gets added like you would any other code change.
- **Bigger pieces install the same way.** Toast messages (`Sonner`), charts, and form validation are all ordinary shadcn adds — one component, wired in by Claude, styled by your existing theme variables automatically (chart colors are already part of your theme preset). Icons are already there: the scaffold ships with `lucide-react`, the icon set every shadcn component uses.
- **Grabbing a pre-built section from [ui.shadcn.com/blocks](https://ui.shadcn.com/blocks):** browse visually, then give Claude the **exact block name** shown on the block's page (e.g. `dashboard-01`) — same lesson as the theme: a precise identifier, not a description, so Claude installs the real thing instead of improvising one.

---

## Deciding which components to use

When you're deciding what a screen needs, four quick questions cover most cases — what does the user need to **give**, **see**, **change**, and **approve**. Each one suggests a kind of component, and since your output is AI-generated, a few patterns matter more than they would in ordinary software:

| Question | Component options | LLM-specific pattern to consider |
|---|---|---|
| What does the user need to **give** the system? | `Input`, `Textarea` | — |
| What do they need to **see** while it works? | `Progress` bar, loading state, `Badge`, `Card` | A confidence cue ("AI-drafted, please review") if the result could be wrong |
| What can they **change** mid-task? | `Switch`, `Select`, `Button` | An edit/refine `Button` so they can adjust or regenerate instead of accepting a one-shot answer |
| What do they need to **approve** before it continues? | `Button`, confirm `Dialog`, `Sonner` toast for confirmations/errors | Actionable error copy if something fails — tell them what to do next, not just "error" |

Work through these four questions **with Claude** to determine what components to use, one question at a time — instead of deciding everything alone or letting Claude decide for you:

> *"I'm building the UI for [screen name]. Walk me through it one question at a time: what does the user need to give this screen, see while it works, change mid-task, and approve before it continues. For each one, once I answer, give me 2–3 shadcn component options that could fit and the tradeoff between them — including the LLM-specific patterns above where relevant — so I can decide. Once I've picked, add it, then move to the next question. Don't move on until I've confirmed."*

This keeps you making the actual decision — Claude's job is to surface options and reasoning, not to pick for you.

---

## From your design to the screen (using a visual reference)

You're a designer — the fastest way to get the screen in your head onto the actual screen is not describing it in words. It's handing Claude a **visual reference**, the same way you'd hand one to a developer: a **Figma frame export**, a **photo of a paper sketch**, or a **screenshot of an app whose layout you admire**. Any of the three works; use whichever is fastest for you.

**Handing Claude the image — no plugins or connectors needed.** Claude Code reads images directly. The most reliable way on both Windows and Mac: save the image *into your project* (e.g. `docs/design/main_screen.png`) and reference it in your prompt with `@docs/design/main_screen.png`. Dragging the file into the prompt also works. For a Figma frame: select the frame → **Export → PNG (2x)** → save it to that folder. For a paper sketch, a phone photo is fine.

**The reference goes in the same first prompt as your component answers, before anything is built** — your give/see/change/approve answers decide *what's on the screen*; the reference decides *how it looks*:

> *"Here's a reference for how [screen] should look: [attach image]. Match its layout, hierarchy, and spacing as closely as our stack allows. Build only with the shadcn components already in my project, our theme variables, and our typography ramp — don't add new colors, fonts, or component libraries, and ask me before inventing any style that isn't in the reference or the theme. Where the reference shows content we haven't decided (like exact copy), use a placeholder and flag it."*

Then iterate the way a design review works: run the app, screenshot what you got, and hand both back — *"here's what it looks like next to the reference — the [header/spacing/hierarchy] doesn't match, fix that."* A screenshot is always fine when it's easier than describing the difference.

**A note on Figma:** a free personal Figma account is fully workable for making reference frames — the design editor doesn't consume AI credits. (Figma Make is included on the free plan too but capped at 500 AI credits/month with a 150/day limit and no top-ups — and in this course it's an optional ideation aid at most, never the build path; the build always happens in Claude Code on the class stack.)

---

## Record your UI conventions

Once your theme, typography ramp, and component vocabulary have settled, record them **once** in your project's `CLAUDE.md` — then every future UI prompt inherits them, instead of you re-explaining styling each time. This is the same context-beats-prompting move the whole course runs on, applied to UI.

**Write the values in yourself, or have Claude do it** — they all live in your code, so if you'd rather not type them, use:

> *"Read my global stylesheet (theme variables + typography ramp), my `components/ui/` folder, and my main screen's layout, and add a `## UI Conventions` section to my `CLAUDE.md` recording them — follow this shape: [paste the template below]. Show me what you wrote."*

Either way, review the result like you would any design doc — it's your convention record. The shape to aim for:

```markdown
## UI Conventions
- Theme: shadcn preset in `app/globals.css` (primary [color], radius [value], font [name]) — change theme variables there only; never add one-off colors.
- Typography: ramp in `globals.css` — use h1/h2/h3/p/small semantically; no one-off font sizes.
- Components: shadcn/ui only, from `components/ui/` — reuse before adding; icons from `lucide-react` only.
- Layout: pages use [your container — e.g. `max-w-5xl mx-auto p-6`]; spacing from Tailwind's scale, no arbitrary values.
```

*(Optional: your theme already includes a full dark-mode variable set — adding a toggle is a one-prompt job with `next-themes` — but it doubles every consistency check, so skip it unless your project genuinely needs it.)*

---

## Where this shows up in the course


| Session                       | What you do with it                                                                                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Session 4 (first UI pass)     | Apply a theme live in class — Graphite preset via `ui.shadcn.com/create?preset`, personalize color/radius/font — then use "Deciding which components to use" above to build out each screen |
| Session 5 (`user_experience`) | Apply the typography ramp, then a design pass with a visual reference on your main screen; make ownership + AI-risk decisions visible in the UI; review every screen for consistency; record your UI conventions in `CLAUDE.md` |


Each session's homework links back here rather than re-explaining the mechanics — if you forget how to apply a theme or add a component, this is the page to come back to.