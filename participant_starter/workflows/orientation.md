# Orientation Workflow — Complete Reference

**ID:** orientation
**Description:** First-time onboarding for class participants - sets up workspace and gets to know them

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the orientation workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Begin with Step 1 and follow each step prompt in order
2. Complete one step fully before moving to the next
3. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
4. Save outputs to the file paths specified in each step
5. When you reach the final step, let the participant know the workflow is complete and remind them to update `docs/reports/session_log.md`

- Use Socratic questioning — don't prescribe goals or project ideas
- The workflow should feel like a friendly onboarding conversation, not a rigid form-filling exercise

---

## Steps

### Step 1: Have natural conversation to understand who the participant is and what they're hoping to achieve
**Goal:** Have natural conversation to understand who the participant is and what they're hoping to achieve

## Conversational Profile Discovery

Start with:

**Opening:**
"Let's take a minute to get to know each other. Tell me a bit about yourself — what brings you to this course?"

**Follow the conversation naturally:**
- Let them tell you about themselves in their own words
- Listen for cues about their background, role, motivations
- Ask follow-up questions based on what they share:
  - If they mention their job: "That sounds interesting—what kind of work do you do day-to-day?"
  - If they mention a project idea: "Tell me more about that. What problem are you trying to solve?"
  - If they mention learning goals: "What would success look like for you by the end of the class?"
  - If they mention technical background: "Have you worked with AI tools or agents before?"
  - If they mention programming or tools: "What technologies do you currently work with?" or "Are there any specific tools or technologies you're hoping to learn?"
  - If they mention current tech stack: "What would you like to add to your toolkit during the class?"

**Wrap up naturally after 3-5 exchanges:**
- "Thanks for sharing that! I have a good sense of where you're coming from. Let's make sure you have a great class experience."

## Infer and Structure Information

After the conversation, create the participant profile file with these sections:
- background (name, role, work context, technical experience level, domain expertise)
- experience (prior AI/LLM experience, coding skills, familiarity with tools)
- class_goals (what they want to learn and accomplish)
- personal_motivation (why they joined, desired outcomes)
- technical_approach (coding/no-code/exploring preference)
- current_tech_stack (technologies used day-to-day)
- desired_tech_stack (technologies they want to add)

## Specific Guidance

- **Be conversational, not transactional** — having a chat, not conducting an interview
- **Listen more than you ask** — let them guide the conversation
- **Infer, don't interrogate** — figure out technical level from how they talk
- **Write the profile naturally** — should read like notes about a person, not form fields
- If they don't mention something (like a project idea), write "Still exploring options"
- Be encouraging and welcoming in tone (this is their first touchpoint)

**Deliver:** Save to `docs/reports/participant_profile.md`. Present what you've written to the participant and invite them to review and suggest any changes before continuing.

**User Context:**
- Provides: Background, experience, and hopes through natural conversation
- Receives: Personal profile capturing their context and objectives

**Confirm before continuing:** "Does this profile accurately represent who you are and what you're hoping to achieve?"

---

### Step 2: Set Goals for the Course
**Goal:** Help participant articulate what they want to learn and what success looks like for them personally

## Conversational Goal Setting

**Opening** (reference their profile naturally):
- "So you're here to [reference their objective from profile]. Let's think about what you actually want to walk away with."
- "The course is 6 sessions. By the end of Session 5 you'll have a working prototype — but success looks different for everyone. What does it mean for you?"

**Explore their learning goals:**
- "What's the main thing you want to understand or be able to do by the end of this course?"
- Listen for: skill-building, building a specific thing, applying AI to their work, gaining confidence
- Ask follow-up: "Is there a specific problem you're hoping this system will solve for you?"

**Anchor to their project idea:**
- "In this class, you'll build a system around something you genuinely care about. Do you have a domain, topic, or problem in mind already, or are you still figuring that out?"
- If they have one: "Tell me more about that — what draws you to it?"
- If not: "No problem — that's part of what Session 2 will help you figure out."

**Help them think about the end state:**
- "By the end of the course you'll have a rough working prototype. What would make you proud of what you built — even if it's rough?"
- Keep expectations realistic: "It doesn't have to be polished. It has to work and teach you something."

**Time and commitment:**
- "How much time can you realistically put into homework between sessions? Even a rough sense helps."
- No judgment — adapt to whatever they say

**Wrap up:**
- "So if I'm understanding right: you want to [summarize goals in their language], and you'll know it worked if [success criteria in their language]. Does that feel right?"

## Specific Guidance

- **Be realistic, not aspirational** — help them set goals they can actually reach in 6 sessions
- **Use their language** — keep their phrasing, don't rewrite in formal language
- **Keep it brief** — 4–5 exchanges max
- **No judgment** — whether they have 30 minutes a week or several hours, support them

**Deliver:** Append goals to `docs/reports/participant_profile.md` (course_goals, knowledge_domain, success_criteria, time_commitment). Show the participant what was added and invite them to review and suggest any changes before continuing.

**User Context:**
- Provides: Reflection on what they want to learn and what success looks like
- Receives: Clear, realistic personal goals framed around the 6-session curriculum

**Confirm before continuing:** "Do these goals feel achievable and meaningful for what you want to get out of this course?"

---

