import { parseCsvLine } from './csv'
import { validateCsv, type ValidationResult } from './validateCsv'

export interface BudgetItem {
  type: 'income' | 'bill'
  label: string
  plannedAmount: number
  actualAmount: number | null
  dueDate: string
  paid: boolean
}

const MAX_BUDGET_AMOUNT = 2_000_000

/**
 * Value-sanity guardrail for budget rows, same bar as debt/investments:
 * catches an implausible planned or actual amount before it's saved.
 * Applies identically whether the row arrived typed in or via CSV import.
 */
export function validateBudgetItems(items: BudgetItem[]): ValidationResult {
  if (items.length === 0) {
    return { valid: false, error: 'No budget rows found in the input.' }
  }

  for (const item of items) {
    if (!item.label || !item.label.trim()) {
      return { valid: false, error: 'A budget row is missing a label.' }
    }
    if (typeof item.plannedAmount !== 'number' || isNaN(item.plannedAmount)) {
      return { valid: false, error: `"${item.label}" has a non-numeric planned amount.` }
    }
    if (item.plannedAmount <= 0) {
      return { valid: false, error: `"${item.label}" has a planned amount of $${item.plannedAmount} — amounts must be greater than zero.` }
    }
    if (item.plannedAmount > MAX_BUDGET_AMOUNT) {
      return { valid: false, error: `"${item.label}" is $${item.plannedAmount.toLocaleString()}, which is outside the plausible range. Double-check this figure before saving.` }
    }
    if (item.actualAmount !== null) {
      if (typeof item.actualAmount !== 'number' || isNaN(item.actualAmount)) {
        return { valid: false, error: `"${item.label}" has a non-numeric actual amount.` }
      }
      if (item.actualAmount < 0) {
        return { valid: false, error: `"${item.label}" has an actual amount below zero.` }
      }
      if (item.actualAmount > MAX_BUDGET_AMOUNT) {
        return { valid: false, error: `"${item.label}"'s actual amount is $${item.actualAmount.toLocaleString()}, which is outside the plausible range. Double-check this figure before saving.` }
      }
    }
  }

  return { valid: true }
}

/**
 * CSV upload sets planned amounts only (actuals are filled in later via the
 * typed editor) — reuses the same deterministic shape checks (headers,
 * currency symbols, calculated rows, multi-period detection) as the original
 * budget CSV validation.
 */
export function parseBudgetCsv(csvText: string): ValidationResult & { items?: BudgetItem[] } {
  const shapeCheck = validateCsv(csvText)
  if (!shapeCheck.valid) return shapeCheck

  const lines = csvText.split('\n').map(l => l.trim()).filter(Boolean)
  const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase())
  const incomeIndex = headers.indexOf('income')
  const billsIndex = headers.indexOf('bills')
  const dueDateIndex = headers.indexOf('due date')
  const amountIndex = headers.indexOf('amount')
  const paidIndex = headers.indexOf('paid')

  const items: BudgetItem[] = lines.slice(1).map(line => {
    const cells = parseCsvLine(line)
    const isIncome = !!cells[incomeIndex]
    return {
      type: isIncome ? 'income' : 'bill',
      label: isIncome ? cells[incomeIndex] : cells[billsIndex],
      plannedAmount: Number(cells[amountIndex]) || 0,
      actualAmount: null,
      dueDate: cells[dueDateIndex] ?? '',
      paid: (cells[paidIndex] ?? '').toLowerCase() === 'yes',
    }
  })

  const valueCheck = validateBudgetItems(items)
  if (!valueCheck.valid) return valueCheck

  return { valid: true, items }
}

