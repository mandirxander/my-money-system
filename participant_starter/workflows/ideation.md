# Ideation Workflow — Complete Reference

**ID:** ideation
**Description:** Develop and define your project idea — from initial thinking to a testable prototype concept

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the ideation workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete", let the participant know the workflow is complete, and remind them to update `docs/reports/session_log.md` and `docs/reports/decisions.md`

- Keep tone conversational and collaborative; explain why each question matters
- Use Socratic questioning — don't prescribe problem definitions or solution approaches
- Engage as a thought partner, present one thought at a time
- Reads from: `docs/reports/participant_profile.md` — especially `initial_use_case_thoughts` to pick up from where the orientation left off. The participant has captured early thinking about their domain and project interests. Start there and help them develop and land on a concrete project idea.

---

## Steps

### Step 1: Frame the problem — current state to desired state
**Goal:** Help the participant develop their project idea and clearly define what they want to build and what problem it solves, using the current state → desired state framework

Guide the participant through structured problem definition grounded in their project idea and return loop.

## Instructions

1. **Start by reading their profile** — specifically `initial_use_case_thoughts` — and open with what was already captured: "In your orientation, you mentioned [domain/idea/loop type]. Let's pick up from there and go deeper." Do not re-ask questions the participant already answered. Use what's in the profile as the starting point, not a blank slate.
2. **Advance the thinking, don't restart it.** Your job is to move from early impressions to a concrete problem definition:
   - If they named a domain: "You mentioned [domain] — help me understand how you currently engage with it. What does that actually look like day-to-day?"
   - If they named a friction: "You said [friction] was a pain point — walk me through a specific recent time that happened."
   - If they named a loop type: "You were drawn to [loop type] — what would that look like for your specific situation?"
   - If their profile shows 'Still exploring': "Let's start from scratch — is there a topic, problem, or question you keep coming back to?"
3. **Fill in what's missing** from the orientation capture with targeted questions:
   - "What's missing or frustrating about how you engage with it now?"
   - "If this system worked really well for you, what would it actually do for your thinking?"
   - "What constraints should we work within — time, tools available, what you're realistically willing to commit to?"
4. **If answers are vague, ask follow-up questions** to get specifics
5. **Frame everything as current state → desired state** — this works for any project idea

**Deliver:** Save to `docs/problem_definition.md` with sections:
- problem_statement, knowledge_domain
- current_state (current_engagement, existing_tools, current_trigger, frequency, friction_points)
- desired_state (success_criteria, expected_impact, return_loop_vision, constraints)

**User Context:**
- Provides: Their project idea, how they currently approach the problem, what's missing, what the ideal system does
- Receives: A structured problem definition document grounded in their chosen domain and project

**Confirm before continuing:** "Does this problem statement capture your challenge and what you want the system to do for you?"

---

### Step 2: Challenge your assumptions about the system
**Goal:** Surface and test assumptions embedded in the problem definition — distinguish real constraints from untested beliefs

Help the participant identify assumptions in their thinking about the system and what the AI can actually do.

## Instructions

1. **Present the assumptions you identify** from their problem definition — be specific and direct
2. **Challenge each assumption** with focused questions:
   - "What evidence do we have that [assumption] is true?"
   - "What would happen if [assumption] weren't true?"
   - "Could the system handle [aspect] without you needing to be there for it?"
3. **Categorize the results** into three types:
   - **Validated Constraints**: Real limitations that must remain (e.g., compliance requirements)
   - **Flexible Assumptions**: Can be adjusted with right approach (e.g., "AI could draft, human reviews")
   - **Untested Beliefs**: Need experimental validation (e.g., "users won't trust AI outputs")
4. **Document the categorized assumptions** in the analysis section
5. **Confirm the analysis** with the user before proceeding

Present assumptions as observations, not criticisms. Ask one challenging question at a time. Keep tone curious and exploratory. If user defends an assumption strongly, note it as a constraint rather than pushing back.

**Deliver:** Append to `docs/problem_definition.md` with section:
- assumptions_analysis (Initial Assumptions Identified, Validated Constraints, Flexible Assumptions, Beliefs to Test)

**User Context:**
- Provides: Their validation of identified assumptions and defense of constraints
- Receives: Categorized assumptions — validated constraints vs flexible beliefs

**Confirm before continuing:** "Are these the right assumptions to question? Or did we miss anything important?"

---

### Step 3: Generate solution options — different designs for your thinking system
**Goal:** Explore 3+ distinct designs for the participant's system at different levels of autonomy

