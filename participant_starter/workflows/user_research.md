# User Research Workflow — Complete Reference

**ID:** user_research
**Description:** Guide you to find and talk to real users, learning directly about their needs, current solutions, and biggest pain points

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the user research workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete", let the participant know the workflow is complete, and remind them to update `docs/reports/session_log.md` and `docs/reports/decisions.md`

- Keep tone conversational and collaborative
- Use Socratic questioning — don't prescribe research methods or user insights
- Engage as a thought partner, present one thought at a time
- Reads from: `docs/problem_definition.md`, `docs/evaluation_design_report.md`

---

## Steps

### Step 1: Understand original quality risk, check evolution since building, document current understanding, and frame user research goals
**Goal:** Understand original quality risk, check evolution since building, document current understanding, and frame user research goals



## Conversation Flow

### 1. Recap Original Quality Risk

Present what you found:
- "Back in Evaluation Dataset workflow, you identified your primary quality risk as: [their quality risk]"
- "This was the thing you were most concerned could make your solution fail"

### 2. Check if Understanding Has Evolved

Ask reflective questions:
- "Now that you've run your experiment and built your spike, is this still your main concern?"
- "Have you learned something new that changes your understanding of the risk?"
- "Is there a different quality risk that feels more urgent now in hindsight?"

### 3. Listen and Engage

**If it's the same:**
- Acknowledge consistency: "Good — that focus will help your user conversations stay targeted"

**If it's evolved:**
- Explore the change: "What changed your thinking?"
- Help them reflect on that evolution and get a deeper understanding of the progress.

### 4. Frame User Research Goals

Connect quality risk to user conversations:
- "The goal of talking to users is to understand whether [their quality risk] is actually a problem for them"
- "You're not validating your solution — you're testing your assumptions about the problem"

Key questions user research should answer:
- Is this quality risk real for the end user or are we imagining things?
- If it is a concern, how do they currently deal with it?
- What's their next best alternative? And how well does that handle the quality risk? At what cost?
- In what specific context isn't that alternative good enough?

**Deliver:** Save to `docs/user_research_plan.md` with sections:
- quality_risk_focus_for_user_research (current_quality_risk, why_user_validation)

**User Context:**
- Provides: Their reflections on how their quality risk understanding has changed since ideation
- Receives: A clear articulation of their current quality risk and user research learning goals

**Confirm before continuing:** "Does this capture your current quality risk and what you need to learn from users?"

---

### Step 2: Identify best recruitment channels, design value exchange, and create concrete outreach plan
**Goal:** Identify best recruitment channels, design value exchange, and create concrete outreach plan



## Part A: Initial Recommendation (Show 3)

Based on their target user, recommend 3 most suitable approaches considering:
- Who is their target user? (Technical? Non-technical? Specific role? Industry?)
- Where do these users naturally congregate?
- What's the participant's comfort level with cold outreach?

Present the 3 with warmth/effort indicators:

"Based on your target users ([who they are]), I'd suggest starting with these three approaches:

1. **[Approach Name]** (Lead Warmth: [Hot/Warm/Cold] | Setup Effort: [Low/Medium/High])
   [Brief explanation of how this works for their context]..."

## The 8-Item Recruitment Menu

1. **Your Existing Network** (Hot | Low) — LinkedIn connections, former colleagues, friends who match user profile
2. **Referrals from Network** (Warm | Low) — Ask your network "who do you know that..." with warm intro
3. **Host Value-First Event/Workshop** (Cold→Warm | High) — Webinar or workshop teaching something useful
4. **Online Community Participation** (Cold→Warm | Medium) — Reddit, Discord, Slack, forums where target users gather
5. **Direct Social Media Outreach** (Cold | Low) — LinkedIn, Twitter/X direct messages to people discussing relevant problems
6. **Location-Based Guerrilla** (Cold | Medium) — Coffee shops, coworking spaces, conferences
7. **Give-First Consulting** (Cold→Warm | Medium) — Offer free audit/feedback/review of their current approach
8. **Cold Email with Specificity** (Cold | Low) — Research-based personalized emails

## Part B: Refinement & Iteration

For each approach they're hesitant about, iterate:
- "What's making this feel hard?"
- "What if we modified it to [adjustment]?"
- Guide toward ONE primary approach that feels achievable.

## Part C: Value Exchange Design

Once they've chosen an approach, workshop what they'll offer for 20-30 minutes of someone's time:
- Insights report (compiled findings from all interviews, anonymized)
- Early access (first access when the solution is ready)
- Free consultation (review their current workflow and give feedback)
- Learning session (share what you learn about [topic])
- Gift card ($15-20)
- Just genuine appreciation

## Part D: Craft the Outreach Message

Help them draft the actual message using this structure:
1. Who you are (brief, authentic)
2. What you're working on (problem-focused, not solution-selling)
3. Why you want to talk to THEM specifically
4. What you're asking for (specific time commitment)
5. What they get (value exchange)
6. Easy next step (Calendly link, reply to set time)

