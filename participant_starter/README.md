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
│   ├── research/                ← User research notes, interview guides (Session 3)
│   └── specs/                   ← Design specs, UX spec, MVP specs (Sessions 4–5)
│
├── prompts/                     ← Prompt templates you write and refine (Sessions 3–4)
│
├── workflows/                   ← Course workflow guides — reference with @workflows/[name].md
│
└── src/                         ← Your source code — add this when you start building (Session 5+)
```

**Phase 2 folders (add when you need them):**
- `src/` — add when starting the POC build (Session 5)
- `data/` — add when you need to mock or store structured data
- `docs/eval/` — add for evaluation reports (Session 3–4)

---

## Artifacts You'll Produce (and where they go)

| Session | Artifact | Location |
|---------|----------|----------|
| 1 | participant_profile.md | docs/reports/ |
| 1 | CLAUDE.md | project root |
| 2 | problem_definition.md | docs/ |
| 3 | testing_prompt.md | prompts/ |
| 3 | evaluation_design_report.md | docs/eval/ |
| 3 | user_research_plan.md | docs/research/ |
| 3 | interview_analysis_prompt.md | prompts/ |
| 4 | evaluations_data.csv | data/ |
| 4 | user_experience_spec.md | docs/specs/ |
| 5 | implementation_design.md | docs/ |
| 5 | mvp_specs.md | docs/specs/ |
| 5 | session_log.md (build entries) | docs/reports/ |
| 6 | system_specification.md | docs/specs/ |

---

## Key Habits

- **Update CLAUDE.md every session** — it grows with your project
- **Append to session_log.md at the end of every session** — run `/wrap-up` in Claude Code to walk through your reflection and draft the entry
- **Log major decisions to decisions.md** — never edit past entries, only append
- **Connect to GitHub** after Session 1 — first homework

---

## Tips

Ask Claude to help with any of this:
- *"Help me write my participant_profile.md"*
- *"Append a session log entry for what we just did"*
