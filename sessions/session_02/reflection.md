# Session 2 Homework Reflection

**Date completed:** 2026-06-23

---

## 1. What did running your chat experiment (Rung 1) reveal?

Running the chat experiment revealed that you have to put bounds on how you want the AI to talk to you. You need a clear idea of the tone, verbiage, and amount of content you want to show the user — you're essentially thinking of a character or someone you know in real life that the AI should emulate. The flow broke when the AI didn't give the emotional response I truly wanted, and it gave very long and lengthy answers that may overwhelm the user, especially if the user is already coming in feeling overwhelmed.

---

## 2. What is your top quality risk, and did building the spike (Rung 2) change how you see it?

My top quality risk was surprisingly the CSV parser, and building the spike changed how I saw it. I initially thought the risk would be somewhat low impact, but it really does change the experience for the user — if the system doesn't have the right data and starts giving advice off bad data, you could throw the financial plan for the user in a terrifying direction. When the data was real, it actually gave a good output. When it was hand-fed (AI creating scenarios), you could see the cases where it would break.

---

## 3. One instruction you added to your CLAUDE.md — what was it and why?

I added the instruction to make sure the V2 version would parse the CSV, give feedback, and actually implement the change with the user's approval. I did this because reading what went wrong and then manually fixing the CSV took too much time and could potentially be a huge blocker for users — the experience was severely lacking. Users would need to do extra work for something that might seem trivial to them. The focus should be on financial planning and strategizing, not editing a CSV file. The data accuracy still needs to take precedent, but the editing itself the AI could handle — with the user's approval, of course.
