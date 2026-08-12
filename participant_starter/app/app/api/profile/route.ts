import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getHouseholdKey, householdKeyMissingResponse } from '@/lib/household'

export async function GET(request: NextRequest) {
  const householdKey = getHouseholdKey(request)
  if (!householdKey) return householdKeyMissingResponse()

  const { data, error } = await supabase
    .from('user_profile')
    .select('id, baby_step')
    .eq('household_key', householdKey)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ profile: data })
}

export async function POST(request: NextRequest) {
  const householdKey = getHouseholdKey(request)
  if (!householdKey) return householdKeyMissingResponse()

  const { babyStep } = await request.json()

  if (!babyStep || isNaN(Number(babyStep))) {
    return Response.json({ error: 'Invalid Baby Step value.' }, { status: 400 })
  }

  // Check if a profile row already exists for this household
  const { data: existing } = await supabase
    .from('user_profile')
    .select('id')
    .eq('household_key', householdKey)
    .limit(1)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('user_profile')
      .update({ baby_step: Number(babyStep), updated_at: new Date().toISOString() })
      .eq('id', existing.id)

    if (error) return Response.json({ error: error.message }, { status: 500 })
  } else {
    const { error } = await supabase
      .from('user_profile')
      .insert({ baby_step: Number(babyStep), household_key: householdKey })

    if (error) return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
