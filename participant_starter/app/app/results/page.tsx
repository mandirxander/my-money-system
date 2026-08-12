'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BabyStepLadder } from '@/components/BabyStepLadder'
import { BreakdownBarChart, BudgetMeter, SnapshotDelta, WinBanner } from '@/components/SnapshotCharts'
import { getStoredHouseholdKey, householdHeaders } from '@/lib/householdClient'

interface LineItem {
  label: string
  amount: number
}

interface PreviousSnapshot {
  total_debt: number
  total_investments: number
}

interface CheckinResult {
  budgetStatus: string
  debtProgress: string
  recommendedFocus: string
  babyStep: number
  debtBreakdown: LineItem[]
  investmentBreakdown: LineItem[]
  budgetTotals: { income: number; bills: number }
  previousSnapshot: PreviousSnapshot | null
  mood: string
}

function StepNav({ onBack, onContinue }: { onBack?: () => void; onContinue?: () => void }) {
  return (
    <div className="flex items-center gap-4 mt-5">
      {onBack && (
        <button onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          ← Back
        </button>
      )}
      {onContinue && (
        <button onClick={onContinue} className="text-sm font-medium text-primary hover:opacity-80 transition-opacity">
          Continue →
        </button>
      )}
    </div>
  )
}

function FeedbackWidget() {
  const [reaction, setReaction] = useState<'helpful' | 'not_helpful' | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function send(value: 'helpful' | 'not_helpful') {
    const household = getStoredHouseholdKey()
    if (!household || submitting || submitted) return
    setReaction(value)
    setSubmitting(true)
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...householdHeaders(household) },
      body: JSON.stringify({ reaction: value }),
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return <p className="text-sm text-muted-foreground">Thanks — that helps.</p>
  }

  return (
    <div className="flex items-center gap-3">
      <p className="text-sm text-foreground">Was this check-in helpful?</p>
      <button
        type="button"
        onClick={() => send('helpful')}
        disabled={submitting}
        className={`text-sm px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-40 ${
          reaction === 'helpful' ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
        }`}
      >
        👍 Yes
      </button>
      <button
        type="button"
        onClick={() => send('not_helpful')}
        disabled={submitting}
        className={`text-sm px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-40 ${
          reaction === 'not_helpful' ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:text-foreground'
        }`}
      >
        👎 Not really
      </button>
    </div>
  )
}

export default function Results() {
  const router = useRouter()
  const [checkin, setCheckin] = useState<CheckinResult | null>(null)
  const [visibleStep, setVisibleStep] = useState(1)

  useEffect(() => {
    const stored = sessionStorage.getItem('checkin_result')
    if (!stored) {
      router.replace('/')
      return
    }
    setCheckin(JSON.parse(stored))
  }, [router])

  if (!checkin) return null

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-4">

        <h1 className="text-foreground mb-1">My Money System</h1>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Check-in · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          {checkin.mood && <span className="normal-case"> · came in feeling {checkin.mood}</span>}
        </p>

        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <BabyStepLadder currentStep={String(checkin.babyStep)} />
        </div>

        {/* Step 1 — Budget status */}
        {visibleStep >= 1 && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Budget status</p>
              <p className="text-sm text-card-foreground leading-relaxed">{checkin.budgetStatus}</p>
            </div>
            <BudgetMeter income={checkin.budgetTotals.income} bills={checkin.budgetTotals.bills} />
            {checkin.budgetTotals.bills <= checkin.budgetTotals.income && (
              <WinBanner message="Budget met this period — bills stayed within income." />
            )}
            {visibleStep === 1 && <StepNav onContinue={() => setVisibleStep(2)} />}
          </div>
        )}

        {/* Step 2 — Debt progress */}
        {visibleStep >= 2 && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Debt progress</p>
              <p className="text-sm text-card-foreground leading-relaxed">{checkin.debtProgress}</p>
            </div>

            <BreakdownBarChart title="Current debt" items={checkin.debtBreakdown} />
            {(() => {
              const totalDebt = checkin.debtBreakdown.reduce((sum, d) => sum + d.amount, 0)
              const prevDebt = checkin.previousSnapshot?.total_debt ?? null
              return (
                <>
                  <SnapshotDelta label="total debt" current={totalDebt} previous={prevDebt} goodDirection="down" />
                  {prevDebt !== null && totalDebt < prevDebt && (
                    <WinBanner message={`Debt is down $${(prevDebt - totalDebt).toLocaleString()} since your last check-in.`} />
                  )}
                </>
              )
            })()}

            {checkin.investmentBreakdown.length > 0 && (
              <>
                <BreakdownBarChart title="Investments & assets" items={checkin.investmentBreakdown} />
                <SnapshotDelta
                  label="total investments"
                  current={checkin.investmentBreakdown.reduce((sum, i) => sum + i.amount, 0)}
                  previous={checkin.previousSnapshot?.total_investments ?? null}
                  goodDirection="up"
                />
              </>
            )}

            {visibleStep === 2 && <StepNav onBack={() => setVisibleStep(1)} onContinue={() => setVisibleStep(3)} />}
          </div>
        )}

        {/* Step 3 — Recommended focus */}
        {visibleStep >= 3 && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-3">What to focus on</p>
            <p className="text-sm text-foreground leading-relaxed font-medium">{checkin.recommendedFocus}</p>
            <StepNav onBack={() => setVisibleStep(2)} />
          </div>
        )}

        {/* Done — feedback + nav back */}
        {visibleStep >= 3 && (
          <div className="bg-card border border-border rounded-xl p-4 mt-2">
            <FeedbackWidget />
          </div>
        )}

        {visibleStep >= 3 && (
          <div className="pt-4">
            <button
              onClick={() => {
                sessionStorage.removeItem('checkin_result')
                router.push('/')
              }}
              className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              ← Back to check-in
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
