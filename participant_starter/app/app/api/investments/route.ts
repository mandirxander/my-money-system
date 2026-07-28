import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { validateLineItemValues, type LineItem } from '@/lib/validateLineItems'
import { validateLineItemsCsv } from '@/lib/validateLineItemsCsv'

// Investments/assets can plausibly run higher than a single debt figure
// (retirement accounts, home equity) — same guardrail, wider backstop.
const MAX_INVESTMENT = 10_000_000

export async function GET() {
  const { data, error } = await supabase
    .from('investment_figures')
    .select('id, label, amount')
    .order('updated_at', { ascending: true })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ investments: data ?? [] })
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || ''
  let investments: LineItem[]

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

    const validation = validateLineItemsCsv(csvText, { maxAmount: MAX_INVESTMENT, itemName: 'investment' })
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 422 })
    }

    investments = validation.items!
  } else {
    // Typed path — same structured-row pattern as budget and debt, deterministic
    const { items } = await request.json()

    const validation = validateLineItemValues(items ?? [], { maxAmount: MAX_INVESTMENT, itemName: 'investment' })
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 422 })
    }

    investments = items
  }

  // Clear existing investment figures and save the new ones
  await supabase.from('investment_figures').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const rows = investments.map(inv => ({
    label: inv.label,
    amount: inv.amount,
    updated_at: new Date().toISOString(),
  }))

  const { error: insertError } = await supabase.from('investment_figures').insert(rows)
  if (insertError) return Response.json({ error: insertError.message }, { status: 500 })

  return Response.json({ investments })
}
