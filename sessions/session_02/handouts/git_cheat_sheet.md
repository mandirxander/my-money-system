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
| `git pull` | Get the latest changes from GitHub |
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
git pull                          # get any changes from GitHub

# While working — commit often
git status                        # see what changed
git add .                         # stage everything (or name specific files)
git commit -m "what I did"        # save a snapshot

# When ready to save to GitHub
git push                          # send commits to GitHub
```
