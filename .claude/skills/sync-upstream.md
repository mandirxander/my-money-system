You are helping me safely pull updates from the upstream course repo into my project without overwriting my personalized work. Work through the steps below in order.

---

## Context

- My repo: `origin` (mandirxander/my-money-system)
- Course repo: `upstream` (sundaynd98/AI_Mentor_Circle_public)
- I created my project from upstream as a GitHub template. The course instructor pushes new session materials and workflow updates to upstream. I need to pull those in without losing my personalized files.

**Personalized files — never auto-overwrite, always show diff:**
- `participant_starter/CLAUDE.md`
- `participant_starter/docs/` (all files)
- `participant_starter/prompts/` (all files)
- `.claude/commands/` (all files)
- `.claude/skills/` (all files)
- `participant_starter/app/` (all files)

**Course materials — safe to auto-update:**
- `sessions/` (session plans, handouts, homework)
- `participant_starter/workflows/` (workflow files)
- `participant_starter/README.md`
- `README.md`

---

## Step 1 — Fetch upstream

Run: `git fetch upstream`

Report how many new commits were found on `upstream/main` since last fetch. If upstream is already up to date, say so and stop.

---

## Step 2 — Categorize changed files

Run: `git diff --name-only HEAD upstream/main`

Split the results into three groups:

**A. New files** — exist in upstream but not in my local repo (run `git diff --name-only HEAD upstream/main --diff-filter=A` to find these)

**B. Safe to auto-update** — files that match the course materials list above AND have changed

**C. Review required** — files that match the personalized list above AND have changed

Print a clear summary showing all three groups before doing anything.

---

## Step 3 — Pull in new files

For each file in Group A, run:
`git checkout upstream/main -- <file>`

Report each file pulled in. These are net-new course materials — no risk of overwriting anything.

---

## Step 4 — Apply safe updates

For each file in Group B, run:
`git checkout upstream/main -- <file>`

Report each file updated. These are course materials I haven't personalized.

---

## Step 5 — Review personalized files one at a time

For each file in Group C, do the following in order:

1. Show the diff: `git diff HEAD upstream/main -- <file>`
2. Summarize what upstream changed in plain English (1–3 sentences — what was added, removed, or restructured)
3. Ask: "Take upstream version, keep mine, or skip for now?"
4. Wait for my answer before moving to the next file
5. If "take upstream": run `git checkout upstream/main -- <file>`
6. If "keep mine" or "skip": leave the file untouched

Do not batch these — one file at a time, wait for my answer each time.

---

## Step 6 — Commit

After all files are handled, show a summary of everything that was changed.

Ask: "Ready to commit these changes?"

If yes, stage all modified files and commit with the message:
`Sync upstream — [brief description of what came in]`

If no, leave the changes staged but uncommitted and tell me I can review further before committing.

---

## Rules
- Never overwrite a personalized file without my explicit approval
- Never commit without asking first
- If a file doesn't clearly fit either category, treat it as personalized (Group C) and show me the diff
- Keep the summary at each step tight — I want to know what happened, not a wall of text
