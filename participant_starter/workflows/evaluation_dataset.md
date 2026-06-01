# Evaluation Dataset Workflow — Complete Reference

**ID:** evaluation_dataset
**Description:** Design systematic evaluation for AI workflows through risk-driven test case creation

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the evaluation dataset workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:

1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete", let the participant know the workflow is complete, and remind them to update `docs/reports/session_log.md` and `docs/reports/decisions.md`

- Keep tone collaborative; explain why each decision matters for confident evaluation
- Use Socratic questioning — don't prescribe quality dimensions, risks, or priorities
- Reads from: `docs/reports/participant_profile.md`, `docs/problem_definition.md`

---

## Steps

### Step 1: Run your chat experiment (Rung 1 — simulate the flow with rough prototype)

**Goal:** Run the experiment you designed in ideation as a minimal simulation of your system/agent flow — before building anything — to surface where it fails, what assumptions you missed, and what user problems you overlooked.

This is the first of two rungs in this workflow. Rung 1 (this step) is a minimal effort prototype using chat. Rung 2 (the next step) wires the flow up in code. Run the low effort prototype first — it's the fastest, cheapest way to find problems while changes are still free.

## Phase 1: Find the Lowest-Effort Way to Test It

Frame it with an analogy they already know: this is the agent version of a click-through prototype. Before building a real site, a designer wires up screens and clicks through them to check the flow makes sense — almost no effort, and problems surface early. Here they do the same for their agent: simulate as much of the flow as they can before any code, to find where it breaks while changes are still free.

Your job is to help them find the lowest-effort way to pressure-test their riskiest assumption — don't assume the method, work it out with them. For most projects the cheapest test is an AI chat (Claude.ai, the API, or other AI playground) where they paste in real examples and read what comes back, starting from the testing prompt Claude drafted in ideation (`prompts/testing_prompt.md`). They should test as much of their flow as they reasonably can — for some projects that means simulating several steps; for others a single well-crafted prompt is enough. The bar is "good enough to learn from," not "polished."

"Let's run the experiment you designed in ideation. The goal is to simulate as much of your flow as you can without code and see where it holds up — that might be several steps, or it might be a single prompt, depending on your system. What's the cheapest way we could put your riskiest assumption to the test right now? For most projects that's pasting a few real examples into a chat and reading what comes back."

Guide them to:

- Use real examples where possible (synthetic is fine, but real data exposes more)
- Cover as much of the flow as they reasonably can — if the system would take several steps, simulate each step in turn; a single prompt is fine when that's the heart of the system
- Deliberately test the highest-risk assumption: feed it the messy, ambiguous, edge-case inputs most likely to break it
- Judge the prompt as you go: is it specific, does it state the output format, does it spell out what a good result looks like? Where it falls short, refine it (or have Claude refine it)
- Run several iterations, changing one thing at a time — save each version to `prompts/` with a one-line note on what you changed and why, so you can see what actually moved the result

## Phase 2: Capture What You Learned

Ask them to capture, in their own words:

- "Where did the flow fail or produce something you wouldn't trust?"
- "What assumption turned out to be wrong — or what assumption did you realize you'd never named?"
- "Did a user problem surface that your problem definition doesn't account for?"
- "What did you change between iterations, and why?"

## Phase 3: Feed Gaps Back Into the Design

Define-first in action: gaps found here go back into the design before any code exists.

- If an assumption broke or a user problem surfaced, update `docs/problem_definition.md` to reflect it
- Note any change to the system/agent flow itself

**Deliver:** Save to `docs/evaluation_design_report.md` under a new section:

- chat_experiment_results (what_was_tested, what_failed, assumptions_revised, flow_changes)

Append any design changes to `docs/problem_definition.md`.

**User Context:**

- Provides: Their testing prompt, real/synthetic examples, and judgment on what "failed"
- Receives: A grounded set of experiment findings that drive the rest of this workflow

**Confirm before continuing:** "Does this capture what you learned from running your simulation experiment — and have we updated your problem definition where the experiment changed it?"

---

### Step 2: Extract insights from prompt testing experience and identify quality dimensions

**Goal:** Extract insights from prompt testing experience and identify quality dimensions

## Phase 1: Mine Prompt Testing Experience

Focus on the prompt experiments they just ran in Step 1 (Rung 1):

"I can see your solution design and the testing prompt you created. Let's dig into what you learned from experimenting with it.

Tell me about your prompt testing experience — what did you discover when you tested your prompt?"

Follow-up questions:

- "What examples did you test it with? How many iterations did you try?"
- "What worked better than expected? What struggled more than you thought?"
- "Did you notice any consistency issues or quality patterns?"
- "What edge cases or scenarios did you discover need attention?"

