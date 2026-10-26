import { describe, expect, test, vi } from 'vitest'

vi.mock('@/data/results/2026.json', () => ({
  default: {
    year: 2026,
    events: [
      { id: 'shown', name: 'Shown', published: true, showTiming: true, groups: [{ label: 'Male', entries: [{ rank: 1, name: 'Visible Runner', time: '1:00:00' }] }] },
      { id: 'hidden', name: 'Hidden', published: false, showTiming: false, groups: [{ label: 'Male', entries: [{ rank: 1, name: 'Secret Runner' }] }] },
    ],
  },
}))

const { getResults } = await import('../results')

describe('getResults', () => {
  test('keeps entries for published events', () => {
    const shown = getResults().events.find((e) => e.id === 'shown')!
    expect(shown.groups[0].entries).toHaveLength(1)
  })

  test('strips entries from unpublished events even if present in the data', () => {
    const hidden = getResults().events.find((e) => e.id === 'hidden')!
    expect(hidden.groups).toHaveLength(1)
    expect(hidden.groups[0].entries).toEqual([])
    expect(JSON.stringify(getResults())).not.toContain('Secret Runner')
  })
})
