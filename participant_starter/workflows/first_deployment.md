# First Deployment Workflow — Complete Reference

**ID:** first_deployment
**Description:** Deploy agent to small group of testers to validate quality risk assumptions through real-world usage

---

## How to Use This Workflow

**For participants:** Reference this file with `@` in Claude Code and say "Let's work through the first deployment workflow." Claude will guide you through each step.

**For Claude:** When a participant starts this workflow:
1. Begin with Step 1 and follow each step prompt in order
2. Complete one step fully before moving to the next
3. Where a step shows "Confirm before continuing" — ask that question and wait for a response before proceeding
4. Save outputs to the file paths specified in each step
5. When you reach the final step, let the participant know the workflow is complete and remind them to update `docs/reports/session_log.md`

- Keep tone grounded and realistic; explain why each deployment decision matters for learning
- Be encouraging about shipping but ruthless about scope
- Use Socratic questioning — don't prescribe deployment approaches or infrastructure choices
- Key principles: Learning over launching, Minimal over complete, Testers' context over builder's assumptions, Manual is okay, Observable over perfect
- Reads from: `docs/evaluation_design_report.md`, `docs/implementation_design.md`, `docs/specs/user_experience_spec.md`, `docs/specs/mvp_specs.md`

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

### 5. Reality Check on Commitments

**Do you actually have these commitments locked in?**
- If answer is "I need to ask them" — stop here and come back after getting commitments
- If answer is "yes, they've agreed" — good, move forward
- If answer is "I think they'll probably help" — push for actual conversations first

### 6. Validate Against Quality Risk

Look at their deployment purpose from step 1. Do these testers and this testing plan actually validate what they said they needed to learn?

**If not aligned:**
Who would be better testers for validating [their quality risk]?
What would you need to ask them to do to actually test that assumption?

