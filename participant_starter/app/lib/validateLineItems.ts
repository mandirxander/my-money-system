import type { ValidationResult } from './validateCsv'

export interface LineItem {
  label: string
  amount: number
}

interface LineItemOptions {
  /** Backstop against a garbled or mistyped value — not a real ceiling on the figure itself. */
  maxAmount?: number
  /** e.g. "debt", "investment" — used in error messages. */
  itemName?: string
}

/**
 * Runtime guardrail shared by debt and investment/asset figures: catches an
 * implausible value (negative, zero, or wildly out of range) before it's
 * saved to Supabase and treated as fact in the check-in. Applies identically
 * regardless of whether the figure arrived typed in or via CSV upload.
 */
export function validateLineItemValues(items: LineItem[], opts: LineItemOptions = {}): ValidationResult {
  const { maxAmount = 2_000_000, itemName = 'item' } = opts

  if (items.length === 0) {
    return { valid: false, error: `No ${itemName}s found in the input.` }
  }

  for (const item of items) {
    if (!item.label || !item.label.trim()) {
      return { valid: false, error: `A ${itemName} is missing a label.` }
    }
    if (typeof item.amount !== 'number' || isNaN(item.amount)) {
      return { valid: false, error: `"${item.label}" has a non-numeric amount.` }
    }
    if (item.amount <= 0) {
      return {
        valid: false,
        error: `"${item.label}" has an amount of $${item.amount} — amounts must be greater than zero.`,
      }
    }
    if (item.amount > maxAmount) {
      return {
        valid: false,
        error: `"${item.label}" is $${item.amount.toLocaleString()}, which is outside the plausible range. Double-check this figure before saving.`,
      }
    }
  }

  return { valid: true }
}
