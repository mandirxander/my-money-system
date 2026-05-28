# Homework 2: CLI Basics, Slash Commands, and Skills

These are foundational skills for working efficiently with Claude Code. They're not specific to any one session — you'll use them throughout the entire course.

Work through the three sections in order. Each one builds on the last.

---

## Section 1: Command Line Basics

The terminal is how you talk to your computer without clicking. Claude Code runs here, so being comfortable in it makes everything faster.

### Key Commands

**Navigating your file system:**

```
cd my-project        # go into a folder
cd ..                # go up one level
ls                   # list files (or 'dir' in CMD)
pwd                  # show where you are
```

**Working with Git:**

```
git status           # see what changed
git add .            # stage everything
git commit -m "msg"  # save a snapshot
git push             # send to GitHub
git pull             # get latest from GitHub
```

### A Note on `.gitignore`

Your project includes a `.gitignore` file — a list of files and folders that will **not** be pushed to GitHub. Common examples include `.env` (which stores secrets like API keys) and `node_modules` (installed dependencies that can be reinstalled anytime).

Open your `.gitignore` to see exactly what's excluded in your project. If something you expect to see on GitHub isn't showing up, this is the first place to check.

### Exercise

1. Open your terminal
2. Use only `cd` and `ls` to navigate into your project folder
3. Run `git status` to confirm you're in the right place
4. Open any file in your project and make a small change (e.g., add a line to your README)
5. Run `git add .` to stage the change
6. Run `git commit -m "practice commit"` to save a snapshot
7. Run `git push` to send it to GitHub
8. Check your GitHub repository in the browser to confirm the change is there

---

## Section 2: Custom Slash Commands

Slash commands are reusable prompts you create once and invoke with `/command-name` inside any Claude Code session. Instead of typing the same instructions over and over, you write them once as a `.md` file and call them whenever you need them.

### How It Works

Slash commands are `.md` files stored in `.claude/commands/`. The filename becomes the command name:

```
.claude/
  commands/
    start-session.md    → /start-session
    wrap-up.md          → /wrap-up
```

You write the prompt instructions inside the file. If you want to pass extra text when calling the command, use `$ARGUMENTS` anywhere in the file. That's the whole structure — Claude will handle creating the file in the exercise below.

### Exercise

Ask Claude to create a `/start-session` command for you. Describe what you want it to do — summarize your current project state at the beginning of a session, including recent changes, open questions, and what to focus on next.

1. Open a Claude Code session and tell Claude what you want the command to do
2. Let Claude create the `.claude/commands/start-session.md` file
3. Run `/start-session` to test it and ask Claude to adjust anything that doesn't feel right

---

## Section 3: Skills

Skills are like slash commands but in reverse — instead of *you* triggering them, *Claude* loads them when they're relevant. A skill is a `.md` file that defines how Claude should approach a specific type of task.

### How They Differ from Slash Commands

|  | Slash Command | Skill |
|--|---------------|-------|
| Triggered by | You (type `/command`) | Claude (loads it when relevant) |
| Purpose | Run a specific prompt | Guide how Claude thinks and works |
| Example | `/start-session` | A skill that helps you build the right prompt |

### How It Works

Skills are `.md` files with a frontmatter header that tells Claude what the skill is for and when to load it:

```markdown
---
name: build-prompt
description: Help the participant craft an optimal prompt for what they need
---

When this skill is loaded, help the participant build a well-structured prompt
for whatever they are trying to do...
```

The `name` is how the skill is identified. The `description` is what Claude reads to decide whether to load it — so it needs to be specific enough that Claude reaches for it at the right moment. Claude will handle creating the file in the exercise below.

### Exercise

Ask Claude to create a `build-prompt` skill for you. Describe what you want it to do — help you craft an optimal prompt for whatever you're working on at any point in your project, by asking what you're trying to do, what context is needed, what format you want the output in, and any constraints.

1. Open a Claude Code session and tell Claude what you want the skill to do
2. Let Claude create the skill file in the correct location
3. Test it by asking Claude to help you build a prompt for something in your current project
4. Refine the skill with Claude until it guides the process in a way that feels useful

---

_Once you've completed all three exercises, you're ready for Session 2._
