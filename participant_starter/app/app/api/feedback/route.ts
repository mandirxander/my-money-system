import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getHouseholdKey, householdKeyMissingResponse } from '@/lib/household'

// Minimal closed-loop feedback capture — a tester's reaction to a completed
// check-in (helpful / not helpful, plus an optional comment). This is the
// pilot's whole feedback mechanism: one row per reaction, nothing fancier.
export async function POST(request: NextRequest) {
  const householdKey = getHouseholdKey(request)
  if (!householdKey) return householdKeyMissingResponse()

  const { reaction, comment } = await request.json()

  if (reaction !== 'helpful' && reaction !== 'not_helpful') {
    return Response.json({ error: 'Invalid reaction.' }, { status: 400 })
  }

  const { error } = await supabase.from('checkin_feedback').insert({
    household_key: householdKey,
    reaction,
    comment: comment && typeof comment === 'string' ? comment.trim().slice(0, 500) : null,
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
