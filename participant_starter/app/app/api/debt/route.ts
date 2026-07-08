import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabase } from '@/lib/supabase'

const client = new Anthropic()

const PARSE_TOOL: Anthropic.Tool = {
  name: 'parse_debt_input',
  description: 'Parse natural language debt input into structured debt figures.',
  input_schema: {
    type: 'object' as const,
    properties: {
      debts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string', description: 'Name of the debt (e.g. "Car loan", "Credit card")' },
            amount: { type: 'number', description: 'Current balance in dollars, no symbols' },
          },
          required: ['label', 'amount'],
        },
      },
      needs_clarification: {
        type: 'boolean',
        description: 'True if any debt is missing a label or amount and cannot be parsed',
      },
      clarification_question: {
        type: 'string',
        description: 'A single question to ask the user to resolve the ambiguity. Only set when needs_clarification is true.',
      },
    },
    required: ['debts', 'needs_clarification'],
  },
}

export async function GET() {
  const { data, error } = await supabase
    .from('debt_figures')
    .select('id, label, amount')
    .order('updated_at', { ascending: true })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ debts: data ?? [] })
}

export async function POST(request: NextRequest) {
  const { text } = await request.json()

  if (!text?.trim()) {
    return Response.json({ error: 'No debt input provided.' }, { status: 400 })
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    system:
      'You parse natural language debt descriptions into structured figures. Extract every debt that has both a label and an amount. If any debt is missing a label or amount, set needs_clarification to true and ask one specific question to resolve it.',
    messages: [{ role: 'user', content: text }],
    tools: [PARSE_TOOL],
    tool_choice: { type: 'auto' },
  })

  const toolUse = message.content.find(block => block.type === 'tool_use')
  if (!toolUse || toolUse.type !== 'tool_use') {
    return Response.json({ error: 'Could not parse debt input. Try again.' }, { status: 500 })
  }

  const parsed = toolUse.input as {
    debts: { label: string; amount: number }[]
    needs_clarification: boolean
    clarification_question?: string
  }

  if (parsed.needs_clarification) {
    return Response.json({
      needs_clarification: true,
      clarification_question: parsed.clarification_question,
      debts: parsed.debts,
    })
  }

  // Clear existing debt figures and save the new ones
  await supabase.from('debt_figures').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const rows = parsed.debts.map(d => ({
    label: d.label,
    amount: d.amount,
    updated_at: new Date().toISOString(),
  }))

  const { error: insertError } = await supabase.from('debt_figures').insert(rows)
  if (insertError) return Response.json({ error: insertError.message }, { status: 500 })

  return Response.json({ needs_clarification: false, debts: parsed.debts })
}
