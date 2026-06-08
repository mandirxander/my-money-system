# Evaluation Design Report — My Money System

---

## chat_experiment_results

**what_was_tested:**
- Ran Scenarios 1 (Major Setback Recovery) and 2 (New Long-Term Goal) from `prompts/testing_prompt.md` in Claude.ai
- Prompt: full check-in coach prompt with family context, Baby Steps framework, and structured response format
- Method: pasted prompt + scenario into a fresh Claude.ai conversation for each scenario

**what_failed:**
- Response length: AI generated very long, dense replies in every turn — walls of text that would overwhelm a user who is already emotionally stressed or time-constrained
- The medium fights the message: the system is meant to reduce cognitive load, but verbose responses add to it
- This is a user problem not fully accounted for in the original problem definition: **cognitive load at the point of emotional stress**

**what_worked:**
- Stayed closely grounded in the Baby Steps framework throughout — naturally reframed crisis situations in terms of which step the user is actually on
- Gave genuine perspective shift in hard situations (setback, short sale) — felt like a coach helping you find your footing, not a calculator giving generic advice
- Next steps were relevant and connected to the family's real situation, not boilerplate

**assumptions_revised:**
- Original assumption: conversational AI responses would feel natural and reduce friction
- Revised: response length must be explicitly constrained in the prompt — the AI's default verbosity actively undermines the check-in experience, especially in emotionally heavy scenarios

**flow_changes:**
- V1: Add explicit length and structure constraints to the check-in prompt (e.g. 3 short paragraphs max, tight format)
- V2: Explore voice output as an alternative to reading — flagged for future exploration, not in scope for V1

---
