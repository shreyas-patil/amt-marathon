import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import CashPrizesSection from '../CashPrizesSection'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const { prizes } = siteData

// Resolve a tab's categories the same way the component does, from real data.
const categoriesOf = (tab: (typeof prizes.tabs)[number]) =>
  prizes.categories.filter((c) => tab.categoryIds.includes(c.id))

const [firstTab, secondTab] = prizes.tabs
const firstTabCategories = categoriesOf(firstTab)
const secondTabCategories = categoriesOf(secondTab)

describe('CashPrizesSection — section notes and per-category data', () => {
  test('renders the eligibility note and the out-of-Maharashtra note from data', () => {
    render(<CashPrizesSection />)
    expect(screen.getByText(prizes.section.eligibilityNote)).toBeInTheDocument()
    expect(screen.getByText(prizes.section.outOfMaharashtraNote)).toBeInTheDocument()
  })

  test('renders each active category’s name, age note, and column headers from data', () => {
    render(<CashPrizesSection />)
    for (const cat of firstTabCategories) {
      expect(screen.getByRole('heading', { name: cat.name })).toBeInTheDocument()
      expect(screen.getAllByText(cat.ageNote).length).toBeGreaterThan(0)
      for (const column of cat.columns) {
        expect(screen.getAllByText(column).length).toBeGreaterThan(0)
      }
    }
  })
})

describe('CashPrizesSection', () => {
  test('shows the first tab’s prize tables on initial render', () => {
    render(<CashPrizesSection />)

    for (const cat of firstTabCategories) {
      expect(screen.getByRole('heading', { name: cat.name })).toBeInTheDocument()
    }
    // Categories that belong only to a later tab are not shown yet.
    for (const cat of secondTabCategories) {
      if (!firstTabCategories.includes(cat)) {
        expect(screen.queryByRole('heading', { name: cat.name })).not.toBeInTheDocument()
      }
    }
  })

  test('clicking a tab switches the displayed prize tables', () => {
    render(<CashPrizesSection />)
    fireEvent.click(screen.getByRole('button', { name: secondTab.label }))

    for (const cat of secondTabCategories) {
      expect(screen.getByRole('heading', { name: cat.name })).toBeInTheDocument()
    }
    for (const cat of firstTabCategories) {
      if (!secondTabCategories.includes(cat)) {
        expect(screen.queryByRole('heading', { name: cat.name })).not.toBeInTheDocument()
      }
    }
  })

  test('clicking a tab fires prize_tab_click with that tab’s id and label', () => {
    render(<CashPrizesSection />)
    fireEvent.click(screen.getByRole('button', { name: secondTab.label }))

    expect(mockTrack).toHaveBeenCalledWith('prize_tab_click', {
      tab_id: secondTab.id,
      tab_label: secondTab.label,
    })
  })

  test('formats prize amounts with the en-IN rupee grouping', () => {
    render(<CashPrizesSection />)
    // Take a real, non-null amount from the active tab and assert the user sees
    // its ₹-prefixed, en-IN-grouped form (e.g. 21000 -> ₹21,000).
    const amount = firstTabCategories
      .flatMap((c) => c.prizes)
      .flatMap((p) => p.amounts)
      .find((a) => a != null)!

    expect(screen.getAllByText(`₹${amount.toLocaleString('en-IN')}`).length).toBeGreaterThan(0)
  })

  test('drops prize rows whose amounts are all null', () => {
    render(<CashPrizesSection />)
    // The number of rendered rank cells (#1, #2, …) must equal the count of
    // rows that have at least one real amount — i.e. all-null rows are filtered.
    const expectedRankCells = firstTabCategories.reduce(
      (total, cat) => total + cat.prizes.filter((p) => p.amounts.some((a) => a != null)).length,
      0
    )

    expect(screen.getAllByText(/^#\d+$/)).toHaveLength(expectedRankCells)
  })
})
