# Context Management Workflow — Complete Reference

**ID:** context_management
**Description:** Design how information flows through your LLM calls, ensuring each reasoning step gets exactly what it needs while avoiding context bloat and quality risks

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the context management workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Begin with Step 1 and follow each step prompt in order
2. Complete one step fully before moving to the next
3. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
4. Save outputs to the file paths specified in each step
5. When you reach the final step, let the participant know the workflow is complete and remind them to update `docs/reports/session_log.md`

- Keep tone collaborative; explain why each decision matters for confident context management
- Use Socratic questioning — don't prescribe context management patterns
- Engage as a thought partner, present one thought at a time
- Reads from: `docs/evaluation_design_report.md`, `docs/implementation_design.md`, `docs/specs/mvp_specs.md`

---

## Steps

### Step 1: Ground the work in their actual implementation state, surface deviations from plan, identify context-related issues
**Goal:** Ground the work in their actual implementation state, surface deviations from plan, identify context-related issues



## Analyzing Their Implementation

Start by summarizing what the automatic discovery found:

**If implementation files were found:**
- "I found [N] implementation files in your project: [list key files]"
- "I can see evidence of [context patterns/LLM calls/data flows] in your code"

**If no implementation files found:**
- "I don't see any implementation files in your project yet"
- "Have you started building, or are you still in the planning phase?"
- If n8n: Ask for workflow JSON export to analyze
- If no implementation yet: Work from their design artifacts

## Conversation Flow

### 1. Acknowledge the Plan & Present Discovery

Start by referencing their previous design work:
- "I see from your delivery context you were planning to build [summarize their planned approach]..."
- "Is what I found consistent with what you planned, or has your implementation taken a different shape?"

### 2. Compare to Plan

Explore deviations:
- "How does this compare to what you originally planned?"
- "What changed and why?"
- "What did you discover during implementation?"
- "How has your understanding of your major quality risk evolved since last time we spoke? Do you think any of your failure modes are due to incomplete data flows?"

### 3. Set Direction

Frame what's coming:
- "We're going to map exactly how information flows through your system"
- "We'll identify every LLM call and what data it needs"
- "We'll challenge whether each piece of context is necessary for your quality risk"
- "You'll have a spec to refactor against"

**Deliver:** Save to `docs/context_management_design.md` with sections:
- implementation_reality_check (implementation_reality, user_context_flow_analysis, quality_risk_connection)
- discovered_context_patterns

**User Context:**
- Provides: Their current implementation state and deviations from original plan
- Receives: A clear assessment of actual vs. planned implementation reality

**Confirm before continuing:** "Does this accurately reflect what you actually built?"

---

### Step 2: Map every LLM call and challenge whether each is needed for the quality risk
**Goal:** Map every LLM call and challenge whether each is needed for the quality risk



## Deep Dive Process

### 1. Pick First LLM Call

Start with their list from Step 1:
- "Let's go through each LLM call one by one. Starting with [first call name]..."

### 2. For Each Call, Ask These Questions

**What is this call really trying to accomplish?**
- "Walk me through what this LLM call is doing"
- "What problem are you solving with this call?"
- "Give me an example input and what you'd want as output"

**Why does this need an LLM?**
- "Could you solve this with simple logic, rules, or regex?"
- "What about this task requires reasoning or language understanding?"
- "What would break if you tried to do this without an LLM?"

**What does good output look like?**
- "How do you know if this call succeeded?"
- "What would a perfect output be? What about a barely acceptable one?"

**What are the edge cases?**
- "What happens if the input is missing key information?"
- "What if the input is malformed or unexpected?"

**Quality risk challenge:**
- "How does this call connect to your primary quality risk?"
- "If this call failed, would your solution still address the user's core problem?"
- "Rate this 1-10 on importance to your quality risk. Why that number?"

### 3. Challenge Necessity

**If they struggle to explain quality risk connection:**
- "That makes me think this might be nice-to-have rather than essential"
- "Could you validate your quality risk without this call?"

**If it seems like simple logic could handle it:**
- "This sounds more like data transformation than reasoning"
- "Could a template or simple function do this?"
- "If yes — that's totally fine for now. Let's note it as 'LLM for convenience'"

**If multiple calls seem similar:**
- "This call and [other call] seem related — could they be combined?"

**Deliver:** Append to `docs/context_management_design.md` with section:
- llm_call_inventory (llm_call_analysis for each call with: core purpose, why LLM needed, success criteria, failure modes, quality risk connection with 1-10 rating, status using ✅ Essential / 🔧 LLM for convenience / ⚠️ Maybe Later / ❌ Remove)
- calls_to_remove_or_defer

**User Context:**
- Provides: Their understanding of which LLM calls are essential vs. optional
- Receives: An inventory of all LLM calls challenged against quality risk necessity

**Confirm before continuing:** "Are these the right LLM calls for testing your quality risk?"

---

### Step 3: Define exact input data contracts for each LLM call with field names, types, and examples
**Goal:** Define exact input data contracts for each LLM call with field names, types, and examples



For each LLM call, work through these stages:

#### Stage 1: Parse Unstructured Examples
- "In Step 2, you gave this example input: [quote their example]"
- "Let's break this down into specific pieces of information"
- "What are the individual data points the LLM actually needs from this example?"

