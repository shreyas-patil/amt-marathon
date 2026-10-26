import 'server-only'
import results from '@/data/results/2026.json'
import type { ResultsData } from '@/lib/types'

// Results are kept out of siteData so they never land in a client bundle: siteData is
// imported by 'use client' components, and anything it references ships to the browser.
// Unpublished events are emptied here as a backstop, even if entries end up in the JSON.
export function getResults(): ResultsData {
  const data = results as ResultsData
  return {
    ...data,
    events: data.events.map((event) =>
      event.published ? event : { ...event, groups: event.groups.map((g) => ({ ...g, entries: [] })) }
    ),
  }
}
