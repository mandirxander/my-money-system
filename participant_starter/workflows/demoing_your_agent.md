# Demoing Your Agent Workflow — Complete Reference

**ID:** demoing_your_agent
**Description:** Build a compelling 8-minute demo narrative that resonates with your target audience — craft your story arc, storyboard your visuals, develop your script, and prepare for recording

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the demoing your agent workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Begin with Step 1 and follow each step prompt in order
2. Complete one step fully before moving to the next
3. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
4. Save outputs to the file paths specified in each step
5. When you reach the final step, let the participant know the workflow is complete and remind them to update `docs/reports/session_log.md`

- Keep tone collaborative; explain why each choice matters for a confident, engaging demo
- Use Socratic questioning — don't prescribe demo narratives or presentation approaches
- Engage as a thought partner in natural conversation, presenting one thought at a time
- Reads from: `docs/reports/participant_profile.md`, `docs/problem_definition.md`, `docs/implementation_design.md`, `docs/user_research_plan.md`, `docs/architecture_spec.md`, `docs/specs/user_experience_spec.md`, `docs/evaluation_at_scale_design.md`

---

## Steps

### Step 1: Identify target audience segment and the key achievement to highlight
**Goal:** Identify target audience segment and the key achievement to highlight



## Conversation Flow

### 1. Acknowledge Their Work

Start by referencing what you just read:
- "I see from your profile that you're [summarize background/goals from participant_profile.md]..."
- "From your problem_definition.md, you're working on [summarize their problem/solution]..."
- "Your target users are [who they're building for]..."
- "The core value proposition seems to be [what problem it solves]..."

### 2. Frame the Demo Day Context

Explain the audience diversity:
- "Your final demo will be presented to a diverse audience including experienced founders, corporate managers, investors, potential collaborators, and hiring managers"
- "Everyone in the audience will watch, but different segments care about different things"
- "Founders and investors care about market opportunity and business model"
- "Technical leaders care about architecture and innovation"
- "Potential users care about solving their specific pain points"
- "Hiring managers care about your technical skills and problem-solving approach"

### 3. Identify Their Priority Audience

Ask directly:
- "Which audience segment matters most to you right now?"
- "What do you want to get from this demo?"

**Probe for specifics:**
- "Are you looking for collaborators to help take this to the next level?"
- "Do you want to attract potential customers or users?"
- "Are you hoping to connect with investors for funding?"
- "Is this an opportunity to showcase your skills for hiring opportunities?"
- "Something else entirely?"

**Understand their goal:**
- "What would success look like after demo day?"
- "If someone from that audience reaches out to you afterward, what would you want them to say?"

### 4. Surface the Key Achievement

Ask about what they're most proud of:
- "In your own words, what is the most important achievement of your project that this demo should highlight?"

**Guide them to be specific:**
- Not just "it works" — what breakthrough or insight made it work?
- Not just features — what impact or value does it create?
- Not just technical implementation — what problem does it solve elegantly?

**Probe if needed:**
- "What was the hardest problem you solved?"
- "What surprised you most about building this?"
- "What makes your approach different from obvious alternatives?"
- "What would you want people to remember about your project?"

### 5. Connect Audience to Achievement

Help them see the alignment:
- "So you want to reach [audience segment] and your key achievement is [their achievement]"
- "That means your narrative should emphasize [connection between achievement and what that audience cares about]"

**Examples:**
- If targeting investors + achievement is novel architecture → emphasize scalability and market differentiation
- If targeting collaborators + achievement is solving hard edge case → emphasize technical depth and open problems
- If targeting users + achievement is time savings → emphasize concrete before/after scenarios
- If targeting hiring managers + achievement is elegant implementation → emphasize problem-solving process

**Deliver:** Save to `docs/demo_plans.md` with section:
- audience_focus (priority_audience with success metric, key_achievement and why it matters, core_message)

**User Context:**
- Provides: their project background, goals, and what they're most proud of achieving
- Receives: clear focus on who to present to and what achievement to emphasize

**Confirm before continuing:** "Does this audience focus and achievement align with what matters most to you?"

---