Connect to their specific solution:

- "For [autonomous_capabilities from selected_solution], what quality issues emerged?"
- "Given your [success_metrics from selected_solution], what would make you confident in the results?"

## Phase 2: Explore Quality Dimensions

Based on their testing experience, probe relevant quality dimensions:

"From your testing, let's explore what quality means for your specific workflow."

**Connect to their solution specifics:**

- "For [process_inputs from process_requirements], what variations did you test? What happens with messy or edge case inputs?"
- "Looking at [process_outputs from process_requirements], how do you know when the output is 'good enough'?"

**Explore by domain patterns:**

- **Data extraction/processing:** "How consistent are outputs? What about edge cases or malformed inputs?"
- **Communication/writing:** "How do you know if tone/style is appropriate? Accuracy vs creativity trade-offs?"
- **Analysis:** "Are insights actionable? How do you handle ambiguous information?"
- **Decision-making:** "How confident should users be? What if the workflow is wrong?"

## Phase 3: Document

**Deliver:** Save to `docs/evaluation_design_report.md` with sections:

- prompt_testing_experience (testing_scope, quality_observations, edge_cases_discovered)
- quality_dimensions

**User Context:**

- Provides: Their current workflow status, testing experience, and domain context
- Receives: A structured evaluation foundation with relevant quality dimensions

**Confirm before continuing:** "Does this capture your workflow context and testing insights accurately?"

---

### Step 3: Generate quality risk hypotheses specific to their workflow

**Goal:** Generate quality risk hypotheses specific to their workflow

## Phase 1: Generate Risk Hypotheses

Present the approach:
"Let's systematically identify quality risks — specific ways your prompt might fail to meet quality standards. I'll suggest hypotheses based on your user process, and we'll discuss which resonate."

Generate 5-8 user-process-specific hypotheses across categories:

### Input Variability Risks

"Your prompt might struggle with [specific input variations]. Edge cases in [format/content] might cause [specific failure mode]."

### Output Quality Risks

"Output quality might be inconsistent when [specific conditions]. The prompt might produce [incorrect output type] in [specific scenarios]."

### Context Sensitivity Risks

"The prompt might not adapt appropriately to [context factors]. Performance might degrade in [specific situations]."

### Boundary/Scope Risks

"The prompt might handle out-of-scope cases poorly, or miss in-scope cases due to [characteristics]."

### Consistency Risks

"Similar inputs might produce inconsistent outputs due to [factors]. Quality might vary based on [variables]."

## Phase 2: Collaborative Refinement

Present hypotheses and ask:

- "Which risks concern you most based on your testing?"
- "Do these match problems you've noticed?"
- "What other quality risks should we consider?"

## Phase 3: Validate Specificity

For each risk:

- "Give me an example of when [risk] might occur."
- "What would be the symptoms? How would you recognize it?"
- "In your domain, what makes this particularly problematic?"

## Phase 4: Document

**Deliver:** Append to `docs/evaluation_design_report.md` with section:

- quality_risk_hypotheses (input_variability_risks, output_quality_risks, context_sensitivity_risks, boundary_scope_risks, consistency_risks, risk_impact_analysis)

**User Context:**

- Provides: Their domain expertise and user process understanding
- Receives: A comprehensive list of quality risks specific to their workflow

**Confirm before continuing:** "Do these risks cover the main ways your user process could fail?"

---

### Step 4: Help participant prioritize quality risks through systematic evaluation

**Goal:** Help participant prioritize quality risks through systematic evaluation

## Phase 1: Establish Prioritization Criteria

Present criteria:
"We've identified [X] quality risks. Now we prioritize — we can't evaluate everything effectively at once. High-priority risks have:

- **High impact**: Would significantly affect user process success
- **Likely to occur**: Realistically could happen based on domain knowledge or testing
- **Actionable**: You could address it if discovered through testing
- **Relevant now**: Matters for current sprint goals and immediate next steps"

## Phase 2: Socratic Risk Evaluation

For each identified risk, guide with questions:

**Impact:**

- "If [risk] occurred frequently, how would it affect your agent's usefulness?"
- "On 1-5 scale (1=annoying, 5=unusable), rate the impact?"

**Likelihood:**

- "Based on your domain experience, how often does this scenario occur?"
- "Have you seen hints of this in your testing?"

**Actionability:**

- "If testing revealed this risk, what could you do about it?"
- "Could you improve through prompt refinement, logic changes, or need bigger changes?"

**Relevance:**

- "Does this risk matter for your current goals at this stage?"
- "Would this affect the demo/deliverable you're working toward?"

## Phase 3: Propose Priority Focus

