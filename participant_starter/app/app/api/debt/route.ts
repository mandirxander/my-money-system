import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { validateLineItemValues, type LineItem } from '@/lib/validateLineItems'
import { validateLineItemsCsv } from '@/lib/validateLineItemsCsv'
import { getHouseholdKey, householdKeyMissingResponse } from '@/lib/household'

const MAX_DEBT = 2_000_000

export async function GET(request: NextRequest) {
  const householdKey = getHouseholdKey(request)
  if (!householdKey) return householdKeyMissingResponse()

  const { data, error } = await supabase
    .from('debt_figures')
    .select('id, label, amount')
    .eq('household_key', householdKey)
    .order('updated_at', { ascending: true })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ debts: data ?? [] })
}

export async function POST(request: NextRequest) {
  const householdKey = getHouseholdKey(request)
  if (!householdKey) return householdKeyMissingResponse()

  const contentType = request.headers.get('content-type') || ''
  let debts: LineItem[]

  if (contentType.includes('multipart/form-data')) {
    // Upload path — deterministic, no LLM involved
    const formData = await request.formData()
    const csvFile = formData.get('csv') as File | null

    if (!csvFile) {
      return Response.json({ error: 'No CSV file provided.' }, { status: 400 })
    }

    const csvText = await csvFile.text()
    if (!csvText.trim()) {
      return Response.json({ error: 'The CSV file is empty.' }, { status: 400 })
    }

    const validation = validateLineItemsCsv(csvText, { maxAmount: MAX_DEBT, itemName: 'debt' })
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 422 })
    }

    debts = validation.items!
  } else {
    // Typed path — same structured-row pattern as budget, deterministic, no LLM
    const { items } = await request.json()

    const validation = validateLineItemValues(items ?? [], { maxAmount: MAX_DEBT, itemName: 'debt' })
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 422 })
    }

    debts = items
  }

  // Clear this household's existing debt figures and save the new ones
  await supabase.from('debt_figures').delete().eq('household_key', householdKey)

  const rows = debts.map(d => ({
    label: d.label,
    amount: d.amount,
    household_key: householdKey,
    updated_at: new Date().toISOString(),
  }))

  const { error: insertError } = await supabase.from('debt_figures').insert(rows)
  if (insertError) return Response.json({ error: insertError.message }, { status: 500 })

  return Response.json({ debts })
}