### Step 2: Present 3 narrative arc options, get preference, converge with 3-act structure, and gather context materials
**Goal:** Present 3 narrative arc options, get preference, converge with 3-act structure, and gather context materials



## Conversation Flow

### 1. Frame Narrative Thinking

Start with context:
- "Now that we know you're targeting [audience segment] and want to highlight [achievement], let's design the story arc for your demo"
- "I'm going to present 3 different narrative approaches — each tells the same facts but emphasizes different aspects"
- "Before that though, are there any documents you think I should read that would help building out the story for the demo?"
- If they mention any document you haven't read, check those out.
- "These are high-level story beats, not detailed scripts yet"

### 2. Present 3 Narrative Options

For each option, present as simple bullet points showing the flow. Keep it high-level.

**Guidelines for creating options:**
- Tailor to their audience (investors care about different beats than hiring managers)
- Emphasize their key achievement at the right moment
- Each should feel like a legitimate alternative
- No technical storytelling terminology yet (no "inciting incident" or "climax")

**Example structure for each option:**
```
Option A: [Give it a descriptive name]
- [Opening beat: how story starts]
- [Development beat: what unfolds]
- [Turning point: key moment]
- [Resolution beat: where it lands]
- [Closing beat: what's next]
```

**Examples for different contexts:**

If targeting investors + achievement is cost reduction:
- Option A: "Market Opportunity First" → Start with market pain → Show failed alternatives → Your breakthrough → Validation data → Scale potential
- Option B: "Technical Innovation First" → Start with technical challenge → Existing limitations → Your novel approach → Cost impact → Market fit
- Option C: "User Journey First" → Start with user frustration → Walk through current workflow → Introduce your solution → Show transformation → Business model

If targeting collaborators + achievement is solving edge cases:
- Option A: "The Hard Problem" → Start with what everyone else missed → Why it's hard → Your insight → How you solved it → What's still open
- Option B: "Progressive Discovery" → Start with obvious solution → Show where it breaks → Your investigation → The insight → Implications
- Option C: "Architecture First" → Start with system design → Walk through normal case → Show edge case handling → Technical depth → Research directions

### 3. Get Their Reaction

Ask them to evaluate all three options:
- "Before choosing, let's talk about what works and what doesn't for each option"
- "For Option A, what do you like about it? What doesn't resonate with you?"
- "For Option B, what appeals to you? What feels off?"
- "For Option C, what works well? What would you want to change?"

**Capture their feedback systematically:**
- Listen for what they like in each (these are elements to keep)
- Listen for what they don't like (these are elements to avoid)
- Note which aspects of their key achievement are highlighted in each
- Understand which narrative best fits their priority audience

### 4. Converge and Refine

Use their feedback to converge on the final narrative:
- Start with their preferred option as the base
- Incorporate liked elements from other options where it makes sense
- Avoid elements they didn't like
- Adjust beats based on their feedback

**Present the converged narrative:**
- "Based on what you said, here's the narrative that combines the best elements: [revised beats]"
- "This keeps [what they liked] and avoids [what they didn't like]"
- Get confirmation: "Does this feel right to you?"
- Once they approve the high-level structure, move to the next step

**Deliver:** Append to `docs/demo_plans.md` with section:
- narrative_architecture (chosen_narrative with story beats and rationale for choice)

**User Context:**
- Provides: their feedback on narrative options and preference for story arc
- Receives: converged narrative with clear story beats that they have approved

**Confirm before continuing:** "Does this narrative capture the story you want to tell and highlight your key achievement?"

---

### Step 3: Apply 3-act storytelling framework to the narrative and inventory supporting materials
**Goal:** Apply 3-act storytelling framework to the narrative and inventory supporting materials



## Overview

Take the converged narrative from the previous step and layer on the 3-act storytelling framework to create a compelling demo structure with clear dramatic momentum.

## Instructions

### 1. Frame the 3-Act Structure

**Explain the structure:**
- "Now let's add the technical story structure to your chosen narrative"
- "We'll use the 3-act framework: Setup, Confrontation, Resolution"
- "This helps ensure the story has momentum and keeps the audience engaged"

