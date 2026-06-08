# Implementation Workflow — Complete Reference

**ID:** implementation
**Description:** Design delivery mechanism informed by user context and translate workflow to executable implementation with minimal scope

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the implementation workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:

1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete", let the participant know the workflow is complete, and remind them to update `docs/reports/session_log.md` and `docs/reports/decisions.md`

- Keep tone conversational and collaborative
- Use Socratic questioning — don't prescribe delivery mechanisms or implementation approaches
- Key principles: Context over assumptions, Quality risk focus, Incremental over ambitious, Simple over clever, Meet users where they are
- Reads from: `docs/evaluation_design_report.md`, `docs/user_research_plan.md`, `docs/user_research_findings.md`, `docs/reports/participant_profile.md`, `docs/problem_definition.md`

---

## Steps

### Step 1: Ground in what you've learned and confirm your primary quality risk

**Goal:** Pull forward what you already learned from user research and evaluation, confirm your primary quality risk, and note anything that changed — without re-deriving it from scratch

## Conversation Flow

You've already done this thinking in earlier workflows — this step *reads it back*, it doesn't re-interview you. Pull from their existing artifacts rather than asking them to recount everything.

### 1. Read What They Already Produced

- `docs/user_research_findings.md` — the synthesis and `implications_for_build` (if they did user research)
- `docs/evaluation_design_report.md` — their prioritized quality risks and test cases
- Any spike learnings noted in `docs/problem_definition.md`

Summarize it back: "Here's what I'm carrying into the build — your primary quality risk is [X], user research suggested [Y], and your spike showed [Z]."

### 2. Confirm the Primary Quality Risk

- "Given everything you've learned, is [their risk] still the right thing to build around?"
- "Did user research or your spike surface a bigger risk you should center instead?"

Only go deeper if their answer signals the risk has genuinely shifted — otherwise confirm and move on.

**Deliver:** Save to `docs/implementation_design.md` with sections:

- learning_since_last_interaction (carried_forward_summary, updated_quality_risk_focus)

**User Context:**

- Provides: Confirmation or correction of the quality risk to build around
- Receives: A concise, build-focused summary drawn from their own prior work

**Confirm before continuing:** "Does this capture the right quality risk to design the build around?"

---

### Step 2: Design the interaction model — where it fits, and the agency/autonomy balance

**Goal:** Decide where the system fits into the user's routine, and how much it decides on its own vs. asks the user

## Agency vs Autonomy

- **Agency** = asks for guidance at judgment points ("Here's what I found — which should I use?"). Use when a mistake is costly or needs the user's context.
- **Autonomy** = "go do it, tell me when done." Use for mundane, rule-following work (gathering, formatting, organizing).

Default to **more agency** for the first version: let the system gather and organize, let the human decide and judge. Automate the tedious, not the critical.

## Conversation Flow

### 1. Where does it fit?

Their system runs on the common stack (web-based, Next.js + Vercel), so the question isn't *what kind of thing to build* — it's where it sits in the user's routine:

- "Where in their current routine would they open this — and what would bring them back?" (this is their user return loop from ideation — keep it alive)
- "What's the most frustrating part of how they do this today?" (put the system at that pain point)

### 2. Pain points vs flow points

- **Pain points** — where are they context-switching, copy-pasting, or waiting? That's where the system earns its keep.
- **Flow points** — where are they already comfortable and efficient? Don't disrupt these.

Insert the system at the pain points; fit alongside the flow points.

### 3. Balance agency vs autonomy

For each main thing the system does:

- "Does this need the user's judgment, or can it just run?"
- "What's the cost of a mistake here?" (high → more agency, low → more autonomy)

### 4. Map the integration points

- **Input:** When the user wants to use it, what's the most natural way to start — and what do they need to provide it (a form, a paste, an upload)?
- **Output:** What do they get back, and where does it go — on screen, saved, sent on?
- **Review points:** From the agency/autonomy balance, which moments need the user to approve or steer before the system continues?

**Deliver:** Append to `docs/implementation_design.md` with sections:

- delivery_context_design (where_it_fits, interaction_model, agency_vs_autonomy, user_touchpoints)

**User Context:**

- Provides: Information about their end user's existing tools, workflow context, and agency vs autonomy preferences
- Receives: A clear interaction model that fits their user's context and workflow

**Confirm before continuing:** "Does this interaction model make sense for how your user actually works?"

---

### Step 3: Map the data flow

**Goal:** Map how information moves through the system — concretely enough to scope and spec the POC. (The deep version — trimming LLM calls, schemas — comes later in the context_architecture workflow.)

## Match their technical level

