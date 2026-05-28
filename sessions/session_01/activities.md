# Session 1 Activities

## Activity 1: Cursor + Claude Code Orientation
**Duration:** 15 minutes
**Format:** Facilitator-led live demo, participants follow along
**Goal:** Get everyone running and familiar with the Cursor/Claude Code workspace

**Instructions:**
1. Facilitator opens Cursor and Claude Code with the group — participants follow on their own machines
2. Walk through workspace layout: chat panel, file explorer, terminal
3. Ask Claude to describe what it sees in the current folder
4. Show the difference between a conversation with no context vs. one with a CLAUDE.md
5. Open Q&A on glossary terms (5 minutes)

**Facilitator note:** Keep this moving. The point is basic orientation, not mastery. Participants will deepen familiarity throughout the session.

---

## Activity 2: Test Project Setup
**Duration:** 10 minutes
**Format:** Individual work with facilitator narrating
**Goal:** Experience workspace creation through collaboration — and notice what Claude assumes vs. what you specify

**Instructions:**
1. Create a new folder for your test project
2. Ask Claude Code to create a standard workspace structure for an AI project
3. Notice: What did Claude assume? What did you have to clarify?
4. Write down one thing Claude got right on the first try and one thing you had to correct
5. These observations go directly into your CLAUDE.md

**Artifact created:** Test project folder with workspace structure

---

## Activity 3: Architecture Diagram Walkthrough
**Duration:** 15 minutes
**Format:** Facilitated group discussion with handout
**Goal:** Build a working mental model of RAG, agents, and agentic systems

**Reference:** `handouts/rag_vs_agents_reference.md`

**Instructions:**
1. Distribute or display the architecture diagram handout
2. Facilitator walks through each diagram — RAG, Agent, Agentic System
3. Before revealing each label, ask the group: "Based on the diagram, what's happening here?"
4. Show the comparison table and discuss: which layer does your use case need?
5. Briefly show the course map (`handouts/build_process_progression.md`): where are we going across 6 sessions?

**Discussion question:** For a personal knowledge system that learns from what you add and prompts you to engage with it — which of these three patterns is closest to what you need? Why?

---

## Activity 4: CLAUDE.md Workshop
**Duration:** 25 minutes
**Format:** Individual work + brief share-out
**Goal:** Create your first collaboration contract and save your participant profile

**Reference:** `handouts/personalizing_your_claude_md.md`

**Instructions:**
1. Start a profile conversation with Claude using this prompt:
   > "I'm starting a new project and want to build a working relationship with you. Ask me questions to understand my background, what I'm building, and how I like to work. One question at a time."
2. Let the conversation run until you've covered: background, project intent, feedback preferences, technical comfort, what to challenge
3. Ask Claude to help you draft `workspace/reports/participant_profile.md` from the conversation
4. Ask Claude to distill that into a `CLAUDE.md` using the template from the handout
5. Add the cross-references between the two files:
   - In CLAUDE.md: `Full profile: workspace/reports/participant_profile.md`
   - In participant_profile.md: `Active collaboration instructions: CLAUDE.md`
6. Test your CLAUDE.md: give Claude a small task. Did it follow your instructions?
7. Update at least one instruction based on what you observed

**Share-out:** One participant shares one effective instruction and one they're still figuring out.

**Artifacts created:**
- `workspace/reports/participant_profile.md`
- `CLAUDE.md`
