# Your API Keys: What Each One's For (and the Deploy Gotcha)
**AI Mentor Circle — Session 4 Reference**

You're building features now, so your keys are in play. Each feature you wire up needs the key for whatever it talks to — Claude or Supabase. This is the quick reference for *which key powers what* and the one thing that trips people up when they deploy. (For step-by-step setup of the Anthropic key, see **`participant_starter/guides/llm_api_guide.md`** — this handout assumes it's already in `.env.local`.)

## Which key powers which feature

| Key | What it powers | Add it when |
|---|---|---|
| `ANTHROPIC_API_KEY` | Any Claude API call your app makes at runtime | You build your first feature that calls Claude |
| `NEXT_PUBLIC_SUPABASE_URL` | Connecting to your Supabase project (reads + writes) | Your first database read or write |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side reads/writes to your database | Same — your first read/write |

You don't need every key on day one — add each one at the moment you build the feature that uses it. An empty `.env.local` is fine until then; it won't stop the app from running.

> **Keep your keys safe.** `SUPABASE_SERVICE_ROLE_KEY` and `ANTHROPIC_API_KEY` are secrets — they stay **server-side** and must **never** get a `NEXT_PUBLIC_` prefix (that prefix is what ships a value to the browser). Only the Supabase **URL** is safe to expose. See the Session 3 handout **`supabase_security.md`** for the full reasoning.

## The one gotcha: your keys don't deploy to Vercel automatically

`.env.local` is **gitignored** — it never gets committed, so it never travels to Vercel. That means a feature can work perfectly on your machine and then break on the live site, because the deployed app has no keys.

The fix: whenever you add a key to `.env.local`, **also add it in Vercel** — your project → **Settings → Environment Variables** — using the exact same name and value. Redeploy, and the live app has what it needs. The keys don't change and they stay server-side either way; the only difference is *where the value is stored* — `.env.local` locally, Vercel's Environment Variables when deployed.

> When you import your repo into Vercel, the other fields on the setup form take care of themselves — Vercel auto-detects **Next.js** (leave the Framework Preset, Root Directory, and Build settings at their defaults). **Environment Variables is the only field you manage.**