Check their participant profile and adapt:

- **Non-technical:** talk in behavior and flow, no jargon. "What does the system need from the user to start? What does it need to remember? Where does the information come from? What needs to talk to what?"
- **Technical:** use real terms — state, data flow input → LLM → output, which APIs/services.

## Start from what you already know

Don't make them recount from scratch — pull from their artifacts and Step 2, then have them correct your draft:

- their data source / connection → `problem_definition.md` (Requirements Mapping) and the interaction model from Step 2
- what users actually need → `user_research_findings.md`
- the quality risk to protect → Step 1

## Conversation Flow

### 1. Trace the main path

Propose a first-draft happy path from what you know, then have them correct it, end to end:

- "The user provides [X] → the system does [what] → the Claude API call [does what] → the user gets [Y]."
- "What does the system need to remember between steps?"

### 2. Name the external connections (and confirm the ones they chose)

- "What does this need beyond the user and the LLM?" — list each external data source or service it relies on, plus Supabase for storage.
- **This is where the draft becomes real.** Back in Part 1 they mapped a first-draft data source and connection; the spike tested just one to stay simple. Now decide the actual set the POC needs. The common stack (Supabase, Claude API) is settled, but their own connections aren't — and the POC may genuinely need more than one if the idea depends on it.
- For each connection, **don't just ask whether it's right — help them judge it.** Some participants won't know if MCP vs. API was the correct call. Look at the actual service: does it offer a ready-made MCP server, or is a plain API call simpler here? Explain the tradeoff in plain language, recommend the better fit for their case, and confirm together:
  - "Your system connects to [their data source(s) / service(s)]. Here's my read on whether those are still the right choices, and whether MCP or an API is the better way in for each — does that match what you're seeing?"
- Include the connections the POC genuinely needs — that may be more than one — but don't add any it can do without. If something would serve them better long-term, note it as a future option rather than expanding scope now.

### 3. Mark the human-judgment points

- "Where does the system pause for the user to decide, review, or approve?" (ties back to the agency/autonomy balance from Step 2)

That's enough to scope and spec. You'll inventory and tighten the actual LLM calls and data flow in the later context_architecture workflow.

**Deliver:** Append to `docs/implementation_design.md` with sections:

- data_flow (main_path, external_connections, self_chosen_components, human_judgment_points)

**User Context:**

- Provides: Their sense of how data should move and what the system connects to
- Receives: A concrete data-flow map to scope and spec the POC against

**Confirm before continuing:** "Does this capture the main path and connections well enough to scope the POC?"

---

### Step 4: Define your POC scope — what to build first

**Goal:** Help them decide what to build first — the quality-risk core — and pare the idea down to what's deliverable in the time left, without limiting their ambition

## Right-size the first version

They've just designed something comprehensive. This step decides what to build *first* — and, if the whole idea is too big to deliver across the remaining sessions, helps them pare it down to what they *can* deliver. They're not shrinking their ambition; they're choosing the **order** and telling Claude what to prioritize.

**The key insight:** your primary quality risk sets the order. The fastest version that tests whether that risk is real is what you build first. Everything else still matters and stays on the table — the quality risk just decides what comes first.

## Conversation Flow

### 1. Lead with your quality risk

"Let's come back to your primary quality risk: [state their risk from Step 1]."

"Let that decide what to build first — the fastest version that tests whether this risk is real and how bad it is."

"It's not the only thing that matters: you're building toward a real, working product with a return loop. The quality risk just tells you what to prioritize now, so you learn the most before investing in the rest."

### 2. Ask What They Want to Try First

"Looking at everything we just designed... what do you want to try FIRST?"

### 3. Challenge Each Component

For each thing they mention, ask the hard question: **"How does [component X] help you test [their quality risk]?"**

### 4. The Ruthless Filter

For each component, apply this filter together:

- **Essential (must have):** Directly tests the quality risk; without it, you learn nothing
- **Nice to have (defer):** Makes it better/cleaner but doesn't change learning; could stand in for it or handle manually for the POC
- **Scope creep (cut):** Doesn't relate to quality risk; future feature bleeding into the POC

### 5. Cut or simplify to fit your scope (if needed)

Only if the first version is still too big — this is about **build effort.** Some pieces are expensive to build properly. You can often simplify a high-effort piece for now so they reach a testable product faster, then build it out more fully later. The full product still gets there; they're just sequencing the effort.

**Walk them through it, don't prescribe.** For each high-effort piece, weigh it together:

- "Pick one high-effort piece of your system (call it [X]). Would building the full version now teach you anything more about your quality risk than a simpler version would? If not, simplify it for now and build out [X] more fully later."

