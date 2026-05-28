# Implementation Workflow — Complete Reference

**ID:** implementation
**Description:** Design delivery mechanism informed by user context and translate workflow to executable implementation with minimal scope

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the implementation workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Begin with Step 1 and follow each step prompt in order
2. Complete one step fully before moving to the next
3. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
4. Save outputs to the file paths specified in each step
5. When you reach the final step, let the participant know the workflow is complete and remind them to update `docs/reports/session_log.md`

- Keep tone conversational and collaborative
- Use Socratic questioning — don't prescribe delivery mechanisms or implementation approaches
- Key principles: Context over assumptions, Quality risk focus, Incremental over ambitious, Simple over clever, Meet users where they are
- Reads from: `docs/evaluation_design_report.md`, `docs/user_research_plan.md`, `docs/reports/participant_profile.md`, `docs/problem_definition.md`

---

## Steps

### Step 1: Understand where they are, acknowledge their progress, surface what they learned from previous workflows, identify their biggest quality risk
**Goal:** Understand where they are, acknowledge their progress, surface what they learned from previous workflows, identify their biggest quality risk



## Capture Learning Since Last Interaction

### 1. User Research Insights

If they completed user research:
- "What did you learn from talking to actual users?"
- "Did anything users said surprise you or challenge your assumptions?"
- "How did their feedback change your understanding of the problem?"
- "What user needs emerged that you hadn't considered before?"

### 2. Evaluation Dataset Testing

If they created and tested evaluation scenarios:
- "What happened when you ran your test cases?"
- "Which scenarios revealed the biggest quality risks?"
- "What patterns did you notice in where things went wrong?"
- "Did testing reveal any failure modes you hadn't anticipated?"

### 3. Prompt Experimentation

If they've been experimenting with prompts or workflows:
- "What have you tried building or testing since we last spoke?"
- "What worked better or worse than you expected?"
- "What challenges did you run into when trying to implement your ideas?"

### 4. Implementation Progress

If they've started building:
- "What have you already built or started working on?"
- "What's working well in your current implementation?"
- "Where are you getting stuck or seeing quality issues?"

### 5. Quality Risk Validation

Acknowledge their existing priority risk and check if new learning changes it:
- "From your evaluation work, your priority quality risk was [state their existing risk]"
- "Given everything you've learned since then — user feedback, testing, experimentation — does this still feel like the right risk to focus on?"
- "Has anything you've discovered made you think there's a bigger risk you should be worried about?"

**Deliver:** Save to `docs/implementation_design.md` with sections:
- learning_since_last_interaction (user_research_insights, evaluation_testing_results, prompt_experimentation_findings, implementation_progress_status, updated_quality_risk_focus)

**User Context:**
- Provides: Their current work status, learnings from previous workflows, user context understanding
- Receives: A realistic assessment of their progress and focus on their primary quality risk

**Confirm before continuing:** "Does this capture your key learnings and the main quality risk to address?"

---

### Step 2: Identify where the end user already works, design the interaction model around agency vs autonomy balance, map concrete touchpoints
**Goal:** Identify where the end user already works, design the interaction model around agency vs autonomy balance, map concrete touchpoints



## The Critical Framework: Agency vs Autonomy

**Agency** = Human-like interaction, asks for guidance at judgment points
- "Here's what I found, which one should I use?"
- "I'm not sure about this edge case, what do you think?"

**Autonomy** = "Go do it, tell me when done" — for mundane, repetitive work
- Data transformation, information gathering, formatting, organizing, routine processing
- Things that follow clear rules

## Conversation Flow

### 1. Acknowledge Existing Workflow Understanding

Reference their previous workflows:
- "Based on your previous work, I understand your user currently [summarize their user_process]"
- "You mentioned they work in [reference their current_state and tools]"

**Go deeper with specific questions:**
- "What specific commands/features do they use in [their main tools]?"
- "When they [specific step from their process], what exactly are they clicking/typing?"
- "What's the most frustrating 30 seconds in their current workflow?"

### 2. Identify Pain Points vs Flow Points

- **Pain points**: Where are they context-switching, copy-pasting, waiting?
- **Flow points**: Where are they already comfortable and efficient?

Key insight: **Insert automation at pain points, integrate with flow points**

### 3. Design Agency/Autonomy Balance

**For judgment-heavy tasks:**
- "This feels like a decision that needs your user's context and experience..."
- "What if the system gathered all the info but asked them to make the call?"

**For repetitive/mundane tasks:**
- "This part seems mechanical — could it just run and notify when done?"
- "What's the cost of a mistake here? (High = more agency, Low = more autonomy)"

