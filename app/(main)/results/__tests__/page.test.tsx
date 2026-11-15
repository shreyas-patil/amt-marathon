import { describe, expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { getResults } from '@/lib/results'
import ResultsPage from '../page'

const results = getResults()
const published = results.events.filter((e) => e.published)
const unpublished = results.events.filter((e) => !e.published)

describe('ResultsPage', () => {
  test('renders a section for every published event with each winner', () => {
    render(<ResultsPage />)
    expect(screen.getByRole('heading', { level: 1, name: results.resultsContent.heading })).toBeInTheDocument()
    expect(screen.getByRole('note')).toHaveTextContent(results.resultsContent.provisionalNote)

    for (const event of published) {
      const section = document.getElementById(event.id)!
      expect(within(section).getByRole('heading', { level: 2, name: event.name })).toBeInTheDocument()
      for (const group of event.groups) {
        expect(group.entries.length).toBeLessThanOrEqual(5)
        for (const entry of group.entries) {
          expect(within(section).getAllByText(entry.name).length).toBeGreaterThan(0)
        }
      }
    }
  })

  test('shows timings only for published events that have showTiming', () => {
    render(<ResultsPage />)
    for (const event of published) {
      const section = document.getElementById(event.id)!
      const timeHeaders = within(section).queryAllByText(results.resultsContent.timeLabel)
      expect(timeHeaders.length).toBe(event.showTiming ? event.groups.length : 0)
      if (event.showTiming) {
        for (const entry of event.groups.flatMap((g) => g.entries)) {
          expect(within(section).getByText(entry.time!)).toBeInTheDocument()
        }
      }
    }
  })

  test('unpublished events show the pending note and no names', () => {
    render(<ResultsPage />)
    for (const event of unpublished) {
      const section = document.getElementById(event.id)!
      expect(within(section).getByRole('heading', { level: 2, name: event.name })).toBeInTheDocument()
      expect(within(section).getByText(results.resultsContent.pendingNote)).toBeInTheDocument()
      expect(within(section).queryByRole('table')).not.toBeInTheDocument()
      for (const entry of event.groups.flatMap((g) => g.entries)) {
        expect(screen.queryByText(entry.name)).not.toBeInTheDocument()
      }
    }
  })
})