**Deliver:** Append to `docs/user_research_plan.md` with sections:
- interview_plan (target_users_for_research, recruitment_approach, value_exchange, outreach_message, conversation_goals)

**User Context:**
- Provides: Their insights into their target users and comfort with outreach methods
- Receives: A recruitment plan, value exchange proposition, and concrete outreach message

**Confirm before continuing:** "Does this recruitment approach and value exchange feel achievable and authentic?"

---

### Step 3: Create interview guide with behavioral questions and listening notes
**Goal:** Create interview guide with behavioral questions and listening notes



## Conversation Structure Philosophy

Remind them that this is their research goal:
Understand the end user's current workflow, pain points, next best alternative, and what would make the biggest difference.

**The Approach:**
- Start with "How do you currently do X?" (behavioral, concrete)
- Listen actively and ask follow-up questions
- Dig deeper based on what they share
- NOT mechanical "read the questions" — engage with their answers

**Core Principle:** You're having a conversation, not conducting an interrogation.

## Conversation Flow

> **Generate these dynamically for this participant's project.** The sections below are a general template — adapt every question to the participant's specific idea and to whether their users live in a *work* or a *personal* context. Don't assume a workplace, a "role," or professional tooling unless the project actually calls for it. Have Claude rewrite the example wording to fit the project rather than using it verbatim.

### 1. Frame the Interview Guide

"Let's create your conversation guide. This isn't a rigid script — it's a framework for having a real conversation. Questions will flow in this order:
1. Current workflow (how they do it now)
2. Pain points (where it breaks down)
3. Next best alternative (what they use/do instead)
4. Ideal outcome (what would make the biggest difference)"

### Scope your guide for a 20–30 minute conversation

The full guide below has 7 question sections. Read all 7 so you understand the full toolkit — but you won't run all of them well in a single conversation, and a tighter conversation gets better answers. Help the participant select the ~4 that best fit:

- **Anchor on one primary quality risk** as the spine of the guide — this keeps the conversation focused and tells you what you're optimizing the questions around.
- They can also pick **1–2 secondary risks to listen for**. The same behavioral questions surface signals for multiple risks at once, so they don't need separate questions for each — they just need to know what to listen for.
- Ask them: *"Your primary risk is [X] and you also want to listen for [Y, Z]. Which 4 sections should you prioritize, and which questions cover more than one risk?"*
- **Opening and Closing are short — always keep them.**
- **Default core four:** Current Workflow · Pain Points · Next Best Alternative · Quality Risk Connection
- Ideal Outcome is usually the first to drop if you're tight on time.

Beyond ~3 risks, the conversation loses focus and the analysis gets muddy — keep it to a primary plus one or two to listen for.

### 2. Opening/Warm-Up

Open with a warm, general question that fits *this* participant's project — their users might be in a work setting or a personal one, so don't assume a job or a role. Have Claude generate the opener from the participant's project context. Examples:
- Work context: "Thanks for taking the time. Tell me a bit about your role and what you work on day-to-day."
- Personal context: "Thanks for taking the time. Tell me a bit about how [the problem area] fits into your day-to-day life."

**What to listen for:** The everyday context around the problem — what surrounds it, what tools or habits they use, how it fits into their work or life

### 3. Current Workflow Questions (2-3 questions)

**Question format:** "How do you currently [do X]?"
- "Walk me through how you currently [their problem area]"
- "What does that process look like from start to finish?"
- "What tools, apps, or methods do you use to do this?"

**What to listen for:** Where they pause or express friction, workarounds they've built, what's manual vs automated

**Follow-up prompts:** "Tell me more about [thing they mentioned]" / "How long does that usually take?"

### 4. Pain Point Questions (2-3 questions)

**DON'T ask:** "What's the hardest part?" (too abstract)

**DO ask:**
- "Where does this process break down or get frustrating?"
- "What part of [workflow] takes longer than you'd like?"
- "When you're doing [task], what makes you think 'there has to be a better way'?"

**What to listen for:** Emotional language ("annoying", "frustrating"), time sinks, error-prone areas, context switching

### 5. Current Solution / Next Best Alternative (2-3 questions)

**Questions:**
- "What do you use now to handle [problem]?"
- "How did you find/choose that solution?"
- "What does that solution do well? Where does it fall short?"

**This is critical:** Understanding their next best alternative tells you what you're competing against and what bar you need to clear.

**Follow-up prompts:** "What would make you switch from [current solution]?" / "Is this important enough to pay for/invest time in learning?"

### 6. Ideal Outcome Questions (1-2 questions)

- "If you could wave a magic wand and fix one thing about [problem area], what would it be?"
- "What would make the biggest difference in how you handle [workflow]?"

**What to listen for:** Is their "ideal" a specific feature or broader outcome? Do they describe saving time, reducing errors, reducing stress?

