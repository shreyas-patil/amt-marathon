import { afterEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import CategoriesSection from '../CategoriesSection'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const { categories } = siteData

// The component renders each category twice (a desktop grid + a mobile column),
// both present in the DOM, so we assert with getAllByText / forEach.

afterEach(() => {
  vi.useRealTimers() // critical: fake time must not leak into other files
})

describe('CategoriesSection — section copy and fees', () => {
  test('renders the section heading, fees-table caption, and CTA label from data', () => {
    render(<CategoriesSection />)
    expect(screen.getByRole('heading', { name: categories.section.heading })).toBeInTheDocument()
    expect(screen.getByText(categories.section.feesTableCaption)).toBeInTheDocument()
    expect(screen.getAllByText(categories.section.ctaLabel).length).toBeGreaterThan(0)
  })

  test('renders each category’s age group and early-bird/standard fees from data', () => {
    render(<CategoriesSection />)
    for (const cat of categories.categories) {
      expect(screen.getAllByText(cat.ageGroup).length).toBeGreaterThan(0)
      expect(
        screen.getAllByText(`₹${cat.fees.earlyBird.toLocaleString()}`).length
      ).toBeGreaterThan(0)
      expect(screen.getAllByText(`₹${cat.fees.standard.toLocaleString()}`).length).toBeGreaterThan(
        0
      )
    }
  })
})

describe('CategoriesSection — displayName', () => {
  test('each card heading is the category name with any leading distance prefix removed', () => {
    render(<CategoriesSection />)

    // Derive the expected heading from the real data so content edits don't
    // break this — but still verify against the DOM, so the test fails if the
    // component stops applying (or mis-applies) the stripping logic.
    for (const cat of categories.categories) {
      const expected = cat.name.startsWith(cat.distance)
        ? cat.name.slice(cat.distance.length).trim()
        : cat.name

      expect(screen.getAllByRole('heading', { name: expected }).length).toBeGreaterThan(0)

      // When stripping should occur, the original distance-prefixed name must
      // not survive as a heading (the fees table still shows it in a <td>).
      if (expected !== cat.name) {
        expect(screen.queryByRole('heading', { name: cat.name })).not.toBeInTheDocument()
      }
    }
  })
})

describe('CategoriesSection — early bird deadline', () => {
  // Deadline in data is 2026-07-31T18:30:00Z. setSystemTime must run BEFORE
  // render() because the expiry is computed in a useState lazy initializer.
  test('before the deadline, early-bird pricing is shown normally', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-01T00:00:00Z'))
    render(<CategoriesSection />)

    for (const label of screen.getAllByText('Early bird')) {
      expect(label).not.toHaveClass('line-through')
    }
  })

  test('after the deadline, early-bird pricing is struck through', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-15T00:00:00Z'))
    render(<CategoriesSection />)

    for (const label of screen.getAllByText('Early bird')) {
      expect(label).toHaveClass('line-through')
    }
  })
})
