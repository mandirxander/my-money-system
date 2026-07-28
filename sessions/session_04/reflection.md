# Session 4 Homework Reflection

**Date completed:** 2026-07-08

---

## 1. How did building change your design? What did you have to rethink once it was real code instead of a spec?

The theme/UI required more rework than expected. Applying the sage-garden theme from tweakcn.com didn't take effect on the first attempt — the page was still using hardcoded zinc-* Tailwind classes instead of theme tokens, so the new theme had no visible effect even though it was correctly installed. It took going through and replacing those with semantic tokens (bg-background, text-foreground, etc.) before the design actually showed up on screen. It was a reminder that a spec or a theme choice on paper doesn't automatically propagate into real code — the code has to actually reference the design system for it to matter.

---

## 2. How did your riskiest slice actually perform? Did the thing you were most worried about hold up?

CSV validation held up well. Moving it to deterministic, rule-based server-side code (lib/validateCsv.ts) instead of relying on the LLM meant Claude is only ever called after the data is confirmed clean — which directly avoided the non-determinism problem the spike surfaced (identical input producing different validation outcomes across runs). The riskiest part of the system held up exactly because it stopped depending on the LLM at the point where consistency mattered most.

---

## 3. What's still rough or unfinished? What do you want to refine next?

Several things: the UI is still a rough first pass with no data visualizations or graphs yet; the system is one-way output only in V1, with no conversational input for the user to talk back to it; and Vercel deployment still isn't connected, so everything only runs locally. Next up is UI polish and graphs, adding conversational input so the system feels more like a dialogue than a one-shot report, and finally getting it deployed.
