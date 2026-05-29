Read the following files and produce a session brief. Do not ask any questions — just synthesize and present the brief.

Files to read:
- `participant_starter/CLAUDE.md`
- `participant_starter/docs/reports/session_log.md`
- `participant_starter/docs/reports/decisions.md` (if it exists)
- `participant_starter/docs/problem_definition.md` (if it exists)

Also run: `git log --oneline -10` to see recent commits.

---

Then output a session brief in this exact format:

## Session Brief — [today's date]

**Project phase:** [pull from CLAUDE.md "Project Phase" field]

**Where we left off:**
[1–2 sentences from the most recent session log entry — what was accomplished and where things stood]

**Recent changes:**
[bullet list from git log — only entries since the last session date; skip if nothing new]

**Open questions:**
[bullet list pulled from "Blockers or open questions" in the most recent session log entry; add any unresolved items from decisions.md if relevant]

**Focus for this session:**
[pull from "Next session focus" in the most recent session log entry]

**Suggested first move:**
[one concrete action to start — specific, not generic. Should connect to the focus area and the Baby Steps framework if relevant.]

---

Keep it tight. No preamble, no sign-off. Just the brief.