**Deliver:** Append to `docs/deployment_design.md` with sections:
- tester_profile (specific testers, where they work, technical comfort, when they'll use it)
- deployment_scope (what testers committed to, timeframe, what you're asking them to validate)
- learning_goals (assumptions being tested, what makes deployment successful as learning, feedback triggers)

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

### Step 4: Understand tester context, then make specific platform choices for runtime, data, frontend/delivery mechanism, and integrations based on their tech stack, tester needs, and independence requirements
**Goal:** Understand tester context, then make specific platform choices for runtime, data, frontend/delivery mechanism, and integrations based on their tech stack, tester needs, and independence requirements



## Conversation Flow

### 1. Determine Delivery Mechanism

Based on tester context from step 2 and independence requirements from step 3:

**What's the simplest way they can access this?**
- If they live in Slack and step 3 says "shared account" → Slack bot with shared workspace
- If they're non-technical and step 3 says "no persistence" → Simple web link, no signup
- If they're developers → GitHub repo with quick start
- If they check email → Email-triggered workflows

**Examples:**
- "Slack bot because your testers live in Slack all day and step 3 said shared demo account works"
- "Simple web app at myapp.fly.dev because testers are non-technical and need just a link"

### 2. Backend Runtime Platform

Based on the existing tech stack and independence requirements from step 3:

**What's their current stack?** (Python? Node? Other? Already using any platforms?)

**For Python apps:**
- fly.io — simple, generous free tier, handles long-running processes
- Railway — similar to fly.io, good DX
- Replit — easiest for beginners but has limitations

**For Node/JavaScript:**
- Vercel — great for Next.js, serverless
- Railway — good for Express/general Node
- fly.io — works for Node too

**Provide specific rationale:**
- "fly.io because you have a Python app, need persistent processes, and free tier is generous"
- Not just "fly.io is good"

### 3. Data Storage

Based on what data actually needs persistence from step 3:

**If they need structured data** (users, sessions, task history):
- Supabase — free tier, easy auth, postgres
- Firebase — realtime, good for simple apps
- Turso — SQLite in the cloud, very simple

**If they just need file storage:**
- Google Drive API — if data already there
- S3/R2 — if object storage fits
- Mounted volumes — simplest if just files

**If no persistence needed** (from step 3):
- "Based on step 3, you're starting fresh each session — no database needed"

**Provide rationale tied to their needs:**
- "Supabase because you need to track user sessions and it has built-in auth"

### 4. Integration Architecture

**How do the pieces connect?**

API endpoints:
- Where does frontend/delivery mechanism call backend?
- What's the URL structure?

Webhooks:
- If Slack/external services need to call in
- Where do webhooks get registered?

Authentication flow:
- Reference step 3: shared account? magic links? individual accounts?
- Where are tokens/sessions managed?

### 5. Environment Configuration

**Where do secrets and API keys go?**

Platform environment variables:
- "Set OpenAI API key in fly.io secrets: fly secrets set OPENAI_API_KEY=..."
- "Set database URL in Vercel env vars"

Not in code:
- Push back if they want to hardcode keys
- "Never commit API keys to git"

### 6. Cost Reality Check

**What's the actual monthly cost?**

Free tier limits:
- "fly.io free tier: 3 small VMs, should cover your 10 testers"
- "Supabase free tier: 500MB database, 2GB bandwidth"

Estimated costs if exceed free tier:
- "If you go over, expect $5-10/month max for this scale"

Make sure they understand:
- This is learning deployment, not production
- Costs should be minimal for 5-10 testers
- Can shut down after testing

### 7. Validate Complete Infrastructure Design

Does this infrastructure actually support:
- The tester context you just explored?
- Their independence requirements from step 3?
- Their deployment scope from step 2?

If misaligned, adjust recommendations.

**Deliver:** Append to `docs/deployment_design.md` with section:
- platform_selections (delivery mechanism, backend runtime, data storage, integration architecture, environment config, cost estimates — each with specific rationale tied to tester context and independence requirements)

**User Context:**
- Provides: their tech stack details, tester context, and platform preferences
- Receives: specific platform and delivery mechanism recommendations matched to their context

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

From step 4 platform selections, provide implementation details:

**Backend deployment:**
- Platform: [fly.io / Railway / etc]
- Startup command: exact command to start the app
- Environment variables: list each one with description (OPENAI_API_KEY, DATABASE_URL, etc)
- Health check: how to verify it's running

**Data persistence:**
- Connection details and setup
- Or explicit: "No database — using file storage" or "No persistence needed"
- Backup strategy or explicit "No backups for v1"

**Delivery mechanism deployment (if applicable):**
- For web app: build command, deployment target, environment config
- For Slack bot: webhook setup, bot token configuration
- For API only: just backend specs

### 3. Access and Monitoring

**Tester access instructions:**
- Step-by-step for testers (dead simple)
- Example: "1. Go to myapp.fly.dev 2. Login with test@example.com / password123"

**Quality risk monitoring** (from step 3 observability needs):
- What signals indicate their quality risk is happening?
- How are these captured? (logs, manual feedback, metrics)

**Error visibility:**
- Where do errors show up?
- How does builder get notified?

**Feedback collection:**
- How do testers give feedback? (form link, Slack channel, scheduled calls)

### 4. Deployment Checklist

**Independence verification:**
- [ ] Agent starts without manual builder intervention
- [ ] Testers can access from their own devices
- [ ] No localhost references in code
- [ ] API keys loaded from environment, not hardcoded

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

All steps are complete. Update `docs/reports/session_log.md` with your reflection and commit your changes.

---

## Output Artifacts

| File | Location | Description |
|------|----------|-------------|
| `deployment_design.md` | `docs/` | Testing reality check, deployment purpose, tester profile, deployment scope, learning goals, independence requirements, platform selections, deployment plan summary |
| `deployment_specs.md` | `docs/specs/` | Implementation-ready deployment specs: infrastructure, access instructions, monitoring, checklist, known limitations |
