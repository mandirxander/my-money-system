import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { validateCsv } from '@/lib/validateCsv'
import { supabase } from '@/lib/supabase'

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
    const mood = formData.get('mood') as string
    const babyStep = formData.get('babyStep') as string

    if (!csvFile) {
      return Response.json({ error: 'No CSV file provided.' }, { status: 400 })
    }

    const csvText = await csvFile.text()

    if (!csvText.trim()) {
      return Response.json({ error: 'The CSV file is empty.' }, { status: 400 })
    }

    // Rule-based validation — deterministic, never calls Claude
    const validation = validateCsv(csvText)
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 422 })
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

    const csvPreview = csvText.split('\n').slice(0, 5).join('\n')

    const userMessage = `Mood coming into this check-in: ${mood}
Current Baby Step: ${babyStep}

Current debt figures:
${debtSummary}

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