Start small with MORE agency (human-in-loop): Let system gather and organize; Let human decide and judge; Automate the tedious, not the critical.

### 4. Map Specific Integration Points

**Input integration:**
- "When they [specific step from their process], what would be the most natural way for them to invoke our solution?"
- "Should it be a button in [their main tool], a command they type, or something else?"

**Output integration:**
- "Should our output go [where they currently put results], or somewhere else?"
- "Would they want instant results, or is it okay to notify them when done?"

**Intermediate intervention points:**
- "Based on your agency/autonomy thinking, which moments need their judgment?"
- "What's their preferred way to review and approve things?"

### 5. Delivery Mechanism Hypothesis

Based on the conversation, help them articulate:
- MCP server (for CLI/IDE integration)
- Browser extension (for web-based workflows)
- Slack bot (for team collaboration contexts)
- API + simple frontend (for flexible integration)
- n8n workflow with webhooks (for automation-first users)

**Deliver:** Append to `docs/implementation_design.md` with sections:
- delivery_context_design (workflow_analysis, delivery_mechanism, interaction_model, agency_vs_autonomy, user_touchpoints, user_journey_notes, integration_touchpoints)

**User Context:**
- Provides: Information about their end user's existing tools, workflow context, and agency vs autonomy preferences
- Receives: A clear interaction model that fits their user's context and workflow

**Confirm before continuing:** "Does this interaction model make sense for how your user actually works?"

---

### Step 3: Design backend architecture that serves the delivery context, addresses quality risk, maps data flow
**Goal:** Design backend architecture that serves the delivery context, addresses quality risk, maps data flow



## Technical Level Adaptation

Check their participant profile to understand technical background.

### For Non-Technical PMs/Business Folks

**Your approach:**
- NO jargon (no "API endpoints", "state machines", "data schemas")
- Talk in terms of BEHAVIOR and FLOW
- Ask about what happens, infer technical details yourself
- Use analogies and plain language

**Question style:**
- "When someone starts the workflow, what information do you need from them?"
- "What does the system need to remember between steps?"
- "Where does the information come from?"
- "What needs to talk to what?"

### For Technical Builders (Engineers, Technical PMs)

**Your approach:**
- Use proper technical terminology
- Get into architecture depth
- Discuss patterns, trade-offs, technical decisions

**Question style:**
- "How are you thinking about state management?"
- "What's your data flow from input to LLM to output?"
- "Which external APIs or services do you need to integrate?"

## Conversation Flow

### 1. Data Flow Mapping

Start with the user journey from Step 2 and trace data movement:
- Start at input touchpoint: "User provides [X], what happens next?"
- Follow the flow: "Then the system needs to... and after that..."
- End at output touchpoint: "And finally the user gets [Y]"

### 2. External Integrations

- "What external systems or data sources does this need?"
- "Where does information come from beyond the user?"

For technical folks: Which APIs? Authentication approach? Rate limits? Webhook support or polling?

### 3. Decision Points & Branching Logic

- "Are there different paths this could take based on the situation?"
- "What would make it do one thing vs another?"

For technical folks: What's your conditional logic? Error handling strategy? Retry logic?

### 4. Human Judgment Points (Agency Touchpoints)

- "When the system needs human judgment, what does it need to show them?"
- "How does it present options or ask for direction?"

**Deliver:** Append to `docs/implementation_design.md` with sections:
- backend_design (technical_approach, data_flow_architecture, integration_points, integration_notes, decision_points, human_judgment_points)

**User Context:**
- Provides: Their technical comfort level and integration preferences
- Receives: A backend architecture design appropriate to their technical level

**Confirm before continuing:** "Does this backend design make sense and address your quality risk?"

---

### Step 4: Help them define MVP scope using quality risk as north star — what to build first to validate core hypothesis fastest
**Goal:** Help them define MVP scope using quality risk as north star — what to build first to validate core hypothesis fastest



## The Core Tension

They've just designed something comprehensive. Now you need to help them cut it down without losing the essence.

**The key insight:** v1 is not for users, it's for learning. The only question that matters is: "Does this help me test my primary quality risk?"

## Conversation Flow

### 1. Establish the North Star

"Let's come back to your primary quality risk: [state their risk from Step 1]"

"Everything we build next should help you test whether this risk is real, and how bad it is."

"That's the ONLY goal for v1. Not production-ready, not feature-complete, not user-ready. Just: does it teach us about this risk?"

### 2. Ask What They Want to Try First

"Looking at everything we just designed... what do you want to try FIRST?"

### 3. Challenge Each Component

For each thing they mention, ask the hard question: **"How does [component X] help you test [their quality risk]?"**

