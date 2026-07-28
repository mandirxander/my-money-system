import { parseCsvLine } from './csv'

export interface ValidationResult {
  valid: boolean
  error?: string
}

const CALCULATED_LABELS = ['total', 'remaining', 'subtotal', 'net income', 'net']
const REQUIRED_HEADERS = ['income', 'bills', 'due date', 'amount', 'paid']

function rowLooksLikeHeaders(cells: string[]): boolean {
  return cells.some(cell => REQUIRED_HEADERS.includes(cell.toLowerCase()))
}

function titleCase(s: string): string {
  return s.replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Core budget validation rules, shared by CSV upload and typed mini-form entry
 * so both input paths are held to the identical deterministic bar.
 */
export function validateRows(headers: string[], dataRows: string[][]): ValidationResult {
  const lowerHeaders = headers.map(h => h.toLowerCase())

  const missingHeaders = REQUIRED_HEADERS.filter(h => !lowerHeaders.includes(h))
  if (missingHeaders.length > 0) {
    return {
      valid: false,
      error: `Missing required column(s): ${missingHeaders.map(titleCase).join(', ')}.`,
    }
  }

  const amountIndex = lowerHeaders.findIndex(h => h === 'amount')

  let emptyAmountCount = 0

  for (const cells of dataRows) {
    // A second header row means multiple pay periods were exported together
    if (rowLooksLikeHeaders(cells)) {
      return {
        valid: false,
        error:
          'Your CSV contains multiple pay period sections. Export each pay period separately and upload one at a time.',
      }
    }

    const amountRaw = cells[amountIndex] ?? ''

    // Currency symbols or commas in Amount
    if (/[$,]/.test(amountRaw)) {
      return {
        valid: false,
        error: `Currency symbols found in Amount column (e.g. "${amountRaw}"). Remove $ signs and commas — use plain numbers like 3200.`,
      }
    }

    // Calculated / summary rows
    const rowLabel = (cells[0] || cells[1] || '').toLowerCase()
    if (CALCULATED_LABELS.some(label => rowLabel.includes(label))) {
      return {
        valid: false,
        error: `Calculated row found: "${cells[0] || cells[1]}". Remove summary rows (Total, Remaining, Subtotal, etc.) before uploading.`,
      }
    }

    if (amountRaw === '') {
      emptyAmountCount++
    } else if (isNaN(Number(amountRaw))) {
      return {
        valid: false,
        error: `Non-numeric value in Amount column: "${amountRaw}". Amounts must be plain numbers.`,
      }
    }
  }

  const dataRowCount = dataRows.length
  if (emptyAmountCount > 0 && emptyAmountCount >= dataRowCount / 2) {
    return {
      valid: false,
      error: `${emptyAmountCount} of ${dataRowCount} rows have empty Amount values. Fill in the missing amounts before uploading.`,
    }
  }

  return { valid: true }
}

export function validateCsv(csvText: string): ValidationResult {
  const lines = csvText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)

  if (lines.length < 2) {
    return { valid: false, error: 'CSV is empty or has no data rows.' }
  }

  const firstRow = parseCsvLine(lines[0])

  // If first row isn't column headers, check if second row is
  if (!rowLooksLikeHeaders(firstRow)) {
    const secondRow = lines.length > 1 ? parseCsvLine(lines[1]) : []
    if (rowLooksLikeHeaders(secondRow)) {
      return {
        valid: false,
        error:
          'Your CSV has a pay period header row at the top (e.g. "June 1–15 2026"). Delete that row before uploading so the column headers are in row 1.',
      }
    }
    return {
      valid: false,
      error:
        'Could not find column headers. Expected columns like: Income, Bills, Due Date, Amount, Paid.',
    }
  }

  const dataRows = lines.slice(1).map(parseCsvLine)
  return validateRows(firstRow, dataRows)
}
