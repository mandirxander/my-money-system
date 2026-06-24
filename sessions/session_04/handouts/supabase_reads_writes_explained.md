# How Your App Talks to Supabase (Reads, Writes, and Who's Allowed)
**AI Mentor Circle — Session 4 Reference Guide**

Last session you wired Supabase to your app and left it as an empty shell. This session you start **building features**, which means your code will finally start **reading from and writing to your database**. When that happens, Claude may leave you a code comment full of terms like *server-side*, *service_role*, *RLS*, *bypass*, and *authorization*. This guide decodes all of it in plain language, and shows when it actually matters for your project (often: less than it sounds).

---

## Part 1 — When Does Your App Read or Write the Database?

So far your app shell does **nothing** with the database — it just runs. The moment you add a real feature, that changes. Anytime your app needs to **remember something** or **show something it saved earlier**, that's a database read or write.

| What the user does | What your app does | Read or write? |
|---|---|---|
| Saves a journal entry | Stores the text in Supabase | **Write** |
| Opens the app and sees past entries | Pulls those entries back out | **Read** |
| Marks a task "done" | Updates that row | **Write** (an update) |
| Deletes a note | Removes that row | **Write** (a delete) |
| Searches their saved items | Looks them up | **Read** |

**The rule of thumb:** if data needs to *survive* — still be there after you close the browser — it goes in the database. Saving it is a **write**; getting it back is a **read**. Everything else (laying out the page, doing a calculation on screen) doesn't touch the database at all.

This is why nothing happened in Session 3: an empty shell has nothing to remember yet.

---

## Part 2 — Decoding the Terms

When Claude wires up these reads and writes, it'll describe what it's doing. Here's the whole vocabulary in plain English:

- **Server-side** — Code that runs on *your computer/server*, not in the user's web browser. Your app has two halves: the **browser half** (the page the user sees and clicks) and the **server half** (the engine behind it that the user never sees directly). "Server-side" means "the hidden engine half." Your database calls live there, alongside your Claude API calls.

- **`anon` key** — Supabase's **public** key, designed to be used right in the browser. Anyone who uses your app can see it. (We are *not* using this one for database access in class.)

- **`service_role` key** — Supabase's **secret, admin** key. It can do anything to your database. It's only safe on the **server side**, never in the browser. (This is the one we use.)

- **RLS (Row Level Security)** — Supabase's built-in **bouncer**. It's a setting on each table. When you turn it on, you *can* give it rules about who's allowed to touch which rows, and the database enforces them automatically.

- **"RLS-on"** — You've switched the bouncer on. We do this in class as a safety net — one click per table.

- **"`service_role` bypasses RLS"** — Here's the catch: the admin key **walks right past the bouncer.** Because your server uses the admin key, the database does **no filtering** — whatever your server code asks for, it gets. The bouncer is on, but it's not stopping your own server. (That's fine and intended — see Part 3.)

- **"Defense-in-depth"** — Leaving the bouncer on even though your admin key skips it. It does nothing day-to-day, but it's a backstop in case data ever gets exposed through some *other* door later. It's a "belt and suspenders" move, not your main protection.

- **Authorization** — Deciding **who is allowed to see or do what.** ("Can *this* person read *this* data? Are they allowed to delete *this* item?") This is the part the database is **not** doing for you, because the admin key skipped the bouncer.

> **The one sentence that ties it together:** Because your server uses the admin key, **your server code — not Supabase — is the thing deciding who's allowed to do what.**

---

## Part 3 — So When Do You Actually Need "Authorization"?

This sounds scary, but for most class POCs it barely comes up. Whether you need to think about authorization depends entirely on **whether your app keeps different people's data apart.**

Remember: **we are not building user logins in this class.** That simplifies things a lot.

### Case A — A personal / single-user POC (most of you)

Your app is for *one user* — you, or "whoever is using it." There's no notion of "my data vs. your data," because there's only one bucket of data.

➡️ **Authorization is basically a non-issue.** Your server reads and writes freely, and that's correct. There's nobody to wall off from anybody. Claude's warning is just describing how the plumbing works, not asking you to fix anything.

**Examples that need *no* authorization logic:**
- A personal journaling app that stores *your* entries.
- A study-helper that saves *the* flashcards everyone shares.
- A meeting-notes summarizer where all notes live in one shared pile.

### Case B — Data that's meant to be kept separate or private

If your app has any idea of **"this belongs to this person and not that person,"** *then* the gatekeeping has to live in your server code, because Supabase isn't doing it.

**Examples that *would* need authorization logic:**
- A team app where each member should see **only their own** tasks — your server has to check "is this row this person's?" before returning it.
- An action only *some* people should be allowed to do (e.g., an "admin" who can delete everyone's records) — your server has to confirm they're allowed before doing it.
- Anything where showing the wrong person's data would be a real problem.

➡️ In these cases, the rule is: **your server code must check "is the person asking allowed to get this?" before it reads or writes.** That check is a few lines Claude can write — but *you* have to know to ask for it, because the database won't catch a missing check.

### How to tell which case you're in

Ask yourself: **"If two different people used my app, would it be a problem for one to see the other's data?"**
- **No / doesn't apply** → Case A. Don't worry about authorization. Build freely.
- **Yes** → Case B. When you build that feature, tell Claude: *"This data is per-user — make sure the server only returns/changes rows that belong to the person making the request."*

> Even in Case B, you usually only need real **user logins** (Supabase Auth) once the POC grows up beyond the class. For now, "separate by a name or an ID the user picks" is often enough to demonstrate the idea. See the *"adding user logins later"* note in the Session 3 `supabase_security.md` handout.

---

## Part 4 — The Two Rules That Still Always Apply

No matter which case you're in, these two never change (both carried over from the Session 3 handout):

1. **Keep database calls on the server.** Your page asks your server; your server talks to Supabase. Don't let the page talk to the database directly.
2. **Never let the `service_role` key reach the browser.** It lives in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY` — **no** `NEXT_PUBLIC_` prefix, ever.

Follow those two, build in Case A, and there's genuinely nothing else to worry about this session.

---

## Quick Reference

| Term | Plain meaning |
|---|---|
| Read / write | Getting saved data back / saving data so it survives |
| Server-side | The hidden engine half of your app (not the browser) |
| `anon` key | Public key for the browser — *not* what we use |
| `service_role` key | Secret admin key, server-only — what we use |
| RLS | Supabase's built-in per-row bouncer |
| RLS-on | Bouncer switched on (our safety net) |
| Bypasses RLS | The admin key skips the bouncer — no auto-filtering |
| Defense-in-depth | A backstop that does nothing day-to-day, just in case |
| Authorization | Deciding who's allowed to see/do what — *your* server's job |

---

## Questions

If a Supabase read or write isn't behaving, ask Claude Code to walk you through what its code is doing — it can explain its own data calls in plain language. Still stuck after 20 minutes? Bring it to the next session or drop it in the group channel.
