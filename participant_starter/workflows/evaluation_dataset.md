# Evaluation Dataset Workflow — Complete Reference

**ID:** evaluation_dataset
**Description:** Design systematic evaluation for AI workflows through risk-driven test case creation

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the evaluation dataset workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Begin with Step 1 and follow each step prompt in order
2. Complete one step fully before moving to the next
3. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
4. Save outputs to the file paths specified in each step
5. When you reach the final step, let the participant know the workflow is complete and remind them to update `docs/reports/session_log.md`

- Keep tone collaborative; explain why each decision matters for confident evaluation
- Use Socratic questioning — don't prescribe quality dimensions, risks, or priorities
- Reads from: `docs/reports/participant_profile.md`, `docs/problem_definition.md`

---

## Steps

### Step 1: Extract insights from prompt testing experience and identify quality dimensions
**Goal:** Extract insights from prompt testing experience and identify quality dimensions



## Phase 1: Mine Prompt Testing Experience

Focus on their prompt experiments from ideation workflow:

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

### Step 2: Generate quality risk hypotheses specific to their workflow
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

### Step 3: Help participant prioritize quality risks through systematic evaluation
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
- "Does this risk matter for your current sprint goals?"
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

### Step 4: Help participant select test case generation methodology and design test case framework
**Goal:** Help participant select test case generation methodology and design test case framework



"Let's focus on your TOP priority risk: [Risk Name]. We'll design 5-10 test cases targeting this one risk. Ready?"

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
- Test Case ID: [Risk]_[Dimension]_[Variation]
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

### Step 5: Help participant define clear learning objectives for each test group
**Goal:** Help participant define clear learning objectives for each test group



## Phase 1: Summarize Learning Objectives

"Based on your priority risk and test case design, here's a summary of what you'll learn from testing:

**Your Priority Risk**: [Risk from step 3]

**Your Test Approach**: [Chosen methodology from step 4]

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

### Step 6: Create structured measurement artifacts for ongoing systematic evaluation
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

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `evaluation_design_report.md` | `docs/` | Full evaluation design with quality dimensions, risks, prioritization, test cases, learning objectives |
| `evaluations_data.csv` | `data/` | Executable CSV evaluation matrix with test cases |
