'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const BABY_STEPS = [
  { value: '1', label: 'Step 1 — $1,000 starter emergency fund' },
  { value: '2', label: 'Step 2 — Pay off debt (debt snowball)' },
  { value: '3', label: 'Step 3 — 3–6 months full emergency fund' },
  { value: '4', label: 'Step 4 — Invest 15% for retirement' },
  { value: '5', label: 'Step 5 — Save for college' },
  { value: '6', label: 'Step 6 — Pay off home early' },
  { value: '7', label: 'Step 7 — Build wealth and give' },
]

export default function Home() {
  // Onboarding state
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [onboarding, setOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState('2')
  const [onboardingSaving, setOnboardingSaving] = useState(false)
  const [onboardingError, setOnboardingError] = useState('')

  // Check-in state
  const [babyStep, setBabyStep] = useState('2')
  const [csv, setCsv] = useState<File | null>(null)
  const [mood, setMood] = useState('good')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Debt state
  const [savedDebts, setSavedDebts] = useState<{ label: string; amount: number }[]>([])
  const [debtInput, setDebtInput] = useState('')
  const [debtParsing, setDebtParsing] = useState(false)
  const [debtError, setDebtError] = useState('')
  const [clarificationQuestion, setClarificationQuestion] = useState('')

  // On mount, load profile and existing debt figures
  useEffect(() => {
    async function loadData() {
      const [profileRes, debtRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/debt'),
      ])
      const profileData = await profileRes.json()
      const debtData = await debtRes.json()

      if (profileData.profile) {
        setBabyStep(String(profileData.profile.baby_step))
        setOnboarding(false)
      } else {
        setOnboarding(true)
      }

      if (debtData.debts?.length > 0) {
        setSavedDebts(debtData.debts)
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

  async function handleDebtSubmit() {
    if (!debtInput.trim()) return
    setDebtParsing(true)
    setDebtError('')
    setClarificationQuestion('')

    const res = await fetch('/api/debt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: debtInput }),
    })
    const data = await res.json()
    setDebtParsing(false)

    if (data.error) {
      setDebtError(data.error)
      return
    }

    if (data.needs_clarification) {
      setClarificationQuestion(data.clarification_question)
      if (data.debts?.length > 0) setSavedDebts(data.debts)
      return
    }

    setSavedDebts(data.debts)
    setDebtInput('')
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!csv) return

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('csv', csv)
    formData.append('mood', mood)
    formData.append('babyStep', babyStep)

    try {
      const res = await fetch('/api/checkin', { method: 'POST', body: formData })
      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        sessionStorage.setItem('checkin_result', JSON.stringify({
          budgetStatus: data.budgetStatus,
          debtProgress: data.debtProgress,
          recommendedFocus: data.recommendedFocus,
        }))
        router.push('/results')
      }
    } catch {
      setError('Request failed — check the browser console.')
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
          <h1 className="text-2xl font-semibold text-foreground mb-1">My Money System</h1>
          <p className="text-muted-foreground text-sm mb-10">Let's get you set up.</p>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-base font-semibold text-foreground mb-1">Which Baby Step are you on?</h2>
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

  // Check-in screen
  const currentStep = BABY_STEPS.find(s => s.value === babyStep)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-1">My Money System</h1>
        <div className="flex items-center justify-between mb-10">
          <p className="text-muted-foreground text-sm">{currentStep?.label}</p>
          <button
            onClick={() => setOnboarding(true)}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Change step
          </button>
        </div>

        {/* Debt figures */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-foreground mb-1">Current debt figures</h2>
          <p className="text-xs text-muted-foreground mb-3">
            Enter your debts in plain language — e.g. "my car loan is $8,400 and my credit card is $2,100"
          </p>

          {savedDebts.length > 0 && (
            <ul className="bg-muted rounded-lg p-3 mb-3 space-y-1">
              {savedDebts.map((d, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-foreground">{d.label}</span>
                  <span className="text-muted-foreground">${d.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}

          {clarificationQuestion && (
            <div className="bg-accent/30 border border-border rounded-lg p-3 mb-3">
              <p className="text-sm text-foreground">{clarificationQuestion}</p>
            </div>
          )}

          <textarea
            value={debtInput}
            onChange={e => setDebtInput(e.target.value)}
            placeholder={savedDebts.length > 0 ? 'Update debt figures…' : 'e.g. my car loan is $8,400 and my credit card is $2,100'}
            rows={3}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-2"
          />

          {debtError && <p className="text-sm text-destructive mb-2">{debtError}</p>}

          <button
            type="button"
            onClick={handleDebtSubmit}
            disabled={!debtInput.trim() || debtParsing}
            className="bg-secondary text-secondary-foreground text-sm font-medium py-2 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            {debtParsing ? 'Parsing…' : savedDebts.length > 0 ? 'Update debts' : 'Save debts'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

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

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Upload your budget CSV
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={e => setCsv(e.target.files?.[0] || null)}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer"
            />
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
              <span className={csv ? 'text-primary' : 'text-muted-foreground'}>
                {csv ? '✓' : '○'}
              </span>
              <span className={csv ? 'text-foreground' : 'text-muted-foreground'}>
                {csv ? `Budget CSV — ${csv.name}` : 'Budget CSV — upload your exported Excel file'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!csv || savedDebts.length === 0 || loading}
            className="w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 px-4 rounded-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            {loading ? 'Running check-in…' : 'Run check-in'}
          </button>
        </form>

        {error && (
          <div className="mt-10 bg-destructive/10 border border-destructive/20 rounded-lg p-5">
            <p className="text-sm font-semibold text-destructive mb-1">Problem with your CSV</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
