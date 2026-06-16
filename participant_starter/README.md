# Participant Starter Workspace

This is your project folder for AI Mentor Circle.

Click "Use this template" on GitHub to create your own copy of this repo, then clone it to your machine.

---

## Project Structure

```
your-project/
│
├── CLAUDE.md                    ← Claude's briefing doc — reads this automatically every session
│
├── .claude/
│   └── commands/                ← Custom slash commands (type /command-name in Claude Code)
│
├── .env.example                 ← Template for secret variables (safe to share — no real values)
├── .gitignore                   ← Tells Git what to never track (e.g. .env, node_modules)
├── README.md                    ← This file
│
├── docs/                        ← All project context, research, planning, and specs
│   ├── reports/
│   │   ├── participant_profile.md   ← Who you are and how you like to work (Session 1)
│   │   ├── decisions.md             ← Why you made key choices — append-only log
│   │   └── session_log.md           ← What you did and tried each session — running narrative
│   ├── problem_definition.md    ← What you're solving and why (Session 2)
│   ├── research/                ← Spike research (S2 homework) + user research notes (S3)
│   └── specs/                   ← POC specs (S3), UX spec (S5), deployment specs (S6)
│
├── prompts/                     ← Prompt templates you write and refine (Sessions 2–4)
│
├── guides/                      ← Standing reference guides (llm_api_guide, workflow_cards, …)
│
├── workflows/                   ← Course workflow guides — reference with @workflows/[name].md
│   └── cards/                   ← Your own reusable workflow cards (Sessions 4–6)
│
└── src/                         ← Your source code — add this when you start building (Session 4+)
```

**Phase 2 folders (add when you need them):**

- `src/` — add when you start the POC build (Session 4 homework)
- `data/` — add when you need to mock or store structured data
- `docs/eval/` — add for evaluation reports (Sessions 2–3 and 6)

---

## Artifacts You'll Produce (and where they go)


| When           | Artifact                              | Location         |
| -------------- | ------------------------------------- | ---------------- |
| S1 homework    | participant_profile.md                | docs/reports/    |
| S1 homework    | CLAUDE.md                             | project root     |
| S2 homework    | problem_definition.md                 | docs/            |
| S2 homework    | testing_prompt.md                     | prompts/         |
| S2 homework    | evaluation_design_report.md           | docs/            |
| S2 homework    | evaluations_data.csv                  | data/            |
| S2 homework    | spike/                                | docs/research/   |
| S3 homework    | user_research_plan.md                 | docs/            |
| S3 homework    | interview_analysis_prompt.txt         | prompts/         |
| S3 homework    | user_research_findings.md             | docs/            |
| S3 homework    | implementation_design.md              | docs/            |
| S3 homework    | poc_specs.md                          | docs/specs/      |
| S3 homework    | app shell (scaffolded, empty)         | src/             |
| S4 homework    | built POC + first UI                  | src/             |
| S4 homework    | first workflow card                   | workflows/cards/ |
| S5 homework    | context_architecture_design.md        | docs/            |
| S5 homework    | user_experience_spec.md               | docs/specs/      |
| S5 homework    | UI polish (applied to your interface) | src/             |
| S5 homework    | workflow card                         | workflows/cards/ |
| S6 homework    | evaluating_for_scale_design.md        | docs/            |
| S6 homework    | deployment_design.md                  | docs/            |
| S6 homework    | deployment_specs.md                   | docs/specs/      |
| S6 homework    | workflow card                         | workflows/cards/ |
| S7 (optional)  | demo_plans.md                         | docs/            |


*Most project work now happens in homework, driven by the workflows (~2 per week). "When" tracks the session whose homework first produces each artifact. Sessions 3–6 are being finalized to the new format, so a few rows may still shift.*

---

## Key Habits

- **Update CLAUDE.md every session** — it grows with your project
- **Append to session_log.md at the end of every session** — run `/wrap-up` in Claude Code to walk through your reflection and draft the entry
- **Log major decisions to decisions.md** — never edit past entries, only append
- **Connect to GitHub** after Session 1 — first homework

---

## Getting Course Updates Into Your Project

Your project and the course repo are separate (you made yours from a template), so course updates — new or revised workflows, handouts, and session files — don't arrive on their own. There are two ways to bring them in: do it yourself (**Option 1**), or have Claude Code do it for you as a reusable skill (**Option 2**).

### Option 1 — Bring updates in manually

**1. One-time setup — connect the course repo as a remote named `course`:**

```powershell
git remote add course https://github.com/sundaynd98/AI_Mentor_Circle_public.git
```

Run this once. Confirm it worked with `git remote -v` — you should see `course` listed alongside `origin`.

**2. Download the latest course files:**

```powershell
git fetch course
```

This downloads everything new from the course repo without changing any of your files yet.

**3. Bring in the files you want — one at a time.** Do **not** use `git pull` or `git merge` here. Because you copied your project from the template, the two repos have *unrelated histories* — git will either refuse the merge or overwrite the files you've personalized. Instead, see what changed and grab only the course files you want:

```powershell
git diff --name-status main course/main      # 1. see WHICH files are new or changed
git diff main course/main -- path/to/file     # 2. review WHAT would change in a file before taking it
git checkout course/main -- path/to/file      # 3. grab that one course file
```

Always run the middle command first — `git checkout` overwrites the file silently, with no warning and no conflict prompt. If the diff shows it *deleting your own content* (a wall of removed lines), that's a file you personalized — **don't check it out.** Only take files where the changes are clearly course updates, and leave your personalized files (`CLAUDE.md`, `docs/`, `prompts/`) untouched. (Not sure which is which? Ask Claude Code to compare `course/main` against your project and list what's new or changed before you commit.)

**4. Review and save — stage only the files you took, not everything.** The `git checkout` in step 3 already stages each file you grabbed, so just confirm what's staged and commit. Avoid `git add .` — it would also sweep in any other work-in-progress you have open.

```powershell
git status                                    # confirm ONLY the course files you took are staged
git diff --staged                             # double-check exactly what you're committing
git commit -m "Bring in latest course updates"
git push
```

Do this whenever you're told a course file has changed (or at the start of a session, to be safe).

### Option 2 — Create a skill to do it for you

If you sync often, you can have Claude Code turn this whole process into a reusable *skill* — so you just say "sync the latest course updates" each session instead of repeating the steps above.

The best way to learn this is to let Claude work out the details with you. Paste a prompt like this into Claude Code and take it from there:

> I created my project from this public Github repo [https://github.com/sundaynd98/AI_Mentor_Circle_public.git](https://github.com/sundaynd98/AI_Mentor_Circle_public.git) using "use as template". I need to fetch any new files to add to my project and include any updates from updated files into my project files. I want to be careful not to overwrite the work I've personalized in my files. Help me create a reusable skill that does this safely — ask me whatever you need about my repo, figure out the right git approach, and save it as a project skill under `.claude/skills/`. 

Work through it together: Claude will inspect your repo, propose an approach, and write the skill file for you. When you're happy with it, commit it so it stays with your project:

```powershell
git add .claude/skills
git commit -m "Add course-sync skill"
git push
```

**Note — a new skill won't show up until you restart.** Claude Code discovers skills at session startup, so the normal flow is:

1. Create or edit the skill file (`.claude/skills/<name>/SKILL.md`)
2. Start a new session (or run `/clear`)
3. The skill now appears in the list and you can invoke it

So after you and Claude finish writing the skill, start a fresh session before trying to use it.

---

## Tips

Ask Claude to help with any of this:

- *"Help me write my participant_profile.md"*
- *"Append a session log entry for what we just did"*

