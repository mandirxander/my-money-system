'use client'

import { useState } from 'react'

export default function Home() {
  const [csv, setCsv] = useState<File | null>(null)
  const [mood, setMood] = useState('good')
  const [babyStep, setBabyStep] = useState('2')
  const [response, setResponse] = useState('')
  const [csvPreview, setCsvPreview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!csv) return

    setLoading(true)
    setResponse('')
    setError('')
    setCsvPreview('')

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
        setResponse(data.response)
        setCsvPreview(data.csvPreview)
      }
    } catch {
      setError('Request failed — check the browser console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-1">My Money System</h1>
        <p className="text-zinc-400 text-sm mb-10">Check-in · Spike build</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              How are you coming into this check-in?
            </label>
            <select
              value={mood}
              onChange={e => setMood(e.target.value)}
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-800 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <option value="good">Good — things are on track</option>
              <option value="stressed">A bit stressed</option>
              <option value="crisis">In crisis mode</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Current Baby Step
            </label>
            <select
              value={babyStep}
              onChange={e => setBabyStep(e.target.value)}
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-800 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <option value="1">Step 1 — $1,000 starter emergency fund</option>
              <option value="2">Step 2 — Pay off debt (debt snowball)</option>
              <option value="3">Step 3 — 3–6 months full emergency fund</option>
              <option value="4">Step 4 — Invest 15% for retirement</option>
              <option value="5">Step 5 — Save for college</option>
              <option value="6">Step 6 — Pay off home early</option>
              <option value="7">Step 7 — Build wealth and give</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Upload your budget CSV
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={e => setCsv(e.target.files?.[0] || null)}
              className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-zinc-900 file:text-white hover:file:bg-zinc-700 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={!csv || loading}
            className="w-full bg-zinc-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg disabled:opacity-40 hover:bg-zinc-700 transition-colors"
          >
            {loading ? 'Running check-in...' : 'Run check-in'}
          </button>
        </form>

        {csvPreview && (
          <div className="mt-10">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">CSV preview — first 5 rows</p>
            <pre className="bg-zinc-100 rounded-lg p-4 text-xs text-zinc-600 overflow-x-auto whitespace-pre-wrap">{csvPreview}</pre>
          </div>
        )}

        {error && (
          <div className="mt-10 bg-red-50 border border-red-200 rounded-lg p-5">
            <p className="text-sm font-semibold text-red-700 mb-1">Problem with your CSV</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {response && (
          <div className="mt-10 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-4">Check-in</p>
            <div className="text-sm text-zinc-800 leading-relaxed whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </div>
    </div>
  )
}
