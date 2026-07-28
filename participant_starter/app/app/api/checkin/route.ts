import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { validateCsv, validateRows } from '@/lib/validateCsv'
import { supabase } from '@/lib/supabase'

interface BudgetFormRow {
  type: 'income' | 'bill'
  label: string
  amount: string
  dueDate: string
  paid: boolean
}

const client = new Anthropic()

const SYSTEM_PROMPT = `You are a personal financial check-in coach for a family using Dave Ramsey's Baby Steps framework.

The budget CSV and debt figures you receive have already been validated — they are clean. Do not re-validate them.

Be direct and warm. Acknowledge emotional weight first if the mood signals stress or crisis. Connect to Baby Steps naturally, not as a lecture. Keep each field to 2–3 sentences max.`

const CHECKIN_TOOL: Anthropic.Tool = {
  name: 'deliver_checkin',
  description: 'Deliver a structured financial check-in with three sequential pieces.',
  input_schema: {
    type: 'object' as const,
    properties: {
      budget_status: {
        type: 'string',
        description: "Assessment of the budget: what's on track and what needs attention. 2–3 sentences.",
      },
      debt_progress: {
        type: 'string',
        description: 'Assessment of debt progress relative to the current Baby Step. 2–3 sentences.',
      },
      recommended_focus: {
        type: 'string',
        description: 'One specific, actionable next step tied to the current Baby Step. 1–2 sentences.',
      },
    },
    required: ['budget_status', 'debt_progress', 'recommended_focus'],
  },
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const csvFile = formData.get('csv') as File | null
    const budgetRowsRaw = formData.get('budgetRows') as string | null
    const mood = formData.get('mood') as string
    const babyStep = formData.get('babyStep') as string

    // Both entry modes are rule-based and deterministic — the LLM is only
    // called after data is confirmed clean, regardless of how it arrived.
    let csvText: string

    if (csvFile) {
      csvText = await csvFile.text()

      if (!csvText.trim()) {
        return Response.json({ error: 'The CSV file is empty.' }, { status: 400 })
      }

      const validation = validateCsv(csvText)
      if (!validation.valid) {
        return Response.json({ error: validation.error }, { status: 422 })
      }
    } else if (budgetRowsRaw) {
      const rows: BudgetFormRow[] = JSON.parse(budgetRowsRaw)

      if (rows.length === 0) {
        return Response.json({ error: 'No budget rows provided.' }, { status: 400 })
      }

      const headers = ['Income', 'Bills', 'Due Date', 'Amount', 'Paid']
      const dataRows = rows.map(r => [
        r.type === 'income' ? r.label : '',
        r.type === 'bill' ? r.label : '',
        r.dueDate,
        r.amount,
        r.paid ? 'Yes' : 'No',
      ])

      const validation = validateRows(headers, dataRows)
      if (!validation.valid) {
        return Response.json({ error: validation.error }, { status: 422 })
      }

      // Re-serialize to the same CSV shape so everything downstream (Claude
      // prompt, preview) is identical regardless of which input path was used.
      csvText = [headers.join(','), ...dataRows.map(r => r.join(','))].join('\n')
    } else {
      return Response.json({ error: 'No budget data provided.' }, { status: 400 })
    }

    // Load saved debt figures — gate if missing
    const { data: debtRows } = await supabase
      .from('debt_figures')
      .select('label, amount')
      .order('updated_at', { ascending: true })

    if (!debtRows || debtRows.length === 0) {
      return Response.json(
        { error: 'No debt figures found. Enter your current debt balances before running a check-in.' },
        { status: 422 }
      )
    }

    const debtSummary = debtRows.map(d => `${d.label}: $${d.amount.toLocaleString()}`).join('\n')

    // Investments/assets are optional — omit the section entirely if none are on file
    const { data: investmentRows } = await supabase
      .from('investment_figures')
      .select('label, amount')
      .order('updated_at', { ascending: true })

    const investmentSummary =
      investmentRows && investmentRows.length > 0
        ? investmentRows.map(inv => `${inv.label}: $${inv.amount.toLocaleString()}`).join('\n')
        : null

    const csvPreview = csvText.split('\n').slice(0, 5).join('\n')

    const userMessage = `Mood coming into this check-in: ${mood}
Current Baby Step: ${babyStep}

Current debt figures:
${debtSummary}
${investmentSummary ? `\nCurrent investments/assets:\n${investmentSummary}\n` : ''}
Budget CSV:
${csvText}`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
      tools: [CHECKIN_TOOL],
      tool_choice: { type: 'auto' },
    })

    const toolUse = message.content.find(block => block.type === 'tool_use')
    if (!toolUse || toolUse.type !== 'tool_use') {
      return Response.json({ error: 'Could not generate check-in. Try again.' }, { status: 500 })
    }

    const result = toolUse.input as {
      budget_status: string
      debt_progress: string
      recommended_focus: string
    }

    return Response.json({
      budgetStatus: result.budget_status,
      debtProgress: result.debt_progress,
      recommendedFocus: result.recommended_focus,
      csvPreview,
    })
  } catch (error) {
    console.error('Check-in error:', error)
    return Response.json(
      { error: 'Something went wrong. Check the server console for details.' },
      { status: 500 }
    )
  }
}
