# First Deployment Workflow — Complete Reference

**ID:** first_deployment
**Description:** Deploy your system to a small group of real testers to validate your quality-risk assumptions through real-world usage — and give your closed-loop feedback its first real data

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the first deployment workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Check `docs/reports/workflow_progress.md` — if this workflow shows "in progress", tell the participant which step they completed last and resume from there
2. Begin with Step 1 and follow each step prompt in order
3. Complete one step fully before moving to the next
4. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
5. Save outputs to the file paths specified in each step
6. After each step confirm, update `docs/reports/workflow_progress.md` — set status to "in progress" and record the last step completed
7. When you reach the final step, update `docs/reports/workflow_progress.md` to "complete", let the participant know the workflow is complete, and remind them to update `docs/reports/session_log.md` and `docs/reports/decisions.md`

- Keep tone grounded and realistic; explain why each deployment decision matters for learning
- Be encouraging about shipping but ruthless about scope
- Use Socratic questioning — don't prescribe deployment approaches
- **The stack is already decided** — the class stack: Next.js + TypeScript on **Vercel**, **Supabase**, Claude API (Anthropic), `.env.local` locally / **Vercel Environment Variables** in production. Don't re-open platform choices; the work is mapping *this* system onto *that* stack. Railway is the documented upgrade path only if the system genuinely needs a persistent server or background jobs.
- Key principles: Learning over launching, Minimal over complete, Testers' context over builder's assumptions, Manual is okay, Observable over perfect
- Reads from: `docs/evaluation_design_report.md`, `docs/implementation_design.md`, `docs/user_experience_design.md`, `docs/specs/poc_specs.md`, `docs/problem_definition.md` (the requirements map — return loop + closed-loop feedback), and the built code in `src/`

---

## Steps

### Step 1: Ground deployment in learning goals tied to quality risk — understand testing reality, identify gaps between theoretical coverage and real usage, and articulate why deployment specifically helps validate their quality concerns
**Goal:** Ground deployment in learning goals tied to quality risk — understand testing reality, identify gaps between theoretical coverage and real usage, and articulate why deployment specifically helps validate their quality concerns



## Conversation Flow

### 1. Acknowledge Progress & Set Context

You've built [reference their agent briefly]. Let's talk about what testing has looked like so far and whether deployment helps you learn what you need to know.

### 2. Explore Testing Reality

**Who's tested it?**
- Walk me through the last testing session — who was there, what happened?
- Don't accept vague "I've tested it" — get names/roles

**How did testing happen?**
- Where were you when they tested it? What were you doing?
- Could they have used it if you were asleep?

**What got tested?**
- What scenarios did you actually run through?
- Compare to their evaluation dataset: You designed [X] test cases — which ones have you tested?

**What didn't get tested?**
- What are you nervous about that hasn't been tested yet?
- How is your testing different from a stranger using it?

### 3. Connect to Quality Risk

Reference their priority quality risk and help them see the testing bias:

**If quality risk is hallucination:**
When YOU test, you can spot the hallucinations. What happens when someone who doesn't know the answer uses it?

**If quality risk is unfulfilled promises:**
When YOU test, you know what it can/can't do — you unconsciously stay within safe boundaries. What happens when someone tests its limits?

**If quality risk is brittleness to input variation:**
When YOU test, you format inputs carefully. What happens when someone just... types naturally?

### 4. Push for Clear Articulation

Ask them to complete this sentence:
My quality risk is [X]. Testing so far hasn't exposed [Y] because [Z]. Deployment will help by [W].

**Examples to share if needed:**
- My quality risk is hallucination. Testing hasn't exposed how often it happens because I can spot them and re-run. Deployment will show me how many times users accept wrong answers.
- My quality risk is unfulfilled promises. Testing hasn't exposed the limits because I unconsciously stay within safe boundaries. Deployment will show me where users expect more than I'm delivering.

### 5. Reality Check

Based on this conversation, does deploying to real users make sense right now? Or do you need to test more scenarios yourself first?

**If they're not ready:**
It sounds like you need to run through more evaluation test cases yourself first. What specific scenarios should you test?

**If they ARE ready:**
Move forward with their clear articulation of purpose.