Facilitate brainstorming of 3+ distinct system designs, each with a different level of AI involvement.

## Autonomy Spectrum Framework

**Level 1: AI as Assistant** — AI handles information gathering, human decides/executes
**Level 2: AI as Collaborator** — AI drafts outputs, human reviews/adjusts/approves
**Level 3: AI as Agent** — AI makes decisions within boundaries, human sets parameters/reviews exceptions

## Instructions

1. **Generate three directional options yourself** — propose one design at each autonomy level as starting points and recommendations, not a final menu. Present them clearly, then ask: "Do any of these feel close to what you're imagining? What would you change, add, or combine?"
2. **Incorporate their feedback before finalizing** — if they push back, refine, or propose something different, explore it. Update or add options based on their input before moving to documentation.
3. **Use the autonomy spectrum** to guide different approaches across levels
4. **For each solution, define clearly**:
   - What the AI agent does autonomously
   - Where human input is required
   - How they interact (chat-based, scheduled check-ins, exception-triggered)
5. **Clarify scope boundaries** for each solution:
   - What it does (clear description)
   - What it doesn't do (stays manual/out of scope)
   - Human touchpoints (when and how human is in the loop)
6. **Document all solution hypotheses** with different autonomy levels
7. **Confirm all hypotheses** with user before moving to selection

If their feedback leads to solutions that are too similar across levels, prompt: "How is this one different from the previous in terms of how much the AI does on its own?"

**Deliver:** Append to `docs/problem_definition.md` with section:
- solution_hypotheses (Hypothesis 1, 2, 3 — each with: Name, autonomy level, what AI does autonomously, human touchpoints, interaction pattern, scope boundaries)

**User Context:**
- Provides: Their feedback on solution feasibility and additional approach ideas
- Receives: 3+ distinct system designs with different autonomy levels

**Confirm before continuing:** "Do these solutions address the core problem?"

---

### Step 4: Select most promising solution and define its autonomous capabilities
**Goal:** Select most promising solution and define its autonomous capabilities



Guide systematic evaluation of solution hypotheses using trade-off analysis to select the most promising one.

## How to Facilitate Solution Selection

### 1. Evaluate trade-offs for each hypothesis

**Trade-off Framework:**

**A. Autonomy vs. Control**
- More autonomy = Less human time required, but less oversight
- Less autonomy = More human involvement, but more control
- Question: "Which level of autonomy feels right for this workflow's importance and risk?"

**B. Complexity vs. Impact**
- Simple solutions are faster to implement but may have less impact
- Complex solutions could have bigger impact but take longer
- Question: "What's the simplest version that would still make a meaningful difference?"

**C. Current Capability vs. Aspirational**
- Can you implement this with available tools/skills now?
- Or does it require learning new tools or capabilities?
- Question: "Can you realistically build and test this within the course timeline?"

### 2. Apply constraint mapping

Compare each solution against validated constraints from Step 2:
- "Does this solution respect the non-negotiable constraints?"
- "Does it work within available resources (time, tools, skills)?"
- "Does it address the main friction points identified?"

### 3. Select the most promising hypothesis

"Based on our analysis: [present summary of each solution with trade-offs]. Which approach feels like the right balance for your first autonomous workflow experiment?"

### 4. Define the solution logic (causal reasoning)

Have the user complete: "If we implement [Solution], it will produce [Outcome] because [Mechanism]."

### 5. Detail the chosen solution

Expand with specifics:
- **Agent Capabilities**: Specific tasks it can perform, data sources it can access, decisions it can make
- **Human-in-the-Loop Touchpoints**: Review points, decision points, exception handling
- **Interaction Pattern**: Chat-based, async review, AI-initiated, etc.
- **Success Metrics**: Time saved, quality improvements, reduced friction

### 6. Document the chosen solution

**Deliver:** Append to `docs/problem_definition.md` with sections:
- selected_solution (chosen_hypothesis, solution_logic, autonomous_capabilities, human_touchpoints, interaction_pattern, success_metrics, scope_boundaries)
- process_requirements (process_inputs, process_outputs)

**User Context:**
- Provides: Their trade-off preferences, feasibility constraints, capability assessment
- Receives: A chosen solution with clear autonomy boundaries, human touchpoints, and success metrics

**Confirm before continuing:** "Is this the right balance of autonomy vs control?"

---

