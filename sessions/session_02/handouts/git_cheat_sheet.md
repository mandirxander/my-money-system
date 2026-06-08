# Git Cheat Sheet

## How Git Works — The Mental Model

Git has four "places" your code can live:

```
Working Directory  →  Staging Area  →  Local Repo  →  Remote Repo (GitHub)
  (your files)        (git add)       (git commit)      (git push)
```

1. **Working Directory** — your normal files on your computer. Git watches them but hasn't done anything with changes yet.
2. **Staging Area** — a holding area where you deliberately place changes you want to include in your next commit.
3. **Local Repository** — a permanent snapshot saved in your project's hidden `.git` folder. Still only on your machine.
4. **Remote Repository** — GitHub. Your commits don't go here until you push.

Think of it like mailing a package:
- `git add` → putting items in the box
- `git commit` → sealing the box and labeling it
- `git push` → dropping it off at the post office (GitHub)

You can pack the box over time before sealing it. Sealed boxes sit in your house until you actually go to the post office.

---

## The Core Commands

| Command | What it does |
|---------|--------------|
| `git status` | Show what's changed and what's staged |
| `git add .` | Stage everything in the current folder and below |
| `git add <file>` | Stage one specific file |
| `git commit -m "note"` | Save a labeled snapshot of staged changes |
| `git commit -am "note"` | Stage all modified files + commit in one step (see note below) |
| `git push` | Send local commits to GitHub |
| `git fetch` | Download the latest changes from GitHub (without changing your files yet) |
| `cd <folder>` | Navigate into a folder |
| `ls` | List files in the current folder |

---

## `git add .` vs. naming specific files

**For a solo project: use `git add .` freely.** It stages everything changed in your project.

You'd name specific files when:
- You're in the middle of two separate things and want to commit only one of them
- You want to keep certain experiments out of the commit

The real solution for keeping junk out of commits is a `.gitignore` file — list files Git should always ignore, and `git add .` becomes safe. See the `.gitignore` section below.

---

## `git commit -am` shortcut

`git commit -am "note"` combines `git add` and `git commit` into one step.

**The catch:** it only works on files Git is already tracking. Brand new files that have never been added before won't be included — you still need to `git add <file>` at least once for new files.

Workflow:
- **New file?** → `git add <file>` first (just once), then `-am` works going forward
- **Modified file Git already knows about?** → `git commit -am "note"` is fine

---

## `.gitignore`

A `.gitignore` file tells Git which files and folders to always ignore — they'll never show up in `git status` and `git add .` won't touch them.

Common things to ignore:

```
.env                  # API keys and secrets — never commit these
node_modules/         # Installed packages — can always be reinstalled
__pycache__/          # Python cache files
*.pyc                 # Compiled Python files
venv/                 # Python virtual environment
.DS_Store             # Mac system file
*.log                 # Log files
```

If your project doesn't have a `.gitignore` yet, ask Claude:
> *"Create a `.gitignore` file for my project. It uses [your tech stack]. Are there any important file types I should be excluding?"*

---

## Typical session workflow

```bash
# At the start of a session
git fetch                         # download any changes from GitHub (doesn't touch your files)

# While working — commit often
git status                        # see what changed
git add .                         # stage everything (or name specific files)
git commit -m "what I did"        # save a snapshot

# When ready to save to GitHub
git push                          # send commits to GitHub
```

> **Note:** `git fetch` *downloads* changes but never touches your files — it can't overwrite your work. `git push` is still how you save your own work to your repo.

---

## Getting course updates into your project

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

> I keep needing to pull new and updated files from the course repo (a remote named `course` or `public`) into my project. Because I copied my project from the template, I have to be careful not to overwrite the work I've personalized. Help me create a reusable skill that does this safely — ask me whatever you need about my repo, figure out the right git approach, and save it as a project skill under `.claude/skills/`.

Work through it together: Claude will inspect your repo, propose an approach, and write the skill file for you. When you're happy with it, commit it so it stays with your project:

```powershell
git add .claude/skills
git commit -m "Add course-sync skill"
git push
```