Based on Phase 2 responses, propose the most high-leverage risk:

"Based on what you've shared, I recommend focusing on **[specific risk]** as your highest priority. Here's my reasoning: [justification based on their answers]"

Follow up: "What resonates with this choice? What doesn't?"

## Phase 4: Document

**Deliver:** Append to `docs/evaluation_design_report.md` with section:

- priority_quality_risk (risk_statement, prioritization_rationale, testing_approach, success_criteria)

**User Context:**

- Provides: Their judgment about which risks matter most in their context
- Receives: Clear prioritization of the most critical quality risks

**Confirm before continuing:** "Are these the risks that would most impact your workflow's success?"

---

### Step 5: Help participant select test case generation methodology and design test case framework

**Goal:** Help participant select test case generation methodology and design test case framework

"Let's focus on your TOP priority risk: [Risk Name]. We'll design 5-10 test cases targeting this one risk — later you'll run at least 3-5 of them against your spike, more if time allows. Ready?"

Present approach options:

**Option 1: Boundary Case Systematic Generation**

- Start with normal examples, systematically vary one dimension at a time
- Best for: Clear input parameters that can vary (length, complexity, formality)

**Option 2: Failure Mode Reverse Engineering**

- Start with ways the workflow could fail, design inputs that would cause those failures
- Best for: Strong domain understanding, can imagine specific failure scenarios

**Option 3: Progressive Complexity Building**

- Start simplest case, incrementally add complexity layers
- Best for: Multi-layered or complex scenarios

**Option 4: Real-World Sampling and Variation**

- Take real examples, create variations representing different contexts
- Best for: Access to real data or strong domain knowledge

Ask which approaches they want to know more about, then help them select and apply ONE approach.

## Approach Execution Guidance

### If Boundary Case Systematic Generation:

1. **Establish Baseline**: Start with one 'normal' example your workflow handles well
2. **Identify Variation Dimensions**: For your priority risk, identify all the ways inputs can vary (text length, complexity, formality, ambiguity, missing information)
3. **Create Systematic Boundary Variations**: Minimal cases / Maximal cases / Edge boundaries / Just-over-the-line
4. **Generate Specific Test Cases**: Create 5-10 test cases

Template per case:

- Test Case ID: [Risk]*[Dimension]*[Variation]
- Input: [Specific input to use]
- Expected Challenge: [What difficulty this presents]
- Risk Target: [Which priority risk this tests]
- Success Criteria: [How to judge if workflow handled well]

### If Failure Mode Reverse Engineering:

1. **Brainstorm Specific Failure Scenarios**: List 5-8 concrete failure scenarios
2. **Design Failure-Triggering Inputs**: Work backwards from each failure scenario
3. **Create Adversarial Examples**: Inputs that exploit your workflow's known weaknesses
4. **Validate Expected Failures**: Confirm each would trigger the intended failure mode

### If Progressive Complexity Building:

1. **Identify Complexity Dimensions**: What makes inputs complex for your workflow
2. **Design Clear Progression Levels**: Level 1 (Baseline) → Level 2 (Single Factor) → Level 3 (Dual Factor) → Level 4 (Multi-Factor) → Level 5 (Real-World)
3. **Map Levels to Priority Risk**: For each level, design test cases that probe how risk manifests
4. **Create Test Case Families**: Build families of related test cases progressing through complexity levels

## Phase 4: Document

**Deliver:** Append to `docs/evaluation_design_report.md` with section:

- test_case_design_methodology (chosen_generation_approach, test_case_framework, target_scenarios, success_criteria_design)

**User Context:**

- Provides: Their domain knowledge and preference for test case generation approaches
- Receives: A test case design methodology and framework for generating executable test cases

**Confirm before continuing:** "Does this methodology provide a clear approach for generating test cases that will reveal your priority risk?"

---

### Step 6: Help participant define clear learning objectives for each test group

**Goal:** Help participant define clear learning objectives for each test group

## Phase 1: Summarize Learning Objectives

"Based on your priority risk and test case design, here's a summary of what you'll learn from testing:

**Your Priority Risk**: [Risk from step 4]

**Your Test Approach**: [Chosen methodology from step 5]

**What You'll Learn**:

From your [X test scenarios], you'll discover:

- **How this risk manifests**: What failure actually looks like in your workflow outputs
- **When it occurs**: Which input characteristics trigger this risk
- **How severe it is**: Whether this risk significantly impacts adoption
- **What to improve**: Which part of your workflow needs attention if the risk is confirmed

This gives you a focused learning agenda — instead of general testing, you'll have specific questions about your priority risk that testing will answer."

## Phase 2: Document

**Deliver:** Append to `docs/evaluation_design_report.md` with section:

