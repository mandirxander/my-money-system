# Problem Definition

---

## Problem Statement

Mandi and her family have the values, the knowledge, and the tools to manage their finances well — but no single system that holds it all together and pulls them back when life gets hectic. The result is inconsistency: budgeting happens bi-weekly when there's time, the cash envelope method gets used sometimes, debt is tracked in a phone note, and decisions get made through a patchwork of family, friends, experts, and AI. The system is passive. It waits. Nobody comes back to it unless there's already a reason to.

The goal is a proactive, values-aligned financial system — built around Dave Ramsey's Baby Steps framework — that knows where the family is in their journey, surfaces what matters right now, and pulls them back on track when life gets in the way.

## Knowledge Domain

Personal finance — budgeting, debt management, saving, investing — structured around Dave Ramsey's Baby Steps progression.

---

## Current State

**Current Engagement:**
- Budgeting done manually in Excel, bi-weekly or monthly depending on the season
- Cash envelope method used sometimes for category-based spending control
- Sometimes spending happens without tracking (especially food, groceries, everyday essentials)
- Debt tracked manually in a phone note (amounts, interest rates, remaining balances)
- Financial decisions made through family, friends, experts, and AI — then filtered through family values and long-term goals

**Existing Tools:**
- Excel (budgeting)
- Phone notes (debt tracking)
- Cash envelopes (occasional spending control)
- AI/experts/family (decision support)

**Current Trigger:**
- Self-initiated — requires intentional effort to sit down and do it
- No external prompt or accountability mechanism

**Frequency:**
- Bi-weekly or monthly for budgeting; inconsistent for everything else

**Friction Points:**
- No single system holding everything together
- When life gets hectic, there's nothing pulling them back on track
- Inconsistency across methods — no unified approach
- Passive tools that wait to be used rather than prompting engagement
- Debt and budget tracked in separate, disconnected places
- No visual progress toward goals to sustain motivation

---

## Desired State

**Success Criteria:**
- A single system that connects budget, debt, goals, and decisions in one place
- Proactive — it reaches out or prompts engagement, doesn't wait to be opened
- Grounded in Baby Steps so there's always a clear "what's next"
- Visual progress indicators that make the goal feel real and reachable
- Consistent enough to survive hectic seasons without falling apart

**Expected Impact:**
- More consistent financial behavior — budgeting happens even when life is busy
- Clearer sense of progress toward Baby Steps milestones
- Faster, more confident financial decisions aligned with family values
- Less cognitive load — one place to go instead of three

**Return Loop Vision:**
- The system knows where the family is in the Baby Steps journey
- It checks in proactively — nudges when a budget review is due, flags when spending patterns drift, prompts reflection on a hard decision
- Each interaction updates the system's understanding of where they are and what they need next
- Visual progress makes coming back feel rewarding, not like a chore

**Constraints:**
- Needs to work for a busy household — low friction to engage with
- Should feel personal and values-aligned, not generic or corporate
- Baby Steps framework is non-negotiable — it's the philosophical backbone
- Must support joint decision-making (this is a family system, not just an individual one)

---

## Assumptions Analysis

### Initial Assumptions Identified
1. The system needs to be proactive — it should reach out and pull users back
2. Dave Ramsey's Baby Steps is the right framework for everyone who uses this
3. This is a family system — it supports joint decision-making

### Validated Constraints
- **Collaborative by design:** Both partners must actively engage for the accountability loop to work. One person may handle daily inputs, but budgeting and major decisions are joint. If only one person uses it, the system fails at its core purpose.
- **Baby Steps as methodology, not prerequisite:** The framework is the engine, not a filter. Users don't need to arrive as Ramsey believers — the system guides them through it and the results do the convincing.

### Flexible Assumptions
- **Proactive engagement:** Not push notifications — those get swiped away. The system should feel like checking in with someone, not something. Intentional, conversational, personalized. The return loop is rewarding, not nagging.
- **Visual progress is functional, not decorative:** Progress bars, pie charts, milestone celebrations — these create the dopamine hit that makes coming back feel worthwhile. Gamification (strategy game feel) is a core engagement mechanic, not a nice-to-have.

