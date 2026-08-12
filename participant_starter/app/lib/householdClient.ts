// Client-side counterpart to lib/household.ts — reads/writes the household
// key testers pick once, and builds the header every fetch call needs to
// send it. See lib/household.ts for what this is (and isn't) protecting.
const STORAGE_KEY = 'household_key'

export function getStoredHouseholdKey(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}

export function setStoredHouseholdKey(key: string) {
  localStorage.setItem(STORAGE_KEY, key)
}

export function clearStoredHouseholdKey() {
  localStorage.removeItem(STORAGE_KEY)
}

export function householdHeaders(key: string): Record<string, string> {
  return { 'x-household-key': key }
}
