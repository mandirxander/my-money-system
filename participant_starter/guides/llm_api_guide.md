# Choosing Your LLM API
**AI Mentor Circle — Reference Guide**

We're making an update to the tech stack API. Using the Claude API inside your Next.js project requires a separate paid account on Anthropic Console — it is not included with your Claude Pro subscription. To keep costs off your plate, the program will provide a shared Claude API key for the remaining four weeks. You can also choose a free alternative if you prefer. This document covers your options, what to do this week, and what the landscape looks like after the program ends.

---

## Part 1 — Now

### Your Options for the Program

Three options are available. Claude is the recommended path — it keeps your build environment consistent with everything else we're doing. Groq and Gemini are solid free alternatives if you want to explore a different provider.

| | Claude API ★ Recommended | Groq | Gemini (Google AI Studio) |
|---|---|---|---|
| **Cost** | Free — key provided by Sunday | Free tier, no credit card | Free tier, no credit card |
| **How to get access** | Key shared via DM — see action items below | Sign up at console.groq.com (email or Google/GitHub login) | Sign up at aistudio.google.com (Google account) |
| **Models available** | Claude Sonnet 4.6 (default), Opus 4.7/4.8 available | Open-source only: Llama 3.3 70B, Llama 4 Scout, others | Gemini 2.5 Flash, 2.5 Pro, others |
| **Rate limits** | None at prototyping scale | 30 req/min, 6,000 tokens/min, 14,400 req/day | 5–15 req/min, 100–1,000 req/day (varies by model) |
| **Model quality** | Frontier — strongest for complex reasoning | Good — fast inference, capable for most tasks | Strong — competitive with large context window |
| **Data privacy** | Standard Anthropic API terms | Standard terms | Free tier prompts may be used for model training — avoid sensitive content |
| **Risk of hitting limits** | Low | Low for prototyping; possible under heavy testing | Moderate — tighter daily limits than Groq |
| **Consistency with program** | Full — same model powering Claude Code | Partial — different model family | Partial — different model family |

> **Choosing between Sonnet 4.6 and Opus:** The right model depends on what your app is actually asking Claude to do at runtime. Decide before you wire in the key — you'll set it once in your code and it stays there.
>
> **Use Sonnet 4.6 if** your app's AI calls are conversational, instructional, or task-based — answering questions, tracking progress, giving feedback, structuring content, or guiding a user through steps.
>
> **Use Opus if** your app's core value depends on the quality of Claude's reasoning or synthesis — multi-step analysis, forecasting, drawing patterns across complex inputs, or producing output where depth and accuracy matter to the user.
>
> When in doubt, ask Claude: *"Based on what my app needs to do at runtime, should I use Sonnet 4.6 or Opus? Here's what my app does: [describe it]."*

---

### What to Do This Week

#### If you're using Claude (recommended)

1. Message Sunday directly — you'll receive the API key via DM.
2. In your project, open `.env.local` and add: `ANTHROPIC_API_KEY=your-key-here`
3. Make sure `.env.local` is in your `.gitignore` — it should be already, but confirm before pushing.
4. Ask Claude Code to help you connect the key to your project: *"Help me wire up the Anthropic API key from my .env.local file to make a test call using the Claude SDK."*

#### If you're using Groq

1. Create a free account at **console.groq.com** — no credit card required.
2. Generate an API key under API Keys in the left sidebar.
3. Add it to `.env.local`: `GROQ_API_KEY=your-key-here`
4. Ask Claude Code: *"Help me connect the Groq API to my Next.js project using my GROQ_API_KEY from .env.local. I want to make a test call using Llama 3.3 70B."*

#### If you're using Gemini

1. Go to **aistudio.google.com** and sign in with your Google account.
2. Click **Get API key** and create a new key.
3. Add it to `.env.local`: `GEMINI_API_KEY=your-key-here`
4. Ask Claude Code: *"Help me connect the Gemini API to my Next.js project using my GEMINI_API_KEY from .env.local. I want to make a test call using Gemini 2.5 Flash."*

> Regardless of which API you choose, Claude Code can handle the full technical wiring. You don't need to figure out the SDK setup yourself — describe what you want to connect and let it walk you through the steps.

---

## Part 2 — After the Program

### Continuing After the Program Ends

When the program wraps, the shared API key goes away. Here's what your options look like depending on whether you stick with Claude Code or move to a different tool.

### Staying on Claude Code

Claude Code requires either a paid Claude subscription or pay-as-you-go API credits. There is no ongoing free tier for the Claude API — new accounts get a small amount of starter credits (~$5), but that's a one-time allocation for testing, not a sustained free tier.

