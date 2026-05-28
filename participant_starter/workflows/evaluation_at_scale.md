# Evaluation at Scale Workflow — Complete Reference

**ID:** evaluation_at_scale
**Description:** Transform your agent architecture into a diagnostic evaluation system by validating context inputs structurally, evaluating outputs semantically, and tracing failures back to context management issues

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the evaluation at scale workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Begin with Step 1 and follow each step prompt in order
2. Complete one step fully before moving to the next
3. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
4. Save outputs to the file paths specified in each step
5. When you reach the final step, let the participant know the workflow is complete and remind them to update `docs/reports/session_log.md`

- Keep tone collaborative; explain why each decision matters for confident evaluation
- Use Socratic questioning — don't prescribe evaluation frameworks or diagnostic approaches
- Engage as a thought partner, present one thought at a time
- Reads from: `docs/evaluation_design_report.md`, `docs/specs/architecture_spec.md`

---

## Steps

### Step 1: Ground evaluation work in current quality risk understanding and existing evaluation practices
**Goal:** Ground evaluation work in current quality risk understanding and existing evaluation practices



## Conversation Flow

1. **Acknowledge previous work.**
   Use the context available to summarize:
   - What quality concerns they captured previously
   - How many examples/tests they created
   - Which agents/services are in their architecture
   - Their primary quality risk and implementation platform

2. **Check for evolution in understanding.**
   Ask what they've learned since building the evaluation dataset:
   - "Have new failure modes emerged?"
   - "Did any testing reveal surprises?"
   - "Do failures feel tied to missing context, shaping issues, retention problems, or something else?"

3. **Understand current evaluation approach.**
   Explore how they test today:
   - Manual vs automated checks
   - What feels tedious or brittle
   - What they'd love to automate
   - Where they struggle to trace failures back to root causes

4. **Introduce evaluation-as-diagnosis framing.**
   Reinforce that:
   - Structural validation catches malformed input context
   - Semantic rubrics evaluate observable output properties
   - Low scores tell us which context pillar (acquire/shape/retain/deliver) broke
   - Most failures stem from context engineering, not LLM "intelligence"
   Confirm the framing makes sense before moving on.

**Deliver:** Save to `docs/evaluation_at_scale_design.md` with section:
- evaluation_reality_check (Quality Risk - Current Understanding, Current Evaluation Approach)

**User Context:**
- Provides: their updated reflections on evaluation progress, failure modes, and desired automation
- Receives: documented baseline for diagnostic evaluation design

**Confirm before continuing:** "Does this capture your current evaluation understanding and goals?"

---

### Step 2: Design three-dimensional output rubrics that reveal context management failures per agent
**Goal:** Design three-dimensional output rubrics that reveal context management failures per agent



## Rubric Design Checklist

1. **Re-ground in each agent's purpose.**
   Summarize what the agent reasons about, the inputs it consumes, and the outputs it should produce (from architecture_spec + prior steps).

2. **Explore failures via context pillars.**
   For acquisition, shaping, retention, and delivery ask:
   - "If this pillar fails, what would we SEE in the output?"
   - Capture observable symptoms (missing facts, irrelevant noise, contradictions, ignoring constraints, etc.).

3. **Convert symptoms into output properties.**
   Translate the observed issues into three distinct dimensions per agent. Each dimension must:
   - Describe an observable property of the **output**, not the input steps.
   - Map cleanly back to one or more context pillars.
   - Matter for their stated quality risk.

**Deliver:** Append to `docs/evaluation_at_scale_design.md` with section:
- output_property_rubric (Rubric Overview, Agent Rubrics with three dimensions per agent, Failure Indicators)

**User Context:**
- Provides: their insight into how agent outputs degrade when context management breaks
- Receives: clear rubric for evaluating outputs semantically across multiple dimensions

**Confirm before continuing:** "Do these dimensions capture the failures you care about for each agent?"

---

### Step 3: Create anchor examples at levels 1, 3, and 5 that illustrate rubric scoring
**Goal:** Create anchor examples at levels 1, 3, and 5 that illustrate rubric scoring



## Anchor Example Plan

0. **Explain the 5-point scale.**
   - **5 (reliable):** exemplar output.
   - **3 (borderline):** requires human judgment; unclear if acceptable.
   - **1 (severe):** semantically meaningful failure (non-trivial).
   Elaborate that for each failure dimension that we explored, the goal is to include examples that demonstrate very good and very bad responses and the possibilities in between.
   Start by asking the user to provide any input/output examples (for example from the test cases) that they think would score highly or poorly.

1. **Start with a gold-standard example (5-5-5).**
   Capture a realistic input context + agent output that scores 5 on every rubric dimension. This is the "north star" reference.

2. **Create semantically meaningful severe failures (level 1).**
   - No trivial empty outputs or obvious errors.
   - Show plausible responses that still miss critical information, violate constraints, or contradict context.
   - Cover each dimension with at least one level-1 example (e.g., acquisition failure, shaping failure, retention failure).

3. **Add borderline cases (level 3).**
   These are the "needs human judgment" examples—mostly correct but with noticeable gaps or ambiguities. Ensure each dimension has at least one borderline anchor.

4. **Include mixed-score patterns.**
   Real outputs often succeed on some dimensions while failing others. Capture combinations like 5-2-1 or 3-5-3 so the rubric can handle nuanced behavior.

5. **Document each example consistently.**
   For every example record:
   - Descriptive name
   - Input context (AgentContext fields)
   - Agent output
   - Scores for all three dimensions + short reasoning
   - Which context pillar likely failed

6. **Aim for ~9–10 examples per agent.**
   That typically covers: one 5-5-5, 3–4 severe failures, 3–4 borderlines, and a couple of mixed cases.

