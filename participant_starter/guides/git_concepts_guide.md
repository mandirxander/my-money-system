# Git Concepts for Beginners

*A plain-language mental model of Git and GitHub for designers — the concepts, not the commands.*

You don't need to memorize Git commands to work with AI coding tools. Claude Code and similar assistants run the commands for you. But you *do* need the mental model, so you can tell the AI what you want and understand what it's doing on your behalf. This guide covers the handful of terms you'll actually hear on a team.

> **Further reading:** For a longer, designer-friendly walkthrough of these same ideas, see Xinran Ma's newsletter **"Git Concepts for Beginners"** (search her name + Substack). This guide is our own short version; credit to her for the framing inspiration.

## Git vs. GitHub

**Git** is a tool that runs on *your computer* and tracks the history of a project — what changed, who changed it, and when. Unlike Google Docs or Figma, it does **not** auto-save; you record history deliberately, at the checkpoints you choose. (Some tools make this feel automatic, but they're just running Git for you underneath.)

**GitHub** is a *website* that stores Git projects in the cloud — think "shared home for code." Git is the tool on your machine; GitHub is the online copy your team shares. Moving between them is always a deliberate step: **push** to send your work up, **pull** to bring others' work down.

## Commit

A **commit** is a labeled snapshot of your project at a moment in time. You're not copying files — you're marking a checkpoint and attaching a short note ("added the login button") so you can find it later. Git keeps every commit, so you can look back through the project's history or return to an earlier state. AI tools can draft these commit messages for you.

## Repo (repository)

A **repo** is a project folder that Git is tracking. It holds your files *and* the full record of how they changed over time. When developers say "the repo," they just mean the Git-tracked project.

## Branch

A **branch** is a safe, parallel copy of the project where you can work without affecting the official version.

The trusted, approved version everyone shares is called **`main`** — you generally don't edit it directly. Instead you create a branch (e.g. `redesign-header`), do your work there, and later **merge** it back into `main`. Branches let a whole team work at once — one person on the header, another on login, another on checkout — without overwriting each other. Each branch is one focused task with a clear name, so it's obvious who's doing what.

## PR (Pull Request)

A **PR** is a proposal to merge your branch into `main`. Rather than merging silently, you "open a PR," which creates a page on GitHub where teammates can see exactly what changed, comment, and approve before it becomes part of `main`. Some platforms call the same thing a **Merge Request (MR)** — identical idea.

## Push and Pull

- **Push** = upload your commits from your computer to the cloud (GitHub) so others can see them. Opening a PR usually happens *after* a push, but they're separate steps — the common sequence is **commit → push → open PR**, done back-to-back.
- **Pull** = download the latest work others have merged into `main`, so your copy is up to date. You typically pull when **starting new work** (branch from the freshest `main`) and again before opening a PR.

With an AI tool you can just say things like *"summarize my changes and propose a commit message,"* then *"push and open a PR,"* or *"switch to main, pull the latest, then create a branch named ___."*

## Merge conflict

A **merge conflict** happens when two branches change the *same lines* in different ways, and Git can't decide which to keep. Important: the merge is **paused, not broken** — nothing is lost or overwritten. Git is simply waiting for you to choose: keep your version, keep theirs, combine them, or write something new.

Conflicts stay small and rare when everyone **merges often** and works in different areas; they pile up when a branch sits untouched for a long time.
