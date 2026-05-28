# User Experience Design Workflow — Complete Reference

**ID:** user_experience
**Description:** Design user experience by mapping UserContext to AgentContext and creating implementation-ready UX specifications

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the user experience workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Begin with Step 1 and follow each step prompt in order
2. Complete one step fully before moving to the next
3. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
4. Save outputs to the file paths specified in each step
5. When you reach the final step, let the participant know the workflow is complete and remind them to update `docs/reports/session_log.md`

- Keep tone collaborative; explain why each UX decision matters
- Use Socratic questioning — don't prescribe UX patterns or interface designs
- Engage as a thought partner, present one thought at a time
- Reads from: `docs/problem_definition.md`, `docs/implementation_design.md`, `docs/specs/architecture_spec.md`, `docs/context_management_design.md`

---

## Steps

### Step 1: Conduct structured interview to define the UserContext schema capturing user mental model
**Goal:** Conduct structured interview to define the UserContext schema capturing user mental model



Summarize what we know about the user agent interactions from the files you read. Then ask if this is accurate or if they want to add any details.

Some of the details that are interesting could be:

**What User Provides:**
- "What information does your user provide to start the task?"
- "What details do they need to specify for the system to act?"
- "Do they provide this once, or does the system need to ask for more input later?"
- "Are there preferences or constraints they always want to set?"

Look for: Initial inputs (query, files, parameters), ongoing inputs (refinements, corrections), constraints (budget, time, style, rules), preferences (tone, detail level, format)

**What User Validates:**
- "What does the system produce that the user needs to check or approve?"
- "Are there critical decisions the user must make themselves?"
- "What mistakes would be costly if the system got them wrong?"

Look for: Approval checkpoints (plans, drafts, decisions), review moments (summaries, classifications), correction opportunities (when system misunderstands)