**Deliver:** Append to `docs/evaluation_at_scale_design.md` with section:
- anchor_examples (Example Matrix at levels 1/3/5, Level Definitions, Reasoning Notes)

**User Context:**
- Provides: their representative examples of great, borderline, and poor outputs
- Receives: ground truth references for training evaluators and LLM-as-judge prompts

**Confirm before continuing:** "Do these anchors feel realistic and diagnostic for your workflow?"

---

### Step 4: Design LLM-as-judge prompts for each of the agents
**Goal:** Design LLM-as-judge prompts for each of the agents



Use this LLM-as-a-judge prompt template — fill in the bracketed placeholders with details from the rubrics and anchor examples created in previous steps:

```
You are an evaluation judge for the **[AGENT_NAME]** agent. Your role is to evaluate agent outputs based on three observable dimensions that map to context management quality. Provide scores with clear reasoning tied to which context pillar (acquisition, shaping, retention, delivery) likely failed.

---

## Evaluation Rubric

### Dimension 1: [DIMENSION_NAME]
**What it measures:** [Description of observable output property]

- **Score 5 (Reliable):** [Criteria for exemplar output]
- **Score 3 (Borderline):** [Criteria requiring human judgment]
- **Score 1 (Severe):** [Criteria for meaningful failure]

**Context pillar mapping:** Low scores typically indicate issues with [acquisition/shaping/retention/delivery]

### Dimension 2: [DIMENSION_NAME]
**What it measures:** [Description of observable output property]

- **Score 5 (Reliable):** [Criteria for exemplar output]
- **Score 3 (Borderline):** [Criteria requiring human judgment]
- **Score 1 (Severe):** [Criteria for meaningful failure]

**Context pillar mapping:** Low scores typically indicate issues with [acquisition/shaping/retention/delivery]

### Dimension 3: [DIMENSION_NAME]
**What it measures:** [Description of observable output property]

- **Score 5 (Reliable):** [Criteria for exemplar output]
- **Score 3 (Borderline):** [Criteria requiring human judgment]
- **Score 1 (Severe):** [Criteria for meaningful failure]

**Context pillar mapping:** Low scores typically indicate issues with [acquisition/shaping/retention/delivery]

**Note:** You may assign scores of 2 or 4 for cases that fall between the anchor levels.

---

## Anchor Examples

### Example 1: Gold Standard (5-5-5)
**Input Context:** [Insert example context]
**Agent Output:** [Insert example output]
**Scores & Reasoning:**
- Dimension 1: 5 - [Why this is exemplar]
- Dimension 2: 5 - [Why this is exemplar]
- Dimension 3: 5 - [Why this is exemplar]

### Example 2: Severe Failure (Score: X-X-1)
**Input Context:** [Insert example context]
**Agent Output:** [Insert example output]
**Scores & Reasoning:**
- Dimension 1: [X] - [Reasoning]
- Dimension 2: [X] - [Reasoning]
- Dimension 3: 1 - [Why this fails, which context pillar failed]

### Example 3: Borderline Case (Score: X-3-X)
**Input Context:** [Insert example context]
**Agent Output:** [Insert example output]
**Scores & Reasoning:**
- Dimension 1: [X] - [Reasoning]
- Dimension 2: 3 - [Why this requires human judgment]
- Dimension 3: [X] - [Reasoning]

[Add 1-2 more examples covering different failures and mixed-score patterns]

---

## Evaluation Task

**Input Context:**
{INPUT_CONTEXT}

**Agent Output:**
{AGENT_OUTPUT}

---

## Scoring Instructions

1. Read the input context and agent output carefully
2. Compare against anchor examples and rubric definitions
3. Score each dimension 1-5 (2 and 4 allowed for intermediate cases)
4. Explain reasoning for each score with specific observations
5. Identify which context pillar(s) likely failed for scores ≤3
6. Flag for human review if criteria are met

---

## Output Format

{
  "dimension_1": {
    "score": [1-5],
    "reasoning": "[Specific observation and why this score]",
    "failed_context_pillar": "[acquisition|shaping|retention|delivery|none]"
  },
  "dimension_2": {
    "score": [1-5],
    "reasoning": "[Specific observation and why this score]",
    "failed_context_pillar": "[acquisition|shaping|retention|delivery|none]"
  },
  "dimension_3": {
    "score": [1-5],
    "reasoning": "[Specific observation and why this score]",
    "failed_context_pillar": "[acquisition|shaping|retention|delivery|none]"
  },
  "requires_human_review": [true|false],
  "human_review_reason": "[Why flagged or empty]",
  "overall_assessment": "[Brief summary of output quality]"
}

---

## Human Review Triggers

Flag requires_human_review: true if any apply:
1. Any dimension scored 3 (borderline needs human judgment)
2. Score divergence ≥3 points between dimensions (inconsistent quality)
3. Judge uncertainty about appropriate scoring
4. Critical use case where errors are costly
```

**Deliver:**
1. Save completed prompt to `prompts/llm_as_judge_prompt.txt`
2. Append to `docs/evaluation_at_scale_design.md` with section: llm_as_judge_prompt

**User Context:**
- Provides: their preferences about automation vs manual review
- Receives: operational plan for hybrid evaluation (LLM judge plus human safety net)

**Confirm before continuing:** "Do these thresholds and prompts align with your trust requirements?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `evaluation_at_scale_design.md` | `docs/` | Evaluation reality check, output rubrics with three dimensions per agent, anchor examples at levels 1/3/5 |
| `llm_as_judge_prompt.txt` | `prompts/` | Ready-to-use LLM judge prompt with rubric, anchor examples, scoring instructions, and human review triggers |