### 2. Map Story Beats to Acts

For their chosen narrative, mark the acts:

**Act 1 — Setup (Establish the world)**
- What's the status quo or starting point?
- Who is affected?
- What's the inciting incident that creates need for change?

**Act 2 — Confrontation (The challenge)**
- What's the core challenge or twist?
- What makes this hard?
- What was the key struggle or pivot moment?

**Act 3 — Resolution (The solution and transformation)**
- How did your solution emerge?
- What's now possible that wasn't before?
- What's the transformation or impact?

### 3. Guide the Conversation

**Map their narrative to the structure:**
- "In your narrative, Act 1 (Setup) is [these beats] — this establishes [what]"
- "Act 2 (Confrontation) is [these beats] — this is where [the challenge/twist]"
- "Act 3 (Resolution) is [these beats] — this shows [the transformation]"

### 4. Validate the Structure

**Get their buy-in:**
- "Does this structure capture the story you want to tell?"
- "Is the key achievement highlighted at the right moment?"
- "Does the story have good momentum and build to your achievement?"

### 5. Inventory Supporting Materials

Now that the narrative and structure are set, identify what materials they have to support it:

**Ask them directly:**
- "What artifacts, figures, diagrams, plots, numbers, or other materials do you have that support this story?"
- "This could include things like:"
  - Screenshots or recordings of your system working
  - Performance metrics, accuracy scores, or benchmark results
  - Before/after comparisons
  - User feedback or testimonials
  - Architecture diagrams or technical schematics
  - Cost savings or efficiency improvements
  - Error rate reductions or quality improvements

**Get simple clarifications:**
- "What do they show exactly?"
- "How do they relate to your key achievement?"
- "Which ones are most compelling for your audience?"

**Deliver:** Append to `docs/demo_plans.md` with section:
- 3_act_structure (Act 1 Setup beats, Act 2 Confrontation beats, Act 3 Resolution beats, supporting_materials_inventory)

**User Context:**
- Provides: their feedback on 3-act structure mapping and inventory of their available supporting materials
- Receives: complete 3-act story structure with documented list of supporting materials

**Confirm before continuing:** "Does this 3-act structure create good momentum and do you have the right materials to support it?"

---

### Step 4: Create high-level visual storyboard mapping story beats to what should be shown
**Goal:** Create high-level visual storyboard mapping story beats to what should be shown



## Conversation Flow

### 1. Frame Visual Storyboarding

Start by explaining the purpose:
- "Now that we have your narrative arc, let's plan what the audience will SEE for each story beat"
- "This is like creating a storyboard for a film — matching visuals to your story"
- "The key principle: show, don't just tell"
- "We'll identify what visual should accompany each beat — we'll figure out HOW to create them later"

### 2. The Show vs Tell Principle

Emphasize the hierarchy of showing:

**Priority 1: Show the real thing in action**
- Screen recordings of your actual system
- Real outputs and results
- Actual data and metrics

**Priority 2: Show concrete artifacts**
- Screenshots of actual UI or outputs
- Real charts with your data
- Actual architecture as implemented

**Priority 3: Show representations only when necessary**
- Diagrams for explaining concepts
- Mockups for problem illustration
- Generic charts for context

**Ask them:**
- "What parts of your system are working and can be recorded?"
- "What actual results or outputs do you have that can be shown?"
- "What data or metrics can be displayed?"

### 3. Map Story Beats to Visuals

Go through each story beat from their narrative and identify what should be shown.

**For each beat, ask:**
- "What should the audience see during this beat?"
- "Do you have working functionality to show here?"
- "Do you have real data to display?"
- "If we can't show the real thing, what's the next best visual?"

**Common beat-to-visual mappings:**

**Opening beats (problem/context):**
- Before-state of current workflow (screenshots or simple diagram)
- Problem illustration (user frustration, inefficiency)
- Data showing problem scale (if available)

**Development beats (solution/approach):**
- Architecture diagram (if explaining system design)
- OR screen recording showing how system works (preferred if available)
- Technology choices or key components

