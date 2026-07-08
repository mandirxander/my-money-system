'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CheckinResult {
  budgetStatus: string
  debtProgress: string
  recommendedFocus: string
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl space-y-4">

        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-6">
          Check-in · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        {/* Step 1 — Budget status */}
        {visibleStep >= 1 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Budget status</p>
            <p className="text-sm text-card-foreground leading-relaxed">{checkin.budgetStatus}</p>
            {visibleStep === 1 && (
              <button
                onClick={() => setVisibleStep(2)}
                className="mt-5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* Step 2 — Debt progress */}
        {visibleStep >= 2 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Debt progress</p>
            <p className="text-sm text-card-foreground leading-relaxed">{checkin.debtProgress}</p>
            {visibleStep === 2 && (
              <button
                onClick={() => setVisibleStep(3)}
                className="mt-5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* Step 3 — Recommended focus */}
        {visibleStep >= 3 && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-3">What to focus on</p>
            <p className="text-sm text-foreground leading-relaxed font-medium">{checkin.recommendedFocus}</p>
          </div>
        )}

        {/* Done — nav back */}
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
