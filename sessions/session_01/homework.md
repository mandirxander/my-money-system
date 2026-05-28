# Session 1 Homework

Complete all four parts before Session 2. Post your reflection to the Teams channel when you're done.

---

## Part 1: Set Up Your Project Workspace

Your project starts from a shared starter template — a pre-built folder structure with the workflows, CLAUDE.md, and docs layout already in place.

**Steps:**

1. Go to `https://github.com/sundaynd98/AI_Mentor_Circle_public` (make sure you're signed into GitHub)
2. Click the green **"Use this template"** button near the top of the page, next to the "Code" button → select **"Create a new repository"**
3. Name your repo after your project (e.g., `my-knowledge-system`)
4. Set visibility to **Public** or **Private** — your choice
5. Click **"Create repository"**
6. On your new repo page, click **"Code"** → copy the HTTPS URL
7. Open Cursor and in the terminal run:
  ```
   git clone [your-repo-url]
  ```
8. Open the cloned folder in Cursor — this is your project workspace

**Why this matters:** The template gives you the right structure from the start — workflows, docs, and CLAUDE.md are already wired up. You're not building from scratch, you're building on a foundation the course is designed around.

> **If you run into trouble:** If you don't see the "Use this template" button, make sure you're signed into GitHub and reload the page. If you get stuck at the cloning step, open Claude Code in an empty folder and type:
> *"Help me clone [https://github.com/sundaynd98/AI_Mentor_Circle_public](https://github.com/sundaynd98/AI_Mentor_Circle_public) and set it up as my project in Cursor."*

---

## Part 2: Make Your First Commit and Push

When you cloned the template in Part 1, your local project was already connected to your GitHub repo. Now you just need to verify the connection and make your first commit after you've made changes.

**Steps:**

1. Make sure you have a GitHub account — you need one to complete Part 1 (github.com)
2. Open your cloned project folder in Cursor
3. In the Claude Code terminal, verify your project is connected to your repo:
  ```
   git remote -v
  ```
   You should see your repo URL listed. If nothing shows, ask Claude Code for help: *"Help me connect this project folder to my GitHub repo."*
4. After completing Parts 3 and 4, make your first commit and push:
  ```
   git add .
   git commit -m "Initial setup — workspace, CLAUDE.md, and profile"
   git push
  ```

**Why this matters:** You're about to start producing real artifacts. Git gives you a safety net and a record of how your thinking evolves.

**Tip:** Commit often as you work to save changes locally. Push to GitHub when you're ready to save a set of changes there.

---

## Part 3: Complete the Orientation Workflow

If you didn't finish the orientation workflow in session, complete it now.

**To start — open a new chat in Claude Code and type:**

> `@workflows/orientation.md` — Let's work through the orientation workflow from the beginning.

Work through these steps:

- Background: who you are, your role, technical level, domain expertise
- Goals: what you want to get out of this course
- Project idea: what you want to build and your return loop concept
- Review `docs/reports/participant_profile.md` — Claude generates this from your conversation; update anything that doesn't feel right
- Review your `CLAUDE.md` — Claude fills in the placeholders from your profile; edit anything you want to change

**When all steps are done**, the workflow is complete. Your `CLAUDE.md` is the source of truth Claude reads about you — your full profile in `docs/participant_profile.md` is the context it draws from.

---

## Part 4: Complete the Ideation Workflow

Work through the ideation workflow with Claude. Open your project in Cursor, reference the workflow file, and work through each step in order.

**To start — open a new chat in Claude Code and type:**

> `@workflows/ideation.md` — Let's work through the ideation workflow together.

**Come prepared with your initial ideas.** The ideation workflow will pick up from the initial thinking you captured in the orientation workflow and help you develop and land on a project idea. The clearer your starting point, the more productive the session.

**Work through all steps.** The workflow will guide you through:

- Step 1: Problem framing (current state → desired state)
- Step 2: Assumption challenging
- Step 3: Autonomy spectrum + solution generation
- Step 4: Solution selection
- Step 5: Quality risk identification
- Step 6: Validation experiment design

**When all steps are done**, the workflow is complete. You can revisit any step at any time. Your output should be saved to `docs/problem_definition.md` before you finish.

---

## Reflection (post to Teams channel)

After completing Parts 3 and 4, write a short reflection (a few sentences to a paragraph for each):

1. **What is your system?** Describe the project idea you chose and the return loop you designed. What triggers a return visit in your system?
2. **What surprised you** during the ideation workflow? Did your thinking shift at any point?
3. **One instruction you added to your CLAUDE.md** based on something you learned today — what was it and why?

Post your reflection in the Teams channel before Session 2.

---

## What You Should Have When Session 2 Starts

- GitHub connected, first commit made
- `docs/problem_definition.md` completed (from ideation workflow)
- `docs/reports/participant_profile.md` complete
- `CLAUDE.md` updated and tested
- Reflection posted to Teams channel