- learning_objectives (learning_outcomes)

**User Context:**

- Provides: Their understanding of what insights would be most valuable
- Receives: A clear learning framework for interpreting evaluation results

**Confirm before continuing:** "Will these learning objectives help you improve your workflow?"

---

### Step 7: Create structured measurement artifacts for ongoing systematic evaluation

**Goal:** Create structured measurement artifacts for ongoing systematic evaluation

Generate executable CSV evaluation matrix with all test cases ready for systematic measurement.

## Phase 1: Generate CSV Evaluation Matrix

**CSV Structure:**
Headers: `test_case_id, risk_category, input_description, expected_challenge, learning_objective, input_data, actual_output, quality_rating, notes, patterns_observed, improvement_ideas, completed_date`

- Pre-populate metadata columns from your test case design
- Leave execution columns empty for filling during testing

## Phase 2: Update Final Evaluation Report

**Deliver:**

1. Save to `data/evaluations_data.csv`
2. Append summary to `docs/evaluation_design_report.md` with sections:
  - Evaluation Artifacts Generated
  - Next Steps After Evaluation

## Phase 3: Provide Handoff Instructions

Present completion message showing:

- What You Now Have: Systematic Evaluation Plan, Executable Test Cases, Learning Framework
- Immediate Next Steps: Review CSV, run first tests, document results, look for patterns
- Using Your CSV: Input data column, quality rating (1-5), notes, patterns observed, improvement ideas

**User Context:**

- Provides: Their specific workflow context for generating executable test cases
- Receives: A ready-to-use CSV evaluation matrix with executable test cases

**Confirm before continuing:** "Does this CSV provide what you need to systematically evaluate your priority risk?"

---

### Step 8: Wire up the minimal spike (Rung 2 — build the flow in code)

**Goal:** Take the flow that worked well enough in your prompt experiments and build the smallest real version of it — one connected data source, one LLM call — then run your test cases against live output.

This is Rung 2. You're not building the product. You're building the minimum that lets you connect your real tools and data and run the evaluation matrix you just designed against actual, automated output instead of hand-fed examples. That quick, bare-bones build is what developers call a **spike** — treat it as disposable: its job is to teach you, not to become your product. The real build comes later, from your specs. (If it turns out clean and you reuse a piece, fine — just don't get attached or start polishing it now.)

## Phase 1: Scope the Spike

Keep it deliberately minimal — the tech stack is locked (Next.js + TypeScript, Supabase, Claude API, Vercel, `.env.local`). For the spike you only need:

- **One real data source** connected (a file, an API, a Supabase table — whatever your flow consumes)
- **One LLM call** — the prompt from your experiment, now running as an Anthropic SDK call
- **An output you can read** — printed, logged, or shown on a bare page

Ask: "What is the single thinnest path from real input → Claude → output that lets you run your test cases? What can you stub, fake, or skip for now?"

## Phase 2: Build and Run the Test Cases

- Wire up the data source → LLM call → output
- Run your test cases from the CSV matrix (`data/evaluations_data.csv`) against the live output — at least 3-5, more if time allows
- Record the results in the matrix

## Phase 3: Compare to the Prompt Experiments

The gap between "worked by hand" and "works through real plumbing" is itself a finding.

- "What broke or changed once the data was real and connected, versus pasted in by hand?"
- "Did the priority risk show up differently against live data?"
- "What does this tell you about the assumptions in your problem definition or specs?"

Feed anything significant back into `docs/problem_definition.md` and your evaluation report.

**Deliver:**

- Working spike code in `docs/research/spike/`
- Append to `docs/evaluation_design_report.md` under a new section:
  - spike_results (what_was_built, test_case_outcomes, hand_vs_live_differences, design_implications)

**User Context:**

- Provides: Their stack setup, data source, and the prompt from Rung 1
- Receives: A first running prototype that connects real tools and data, with test cases run against it

**Confirm before continuing:** "Do you have a running spike that connects real data and produces output your test cases can measure — and have you captured how it differed from running the flow by hand?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection, add any key decisions and their reasoning to `docs/reports/decisions.md`, and commit your changes.

---

## Output Artifacts


| File                          | Location         | Description                                                                                                                                    |
| ----------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `evaluation_design_report.md` | `docs/`          | Full evaluation design: chat experiment results, quality dimensions, risks, prioritization, test cases, learning objectives, and spike results |
| `evaluations_data.csv`        | `data/`          | Executable CSV evaluation matrix with test cases, run against the spike's live output                                                          |
| `spike/`                      | `docs/research/` | Minimal running prototype (Rung 2): one data source + one LLM call, with test cases run against live output                                    |