**What User Tracks:**
- "What does the user need to know to feel oriented during this task?"
- "If the system is running, what questions would the user have?" (Where am I in the process? What has been done? What's next?)

Look for: Progress indicators (current step, completion %), status information, system state visibility

**What User Controls:**
- "What should the user be able to change mid-task?"
- "What settings or parameters affect how the system behaves?"
- "Can they pause, restart, or undo?"

Look for: Editable parameters, control actions (stop, retry, skip, override), state resets

**Known Issues and Mental Models:**
- "What does your user already know might be wrong or missing?"
- "What assumptions do they bring to this task?"
- "What do they think the system can/can't do?"

## Synthesize Into UserContext Schema

After the interview, propose a UserContext schema:

```python
class UserContext(BaseModel):
    # What user provides
    goal: str  # What they're trying to accomplish
    inputs: dict  # Initial inputs (query, files, etc.)
    constraints: dict | None  # Budget, time, rules
    preferences: dict | None  # Tone, detail level, format

    # What user tracks
    current_step: str | None  # Where they think they are
    understood_state: dict  # What they believe system has done
    known_issues: list[str]  # Things they know are wrong/missing

    # What user validates
    pending_approvals: list[dict]  # Things awaiting user review
    corrections: list[dict]  # User-provided fixes/adjustments

    # Control
    is_paused: bool  # User control state
    custom_overrides: dict | None  # User-specified exceptions
```

Adapt this to their specific task. Not all fields will apply. Some tasks need additional fields.

**Deliver:** Save to `docs/specs/user_experience_spec.md` with section:
- user_context_schema

**User Context:**
- Provides: Their detailed understanding of their user's tasks, information needs, and control expectations
- Receives: A documented UserContext schema grounded in user mental models

**Confirm before continuing:** "Does this UserContext capture what your user needs to feel oriented and in control?"

---

### Step 2: Map UserContext fields to AgentContext/ServiceContext and designate user-facing components
**Goal:** Map UserContext fields to AgentContext/ServiceContext and designate user-facing components



**Key insight:** Simplifying to one user-facing component makes UX cleaner. Other agents can work in the background even if they're still agents architecturally.

## Part 1: Designate User-Facing Component

**If they have AGENTS (1-2 agents):**

"For simplicity, I recommend having ONE agent interact directly with the user.

Which agent should be the user-facing one?"

If not obvious: "Agent 1 seems like the natural entry point because [reason]"

**If they have NO agents (service-oriented architecture):**

"Which service handles user interaction? Or do we need a thin orchestration layer?"

## Part 2: Map UserContext ↔ AgentContext Fields

For each UserContext field:
- "Where does `[UserContext.field]` go in the agent's state?"
- "Is it a direct copy, or does it transform into something else?"
- "Does the user need to see any agent state that relates to this?"

### Common Mapping Patterns

- **Direct 1:1** (user provides, agent stores): `UserContext.goal → AgentContext.task_description`
- **User provides, agent refines**: `UserContext.query → AgentContext.processed_query`
- **Agent produces, user tracks**: `AgentContext.current_step → UserContext.current_step`
- **Bidirectional (co-authored)**: `UserContext.plan ↔ AgentContext.plan`

## Part 3: Create Mapping Table

| UserContext Field | AgentContext Field(s) | Relationship | Data Flow | Notes |
|-------------------|------------------------|--------------|-----------|-------|
| goal | task_description | 1:1 copy | user → agent | Initial input |
| query | processed_query | transformed | user → agent | Agent normalizes/expands |
| current_step | plan.current_step_index | derived | agent → user | Agent counter → user progress view |

**Deliver:** Append to `docs/specs/user_experience_spec.md` with section:
- context_mapping (field-level mapping table between UserContext and system context)

**User Context:**
- Provides: Their knowledge of how the system currently manages context and where user interactions belong
- Receives: Clear mapping of what the user sees/affects versus what the system stores internally

**Confirm before continuing:** "Does this mapping align with your vision for user control and system autonomy?"

---

### Step 3: Validate context mapping against LLM risks and identify gaps requiring user oversight
**Goal:** Validate context mapping against LLM risks and identify gaps requiring user oversight



## Validate Context Mapping and Risk Coverage

LLM agents have inherent failure modes that need user oversight. Review the architecture and mapping to ensure these risks are visible and controllable:

```
🔍 **Hallucination** (generating plausible but false information)
   - Where does your agent generate factual content?
   - How will users verify accuracy?
   - Do they see sources/citations/confidence levels?

🎲 **Stochastic Behavior** (same input → different outputs)
   - Where does your agent make decisions or generate content?
   - Can users regenerate if they don't like the result?

🔄 **Context Loss** (forgetting earlier conversation)
   - Does your agent maintain conversation history?
   - Can users see what context the agent has?

🎯 **Instruction Following Failures** (misunderstanding user intent)
   - Where does your agent interpret user instructions?
   - Can users correct misunderstandings mid-task?

🔐 **Prompt Injection** (user input affecting agent behavior)
   - Where does user input go into prompts?

📊 **Overconfidence** (presenting uncertain outputs as certain)
   - How does your agent communicate uncertainty?
```

### For Each Risk Found

- "Where in your flow could this happen?"
- "What does the user see when this happens?"
- "How can the user catch and correct it?"

### Document Mitigation

| Risk | Where It Occurs | User Oversight Mechanism |
|------|-----------------|--------------------------|
| Hallucination | [step/component] | [UserContext field or checkpoint] |

If any risk lacks user oversight, flag it and recommend adding a checkpoint/field/action to UserContext.

Once this is done, modify the schema to ensure improvements to mitigate the gaps are captured.

**Deliver:** Append to `docs/specs/user_experience_spec.md` with section:
- user_experience_gaps_and_risks (analysis of LLM-specific risks and user oversight mechanisms)

**User Context:**
- Provides: Their understanding of LLM risks in their system and mapping coverage analysis
- Receives: Validated mapping with identified risks and oversight mechanisms

**Confirm before continuing:** "Are there any additional risks or gaps you foresee that need user involvement?"

---

### Step 4: Define ownership and co-authoring rules for each context field
**Goal:** Define ownership and co-authoring rules for each context field



**Why this matters:** Without clear ownership, user edits disappear or agent updates override user intent.

## Add Ownership Rules to UserContext Schema

For each field, determine ownership:

- **USER-OWNED:** User writes, agent reads only
- **AGENT-OWNED:** Agent writes, user views only
- **CO-AUTHORED:** Both write with explicit rules

### For Each Field Ask:

- "Who should be able to change this?"
- "If the user edits it, should the agent respect that edit?"
- "If the agent updates it, can the user override?"
- "What happens if they disagree?"

### Co-Authoring Patterns

**Agent proposes, user approves/edits:**
- Agent writes initial value (proposal)
- User can accept, edit, or reject
- Once user edits, that version becomes locked
- Example: plans, drafts, summaries

**User provides, agent refines:**
- User writes initial value
- Agent can refine/normalize/expand
- User can see agent's version and revert
- Example: queries, inputs with auto-correction

**User controls, agent suggests:**
- User owns the field
- Agent can suggest changes (shown as proposals)
- Example: preferences, constraints

**Agent tracks, user corrects:**
- Agent maintains the field (progress, status, outputs)
- User can submit corrections
- Example: status tracking, result lists

**Minimize co-authored fields:** They're complex. Prefer clear single ownership where possible.

### Update the Schema

```python
class UserContext(BaseModel):
    # What user provides
    goal: str  # USER-OWNED: User sets, agent reads only
    constraints: dict | None  # CO-AUTHORED: User controls, agent suggests refinements

    # What user tracks
    current_step: str | None  # AGENT-OWNED: Agent updates, user views only

    # What user validates
    pending_approvals: list[dict]  # CO-AUTHORED: Agent proposes, user approves/edits
```

**Deliver:** Append to `docs/specs/user_experience_spec.md` — update the user_context_schema section with ownership rules, co-authoring patterns, and detailed field annotations.

**User Context:**
- Provides: Their decisions about which fields the user must control versus what the system can manage
- Receives: Explicit rules preventing accidental overwrites or authority confusion

**Confirm before continuing:** "Do these ownership rules align with your expectations for user control and system autonomy?"

---

### Step 5: Design sequential interaction narrative showing context evolution and checkpoints
**Goal:** Design sequential interaction narrative showing context evolution and checkpoints



## Design the Interaction Choreography

Based on your enriched UserContext schema with ownership rules and co-authoring patterns, let's design the temporal flow of user-agent interactions.

## 1: Extract Interaction Points from Schema

Review the UserContext schema and identify:
- **User Input Points:** Fields marked USER-OWNED or user-initiated CO-AUTHORED
- **Validation Checkpoints:** Fields with "user approves/edits" or "user corrects" patterns
- **Progress Updates:** Fields marked AGENT-OWNED that the user tracks
- **Control Actions:** User override, pause, regenerate capabilities

## 2: Draft the Interaction Dance

Create a temporal narrative based on the schema:

```
## Interaction Flow

### 1. User Initiation
- User provides: [list USER-OWNED fields from schema]
- System acknowledges: [confirmation of received inputs]

### 2. Agent Processing
- Agent updates: [list AGENT-OWNED progress fields]
- User sees: [what's visible during processing]

### 3. Validation Checkpoints
[For each CO-AUTHORED field with approval patterns:]
- Agent proposes: [field name and pattern]
- User can: [accept/edit/reject options based on ownership rules]
- If user edits: [specific co-authoring behavior from schema]

### 4. Error/Uncertainty Handling
[Based on risk mitigation from schema:]
- When [risk type] occurs: [user oversight mechanism]
- User controls: [correction/override options]

### 5. Completion
- Final state: [what user sees when done]
- User controls: [restart/modify options]
```

## 3: Present and Iterate

Show the interaction flow based on their schema.

Ask: "Does this temporal flow match how you envision the user experience? What would you change?"

**If changes needed:**
- First update the schema to reflect the new ownership or validation patterns
- Then revise the temporal flow to match the updated schema

**Keep iterating** until the flow feels right.

**Deliver:** Append to `docs/specs/user_experience_spec.md` with sections:
- interaction_flow (narrative_walkthrough, checkpoints_and_validation, uncertainty_and_error_handling)

**User Context:**
- Provides: Their desired experience pacing, validation points, and failure handling expectations
- Receives: Detailed story of how the user and system collaborate through the task

**Confirm before continuing:** "Does this interaction flow feel intuitive and supportive of user needs?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `user_experience_spec.md` | `docs/specs/` | UserContext schema with ownership rules, context mapping, LLM risk analysis, interaction flow |
