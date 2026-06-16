# Keeping Your Supabase Data Safe (RLS)
**AI Mentor Circle — Reference Guide**

When you set up Supabase, you'll run into a setting called **RLS — Row Level Security**. Supabase nudges you about it, and it can be confusing the first time. This guide explains what it is, why it matters, and the one simple approach we're using for the class so you don't have to think about it much.

---

## Part 1 — What RLS Is and Why It Exists

Your Supabase project comes with a **public key** (called the `anon` key) that's designed to be used in a web browser. That's convenient — but it also means that, by default, anyone who opens your app could potentially reach your database directly.

**Row Level Security (RLS)** is the lock that prevents this. When RLS is **on**, your database table is sealed shut — no one can read or write to it unless you've explicitly written a rule that allows it. When RLS is **off**, anyone with that public key can read and write your whole table.

Supabase shows a red **"Unrestricted"** badge when RLS is off. That badge is correct — it's telling you the table is wide open. Listen to it.

> **The short version:** RLS is what stands between "my data is protected" and "anyone who looks can dump my whole database."

---

## Part 2 — The Approach We're Using in Class

There are two ways to handle this. For the class, we're using the **simpler, safer one**, so you can stay focused on building.

### The pattern: talk to Supabase from your server, not the browser

Your project already runs a Next.js **server** (it's the same server that makes your Claude API calls). Instead of having your web page talk to Supabase directly, you'll have **your server** talk to Supabase. Your page talks to your server, and your server talks to the database.

```
Your web page  →  Your Next.js server  →  Supabase
                         (uses the secret key)
```

Why this is the easy path:

- Supabase gives you a second, **secret key** (the `service_role` key). Code running on your server can use it to read and write your database safely.
- Because this key is used **on the server** — never in the browser — your database is protected without you having to write any access rules by hand.
- You leave RLS **turned on** as a safety net, and you're done. No rules to write, no policies to manage.

This fits everything else you're already doing: your Claude API calls run on the server too, so adding your database calls in the same place is natural. **Claude Code can write all of this for you.**

---

## Part 3 — The One Rule You Must Follow

This whole approach depends on a single rule:

> ### 🔒 Never let your secret key reach the browser.
> The `service_role` key is powerful — it can do anything to your database. It must **only** ever be used in server code, never in anything that runs in the browser.

In practice, this means:

- Your secret key goes in `.env.local`, named **`SUPABASE_SERVICE_ROLE_KEY`** — **without** a `NEXT_PUBLIC_` prefix. (That prefix tells Next.js "ship this to the browser." You do *not* want that here.)
- Your public `anon` key and project URL *can* use the `NEXT_PUBLIC_` prefix — those are safe to expose.
- Make sure `.env.local` is in your `.gitignore` so your keys never get pushed to GitHub. It should be already — confirm before pushing.

If you follow that one rule and keep your database calls on the server, your data is safe.

---

## Part 4 — What to Do This Week

**In your Supabase dashboard (the website):**

1. Open your project at **supabase.com** → **Table Editor**.
2. For each table you create, make sure **RLS is enabled** (Supabase usually turns it on for you — confirm there's no red "Unrestricted" badge).
3. Go to **Project Settings → API** and copy two things:
   - The **Project URL**
   - The **`service_role` key** (under "Project API keys" — it's the secret one, not the `anon` one)

**In your project (`.env.local`):**

4. Add your keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
5. Confirm `.env.local` is listed in `.gitignore`.

**Then let Claude Code do the wiring:**

6. Ask Claude: *"Help me connect Supabase to my Next.js project using the SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL from my .env.local. I want to read and write the database from the server side, and keep RLS turned on."*

> You don't need to write any database security rules yourself. Turning RLS on (one click per table) plus keeping your secret key on the server is all the protection a class project needs. Claude Code handles the code.

> ⚠️ **Heads up — Claude's default is different.** If you just ask Claude to "set up Supabase," it will reach for the **`anon` key in the browser**, because that's the standard Supabase tutorial setup. That's a *different, more advanced* approach that requires you to write database security rules by hand. **For this class, steer it to the server-side approach** using the prompt in step 6 above (note the "from the server side" and "service_role key" parts). If you see Claude adding `NEXT_PUBLIC_SUPABASE_ANON_KEY` and calling Supabase from page/component code, stop it and point it back to the server-side pattern.

---

## Who Manages What

| Task | Where you do it | Who drives it |
|---|---|---|
| Turn RLS on for a table | Supabase dashboard (website) | You — one click per table |
| Copy your keys into `.env.local` | Your project | You |
| Connect Supabase and read/write data | Your code | Claude Code writes it |
| Keep the secret key out of the browser | Your code + `.env.local` | You + Claude |

---

## If You Want to Add User Logins Later (beyond this class)

We're **not** building real user authentication in this class — the server-side approach above is all your POC needs. But if your project would eventually benefit from each user having their own login and their own private data, that's a natural next step *beyond* the class.

That's the point where the *other* approach — the `anon` key in the browser plus hand-written security rules (the one Claude reaches for by default) — becomes the right tool, because it pairs with Supabase's built-in login system. You don't need any of that now. Just know the door is open: when you get there, ask Claude *"I want to add Supabase Auth with per-user data — walk me through switching from the server-side service_role setup to the anon key + Row Level Security policies."*

---

## Questions

If something isn't working after you've tried asking Claude Code for help, bring it to the next session or drop a message in the group channel. Don't spend more than 20 minutes stuck on setup.
