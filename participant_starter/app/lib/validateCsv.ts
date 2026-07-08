interface ValidationResult {
  valid: boolean
  error?: string
}

const CALCULATED_LABELS = ['total', 'remaining', 'subtotal', 'net income', 'net']
const RECOGNIZED_HEADERS = ['amount', 'income', 'bills', 'due date', 'paid']

function parseLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function rowLooksLikeHeaders(cells: string[]): boolean {
  return cells.some(cell => RECOGNIZED_HEADERS.includes(cell.toLowerCase()))
}

export function validateCsv(csvText: string): ValidationResult {
  const lines = csvText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)

  if (lines.length < 2) {
    return { valid: false, error: 'CSV is empty or has no data rows.' }
  }

  const firstRow = parseLine(lines[0])

  // If first row isn't column headers, check if second row is
  if (!rowLooksLikeHeaders(firstRow)) {
    const secondRow = lines.length > 1 ? parseLine(lines[1]) : []
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

  const headers = firstRow.map(h => h.toLowerCase())
  const amountIndex = headers.findIndex(h => h === 'amount')

  if (amountIndex === -1) {
    return {
      valid: false,
      error: 'Missing required column: Amount. Make sure your CSV includes an Amount column.',
    }
  }

  // Scan data rows
  let emptyAmountCount = 0

  for (let i = 1; i < lines.length; i++) {
    const cells = parseLine(lines[i])

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

  const dataRowCount = lines.length - 1
  if (emptyAmountCount > 0 && emptyAmountCount >= dataRowCount / 2) {
    return {
      valid: false,
      error: `${emptyAmountCount} of ${dataRowCount} rows have empty Amount values. Fill in the missing amounts before uploading.`,
    }
  }

  return { valid: true }
}