### Beliefs to Test
- Will the conversational check-in model feel meaningfully different from a notification? Does the "talking to someone" framing actually increase follow-through?
- Can the Baby Steps framework onboard someone who arrives skeptical or unfamiliar with Ramsey — and do the results convert them?
- Will both partners consistently engage, or will one naturally become the primary user over time? How does the system handle uneven engagement without losing the collaborative dynamic?

---

## Solution Hypotheses

### Hypothesis 1 — AI as Assistant (Level 1)
*You drive, AI organizes*

**Autonomy level:** Low — AI organizes and visualizes, human does everything else

**What AI does autonomously:** Categorizes inputs, calculates Baby Steps progress, generates visual dashboard snapshot

**Human touchpoints:** All data entry, all decisions, initiating every session

**Interaction pattern:** Human-initiated; AI responds with organized picture

**Scope boundaries:**
- Does: Organizes inputs, calculates progress, displays visual dashboard
- Doesn't do: Initiate contact, monitor automatically, support decisions
- Human touchpoints: Every interaction is human-initiated

---

### Hypothesis 2 — AI as Collaborator (Level 2)
*Conversational check-in partner*

**Autonomy level:** Medium — AI initiates check-ins, drafts updates, supports decisions conversationally

**What AI does autonomously:** Initiates scheduled check-ins, processes conversational input, drafts budget updates, flags spending drift, generates decision frameworks

**Human touchpoints:** Responding to check-ins, approving updates, making final calls on all decisions

**Interaction pattern:** AI-initiated check-ins on a set rhythm; conversational throughout; both partners can engage

**Scope boundaries:**
- Does: Initiates check-ins, processes conversational updates, decision support
- Doesn't do: Monitor accounts automatically, make decisions, run without input
- Human touchpoints: Check-in responses, decision approvals

---

### Hypothesis 3 — AI as Agent (Level 3)
*Autonomous financial co-pilot*

**Autonomy level:** High — AI monitors accounts, tracks progress, surfaces exceptions autonomously

**What AI does autonomously:** Monitors connected accounts, tracks Baby Steps progress in real time, generates alerts and recommendations, manages routine updates without input

**Human touchpoints:** Setting parameters, reviewing alerts, approving major decisions

**Interaction pattern:** AI-initiated and exception-based; mostly autonomous between touchpoints

**Scope boundaries:**
- Does: Account monitoring, autonomous progress tracking, alert generation
- Doesn't do: Make financial decisions unilaterally
- Human touchpoints: Parameter setting, exception review, major decisions

---

### Hypothesis 4 — AI as Collaborative Monitor (Level 2.5) ✓ SELECTED DIRECTION
*Watches quietly, shows up fully for the real conversations*

**Autonomy level:** Medium-high — AI monitors automatically in the background, but check-ins are always conversational and intentional

