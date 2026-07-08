import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('user_profile')
    .select('id, baby_step')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ profile: data })
}

export async function POST(request: NextRequest) {
  const { babyStep } = await request.json()

  if (!babyStep || isNaN(Number(babyStep))) {
    return Response.json({ error: 'Invalid Baby Step value.' }, { status: 400 })
  }

  // Check if a profile row already exists
  const { data: existing } = await supabase
    .from('user_profile')
    .select('id')
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
      .insert({ baby_step: Number(babyStep) })

    if (error) return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