**Deliver:** Save to `docs/deployment_design.md` with sections:
- testing_reality_check (who tested, how, what was covered, gaps)
- deployment_purpose (quality risk, why current testing hasn't exposed key issues, how deployment helps)

**User Context:**
- Provides: their honest assessment of current testing limitations and quality risk validation needs
- Receives: clear articulation of why deployment is the next learning step

**Confirm before continuing:** "Does this capture the gap between your testing and real-world usage?"

---

### Step 2: Get specific about who will test, their commitment, timeframe, and what makes this deployment successful from a learning perspective
**Goal:** Get specific about who will test, their commitment, timeframe, and what makes this deployment successful from a learning perspective



## Conversation Flow

### 1. Get Specific About Testers

**Who specifically will test this?**
- Not "beta users" or "some people" — actual names or specific roles
- How many people?
- What's their relationship to you? (colleagues, friends, target users, strangers?)

**What have they committed to?**
- Did they say "yes, I'll help" or "maybe if I have time"?
- Have you talked to them recently about this?
- Do they understand what you're asking?

### 2. Understand Tester Context

**Where do these testers already work?**
- Slack? Email? Web browsers? Mobile apps?
- What tools do they use every day?
- Where would this agent fit most naturally in their workflow?

**What's their technical comfort level?**
- Can they run npm install? Clone a repo?
- Or do they need a link that just works?
- Have they ever used developer tools before?

**When will they be using this?**
- During video calls with you present?
- Async when you're asleep?
- Both?

### 3. Pin Down the Testing Agreement

**What exactly are you asking them to do?**
- Use it for specific tasks? Try it once? Use it for a week?
- How often? How many times?

**What's the timeframe?**
- When does testing start?
- How long do they have?
- When do you want feedback?

**What specific feedback are you asking for?**
- "Does it work?" is too vague
- "Can it handle [specific scenario from quality risk]?" is better
- Tie asks directly to their quality risk

### 4. Define Learning Success

This isn't about adoption metrics. What would make this deployment successful as a learning exercise?

**What assumptions are you testing?**
- Not "does it work" — be specific about quality risk assumptions
- Example: "I assume it can handle natural language variations" or "I assume users will understand the output format"

**What feedback would tell you something important?**
- What would make you pivot the approach?
- What would make you iterate on current design?
- What would confirm you're on the right track?

### 5. Wire the Feedback Loop — closed-loop feedback gets its first real data

Their system has (or was supposed to have) a **closed-loop feedback** mechanism — one of the requirements from their Session 2 mapping, first-passed by Session 5. Testers are its first real data source, so check the wiring *before* deploying:

- "When a tester reacts to an output — accepts it, edits it, rejects it, rates it — where does that reaction go? Does it land in the mechanism you built (a Supabase table, a feedback field the system reads back), or only in your own notes?"
- "If it was never actually wired up: this is the moment to close that gap. Add the capture path in `src/` now, even minimally — a thumbs up/down that writes a row is enough for a pilot."
- **The return-loop honesty check.** The real test of the **user return loop** is behavioral, not architectural. Plant the question now, answer it during the test window: "Did any tester come back *unprompted*? If nobody returns without a nudge, that's a finding about your return loop — not a failure of the testers."

### 6. Reality Check on Commitments

**Do you actually have these commitments locked in?**
- If answer is "I need to ask them" — stop here and come back after getting commitments
- If answer is "yes, they've agreed" — good, move forward
- If answer is "I think they'll probably help" — push for actual conversations first

### 7. Validate Against Quality Risk

Look at their deployment purpose from step 1. Do these testers and this testing plan actually validate what they said they needed to learn?

**If not aligned:**
Who would be better testers for validating [their quality risk]?
What would you need to ask them to do to actually test that assumption?

**Deliver:** Append to `docs/deployment_design.md` with sections:
- tester_profile (specific testers, where they work, technical comfort, when they'll use it)
- deployment_scope (what testers committed to, timeframe, what you're asking them to validate)
- learning_goals (assumptions being tested, what makes deployment successful as learning, feedback triggers)
- feedback_wiring (where tester reactions land in the built feedback mechanism — or the gap closed in `src/` — plus the return-loop question to answer during the test window)

**User Context:**
- Provides: their specific commitments from real testers with clear feedback expectations
- Receives: concrete deployment scope grounded in learning goals

**Confirm before continuing:** "Do you have these commitments locked in from actual people?"

---

### Step 3: Identify what must work without builder present — actively push back against over-engineering and help focus on absolutely minimal automation needed for 5-10 testers to validate quality risk
**Goal:** Identify what must work without builder present — actively push back against over-engineering and help focus on absolutely minimal automation needed for 5-10 testers to validate quality risk



## Conversation Flow

### 1. Identify Current Manual Dependencies

**What currently requires you to manually trigger or run?**
- What do you start by hand?
- What breaks if you're not there?
- What only works on your machine?

### 2. Challenge Every "Should Be Automated"

This is where we push back HARD on over-engineering. For 5-10 testers, most things can stay manual.

For each potential automation, ask:

**RUNTIME:** Does this need to auto-start or can you manually restart it for 5-10 testers?
- "If it crashes at 2am, do testers need it back immediately or can it wait until morning?"
- "Can you just check once a day and restart if needed?"

**DATA:** Does data need to survive restarts or can testers start fresh each session?
- "What actually breaks if they lose session state?"
- "Can they just re-do their work for now?"
- "Is persistence really needed or just nice-to-have?"

**AUTH:** Do you need individual accounts or can everyone share one demo account?
- "Does tracking who did what matter for validating your quality risk?"
- "Can you just give them all the same login?"
- "Magic link emails vs full SSO — which is actually needed?"

**INTEGRATIONS:** What external connections MUST work vs what can you proxy through yourself?
- "Can you manually trigger that API call when they need it?"
- "Can they send you requests and you run it for them?"
- "Does it need to work 24/7 or just during testing hours?"

**MONITORING:** Automated alerts vs just checking in with testers?
- "Can you ask them 'how's it going' instead of building dashboards?"
- "Do you need real-time error tracking or can they just tell you what broke?"

### 3. Embrace Manual for Learning Speed

For this first deployment:

Better to ship with manual processes than delay for automation:
- "You can always automate later if this becomes a real product"
- "Right now you need to LEARN, not build production infrastructure"
- "What's the minimum automation to let testers use it without you in the room?"

### 4. Define Actual Must-Haves

After challenging everything, what MUST work independently?

**Minimum viable independence:**
- Testers can access it without you starting something
- It runs long enough for a testing session without crashing
- Testers can interact with it without you explaining every step
- Errors are visible somewhere (even if just logs you check manually)

### 5. Document Deferred Automation

Be explicit about what's staying manual:
- "For this deployment, builder will manually restart if needed"
- "For this deployment, all testers share one demo account"
- "For this deployment, builder checks logs manually each evening"
- "For this deployment, no persistence — testers start fresh each session"

This isn't technical debt — it's smart scoping for learning.

**Deliver:** Append to `docs/deployment_design.md` with sections:
- current_manual_dependencies (what requires builder presence, what breaks without builder, local-only components)
- independence_requirements (minimal must-haves: runtime needs, data persistence, auth approach, observability, what's explicitly staying manual)

**User Context:**
- Provides: their understanding of what currently requires manual intervention
- Receives: minimal independence requirements with explicit scope limitations and deferred automation

**Confirm before continuing:** "Are you comfortable with what's staying manual for this first deployment?"

---

### Step 4: Map the deployment onto the class stack — delivery, runtime, data, integrations, and environment configuration
**Goal:** Map this system onto the stack it's already built on (Vercel + Supabase + Claude API) — no platform shopping, just the concrete decisions that make it reachable and safe for testers



## Conversation Flow

The stack is not a decision — the system is already Next.js + Supabase + Claude API, and it deploys to **Vercel**. What's left is checking that *this* system's specifics survive the trip from `localhost` to a real URL.

### 1. Delivery Mechanism

The default is already right for most testers: **the deployed web app at its Vercel URL** — a link that just works, no install, no signup beyond whatever Step 3 decided.

- Confirm it fits the tester context from Step 2 (non-technical testers need exactly this).
- If `implementation_design.md` named another touchpoint (an email digest, a shared doc), decide the **minimal** way it reaches testers for the pilot — manual sends by the builder are fine.

### 2. Runtime Check

Vercel runs your code **when someone loads a page or calls a route** — serverless. One honest check:

- "Does anything in your system need to run when nobody's on the page — a scheduled digest, a background job, something that watches a source?"
- If yes: for this pilot, trigger it **manually** (you run it; testers see the result). Note **Railway** as the documented upgrade path if it ever needs to be automatic — don't build that now.
- If no: nothing to do; the stack already fits.

### 3. Data and Access

Data stays on **Supabase** — it's already wired. Two checks from the Session 4 handout (`supabase_reads_writes_explained.md`):

- **Case A or Case B?** If every tester can see the same data (Case A), nothing changes. If testers' data must be kept apart (Case B), the server must check *who's asking* before reads/writes — confirm that check exists before strangers touch it.
- **Access approach from Step 3:** shared demo account, or individual sign-ins? Keep whatever Step 3 decided — minimal wins.
- The two rules that always apply still apply in production: database calls stay on the server, and the `service_role` key never reaches the browser (no `NEXT_PUBLIC_` prefix).

### 4. Integrations Check

For each external connection the system uses (their data source, an external API or MCP):

- "Does it work from Vercel's servers, or does it only work on your machine?" (a local file path, a tool that needs your laptop = it won't)
- Anything that can't run from Vercel: proxy it manually for the pilot ("testers ask, you run it") rather than re-engineering.

### 5. Environment Configuration — the deploy gotcha

**Keys in `.env.local` do not deploy.** This is the Session 4 `api_keys_reference.md` gotcha, and it's the most common first-deploy failure:

- Every key the app uses locally — `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and any integration keys — must **also** be added in Vercel: **Project → Settings → Environment Variables**.
- **Before setting them, sort each key by its `NEXT_PUBLIC_` prefix.** This prefix isn't just a naming style — it decides whether the key gets sent to every visitor's browser. `NEXT_PUBLIC_`-prefixed keys (e.g. `NEXT_PUBLIC_SUPABASE_URL`) are safe to expose. Everything without that prefix (`ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, any integration key) must stay server-only — never rename one to add the prefix "to make it work." Walk your own key list and confirm which is which before entering them in Vercel.
- Never hardcode keys, never commit them to git — same rule as always, now with a public repo/URL at stake.

**How to get your keys into Vercel:**
1. In the Vercel dashboard, open your project → **Settings → Environment Variables**.
2. For each key in your `.env.local` file, copy its name and value into Vercel one at a time, and set it for the **Production** environment.
3. Trigger a new deploy (push to `main`, or click **Redeploy** in the dashboard). Environment variables only take effect on deploys made *after* you add them — a deploy that already ran won't pick up a key you just added.

*(If you're deploying from the command line instead of connecting your GitHub repo — most participants won't need this, since connecting GitHub in Step 4 handles it for you — a few terms worth knowing: `vercel login` signs you in from your terminal by opening a browser window; `vercel link` connects your project folder to a project on Vercel; `vercel --prod` builds and publishes it. One thing to expect: running `vercel link` adds a line to your `.env.local` called `VERCEL_OIDC_TOKEN` on its own. That's normal — it's Vercel's own login token, not one of your app's keys — but it can look like a mistake if you don't know it's coming.)*

### 6. Cost Reality Check

For 5–10 testers this should be nearly free:

- **Vercel** Hobby tier and **Supabase** free tier comfortably cover this scale.
- The one real variable cost is the **Claude API** — estimate it from expected runs (testers × uses × calls per use), and remember the levers from `evaluating_for_scale` exist if it surprises you.
- This is a learning deployment: you can pause or shut it down after the test window.

### 7. Validate the Mapping

Does this mapping actually support:
- The tester context from step 2?
- The independence requirements from step 3?
- The feedback wiring from step 2's loop check?

If misaligned, adjust before writing specs.

**Deliver:** Append to `docs/deployment_design.md` with section:
- deployment_mapping (delivery mechanism, runtime check + anything staying manual, data/access approach incl. Case A/B, integrations check, environment variables to set in Vercel, cost estimate)

**User Context:**
- Provides: their system's specifics — touchpoints, background needs, data separation, integrations
- Receives: a concrete mapping of their system onto the class stack, with the gaps that must close before testers arrive

**Confirm before continuing:** "Do these infrastructure and delivery choices make sense for your tech stack, testers, and independence requirements?"

---

### Step 5: Create implementation-ready deployment specifications that a coding agent or participant can follow to deploy the agent
**Goal:** Create implementation-ready deployment specifications that a coding agent or participant can follow to deploy the agent



## Conversation Flow

This step synthesizes all previous steps into implementation-ready deployment specifications.

The main deliverable is `deployment_specs.md` (under `docs/specs/`) which a coding agent can use to deploy.
Also write a brief summary to `deployment_design.md` (under `docs/`) as conclusion.

### 1. Deployment Context Summary

Pull from steps 1-2:
- Why we're deploying (quality risk validation)
- Who's testing (specific names/commitments)
- What makes this successful (learning goals, not metrics)

Write clearly so someone reading the specs understands the purpose.

### 2. Infrastructure Specifications

From step 4's deployment mapping, provide implementation details:

**Vercel deployment:**
- How the deploy happens: connect the GitHub repo to Vercel (deploys on every push to main) — or `npx vercel` from the project if not using the Git integration
- **Environment variables to set in Vercel** (Project → Settings → Environment Variables): list each one with a one-line description — `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, plus any integration keys. These must match what's in `.env.local`. Mark each as `NEXT_PUBLIC_` (browser-exposed) or server-only in the spec — this is the distinction to get right from Step 4, not something to re-decide here.
- **Health check: open the app yourself in a browser and try one real task, start to finish — don't check it with an automated tool.** A command-line check (like `curl`, a tool that fetches a page's raw code without opening a real browser) can be misleading here: Next.js's page code always contains some placeholder text that looks like an error message, even on pages that are working fine — so a script scanning for error text can get it wrong. And anything that submits a form or clicks a button that talks to the server needs an actual click in a real browser to test properly. Just open the link and use the app the way a tester would.

**Delivery mechanism:**
- The deployed web app itself — its deployment is the Vercel block above. **Vercel actually gives you two different links: a one-off link for that exact deploy (it changes every time you deploy again), and one permanent link for your project** (like `yourproject.vercel.app`, or a custom domain if you set one up) **that always shows the latest version.** Give testers the permanent link — the one-off link will stop working the moment you deploy again.
- Any extra touchpoint from step 4 (an email digest, a shared doc) and how it reaches testers — manual is fine, name it under "staying manual" below

**Data persistence (Supabase):**
- The existing Supabase project carries over — note the Case A/B access decision from step 4
- Or explicit: "No persistence needed for the pilot — testers start fresh each session" (per step 3)
- Backup strategy or explicit "No backups for v1"

**Anything staying manual (from steps 3–4):**
- Scheduled/background pieces the builder triggers by hand
- Integrations proxied through the builder

### 3. Access and Monitoring

**Tester access instructions:**
- Step-by-step for testers (dead simple)
- Example: "1. Go to your-app.vercel.app 2. Login with test@example.com / password123"

**Quality risk monitoring** (from step 3 observability needs):
- What signals indicate their quality risk is happening?
- How are these captured? (logs, manual feedback, metrics)

**Error visibility:**
- Where do errors show up?
- How does builder get notified?

**Feedback collection:**
- How do testers give feedback? (form link, Slack channel, scheduled calls)
- Where does in-app feedback land? (the feedback_wiring from step 2 — confirm the capture path is live before testers start)

### 4. Deployment Checklist

**Independence verification:**
- [ ] System runs without manual builder intervention (or the manual pieces are named in Known Limitations)
- [ ] Testers can access from their own devices
- [ ] No localhost references in code
- [ ] API keys loaded from environment, not hardcoded
- [ ] Every key from `.env.local` is also set in Vercel's Environment Variables
- [ ] `service_role` key is server-side only — never with a `NEXT_PUBLIC_` prefix

**Remote access verification:**
- [ ] Test from different network than builder
- [ ] Test from tester's actual device if possible

**Quality signal verification:**
- [ ] Quality risk indicators being captured
- [ ] Can see when quality issues occur

**Rollback plan:**
- What if critical issue discovered?
- Can you shut down quickly if needed?

### 5. Known Limitations

From step 3 deferred automation, be explicit about what's manual:
- "Builder will manually restart if crashes"
- "All testers share demo account test@example.com / password123"
- "No data persistence — testers start fresh each session"
- "Builder checks logs manually each evening"

This sets realistic expectations.

### 6. Validate Completeness

Can someone follow these specs to deploy?
- Is anything vague or assumed?
- Are all commands/URLs/credentials specified?
- Would a coding agent be able to deploy from these specs alone?

If anything's unclear, make it concrete.

### 7. Write Brief Summary to Design Doc

Also append a brief summary section to `deployment_design.md`:
- Delivery mechanism chosen and why
- Key platforms selected and rationale
- What's staying manual for this deployment
- Next step: execute the specs

Keep it short — just a few sentences wrapping up the design process.

**Deliver:**
1. Save to `docs/specs/deployment_specs.md` with sections: deployment_context, infrastructure_specifications, access_and_monitoring, deployment_checklist, known_limitations
2. Append to `docs/deployment_design.md` with section: deployment_plan_summary

**User Context:**
- Provides: their validation of technical specifications and deployment approach
- Receives: complete deployment specifications ready for execution

**Confirm before continuing:** "Do these specs cover everything needed to deploy to your testers?"

---

## Workflow Complete

All steps are complete. Update `docs/reports/session_log.md` with your reflection, add any key decisions and their reasoning to `docs/reports/decisions.md`, and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `deployment_design.md` | `docs/` | Testing reality check, deployment purpose, tester profile, deployment scope, learning goals, independence requirements, platform selections, deployment plan summary |
| `deployment_specs.md` | `docs/specs/` | Implementation-ready deployment specs: infrastructure, access instructions, monitoring, checklist, known limitations |