### Step 3: Introduce the Project Concept and Start Exploring
**Goal:** Help participant start thinking about what kind of system they want to build and what domain or problem interests them

## Introduce the Project Concept

"In this class, you'll design and build a system around something you genuinely care about. The content, the domain, and the design are completely yours.

The key constraint is this: **your system needs a reason to come back to it**. Not a productivity tool or a task manager — a thinking tool that helps you develop ideas, surface connections, and engage with something that matters to you. This is called the **return loop**."

## The Four Loop Examples

Share these as inspiration (not a menu to pick from):

- **Weekly Digest** — You add things across the week. The system surfaces connections and questions. You react. Repeat.
- **Output Trigger** — You capture ideas. The system detects a cluster forming and prompts you to write something. Repeat.
- **Question You're Chasing** — You define an open question. You add material. The system connects it back to your question. The answer evolves. Repeat.
- **Daily Prompt** — You add things. The system surfaces one thing each day. You respond in two sentences. That response enriches the system. Repeat.

"These are just examples to spark thinking. Your loop will be yours."

## The Design Question

"The question we're asking is: **What loop will you design? What brings you back?**

It needs a reason to return to it — something that's different each time, something that rewards the visit."

## Explore Initial Thoughts

Don't push for a decision. This is early. Ask open questions and listen:

- "When you heard those examples, did anything resonate or spark something?"
- "Is there a topic, problem, or domain you keep coming back to in your own thinking?"
- "What's something you wish you thought about more clearly or consistently?"
- "Is there a question you've been sitting with that you haven't had time to properly chase?"
- "What would make a system like this actually useful for you — what would it do for your thinking?"

Listen for:
- A domain or topic they're drawn to
- A problem or friction they recognize
- A loop type that feels natural to how they already work
- Excitement about a specific capability (surfacing connections, generating prompts, building an answer over time)

Reflect back what you hear, but don't lock them in: "It sounds like you might be drawn to [what you heard]. You don't need to decide today — this is just the beginning."

## Specific Guidance

- **Don't push for a decision** — they have until Session 2 (ideation workflow) to shape this
- **No right answers** — any domain and any loop is valid if it's genuinely theirs
- **Capture loosely** — document what came up, not a polished concept

**Deliver:** Append to `docs/reports/participant_profile.md` (initial_use_case_thoughts: domain they mentioned, loops that resonated, problems they named, anything they're excited about). Show the participant what was captured and invite them to review and suggest any changes before continuing.

**User Context:**
- Provides: Initial reactions to the use case, topics or problems that resonate
- Receives: The use case framing clearly introduced, their early thinking captured

**Confirm before continuing:** "Do you have enough of a direction to start the ideation workflow — even if it's still rough?"

If they say **no**: Don't move on yet. Ask: "What feels unclear or unresolved?" Then explore one more angle together — try a different loop example, ask about a problem they keep bumping into at work, or ask what they'd spend more time thinking about if they had the space. The goal isn't a decided idea, just enough spark to start the next session. Once they have even a loose direction, confirm again.

---

### Step 4: Complete orientation by creating personalized Claude instructions and welcome message
**Goal:** Complete orientation by creating personalized Claude instructions and welcome message

## Personalize Claude Instructions

Using the information from their participant_profile.md, customize the Claude instructions to include:

1. **Technical Context Adaptation:**
   - Reference their current technical level
   - Mention their current tech stack and how it relates to class tools
   - Highlight their desired tech stack as learning objectives
   - Adjust technical explanations to match their expertise level

2. **Goal-Specific Guidance:**
   - Reference their specific class goals and success criteria
   - Customize examples to align with their project domain/interests
   - Include their time commitment and check-in rhythm

3. **Project-Focused Instructions:**
   - If they have a defined project idea, reference it specifically
   - If exploring options, mention their shortlisted areas of interest
   - Connect their technical approach preference to relevant sections

4. **Motivation Reinforcement:**
   - Reference their personal motivation for joining
   - Connect instructions to their desired outcomes
   - Use their language and terminology where possible

## Fill In the CLAUDE.md Template

Using what you learned in the conversation, fill in each placeholder section in the CLAUDE.md template:

- **`[Project Name]`** → their project working title (or "Personal Knowledge System" if unnamed)
- **What This Project Is** → their use case and return loop in 1–2 sentences
- **My Context** → their background, role, and what they're learning in this course
- **Working Preferences** → any preferences they expressed during the conversation
- **Communication Style** → how they communicated and any stated preferences
- Leave **Current Focus** as: `"Session 1 — Setting up the workspace and writing my CLAUDE.md"`
- Leave **Things I'm Learning** blank — they'll fill this in after sessions

After saving, tell the participant what was filled in and invite them to review and edit anything that doesn't feel right.

## Completion Message

Display an encouraging completion message confirming:
- Profile created with their background and goals
- Personalized Claude instructions ready
- Workspace setup complete and ready for next steps

**Deliver:** Save to `CLAUDE.md`

**User Context:**
- Provides: Confirmation that all setup steps are complete
- Receives: Welcome message and guidance for next steps

**Confirm before continuing:** "You're all set — are you ready to start the ideation workflow and shape your project idea?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `participant_profile.md` | `docs/reports/` | Full participant profile with background, goals, project idea |
| `CLAUDE.md` | `/` | Personalized Claude instructions |