### 4. The Ruthless Filter

For each component, apply this filter together:
- **Essential (must have):** Directly tests the quality risk; without it, you learn nothing
- **Nice to have (defer):** Makes it better/cleaner but doesn't change learning; could hardcode or manually handle for v1
- **Scope creep (cut):** Doesn't relate to quality risk; future feature bleeding into v1

### 5. Hardcode vs Build Decision

"Could you hardcode [X] for v1 and make it dynamic in v2?"

Examples:
- "Could you test with just YOUR data first, not build user auth?"
- "Could you manually trigger it instead of building the automation?"
- "Could you use a simple text file instead of a database?"

**The principle:** If you can hardcode it without invalidating the quality risk test, do it.

### 6. The Single Path Rule

"Let's define THE path — not multiple paths, just one:"
- One input scenario (not all edge cases)
- One happy path through the flow (not error handling)
- One output format (not multiple options)

### 7. Define "Done" Clearly

Get very specific:
- **NOT:** "The workflow runs"
- **YES:** "I can give it [X input], it produces [Y output], and I can see if [quality risk] occurred"

### 8. The Defer List

"Let's list what we're explicitly deferring to v2:"

Common deferrals: Additional integrations, edge case handling, error recovery, user authentication, multiple user support, UI polish, automated triggers, notification systems, logging/monitoring, configuration options

**Deliver:** Append to `docs/implementation_design.md` with sections:
- mvp_scope_definition (first_implementation_target, core_path_only, feature_justification, hardcoded_elements, definition_of_done, deferred_features)

**User Context:**
- Provides: Their feature priorities and understanding of what's essential vs nice-to-have
- Receives: A focused MVP scope that directly tests their main quality concern

**Confirm before continuing:** "Is this the right minimal scope to test your quality risk effectively?"

---

### Step 5: Create detailed MVP specs that a coding agent can use to implement the solution
**Goal:** Create detailed MVP specs that a coding agent can use to implement the solution



## Platform Recommendation Strategy

### Default Recommendation: n8n

**Lead with n8n for most participants because:**
- Visual workflow builder (low learning curve)
- Built-in integrations with 400+ services
- Can add custom code nodes when needed (JavaScript/Python)
- Built-in error handling and retries
- Easy to iterate and debug visually
- Free self-hosted or cloud option

**When to lean toward n8n:**
- Non-technical participants
- Heavy integration requirements
- Need to iterate quickly

### Alternative: LangGraph

**Consider LangGraph when:**
- Participant is comfortable with Python
- Workflow has complex conditional logic/branching
- Need fine-grained control over LLM orchestration
- Comfortable with code-based development

**Trade-offs:** More control, more code to write; better for complex state management; steeper learning curve.

## Conversation Flow

### 1. Present Recommendation

Start with your recommendation based on their context.

Explain why briefly: matches their delivery context, handles their integrations, appropriate for their technical level.

### 2. Discuss Trade-offs Openly

Don't oversell — present honest trade-offs. If they choose against your recommendation and are clearly choosing wrong (e.g., non-technical person choosing LangGraph), offer gentle pushback.

### 3. Let Them Choose

"What feels right to you? Which would you rather spend time learning?"

### 4. Generate Detailed MVP Specs

Based on their choice, create comprehensive implementation specifications:

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

**Platform-Specific Guidance:**
For n8n: Trigger mechanism, required node types, credential configuration, error handling approach
For LangGraph: State structure requirements, node function specifications, conditional logic requirements, integration patterns

**Validation Check:**
- [ ] Scaffold matches their reduced MVP scope
- [ ] Platform choice makes sense for their technical level
- [ ] Implementation guide has concrete next steps
- [ ] Quality risk testing is explicit in the guide
- [ ] Evaluation dataset is referenced for testing

**Deliver:**
1. Save to `docs/specs/mvp_specs.md` with sections: development_requirements, integration_specifications, data_flow_specifications, platform_implementation_requirements, human_in_loop_requirements, quality_risk_testing_specifications, error_handling_requirements, success_criteria_and_testing
2. Append to `docs/implementation_design.md` with sections: implementation_platform_selection, implementation_approach

**User Context:**
- Provides: Their platform preferences and technical comfort level
- Receives: Comprehensive technical specifications for implementing their MVP

**Confirm before continuing:** "Does this implementation approach feel right for your technical comfort level?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `implementation_design.md` | `docs/` | Progress assessment, delivery context, backend design, MVP scope, implementation platform selection |
| `mvp_specs.md` | `docs/specs/` | Technical specifications for implementing the MVP |