#### Stage 2: Identify Atomic Fields
- "So the atomic fields I'm hearing are: [list them]"
- "Are there any other pieces of information the LLM needs that aren't in this example?"
- "Which of these are absolutely critical vs. nice-to-have?"
- Connect to quality risk: "In Step 2, you mentioned this call could fail if [failure mode] — which fields prevent that?"

#### Stage 3: Define Structured Schema
Formalize these as a schema. Keep it simple — push back on over-engineering.

### Schema Definition Format

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "context_variable_name": {
        "type": "string",
        "description": "Descriptive name of the input variable"
      },
      "relevance_to_quality": {
        "type": "string",
        "description": "How this input field contributes to the quality we are looking for"
      },
      "required": {
        "type": "boolean",
        "description": "True if absence would cause significant quality decrease"
      },
      "type": {
        "type": "string",
        "description": "Expected data type (string, array[string], datetime, object, etc.)"
      },
      "source": {
        "type": "string",
        "enum": ["system", "user"],
        "description": "Whether this context is provided by the system or a user"
      }
    }
  }
}
```

**Deliver:** Append to `docs/context_management_design.md` with section:
- context_schemas (array of context variables per LLM call)

**User Context:**
- Provides: Their confirmation of required fields and data types for each call
- Receives: Formal context requirements with exact input schemas

**Confirm before continuing:** "Do these schemas ensure each LLM call has the context needed for consistent results?"

---

### Step 4: Map how information flows through their implementation to identify quality-impacting duplication and gaps
**Goal:** Map how information flows through their implementation to identify quality-impacting duplication and gaps



Explain this to the user:

Every LLM call that we have mapped acquires information (context), shapes it, and then delivers it.
We want to make sure this is explicit in our schema so that we can refine it as needed.
Every piece of acquired or delivered information also has its own retention policy — only relevant for this LLM call, or this session, or we want to persist it across sessions.

## Mapping Process

### 1. Work Through Each Call

"Let's map the data flow for [Call Name]..."

For each field in the schema ask:

**"Where does `[field_name]` originally come from?"** (ACQUIRE)
- Push for specifics: "Which API?" "What user action?" "Previous LLM output from where?"

**"Do you store it, or is it ephemeral?"** (RETAIN)
- If stored: "Where? How long?"

**"Any transformation between source and LLM?"** (SHAPE)
- If yes: "What exactly? Be specific — not just 'cleaned' or 'processed'"

**"How does the output of the LLM need to look like?"** (DELIVER)
- Plain text? Formatted text? JSON?

### 2. Spot the Gaps

As you map, watch for:
- **Missing sources**: "Where does this actually come from?"
- **Vague transforms**: "What does 'cleaned' mean specifically?"
- **Undefined storage**: "This needs to persist — where?"
- **Broken flows**: "This is required but I don't see how it gets here"

### Enhanced Schema Format

Building on Step 3's schema, add data flow information to each field:
- `acquire_source` — Specific source where this data originates
- `retention_policy` — "call_only", "session", or "persistent"
- `shape_transformation` — Any specific transformation between source and LLM input
- `deliver_format` — How the LLM output should be formatted

**Deliver:** Append to `docs/context_management_design.md` — refine the context_schemas section to include data flow mapping.

**User Context:**
- Provides: Examples of how data flows through their actual implementation
- Receives: An analysis of actual data flow patterns, duplication, and gaps

**Confirm before continuing:** "Does this identify the data flow issues that contribute to your quality risk?"

---

### Step 5: Identify context waste — redundant passing and unused information that creates bloat without benefit
**Goal:** Identify context waste — redundant passing and unused information that creates bloat without benefit



Scan across all schemas looking for:

### 1. Naming Inconsistencies

Same concept, different names:
- `user_query` vs `query` vs `user_question` → pick one
- **For each:** "I see you use [variant1] and [variant2] for the same thing — which name should we standardize on?"

### 2. Type Inconsistencies

Same concept, different types:
- `priority` as number in one call, string in another
- **For each:** "This field has different types across calls — which makes sense for your platform?"

### 3. Redundant Operations

Same work done multiple times:
- Acquiring same data from same API in multiple calls
- **For each:** "You're doing [operation] in multiple places — could you do it once and reuse?"

### 4. Bloated Schemas

If any call has >7-8 fields total:
- "This schema is getting heavy — what's truly essential?"

### 5. Retention Policy Consistency

Check retention policies across all fields:

**Session retention without justification:**
- "Will you need `[field]` again in the same session? Why not ephemeral?"

**Persistent retention (challenge this):**
- "Do you need `[field]` after the session ends? How does long-term storage help your quality risk?"
- Default to ephemeral unless strongly justified

**Missing pruning strategies:**
For any session/persistent field, require:
- **Max size:** "How many items/messages?"
- **Pruning:** "What gets removed first?"
- **Trigger:** "When does pruning happen?"

Once optimization opportunities are approved, go ahead and make changes to the schemas.

**Deliver:** Append to `docs/context_management_design.md` — refine context_schemas to optimize against redundant context, unused information, and data flow gaps.

**User Context:**
- Provides: Their recognition of where they're wasting effort on redundant context management
- Receives: Clear identification of context waste and specific optimization opportunities

**Confirm before continuing:** "Does this identify context waste that's hurting your quality without providing value?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `context_management_design.md` | `docs/` | Implementation reality check, LLM call inventory, context schemas with data flow mapping and retention policies |
