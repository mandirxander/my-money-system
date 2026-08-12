'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BABY_STEPS } from '@/lib/babySteps'
import { BabyStepLadder } from '@/components/BabyStepLadder'

interface BudgetFormRow {
  type: 'income' | 'bill'
  label: string
  plannedAmount: string
  actualAmount: string
  dueDate: string
  paid: boolean
}

interface SavedBudgetRow {
  type: 'income' | 'bill'
  label: string
  planned_amount: number
  actual_amount: number | null
  due_date: string
  paid: boolean
}

function emptyBudgetRow(type: 'income' | 'bill' = 'bill'): BudgetFormRow {
  return { type, label: '', plannedAmount: '', actualAmount: '', dueDate: '', paid: false }
}

function toBudgetRows(saved: SavedBudgetRow[]): BudgetFormRow[] {
  return saved.length > 0
    ? saved.map(r => ({
        type: r.type,
        label: r.label,
        plannedAmount: String(r.planned_amount),
        actualAmount: r.actual_amount === null ? '' : String(r.actual_amount),
        dueDate: r.due_date ?? '',
        paid: r.paid,
      }))
    : [emptyBudgetRow('income'), emptyBudgetRow('bill')]
}

interface LineItemRow {
  label: string
  amount: string
}

function emptyLineItemRow(): LineItemRow {
  return { label: '', amount: '' }
}

function toLineItemRows(items: { label: string; amount: number }[]): LineItemRow[] {
  return items.length > 0
    ? items.map(i => ({ label: i.label, amount: String(i.amount) }))
    : [emptyLineItemRow()]
}

function ModeToggle({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
            value === opt.value
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function LineItemRowsEditor({
  rows,
  onChange,
  addLabel = '+ Add row',
}: {
  rows: LineItemRow[]
  onChange: (rows: LineItemRow[]) => void
  addLabel?: string
}) {
  function update(i: number, patch: Partial<LineItemRow>) {
    onChange(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))
  }

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-2 bg-muted rounded-lg p-2">
          <input
            type="text"
            placeholder="Label"
            value={row.label}
            onChange={e => update(i, { label: e.target.value })}
            className="flex-1 min-w-0 border border-border rounded-md px-2 py-1.5 text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="number"
            placeholder="Amount"
            value={row.amount}
            onChange={e => update(i, { amount: e.target.value })}
            className="w-28 border border-border rounded-md px-2 py-1.5 text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
            className="text-muted-foreground hover:text-destructive transition-colors text-sm px-1"
            aria-label="Remove row"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, emptyLineItemRow()])}
        className="text-sm font-medium text-primary hover:opacity-80 transition-opacity"
      >
        {addLabel}
      </button>
    </div>
  )
}

