import { parseCsvLine } from './csv'
import { validateLineItemValues, type LineItem } from './validateLineItems'
import type { ValidationResult } from './validateCsv'

const REQUIRED_HEADERS = ['label', 'amount']

export interface LineItemCsvResult extends ValidationResult {
  items?: LineItem[]
}

interface LineItemCsvOptions {
  maxAmount?: number
  itemName?: string
}

/**
 * Deterministic CSV validation for label/amount figures (debt, investments —
 * anything shaped as a flat list of items). No LLM involved, so both the
 * typed and uploaded paths for a given figure type hit the same bar.
 */
export function validateLineItemsCsv(csvText: string, opts: LineItemCsvOptions = {}): LineItemCsvResult {
  const lines = csvText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)

  if (lines.length < 2) {
    return { valid: false, error: 'CSV is empty or has no data rows.' }
  }

  const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase())
  const missingHeaders = REQUIRED_HEADERS.filter(h => !headers.includes(h))
  if (missingHeaders.length > 0) {
    return {
      valid: false,
      error: `Missing required column(s): ${missingHeaders
        .map(h => h.replace(/\b\w/g, c => c.toUpperCase()))
        .join(', ')}. Expected columns: Label, Amount.`,
    }
  }

  const labelIndex = headers.indexOf('label')
  const amountIndex = headers.indexOf('amount')

  const items: LineItem[] = []

  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i])
    const label = cells[labelIndex] ?? ''
    const amountRaw = cells[amountIndex] ?? ''

    if (/[$,]/.test(amountRaw)) {
      return {
        valid: false,
        error: `Currency symbols found in Amount column (e.g. "${amountRaw}"). Remove $ signs and commas — use plain numbers like 8400.`,
      }
    }

    if (!label.trim()) {
      return { valid: false, error: `Row ${i + 1} is missing a label.` }
    }

    if (amountRaw === '' || isNaN(Number(amountRaw))) {
      return { valid: false, error: `"${label}" has a missing or non-numeric amount.` }
    }

    items.push({ label, amount: Number(amountRaw) })
  }

  const valueCheck = validateLineItemValues(items, opts)
  if (!valueCheck.valid) {
    return valueCheck
  }

  return { valid: true, items }
}