**Turning point beats (key insight/achievement):**
- **MUST show the actual system demonstrating this achievement**
- Screen recording of the breakthrough in action
- Real example walkthrough
- Before/after comparison using real data

**Resolution beats (results/impact):**
- Actual evaluation results (charts with real data)
- Metrics dashboard showing real performance
- User feedback or testimonials (if available)

**Closing beats (challenges/next steps):**
- Roadmap or next steps (simple text or timeline)
- Known limitations (list or simple diagram)
- Contact info and ask

### 4. Create the Visual Storyboard

Build a table mapping beats to visuals. For each beat, specify:
- Beat number and description
- Act (1, 2, or 3)
- Timing allocation (rough estimate)
- Visual type (recording/screenshot/diagram/chart/text)
- What it shows (specific content)
- Whether real or representative

**Example:**

| Beat | Act | Time | Visual Type | What It Shows | Real/Representative |
|------|-----|------|-------------|---------------|---------------------|
| 1. User frustration with current workflow | Act 1 | ~30s | Screenshot or simple diagram | Current manual process with bottlenecks highlighted | Representative |
| 2. Why existing solutions fall short | Act 1 | ~30s | Comparison table or diagram | Limitations of alternatives | Representative |
| 3. Our novel approach | Act 2 | ~1m | Architecture diagram OR screen recording | System design or how it works | Real if possible |
| 4. Concrete example: [specific use case] | Act 2 | ~2m | **SCREEN RECORDING (required)** | **Actual system handling realistic scenario** | **Real (required)** |
| 5. Evaluation results | Act 3 | ~1m | Metrics dashboard with charts | Real accuracy/latency/cost data | Real |
| 6. Next steps | Act 3 | ~30s | Simple text slide or timeline | Roadmap and ask | Representative |

Double check that the overall time is not more than 8 minutes.

### 5. Review and Refine

Ask them if anything needs to be refined or if they're happy to move on.

**Deliver:** Append to `docs/demo_plans.md` with section:
- visual_storyboard (table mapping each story beat to specific visuals: beat, act, timing, visual type, content, real/representative)

**User Context:**
- Provides: their guidance on what they can show, what assets they have, and what's feasible to create
- Receives: complete visual storyboard mapping each story beat to specific visuals

**Confirm before continuing:** "Does this storyboard show your key achievement in action and support your narrative effectively?"

---

### Step 5: Build complete 8-minute script aligned with visual storyboard
**Goal:** Build complete 8-minute script aligned with visual storyboard



Turn the story beats/arch + visual storyboard into a complete script.

## Instructions

### 1. Script Writing Approach

**Key principle:**
- Write what you'll SAY, not what you'll SHOW (that's already in your storyboard)
- Good narration complements the visuals, it doesn't describe what's visible
- Let the visuals breathe — don't over-narrate

### 2. Write the Script

For each story beat in your storyboard, write narration that:
- Uses your authentic voice
- Flows naturally from one section to the next
- Highlights your key achievement at the right moment
- Works WITH your visuals (complements, doesn't duplicate)

**Guidelines by visual type:**
- **Screen recordings:** Narrate the context and insights, not every click
- **Charts/metrics:** State the key finding, not every data point
- **Diagrams:** Explain the significance, not every component

### 3. Review and Refine

Once you have a complete script:
- "Is this in your voice?"
- "Does it emphasize your key achievement effectively?"
- "Are you over-narrating what's visible, or letting the visuals speak?"
- "Does the narration guide viewers through what they're seeing without describing every detail?"

**Deliver:** Append to `docs/demo_plans.md` with section:
- Script (full narration for all story beats — Problem Statement, Solution Architecture, Concrete Example, Evaluation Results, Challenges & Next Steps, The Ask — with speakable language that complements visuals)

**User Context:**
- Provides: their feedback on script sections, timing preferences, and their authentic voice
- Receives: complete 8-minute script with speakable narration that complements their visual storyboard

**Confirm before continuing:** "Does this script tell your story in your voice and work with your visual storyboard?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `demo_plans.md` | `docs/` | Audience focus, narrative architecture, 3-act structure with supporting materials inventory, visual storyboard (beat-to-visual table), complete 8-minute script |