**What AI does autonomously:** Monitors spending and progress between check-ins, prepares a full picture for scheduled check-ins (what drifted, what's on track, Baby Steps progress), categorizes transactions, updates debt tracking

**Human touchpoints:** Scheduled bi-weekly check-ins (both partners), decision conversations, final calls on all financial decisions

**Interaction pattern:** AI monitors quietly; initiates prepared check-ins on a set rhythm; always available for decision conversations; both partners engage together

**Scope boundaries:**
- Does: Background monitoring, check-in preparation, conversational check-ins, decision support, visual progress dashboard
- Doesn't do: Make financial decisions, run indefinitely without engagement, replace the intentional human conversation
- Human touchpoints: Bi-weekly check-ins, any decision conversation, activity logging

---

## Selected Solution

**Chosen Hypothesis:** Hypothesis 4 — AI as Collaborative Monitor (Level 2.5)

**Solution Logic:**
"If we build this system, it will produce an intentional personal finance user with clear goals and action steps towards that goal — using AI as a collaborator and accountability partner that meets your personal financial needs."

**Autonomous Capabilities:**
- Track spending inputs and categorize against budget automatically
- Monitor progress across all Baby Steps milestones in real time
- Maintain debt inventory (balances, interest rates, payoff progress) without manual note-keeping
- Prepare a full check-in brief before each scheduled session — what's on track, what drifted, what's next in the Baby Steps journey
- Generate visual progress dashboard (progress bars, charts, milestone markers) updated after every interaction
- Surface decision frameworks when a hard financial question comes up, grounded in the family's actual situation and Baby Steps stage

**Human Touchpoints:**
- Bi-weekly check-in sessions (both partners together) — conversational, AI-prepared, human-driven
- Decision conversations — anytime, initiated by either partner
- Activity logging — spending, income, debt updates (conversational input)
- All final financial decisions — the AI advises, the family decides

**Interaction Pattern:**
Conversational throughout. AI monitors quietly between sessions and arrives at check-ins prepared. Both partners can engage. Check-ins feel like sitting down with a financial coach who already knows your situation — not punching numbers into a spreadsheet.

**Success Metrics:**
- Budgeting happens consistently, even during hectic seasons
- Both partners feel ownership and accountability
- Clear visibility of Baby Steps progress at any point
- Financial decisions feel more confident and values-aligned
- Reduced cognitive load — one place for everything

**Scope Boundaries:**
- Does: Spending tracking, debt monitoring, Baby Steps progress, check-in preparation, decision support, visual dashboard
- Doesn't do: Connect to bank accounts automatically (v1), make financial decisions unilaterally, replace human judgment
- Out of scope for v1: Live account syncing, investment portfolio management, tax planning

---

## Process Requirements

**Process Inputs:**
- Spending logs (conversational or manual entry)
- Income updates
- Debt balances and interest rates
- Family's current Baby Step
- Financial decisions or questions as they arise

**Process Outputs:**
- Updated visual dashboard (Baby Steps progress, budget vs. actual, debt payoff tracker)
- Bi-weekly check-in brief with summary, drift flags, wins, and one focused next action
- Decision support responses grounded in Baby Steps framework and family's real situation
- Milestone celebrations when a Baby Step is completed

---

## Experiment Design

**Core Assumption Being Tested:**
AI can act as a meaningful financial coach and accountability partner — not just a calculator. It can hold the emotional weight of real financial situations, understand cascading implications, reference the user's Baby Steps stage, and have a genuinely useful conversation that feels personal, asks the right follow-up questions, and gives actionable advice.

**Test Approach:**
Run four real scenarios through a prompt in Claude.ai or ChatGPT. Evaluate whether the AI responds in a way that feels personal (not generic), asks smart follow-up questions, and gives advice that is actually actionable for this specific family's situation.

**Mock Data Examples (Real Scenarios):**

1. **Major setback recovery** — Bought a home above market value. Two years in, the home was hit by a flood. After renovation costs and losses, the family is now short selling the property. Financially and emotionally complex. Tests whether AI can hold the weight, understand the Baby Steps implications of a full reset, and help think through the next right move.

2. **New long-term goal** — After the short sale, the goal is saving for a new home. Tests whether AI can help set a realistic savings target, connect it to the current Baby Step, and build a path forward from a setback position.

3. **Recurring spending drift** — Food and groceries consistently exceed budget. The family eats out too much, and healthy grocery costs have risen significantly. Tests whether AI can analyze the drift, offer realistic adjustments for a busy family, and connect it back to debt payoff goals.

4. **Resource optimization** — Not which debt to pay off first, but how to find extra money to accelerate payoff faster. A busy household with limited margin. Tests whether AI can analyze a real budget situation and surface non-obvious opportunities without requiring hours of manual analysis.

**Test Scenarios:**
- Run each scenario as a standalone check-in prompt — does the AI respond as a prepared coach or a generic chatbot?
- Try a follow-up question in each — does it maintain context and go deeper, or reset?
- Test the setback scenario with emotional framing — does it acknowledge the difficulty before jumping to advice?

**Success Criteria:**
- Feels personal, not generic — references the specific situation, not boilerplate
- Asks at least one smart follow-up question that shows it understood the nuance
- Advice is actionable for *this* family, not just theoretically correct
- Baby Steps framework shows up naturally, not as a lecture
- Emotional weight is acknowledged before solutions are offered

**Learning Goals:**
- Understand how much context the prompt needs to set up for the AI to respond well
- Identify where the AI gives generic vs. genuinely useful responses
- Find the edges — what kinds of questions does it handle poorly?
- Determine how much the system design needs to compensate for AI limitations
