# User Research Findings — My Money System

*Format: assumption-check (building for myself — no external interviews)*

---

## conversations_summary

No external interviews conducted. Running as an assumption-check: surfaced and stress-tested the assumptions being made about my own needs as the target user, then flagged which are solid vs. risky going into the build.

---

## assumption_check_findings

### Assumption 1 — Data input method
**Original assumption:** Users will primarily upload a CSV from Excel.
**Finding: Partially valid — two distinct paths exist.**
Budget data lives in Excel → CSV upload is the natural path. Debt data lives in a phone notes app → conversational input is the natural path. Both are legitimate, frequent, and feed different parts of the system. The spike only tested CSV uploads; the conversational path was never validated.

---

### Assumption 2 — Emotional state at check-in time
**Original assumption:** Users will sometimes arrive stressed or overwhelmed.
**Finding: Confirmed — frequency is unknown and shouldn't be assumed.**
Emotional state ebbs and flows with life. The explicit mood check (V1 decision) collects this signal from day one. Over time, mood history becomes a personalization input — the system can learn each user's patterns and optimize accordingly. Don't hardcode a frequency assumption; let the data surface it.

---

### Assumption 3 — Joint vs. solo engagement
**Original assumption:** Both partners will engage regularly.
**Finding: Confirmed with caveat — system works solo, optimized for two.**
One partner becoming the primary user doesn't break the system. Joint engagement is ideal for the accountability loop, not a hard requirement. V2 idea surfaced: per-user profiles — persistent behavior context (spender vs. saver, risk tolerance, communication style) that shapes how the system responds to each partner individually.

---

### Assumption 4 — Check-in frequency
**Original assumption:** Bi-weekly is the right default rhythm.
**Finding: Confirmed.**
Matches existing budget management habits. Bi-weekly as the default for V1; user-adjustable cadence flagged for V2.

---

### Assumption 5 — Baby Steps familiarity
**Original assumption:** Users know the framework; system doesn't need to explain it.
**Finding: Confirmed for this user and partner — with important constraints.**
- Don't explain Baby Steps unprompted; assume familiarity.
- When asked about a specific step, give accurate, faithful answers — no deviation from Ramsey's framework, no interpretation.
- Zero non-determinism on framework facts: same question must produce the same answer every time. Baby Steps knowledge should behave like a lookup, not a generation.
- V2 idea: onboarding resources (YouTube, official Ramsey content) for users who arrive unfamiliar with the framework.

---

### Assumption 6 — Visual progress as motivator
**Original assumption:** Progress bars, debt trackers, and milestone markers drive engagement.
**Finding: Design instinct, not validated.**
Not confirmed as universally motivating — people respond to different cues. V1 relies on the check-in conversation as the primary engagement mechanic. V2 exploration: progress indicators designed for multiple learning and motivation styles, not just visual.

---

## cross_conversation_synthesis

**What held up:**
- Bi-weekly cadence, Baby Steps framework, and mood-check design are all solid.
- System works with one active user — joint engagement is an ideal, not a requirement.

**What sharpened:**
- The input path assumption was too narrow. There are two data categories (budget and debt) with two natural input methods (CSV and conversational). Both are frequent and both need validation logic.
- Non-determinism is unacceptable in two distinct areas: data validation and Baby Steps facts. These need to be treated differently from the open-ended conversational parts of the system.

**What was design instinct, not validated:**
- Visual progress as a motivation mechanic. Flagged for V2 exploration rather than V1 design assumption.

---

## implications_for_build

1. **Two input paths, not one** — the data layer must handle both CSV uploads (budget) and conversational input (debt). Validation logic needs to work on both. This is a more complex data model than the spike tested.

2. **Validation consistency is a hard requirement** — the non-determinism finding from spike testing applies to both input validation and Baby Steps facts. The build needs explicit guardrails to ensure the same input produces the same outcome.

3. **Mood signal is infrastructure, not just UX** — the explicit mood check isn't just about tone calibration for the current session; it's the foundation of a personalization layer. Design it so the data is stored and queryable from day one.

4. **Per-user profiles are a V2 priority** — the joint-use case gets meaningfully better if the system knows who it's talking to. Design the data model in V1 to support this without building the feature yet.

5. **Baby Steps knowledge base** — framework facts need to be treated as authoritative and consistent. Consider whether these should be hardcoded reference content rather than left to the LLM to generate each time.