Examples of ways to simplify (offer only if they need them):

- Test with just YOUR data first, before building user accounts
- Manually trigger something instead of building the automation
- A simple stored file or table instead of a full data model

**The principle:** if simplifying a piece lets them build and learn sooner *without* changing what the test teaches — and they'll build the real thing later — it's a smart scope call, not a compromise.

### 6. The Single Path Rule

"Let's define THE path — not multiple paths, just one:"

- One input scenario (not all edge cases)
- One happy path through the flow (not error handling)
- One output format (not multiple options)

### 7. Define "Done" Clearly

Get very specific:

- **NOT:** "The workflow runs"
- **YES:** "I can give it [X input], it produces [Y output], and I can see if [quality risk] occurred"

### 8. What's not in the first version

Everything else simply comes after the first version. Be realistic about what fits in the sessions left: some of it you'll add as you go (e.g., tighter error and edge-case handling, UI polish, deployment), but bigger pieces — user accounts, multiple-user support, notifications, logging/monitoring, lots of configuration — are usually a **future state beyond the class** for a project this size, and that's expected.

**Capture what you're placing beyond the class.** If you decide something is a future state beyond the class, have Claude save it to your project — it goes in the `future_state_beyond_class` part of `implementation_design.md` — so the idea is recorded and out of your class scope: parked, not lost. Everything else is understood to be coming, just not first.

**Deliver:** Append to `docs/implementation_design.md` with sections:

- poc_scope_definition (build_first_target, core_path_only, feature_justification, simplified_elements, definition_of_done, future_state_beyond_class)

**User Context:**

- Provides: Their feature priorities and understanding of what's essential vs nice-to-have
- Receives: A focused POC scope that directly tests their main quality concern

**Confirm before continuing:** "Is this the right first version to test your quality risk — without cutting what your product needs to actually work?"

---

### Step 5: Generate your POC specs

**Goal:** Turn the scope into specs a coding agent (Claude Code) can build from — on the common stack

## Platform Strategy

There's no platform to choose — every project builds on the common stack: **Next.js + TypeScript**, **Tailwind + shadcn/ui**, **Supabase** (database/storage), **Claude API** (Anthropic SDK), deployed to **Vercel**, secrets in `.env.local`. The external connections they chose themselves were confirmed in Step 3. The specs target this stack.

If, while speccing, something about the stack genuinely wouldn't serve their project, raise it. Only switch the POC off the common stack if they have a good reason and are sure they want to — otherwise note it as a future option and keep building on the common stack.

## Conversation Flow

### Generate the POC specs

**These are the preliminary specs for the first version of your POC, not a locked final spec.** Later workflows refine and extend it from here. So spec the first version confidently — it's the blueprint Claude Code starts from, not the finish line.

Based on their scope (Step 4), data flow (Step 3), and interaction model (Step 2), have Claude draft the specs below. **Claude drafts, but it's their spec** — walk them through each part so they can review, correct, and add anything before it's finalized.

**Data Flow Requirements:**

- Input format and validation requirements
- Data transformations needed at each step
- Output format and delivery mechanism
- State management needs

**Integration Specifications:**

- External APIs required (with authentication methods)
- Database requirements
- Third-party services needed
- Human-in-loop touchpoints and approval mechanisms

**Quality Risk Testing Requirements:**

- Specific test scenarios from their evaluation dataset
- Success criteria and measurement methods
- Error conditions to handle
- Monitoring and observability needs

**Validation Check:**

- Specs match the reduced POC scope (one path, not everything)
- Built on the common stack, plus the data sources / connections they chose in Step 3
- Concrete enough for Claude Code to start building
- Quality risk testing is explicit and references the evaluation dataset

**Deliver:**

1. Save to `docs/specs/poc_specs.md` with sections: data_flow_specifications, integration_specifications, quality_risk_testing_specifications, human_in_loop_requirements, success_criteria
2. Append to `docs/implementation_design.md` with section: implementation_approach

**User Context:**

- Provides: Confirmation the scope and approach feel right, plus their corrections and additions to the draft
- Receives: Initial build specs for their POC on the common stack

**Confirm before continuing:** "Do these specs give Claude Code enough to start building your POC?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection, add any key decisions and their reasoning to `docs/reports/decisions.md`, and commit your changes.

---

## Output Artifacts


| File                       | Location      | Description                                                                                         |
| -------------------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| `implementation_design.md` | `docs/`       | Quality risk, interaction model, data-flow map, POC scope (what to build first), and the implementation approach |
| `poc_specs.md`             | `docs/specs/` | Initial build specs for the first version of the POC                                                  |


