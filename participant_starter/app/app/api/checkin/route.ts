import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabase } from '@/lib/supabase'

const client = new Anthropic()

const SYSTEM_PROMPT = `You are a personal financial check-in coach for a family using Dave Ramsey's Baby Steps framework.

The budget and debt figures you receive have already been validated — they are clean. Do not re-validate them.

The budget lists a planned amount per row and, once known, an actual amount — speak to plan-vs-actual when actuals are present, not just the plan.

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
    const { mood, babyStep } = await request.json()

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

    // Budget is saved and edited in place — this is the one figure the check-in
    // reads directly rather than receiving fresh, since it now tracks a planned
    // amount alongside an actual amount filled in across sessions.
    const { data: budgetRows } = await supabase
      .from('budget_figures')
      .select('type, label, planned_amount, actual_amount, due_date, paid')
      .order('updated_at', { ascending: true })

    if (!budgetRows || budgetRows.length === 0) {
      return Response.json(
        { error: 'No budget found. Enter your planned income and bills before running a check-in.' },
        { status: 422 }
      )
    }

    const budgetSummary = budgetRows
      .map(r => {
        const actual = r.actual_amount !== null ? `, actual $${r.actual_amount.toLocaleString()}` : ''
        const due = r.due_date ? `, due ${r.due_date}` : ''
        return `${r.label} (${r.type}): planned $${r.planned_amount.toLocaleString()}${actual}${due}${r.paid ? ', paid' : ''}`
      })
      .join('\n')

    // Snapshot totals — used for the results-page breakdown charts and, once a
    // prior snapshot exists, trend/gamification comparisons.
    const totalDebt = debtRows.reduce((sum, d) => sum + d.amount, 0)
    const totalInvestments = (investmentRows ?? []).reduce((sum, inv) => sum + inv.amount, 0)
    const budgetIncome = budgetRows.filter(r => r.type === 'income').reduce((sum, r) => sum + r.planned_amount, 0)
    const budgetBills = budgetRows.filter(r => r.type === 'bill').reduce((sum, r) => sum + r.planned_amount, 0)

    const { data: previousSnapshot } = await supabase
      .from('checkin_snapshots')
      .select('baby_step, total_debt, total_investments, budget_income, budget_bills, created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    const userMessage = `Mood coming into this check-in: ${mood}
Current Baby Step: ${babyStep}

Current debt figures:
${debtSummary}
${investmentSummary ? `\nCurrent investments/assets:\n${investmentSummary}\n` : ''}
Budget (planned vs. actual):
${budgetSummary}`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
      tools: [CHECKIN_TOOL],
      tool_choice: { type: 'tool', name: 'deliver_checkin' },
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

    const { error: snapshotError } = await supabase.from('checkin_snapshots').insert({
      baby_step: Number(babyStep),
      total_debt: totalDebt,
      total_investments: totalInvestments,
      budget_income: budgetIncome,
      budget_bills: budgetBills,
    })
    if (snapshotError) console.error('Snapshot save error:', snapshotError)

    return Response.json({
      budgetStatus: result.budget_status,
      debtProgress: result.debt_progress,
      recommendedFocus: result.recommended_focus,
      debtBreakdown: debtRows,
      investmentBreakdown: investmentRows ?? [],
      budgetBreakdown: budgetRows,
      budgetTotals: { income: budgetIncome, bills: budgetBills },
      babyStep: Number(babyStep),
      previousSnapshot: previousSnapshot ?? null,
    })
  } catch (error) {
    console.error('Check-in error:', error)
    return Response.json(
      { error: 'Something went wrong. Check the server console for details.' },
      { status: 500 }
    )
  }
}