export default function Home() {
  // Onboarding state
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [onboarding, setOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState('2')
  const [onboardingSaving, setOnboardingSaving] = useState(false)
  const [onboardingError, setOnboardingError] = useState('')

  // Check-in state
  const [babyStep, setBabyStep] = useState('2')
  const [mood, setMood] = useState('good')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState<'form' | 'review'>('form')
  const router = useRouter()

  // Debt state
  const [debtMode, setDebtMode] = useState<'form' | 'csv'>('form')
  const [debtRows, setDebtRows] = useState<LineItemRow[]>([emptyLineItemRow()])
  const [savedDebts, setSavedDebts] = useState<{ label: string; amount: number }[]>([])
  const [debtSaving, setDebtSaving] = useState(false)
  const [debtError, setDebtError] = useState('')
  const [debtCsv, setDebtCsv] = useState<File | null>(null)

  // Investment / asset state
  const [investmentMode, setInvestmentMode] = useState<'form' | 'csv'>('form')
  const [investmentRows, setInvestmentRows] = useState<LineItemRow[]>([emptyLineItemRow()])
  const [savedInvestments, setSavedInvestments] = useState<{ label: string; amount: number }[]>([])
  const [investmentSaving, setInvestmentSaving] = useState(false)
  const [investmentError, setInvestmentError] = useState('')
  const [investmentCsv, setInvestmentCsv] = useState<File | null>(null)

  // Budget state
  const [budgetMode, setBudgetMode] = useState<'form' | 'csv'>('form')
  const [budgetRows, setBudgetRows] = useState<BudgetFormRow[]>([emptyBudgetRow('income'), emptyBudgetRow('bill')])
  const [savedBudget, setSavedBudget] = useState<SavedBudgetRow[]>([])
  const [budgetSaving, setBudgetSaving] = useState(false)
  const [budgetError, setBudgetError] = useState('')
  const [budgetCsv, setBudgetCsv] = useState<File | null>(null)
  const [budgetCsvConfirming, setBudgetCsvConfirming] = useState(false)

  // On mount, load profile and existing figures
  useEffect(() => {
    async function loadData() {
      const [profileRes, debtRes, investmentsRes, budgetRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/debt'),
        fetch('/api/investments'),
        fetch('/api/budget'),
      ])
      const profileData = await profileRes.json()
      const debtData = await debtRes.json()
      const investmentsData = await investmentsRes.json()
      const budgetData = await budgetRes.json()

      if (profileData.profile) {
        setBabyStep(String(profileData.profile.baby_step))
        setOnboarding(false)
      } else {
        setOnboarding(true)
      }

      if (debtData.debts?.length > 0) {
        setSavedDebts(debtData.debts)
        setDebtRows(toLineItemRows(debtData.debts))
      }

      if (investmentsData.investments?.length > 0) {
        setSavedInvestments(investmentsData.investments)
        setInvestmentRows(toLineItemRows(investmentsData.investments))
      }

      if (budgetData.budget?.length > 0) {
        setSavedBudget(budgetData.budget)
        setBudgetRows(toBudgetRows(budgetData.budget))
      }

      setProfileLoaded(true)
    }

    loadData()
  }, [])

  async function handleOnboardingSave() {
    setOnboardingSaving(true)
    setOnboardingError('')

    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ babyStep: onboardingStep }),
    })
    const data = await res.json()

    if (data.error) {
      setOnboardingError(data.error)
      setOnboardingSaving(false)
      return
    }

    setBabyStep(onboardingStep)
    setOnboarding(false)
    setOnboardingSaving(false)
  }

  function toItems(rows: LineItemRow[]) {
    return rows
      .filter(r => r.label.trim() && r.amount.trim())
      .map(r => ({ label: r.label.trim(), amount: Number(r.amount) }))
  }

  async function handleDebtSubmit() {
    setDebtSaving(true)
    setDebtError('')

    const res = await fetch('/api/debt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: toItems(debtRows) }),
    })
    const data = await res.json()
    setDebtSaving(false)

    if (data.error) {
      setDebtError(data.error)
      return
    }

    setSavedDebts(data.debts)
    setDebtRows(toLineItemRows(data.debts))
  }

  async function handleDebtCsvSubmit() {
    if (!debtCsv) return
    setDebtSaving(true)
    setDebtError('')

    const formData = new FormData()
    formData.append('csv', debtCsv)

    const res = await fetch('/api/debt', { method: 'POST', body: formData })
    const data = await res.json()
    setDebtSaving(false)

    if (data.error) {
      setDebtError(data.error)
      return
    }

    setSavedDebts(data.debts)
    setDebtRows(toLineItemRows(data.debts))
    setDebtCsv(null)
  }

  async function handleInvestmentSubmit() {
    setInvestmentSaving(true)
    setInvestmentError('')

    const res = await fetch('/api/investments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: toItems(investmentRows) }),
    })
    const data = await res.json()
    setInvestmentSaving(false)

    if (data.error) {
      setInvestmentError(data.error)
      return
    }

    setSavedInvestments(data.investments)
    setInvestmentRows(toLineItemRows(data.investments))
  }

  async function handleInvestmentCsvSubmit() {
    if (!investmentCsv) return
    setInvestmentSaving(true)
    setInvestmentError('')

    const formData = new FormData()
    formData.append('csv', investmentCsv)

    const res = await fetch('/api/investments', { method: 'POST', body: formData })
    const data = await res.json()
    setInvestmentSaving(false)

    if (data.error) {
      setInvestmentError(data.error)
      return
    }

    setSavedInvestments(data.investments)
    setInvestmentRows(toLineItemRows(data.investments))
    setInvestmentCsv(null)
  }

  function updateBudgetRow(index: number, patch: Partial<BudgetFormRow>) {
    setBudgetRows(rows => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)))
  }

  function addBudgetRow() {
    setBudgetRows(rows => [...rows, emptyBudgetRow()])
  }

  function removeBudgetRow(index: number) {
    setBudgetRows(rows => rows.filter((_, i) => i !== index))
  }

  function toBudgetItems() {
    return budgetRows
      .filter(r => r.label.trim() && r.plannedAmount.trim())
      .map(r => ({
        type: r.type,
        label: r.label.trim(),
        plannedAmount: Number(r.plannedAmount),
        actualAmount: r.actualAmount.trim() ? Number(r.actualAmount) : null,
        dueDate: r.dueDate,
        paid: r.paid,
      }))
  }

  async function handleBudgetSubmit() {
    setBudgetSaving(true)
    setBudgetError('')

    const res = await fetch('/api/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: toBudgetItems() }),
    })
    const data = await res.json()
    setBudgetSaving(false)

    if (data.error) {
      setBudgetError(data.error)
      return
    }

    setSavedBudget(data.budget)
    setBudgetRows(toBudgetRows(data.budget))
  }

  async function submitBudgetCsv(confirmReplace: boolean) {
    if (!budgetCsv) return
    setBudgetSaving(true)
    setBudgetError('')

    const formData = new FormData()
    formData.append('csv', budgetCsv)
    if (confirmReplace) formData.append('confirmReplace', 'true')

    const res = await fetch('/api/budget', { method: 'POST', body: formData })
    const data = await res.json()
    setBudgetSaving(false)

    if (res.status === 409) {
      setBudgetCsvConfirming(true)
      return
    }

    if (data.error) {
      setBudgetError(data.error)
      return
    }

    setSavedBudget(data.budget)
    setBudgetRows(toBudgetRows(data.budget))
    setBudgetCsv(null)
    setBudgetCsvConfirming(false)
  }

  const budgetReady = savedBudget.length > 0

  function handleContinueToReview(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!budgetReady || savedDebts.length === 0) return
    setError('')
    setStage('review')
  }

  function openChangeStep() {
    setStage('form')
    setOnboarding(true)
  }

  async function runCheckin() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, babyStep }),
      })
      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        sessionStorage.setItem('checkin_result', JSON.stringify({
          budgetStatus: data.budgetStatus,
          debtProgress: data.debtProgress,
          recommendedFocus: data.recommendedFocus,
          babyStep: data.babyStep,
          debtBreakdown: data.debtBreakdown,
          investmentBreakdown: data.investmentBreakdown,
          budgetTotals: data.budgetTotals,
          previousSnapshot: data.previousSnapshot,
          mood,
        }))
        router.push('/results')
      }
    } catch {
      setError('Request failed — check your connection and retry.')
    } finally {
      setLoading(false)
    }
  }

  // Loading state while profile check runs
  if (!profileLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    )
  }

  // Onboarding screen
  if (onboarding) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-foreground mb-1">My Money System</h1>
          <p className="text-muted-foreground text-sm mb-10">Let's get you set up.</p>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="mb-1">Which Baby Step are you on?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              This sets the focus for every check-in. You can update it later when you advance.
            </p>

            <div className="space-y-2 mb-6">
              {BABY_STEPS.map(step => (
                <label
                  key={step.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    onboardingStep === step.value
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="babyStep"
                    value={step.value}
                    checked={onboardingStep === step.value}
                    onChange={e => setOnboardingStep(e.target.value)}
                    className="accent-primary"
                  />
                  <span className="text-sm">{step.label}</span>
                </label>
              ))}
            </div>

            {onboardingError && (
              <p className="text-sm text-destructive mb-4">{onboardingError}</p>
            )}

            <button
              onClick={handleOnboardingSave}
              disabled={onboardingSaving}
              className="w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {onboardingSaving ? 'Saving…' : 'Save and continue'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Review screen — the "here's what we're about to consider" confirmation
  // moment before Claude is called, and where the Baby Step gets re-verified
  // instead of being trusted indefinitely from onboarding.
  if (stage === 'review') {
    const currentStep = BABY_STEPS.find(s => s.value === babyStep)
    const totalDebt = savedDebts.reduce((sum, d) => sum + d.amount, 0)
    const totalInvestments = savedInvestments.reduce((sum, i) => sum + i.amount, 0)
    const plannedIncome = savedBudget.filter(r => r.type === 'income').reduce((sum, r) => sum + r.planned_amount, 0)
    const plannedBills = savedBudget.filter(r => r.type === 'bill').reduce((sum, r) => sum + r.planned_amount, 0)
    const actualsEntered = savedBudget.filter(r => r.actual_amount !== null).length

    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-foreground mb-1">My Money System</h1>
          <p className="text-muted-foreground text-sm mb-10">Here&apos;s what we&apos;re about to consider.</p>

          <div className="bg-card border border-border rounded-xl p-6 mb-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Baby Step</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground">Still on <strong>{currentStep?.label}</strong>?</p>
              <button
                type="button"
                onClick={openChangeStep}
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors shrink-0"
              >
                Change
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-4 space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Figures</p>
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Total debt</span>
              <span className="text-muted-foreground">${totalDebt.toLocaleString()} ({savedDebts.length} {savedDebts.length === 1 ? 'debt' : 'debts'})</span>
            </div>
            {savedInvestments.length > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Investments &amp; assets</span>
                <span className="text-muted-foreground">${totalInvestments.toLocaleString()} ({savedInvestments.length})</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Planned income</span>
              <span className="text-muted-foreground">${plannedIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Planned bills</span>
              <span className="text-muted-foreground">${plannedBills.toLocaleString()}{actualsEntered > 0 ? ` (${actualsEntered} with actuals entered)` : ''}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Mood coming in</span>
              <span className="text-muted-foreground capitalize">{mood}</span>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-5 mb-4">
              <p className="text-sm font-semibold text-destructive mb-1">Check-in failed</p>
              <p className="text-sm text-destructive/80 mb-3">{error}</p>
              <button
                type="button"
                onClick={runCheckin}
                disabled={loading}
                className="bg-destructive text-destructive-foreground text-sm font-medium py-1.5 px-3 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {loading ? 'Retrying…' : 'Retry'}
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStage('form')}
              disabled={loading}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            >
              ← Back to edit
            </button>
            <button
              type="button"
              onClick={runCheckin}
              disabled={loading}
              className="flex-1 bg-primary text-primary-foreground text-sm font-medium py-2.5 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {loading ? 'Running check-in…' : 'Confirm and run check-in'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Check-in screen
  const currentStep = BABY_STEPS.find(s => s.value === babyStep)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-foreground mb-1">My Money System</h1>
        <div className="flex items-center justify-between mb-2">
          <p className="text-muted-foreground text-sm">{currentStep?.label}</p>
          <button
            onClick={openChangeStep}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Change step
          </button>
        </div>
        <div className="mb-10">
          <BabyStepLadder currentStep={babyStep} />
        </div>

        {/* Debt figures */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-1">
            <h2>Current debt figures</h2>
            <ModeToggle
              value={debtMode}
              onChange={v => setDebtMode(v as 'form' | 'csv')}
              options={[
                { value: 'form', label: 'Type it in' },
                { value: 'csv', label: 'Upload CSV' },
              ]}
            />
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {debtMode === 'form'
              ? 'Add each debt as a label and current balance.'
              : 'Upload a CSV with Label and Amount columns.'}
          </p>

          {debtMode === 'csv' && savedDebts.length > 0 && (
            <ul className="bg-muted rounded-lg p-3 mb-3 space-y-1">
              {savedDebts.map((d, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-foreground">{d.label}</span>
                  <span className="text-muted-foreground">${d.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}

          {debtError && <p className="text-sm text-destructive mb-2">{debtError}</p>}

          {debtMode === 'form' ? (
            <>
              <LineItemRowsEditor rows={debtRows} onChange={setDebtRows} addLabel="+ Add debt" />
              <button
                type="button"
                onClick={handleDebtSubmit}
                disabled={debtSaving}
                className="mt-2 bg-secondary text-secondary-foreground text-sm font-medium py-2 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {debtSaving ? 'Saving…' : savedDebts.length > 0 ? 'Update debts' : 'Save debts'}
              </button>
            </>
          ) : (
            <>
              <input
                type="file"
                accept=".csv"
                onChange={e => setDebtCsv(e.target.files?.[0] || null)}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:opacity-90 cursor-pointer mb-2"
              />
              <button
                type="button"
                onClick={handleDebtCsvSubmit}
                disabled={!debtCsv || debtSaving}
                className="bg-secondary text-secondary-foreground text-sm font-medium py-2 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {debtSaving ? 'Uploading…' : 'Upload debts'}
              </button>
            </>
          )}
        </div>

        {/* Investments / assets */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-1">
            <h2>Investments &amp; assets <span className="text-muted-foreground font-normal">(optional)</span></h2>
            <ModeToggle
              value={investmentMode}
              onChange={v => setInvestmentMode(v as 'form' | 'csv')}
              options={[
                { value: 'form', label: 'Type it in' },
                { value: 'csv', label: 'Upload CSV' },
              ]}
            />
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {investmentMode === 'form'
              ? 'Add each investment or asset as a label and current value.'
              : 'Upload a CSV with Label and Amount columns.'}
          </p>

          {investmentMode === 'csv' && savedInvestments.length > 0 && (
            <ul className="bg-muted rounded-lg p-3 mb-3 space-y-1">
              {savedInvestments.map((inv, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-foreground">{inv.label}</span>
                  <span className="text-muted-foreground">${inv.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}

          {investmentError && <p className="text-sm text-destructive mb-2">{investmentError}</p>}

          {investmentMode === 'form' ? (
            <>
              <LineItemRowsEditor rows={investmentRows} onChange={setInvestmentRows} addLabel="+ Add investment" />
              <button
                type="button"
                onClick={handleInvestmentSubmit}
                disabled={investmentSaving}
                className="mt-2 bg-secondary text-secondary-foreground text-sm font-medium py-2 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {investmentSaving ? 'Saving…' : savedInvestments.length > 0 ? 'Update investments' : 'Save investments'}
              </button>
            </>
          ) : (
            <>
              <input
                type="file"
                accept=".csv"
                onChange={e => setInvestmentCsv(e.target.files?.[0] || null)}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:opacity-90 cursor-pointer mb-2"
              />
              <button
                type="button"
                onClick={handleInvestmentCsvSubmit}
                disabled={!investmentCsv || investmentSaving}
                className="bg-secondary text-secondary-foreground text-sm font-medium py-2 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {investmentSaving ? 'Uploading…' : 'Upload investments'}
              </button>
            </>
          )}
        </div>

        {/* Budget */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-1">
            <h2>Budget <span className="text-muted-foreground font-normal">(this pay period)</span></h2>
            <ModeToggle
              value={budgetMode}
              onChange={v => setBudgetMode(v as 'form' | 'csv')}
              options={[
                { value: 'form', label: 'Type it in' },
                { value: 'csv', label: 'Upload CSV' },
              ]}
            />
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {budgetMode === 'form'
              ? 'Planned amount is set once per period. Fill in Actual as you go to track real spend against the plan.'
              : 'Upload a CSV with Income, Bills, Due Date, Amount, and Paid columns. Sets planned amounts for a new period.'}
          </p>

          {budgetError && <p className="text-sm text-destructive mb-2">{budgetError}</p>}

          {budgetMode === 'form' ? (
            <div className="space-y-2">
              {budgetRows.map((row, i) => (
                <div key={i} className="flex items-center gap-2 bg-muted rounded-lg p-2">
                  <select
                    value={row.type}
                    onChange={e => updateBudgetRow(i, { type: e.target.value as 'income' | 'bill' })}
                    className="border border-border rounded-md px-2 py-1.5 text-xs text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="income">Income</option>
                    <option value="bill">Bill</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Label"
                    value={row.label}
                    onChange={e => updateBudgetRow(i, { label: e.target.value })}
                    className="flex-1 min-w-0 border border-border rounded-md px-2 py-1.5 text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="number"
                    placeholder="Planned"
                    value={row.plannedAmount}
                    onChange={e => updateBudgetRow(i, { plannedAmount: e.target.value })}
                    className="w-24 border border-border rounded-md px-2 py-1.5 text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="number"
                    placeholder="Actual"
                    value={row.actualAmount}
                    onChange={e => updateBudgetRow(i, { actualAmount: e.target.value })}
                    className="w-24 border border-border rounded-md px-2 py-1.5 text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="text"
                    placeholder="Due date"
                    value={row.dueDate}
                    onChange={e => updateBudgetRow(i, { dueDate: e.target.value })}
                    className="w-28 border border-border rounded-md px-2 py-1.5 text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <label className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <input
                      type="checkbox"
                      checked={row.paid}
                      onChange={e => updateBudgetRow(i, { paid: e.target.checked })}
                      className="accent-primary"
                    />
                    Paid
                  </label>
                  <button
                    type="button"
                    onClick={() => removeBudgetRow(i)}
                    className="text-muted-foreground hover:text-destructive transition-colors text-sm px-1"
                    aria-label="Remove row"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addBudgetRow}
                className="text-sm font-medium text-primary hover:opacity-80 transition-opacity"
              >
                + Add row
              </button>
              <div>
                <button
                  type="button"
                  onClick={handleBudgetSubmit}
                  disabled={budgetSaving}
                  className="mt-2 bg-secondary text-secondary-foreground text-sm font-medium py-2 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  {budgetSaving ? 'Saving…' : savedBudget.length > 0 ? 'Update budget' : 'Save budget'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept=".csv"
                onChange={e => {
                  setBudgetCsv(e.target.files?.[0] || null)
                  setBudgetCsvConfirming(false)
                }}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:opacity-90 cursor-pointer mb-2"
              />
              {budgetCsvConfirming ? (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 space-y-2">
                  <p className="text-sm text-destructive">
                    This replaces your current budget period, including any actual amounts you&apos;ve entered. Continue?
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => submitBudgetCsv(true)}
                      disabled={budgetSaving}
                      className="bg-destructive text-destructive-foreground text-sm font-medium py-1.5 px-3 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
                    >
                      {budgetSaving ? 'Replacing…' : 'Replace budget'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setBudgetCsvConfirming(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => submitBudgetCsv(false)}
                  disabled={!budgetCsv || budgetSaving}
                  className="bg-secondary text-secondary-foreground text-sm font-medium py-2 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  {budgetSaving ? 'Uploading…' : 'Upload budget'}
                </button>
              )}
            </>
          )}
        </div>

        <form onSubmit={handleContinueToReview} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              How are you coming into this check-in?
            </label>
            <select
              value={mood}
              onChange={e => setMood(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="good">Good — things are on track</option>
              <option value="stressed">A bit stressed</option>
              <option value="crisis">In crisis mode</option>
            </select>
          </div>

          {/* Readiness checklist */}
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Before we start</p>
            <div className="flex items-center gap-2 text-sm">
              <span className={savedDebts.length > 0 ? 'text-primary' : 'text-muted-foreground'}>
                {savedDebts.length > 0 ? '✓' : '○'}
              </span>
              <span className={savedDebts.length > 0 ? 'text-foreground' : 'text-muted-foreground'}>
                {savedDebts.length > 0
                  ? `Debt figures saved (${savedDebts.length} ${savedDebts.length === 1 ? 'debt' : 'debts'})`
                  : 'Debt figures — enter your current balances above'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={budgetReady ? 'text-primary' : 'text-muted-foreground'}>
                {budgetReady ? '✓' : '○'}
              </span>
              <span className={budgetReady ? 'text-foreground' : 'text-muted-foreground'}>
                {budgetReady
                  ? `Budget saved (${savedBudget.length} ${savedBudget.length === 1 ? 'row' : 'rows'})`
                  : 'Budget — enter and save your planned income and bills above'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!budgetReady || savedDebts.length === 0}
            className="w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            Review and run check-in
          </button>
        </form>
      </div>
    </div>
  )
}
