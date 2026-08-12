import { NextRequest } from 'next/server'

/**
 * Minimal per-tester data isolation for the pilot deployment — not real auth.
 * Each tester picks a household name/code once (stored client-side in
 * localStorage) and sends it as this header on every request. Every table
 * read/write is scoped to it. Nothing verifies identity — anyone who knows
 * or guesses another household's key could read/write that household's
 * data. Acceptable for a small trusted-family pilot; documented as a known
 * limitation in docs/specs/deployment_specs.md.
 */
export const HOUSEHOLD_HEADER = 'x-household-key'

export function getHouseholdKey(request: NextRequest): string | null {
  const key = request.headers.get(HOUSEHOLD_HEADER)?.trim()
  return key && key.length > 0 ? key : null
}

export function householdKeyMissingResponse() {
  return Response.json(
    { error: 'Missing household key. Set up your household name before using the app.' },
    { status: 400 }
  )
}
