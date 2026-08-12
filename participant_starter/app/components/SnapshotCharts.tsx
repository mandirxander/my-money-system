// Chart hues follow the dataviz skill's validated default palette (not the
// app's theme tokens — the theme's --chart-* tokens are too desaturated to
// clear the colorblind-safe chroma floor). Single-hue sequential blue for
// magnitude bars; status green/red for gamified win states.
const SEQUENTIAL_HUE = '#2a78d6'
const STATUS_GOOD = '#0ca30c'
const STATUS_TRACK = '#e1e0d9'

interface LineItem {
  label: string
  amount: number
}

export function BreakdownBarChart({ title, items }: { title: string; items: LineItem[] }) {
  if (items.length === 0) return null
  const max = Math.max(...items.map(i => i.amount), 1)

  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{title}</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground">{item.label}</span>
              <span className="text-muted-foreground">${item.amount.toLocaleString()}</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.max((item.amount / max) * 100, 4)}%`, backgroundColor: SEQUENTIAL_HUE }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BudgetMeter({ income, bills }: { income: number; bills: number }) {
  const met = bills <= income
  const pct = income > 0 ? Math.min((bills / income) * 100, 100) : 0

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">Bills vs. income this period</span>
        <span className="text-foreground font-medium">
          ${bills.toLocaleString()} / ${income.toLocaleString()}
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: STATUS_TRACK }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: met ? STATUS_GOOD : '#d03b3b' }}
        />
      </div>
    </div>
  )
}

function DeltaArrow({ good }: { good: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
      <path
        d={good ? 'M5 8V2M2 5l3 3 3-3' : 'M5 2v6M2 5l3-3 3 3'}
        stroke={good ? STATUS_GOOD : '#898781'}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Shows a delta vs. the previous check-in snapshot. Renders nothing on the first-ever check-in. */
export function SnapshotDelta({
  label,
  current,
  previous,
  goodDirection,
}: {
  label: string
  current: number
  previous: number | null
  goodDirection: 'down' | 'up'
}) {
  if (previous === null) return null

  const diff = current - previous
  if (diff === 0) return null

  const wentUp = diff > 0
  const good = goodDirection === 'up' ? wentUp : !wentUp

  return (
    <div className="flex items-center gap-1.5 text-xs mt-1.5">
      <DeltaArrow good={good} />
      <span className={good ? 'font-medium' : 'text-muted-foreground'} style={good ? { color: STATUS_GOOD } : undefined}>
        ${Math.abs(diff).toLocaleString()} {wentUp ? 'more' : 'less'} than last check-in
      </span>
      <span className="text-muted-foreground">— {label}</span>
    </div>
  )
}

/** A celebratory callout for a genuine win (debt down, or budget met) vs. the previous snapshot. */
export function WinBanner({ message }: { message: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium"
      style={{ backgroundColor: 'rgba(12, 163, 12, 0.08)', color: STATUS_GOOD }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
        <circle cx="8" cy="8" r="7" fill="none" stroke={STATUS_GOOD} strokeWidth="1.5" />
        <path d="M5 8.2l2 2 4-4.4" fill="none" stroke={STATUS_GOOD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {message}
    </div>
  )
}