**Your Claude Pro subscription ($20/mo)** covers Claude Code itself — coding sessions in the terminal, chat on claude.ai, and rolling usage limits. It does not cover your app's API calls at runtime. Those are billed separately through Anthropic Console, or you can use a free-tier provider like Groq or Gemini for that layer instead.

For the app's API calls specifically, your options are:

| Option | Cost | Best for | Notes |
|---|---|---|---|
| **Anthropic Console — pay-as-you-go** | ~$3–5 per million tokens (Sonnet/Opus) | Variable or light usage — pay only when you build | No monthly commitment. Add prepaid credits; set a spend cap. Best if you're building occasionally. |
| **Groq free tier** | Free | App API calls — not Claude Code itself | Works for powering your app's API calls. Claude Code still needs a Pro sub or API credits to run. |
| **Gemini free tier** | Free | App API calls — not Claude Code itself | Same as Groq — good for app-level inference, not a replacement for Claude Code access. |

> **The practical split:** Claude Code (the tool you use to build) and the Claude API (what your app calls at runtime) are billed separately. You can keep Claude Pro for building while using a free-tier API like Groq or Gemini to power your app — a real option if you want to keep costs down after the program.

> **Prompt caching:** Once your app is making repeated API calls with the same system prompt or shared context, look into prompt caching. It's configured directly in your code when you make the API call, so you can set it up yourself. It tells Claude to store a reusable portion of your prompt so it doesn't reprocess it on every call, reducing both cost and response time. Not something to tackle on day one, but worth knowing about as your app matures. Ask Claude: *"How do I set up prompt caching for my app's system prompt using the Anthropic SDK?"*

---

### Switching to a Different AI Coding Tool

If you move to another tool after the program, here's how the top options compare — particularly on model flexibility and whether you can bring your own API key.

| Tool | Cost | Interface | Models supported | Bring your own key? | Best for |
|---|---|---|---|---|---|
| **Claude Code** | Included with Claude Pro ($20/mo) or pay-per-token via API | Terminal (CLI) — same environment as this program | Claude only (Sonnet 4.6, Opus 4.7/4.8) | Yes — set ANTHROPIC_API_KEY from your Anthropic Console account | Complex reasoning, large codebase context, agentic workflows. #1 rated in 2026 developer surveys. |
| **Cursor** | Free tier available; Pro $20/mo | AI-native IDE (VS Code fork) — visual, GUI-based | Claude, GPT, Gemini, Grok — multi-model with per-task routing | Yes — plug in your own API key for any supported model | Daily coding with a visual interface. Familiar if you already use VS Code. Multi-file edits with Composer mode. |
| **OpenAI Codex** | Included with ChatGPT Plus ($20/mo); API access coming | CLI, IDE extension, web app — consistent across surfaces | GPT-5, o3, and OpenAI models only | No — locked to OpenAI ecosystem | Autonomous background tasks, CI/CD integration, async code work. Less suited to interactive sessions. |

> **Key takeaway:** Cursor is the most natural next step if you want a visual IDE experience after this program — it supports Claude via your own API key, so you can carry over what you've learned. Claude Code remains the strongest option if you're comfortable in the terminal and want to keep using Claude at full capability.

---

### Free API Options Across Tools

If you want to keep building after the program without a paid subscription, Groq and Gemini both remain viable for powering your app's API calls. Neither replaces Claude Code itself, but either can serve as the LLM backend for what you build.

| Provider | Free tier | Models | Limits | Works with |
|---|---|---|---|---|
| **Groq** | Yes — permanent, no credit card | Llama 3.3 70B, Llama 4 Scout, others (open-source only) | 30 req/min, 6,000 tokens/min, 14,400 req/day | Claude Code, Cursor, any tool that accepts a custom API endpoint |
| **Gemini (Google AI Studio)** | Yes — permanent, no credit card | Gemini 2.5 Flash, 2.5 Pro, others | 5–15 req/min, 100–1,000 req/day (varies by model) | Claude Code, Cursor, others |
| **Anthropic Console** | ~$5 starter credits for new accounts only — not ongoing | Claude Sonnet 4.6, Opus 4.7/4.8, Haiku 4.5 | No limits beyond spend cap you set | Claude Code, Cursor, any tool accepting Anthropic API key |

---

## Questions

If something isn't working after you've tried asking Claude Code for help, bring it to the next session or drop a message in the group channel. Don't spend more than 20 minutes stuck on setup.