### Step 5: Design prompt-based experiment to test AI capability assumptions
**Goal:** Design prompt-based experiment to test AI capability assumptions



Guide the user to design a simple prompt-based experiment that tests their core AI capability assumption.

## How to Facilitate This Conversation

### 1. Connect to Their Previous Work
- "Looking at your chosen solution, the key assumption seems to be that AI can [restate their autonomous capability]"
- "Let's design a quick test to see how well AI actually handles this before we go further"

### 2. Help Them Identify What to Test
- "What's the one thing that, if AI can't do it well, would break your whole solution?"
- "In your solution, what task are you most unsure AI can handle reliably?"
- Guide them to pick ONE core assumption to test, not everything at once.

### 3. Get Them Thinking About Real Examples
- "Can you give me 3-4 real examples from your project — the kinds of inputs or material you'd actually be working with in this system?"
- "What would be a typical piece of content? What would be a tricky or unusual one?"
- Push for real examples, not hypothetical ones.

### 4. Define Good Enough
- "If AI gets it right 80% of the time, is that useful? 90%? 95%?"
- "What would 'good enough' output look like for your needs?"
- Keep expectations realistic.

### 5. Plan the Simple Test
- "So you'll take these examples, create a prompt, and test it in ChatGPT/Claude?"
- Keep it simple — this is learning, not building. 2-4 hours max.

### 6. Set Learning Expectations
- "The goal isn't to prove your solution works, it's to understand what AI can and can't handle"
- "Even if AI struggles, that's useful information for designing your approach"

**Deliver:** Append to `docs/problem_definition.md` with section:
- experiment_design (core_assumption, test_approach, mock_data_examples, test_scenarios, success_criteria, learning_goals)

**User Context:**
- Provides: Real data examples, access to AI tools, time for testing (2-4 hours)
- Receives: A prompt-based experiment plan to test AI capabilities with mock data

**Confirm before continuing:** "Do you have the mock data to complete this testing?"

If they say **no**: Help them figure out what data they need and how to get it. Ask: "What kind of content would this system actually work with — can you find 3–4 real examples right now?" Guide them to identify existing material they already have access to (past notes, saved articles, emails, documents) or a simple way to create representative examples. Don't move on until they have a concrete plan for getting the data.

---

### Step 6: Generate detailed prompt for testing the solution in AI playgrounds
**Goal:** Generate detailed prompt for testing the solution in AI playgrounds



Create a detailed testing prompt based on the designed solution for use in AI playgrounds (ChatGPT, Claude, OpenAI Playground, etc.).

## Testing Prompt Structure
1. **Context Setup** — Background and problem statement
2. **Role Definition** — What the AI should act as
3. **Task Instructions** — Clear, specific instructions for the AI
4. **Input Format** — How users should structure their input
5. **Output Requirements** — What the AI should produce
6. **Example Interaction** — Sample input/output demonstration

## Instructions

1. **Read previous work** — Use the selected solution and experiment design from earlier steps
2. **Create a comprehensive prompt** that:
   - Sets up the AI to act as the autonomous agent you designed
   - Provides clear instructions for processing user input
   - Specifies the exact output format expected
   - Includes constraints and boundaries for the AI's behavior
3. **Include practical examples** showing how someone would use this prompt
4. **Add testing guidance** — what to try, what edge cases to consider
5. **Save as a single .txt file** that users can copy-paste into any AI playground

**Critical:** This prompt should capture the essence of the solution in a form that can be immediately tested without any technical setup.

**Deliver:** Save to `prompts/testing_prompt.md`

**User Context:**
- Provides: Their testing scenarios, input/output examples, and edge cases to consider
- Receives: A ready-to-use prompt for testing the solution in AI playgrounds

**Confirm before continuing:** "Does this prompt capture your solution concept for testing?"

## What Comes Next

Your homework before Session 3 is to run the experiment you designed in Step 5:
1. Copy your testing prompt from `prompts/testing_prompt.md`
2. Paste it into an AI playground (ChatGPT, Claude.ai, or OpenAI Playground)
3. Test it with the real examples you identified
4. Note what worked, what surprised you, and where it fell short

Bring your findings to Session 3. What you learn from this test will shape your prototype design in the next workflow.

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection, add any key decisions and their reasoning to `docs/reports/decisions.md`, and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `problem_definition.md` | `docs/` | Full problem definition, assumptions, solution hypotheses, selected solution, experiment design |
| `testing_prompt.md` | `prompts/` | Ready-to-use AI playground testing prompt |