### 7. Closing Questions

- "Is there anything else about [problem area] that I should know?"
- "Who else do you think I should talk to about this?" (referral generation)

### 8. Quality Risk Connection

"Notice how several of these questions will help you understand whether [their quality risk] actually matters to users and how they currently deal with it. Listen for signals about that throughout."

**Deliver:** Append to `docs/user_research_plan.md` with sections:
- conversation_guide (opening_warmup, current_workflow_questions, pain_point_questions, current_solutions, ideal_outcome, closing, quality_risk_signals)

**User Context:**
- Provides: Their knowledge of their workflow, user segment, and quality risks to probe
- Receives: An actionable conversation guide with listening notes and follow-up questions

**Confirm before continuing:** "Does this guide help you have engaging conversations that test your quality risk?"

---

### Step 4: Create customized LLM prompt for analyzing interview transcripts focused on quality risk validation
**Goal:** Create customized LLM prompt for analyzing interview transcripts focused on quality risk validation



## Conversation Flow

Explain the approach:

"Let's be realistic — you'll probably record and transcribe your interviews so you can stay focused on the conversation. I'll create a prompt you can use with ChatGPT or Claude to analyze the transcript and extract structured insights.

This prompt will be customized to focus on your quality risk and learning goals, so the LLM pulls out exactly what you need. If you listened for more than one risk, the prompt will extract signals for each — your primary risk and any secondary risks separately — so the multi-risk listening pays off in the analysis."

## Prompt Template Structure

Create a customized LLM prompt that:
1. Explains the research context and quality risk
2. Instructs the LLM on what to extract
3. Provides a structured output format
4. Focuses on insights, not summary

## Output Requirements

Create a complete, ready-to-use LLM prompt that includes:

1. **Context Setup**: Brief explanation of their research goal and quality risk(s) — primary risk plus any secondary risks they listened for, kept distinct
2. **Analysis Instructions**: What to extract from the transcript
3. **Output Format**: Structured format for insights
4. **Evidence Requirement**: Instructions to include direct quotes

The final prompt should be something they can literally copy and paste into ChatGPT/Claude along with their interview transcript.

**Deliver:** Save to `prompts/interview_analysis_prompt.txt`

**User Context:**
- Provides: Their quality risk focus and conversation guide context
- Receives: A standalone LLM prompt file for analyzing interview transcripts against their quality risk

**Confirm before continuing:** "Does this prompt capture what you need to extract from user conversations?"

---

### Step 5: Run your conversations and synthesize what you learned
**Goal:** Hold the conversations, run the transcripts through your analysis prompt, and turn the raw insights into a synthesis you can build from

## Conversation Flow

This is where the research pays off — you actually talk to people and make sense of what they say. Don't stop at the prompt; run it.

### 1. Hold the Conversations

- Use the guide from Step 3 as a flexible framework, not a script.
- Talk to the 2–3 people you already lined up — friends, family, or anyone convenient who can speak from the target user's perspective (even if that's you). A couple of real conversations beats none.
- Capture each one: record and transcribe if you can (so you can stay present in the conversation), or take notes during and right after.

### 2. Run Each Transcript Through Your Analysis Prompt

- Open `prompts/interview_analysis_prompt.txt`.
- For each conversation, paste the prompt plus that transcript (or your notes) into Claude and save the structured output.
- Do this once per conversation so each one's signals stay distinct.

### 3. Synthesize Across Conversations

Bring the per-conversation analyses together and look across them with Claude:
- "Across these conversations, what patterns show up around [their quality risk]?"
- Did the quality risk turn out to be real for these people, or were we imagining it?
- How do they currently handle the problem — what's their next best alternative, and where does it fall short?
- What surprised you or challenged an assumption?

Keep it honest: a small sample of convenient testers gives *directional* signal, not proof. Note where you'd want more confidence.

### 4. Capture What It Changes

Pull out the few findings that should actually influence what you build next, and note any change to your primary quality risk.

**Deliver:** Save to `docs/user_research_findings.md` with sections:
- conversations_summary (who you talked to, and in what context)
- per_conversation_insights (the analysis output for each conversation)
- cross_conversation_synthesis (patterns, quality_risk_validation, current_alternatives, surprises)
- implications_for_build (what this changes about your solution or quality risk)

**User Context:**
- Provides: Their interview transcripts/notes and reactions to the synthesized patterns
- Receives: A synthesis of what users actually said and what it means for their build

**Confirm before continuing:** "Does this capture what you learned and how it should shape what you build next?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection, add any key decisions and their reasoning to `docs/reports/decisions.md`, and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `user_research_plan.md` | `docs/` | Quality risk focus, recruitment plan, conversation guide |
| `interview_analysis_prompt.txt` | `prompts/` | LLM prompt for analyzing interview transcripts |
| `user_research_findings.md` | `docs/` | Synthesis of the conversations: per-conversation insights, cross-conversation patterns, and implications for the build |
