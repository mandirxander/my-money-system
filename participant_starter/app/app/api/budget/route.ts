import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { validateBudgetItems, parseBudgetCsv, type BudgetItem } from '@/lib/validateBudget'
import { getHouseholdKey, householdKeyMissingResponse } from '@/lib/household'

export async function GET(request: NextRequest) {
  const householdKey = getHouseholdKey(request)
  if (!householdKey) return householdKeyMissingResponse()

  const { data, error } = await supabase
    .from('budget_figures')
    .select('id, type, label, planned_amount, actual_amount, due_date, paid')
    .eq('household_key', householdKey)
    .order('updated_at', { ascending: true })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ budget: data ?? [] })
}

export async function POST(request: NextRequest) {
  const householdKey = getHouseholdKey(request)
  if (!householdKey) return householdKeyMissingResponse()

  const contentType = request.headers.get('content-type') || ''
  let items: BudgetItem[]

  if (contentType.includes('multipart/form-data')) {
    // CSV upload sets planned amounts only, and represents the start of a new
    // period — it requires an explicit confirmation from the client before
    // it's allowed to overwrite any actual amounts already on file.
    const formData = await request.formData()
    const csvFile = formData.get('csv') as File | null
    const confirmed = formData.get('confirmReplace') === 'true'

    if (!csvFile) {
      return Response.json({ error: 'No CSV file provided.' }, { status: 400 })
    }

    const csvText = await csvFile.text()
    if (!csvText.trim()) {
      return Response.json({ error: 'The CSV file is empty.' }, { status: 400 })
    }

    const { data: existing } = await supabase
      .from('budget_figures')
      .select('id')
      .eq('household_key', householdKey)
      .limit(1)
    if (existing && existing.length > 0 && !confirmed) {
      return Response.json(
        { error: 'confirmation_required', message: 'Uploading a new CSV will replace your current budget period, including any actual amounts entered.' },
        { status: 409 }
      )
    }

    const validation = parseBudgetCsv(csvText)
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 422 })
    }

    items = validation.items!
  } else {
    const { items: rawItems } = await request.json()

    const validation = validateBudgetItems(rawItems ?? [])
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 422 })
    }

    items = rawItems
  }

  await supabase.from('budget_figures').delete().eq('household_key', householdKey)

  const rows = items.map(item => ({
    type: item.type,
    label: item.label,
    planned_amount: item.plannedAmount,
    actual_amount: item.actualAmount,
    due_date: item.dueDate,
    paid: item.paid,
    household_key: householdKey,
    updated_at: new Date().toISOString(),
  }))

  const { error: insertError } = await supabase.from('budget_figures').insert(rows)
  if (insertError) return Response.json({ error: insertError.message }, { status: 500 })

  return Response.json({ budget: items })
}
