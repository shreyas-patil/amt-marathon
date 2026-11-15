import { describe, expect, test, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { getSakhi } from '@/lib/data'
import SakhiPage, { metadata } from '../page'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const sakhi = getSakhi()

describe('SakhiPage — hero', () => {
  test('opens with the Women\'s Day line in Marathi', () => {
    render(<SakhiPage />)
    expect(screen.getByText(sakhi.hero.kicker)).toHaveAttribute('lang', 'mr')
  })

  test('the page title is "Women\'s 10K" in English', () => {
    render(<SakhiPage />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(`${sakhi.hero.title.emphasis} ${sakhi.hero.title.rest}`)
    expect(h1).not.toHaveTextContent(sakhi.hero.title.line1)
  })

  test('shows the date in English and Marathi', () => {
    render(<SakhiPage />)
    expect(screen.getByText(sakhi.hero.date)).toBeInTheDocument()
    expect(screen.getByText(sakhi.hero.dateMr)).toBeInTheDocument()
  })

  test('Register button matches the registration link state in data', () => {
    render(<SakhiPage />)
    if (sakhi.registrationUrl) {
      expect(within(screen.getByRole('main')).getByRole('link', { name: /Register now/ })).toHaveAttribute(
        'href',
        sakhi.registrationUrl
      )
    } else {
      expect(within(screen.getByRole('main')).getByText(sakhi.registrationClosedLabel)).toBeInTheDocument()
    }
  })

})

describe('SakhiPage — sections', () => {
  test('every section heading from data is rendered', () => {
    render(<SakhiPage />)
    for (const name of [sakhi.distances.heading, sakhi.keyDates.heading]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
    expect(
      screen.getByRole('heading', { level: 2, name: /sakhi/ })
    ).toBeInTheDocument()
  })

  test('both distances and their age groups are listed', () => {
    const { container } = render(<SakhiPage />)
    const section = container.querySelector<HTMLElement>('#categories')!
    for (const d of sakhi.distances.items) {
      expect(within(section).getByRole('heading', { name: d.name })).toBeInTheDocument()
    }
    expect(screen.getByText(sakhi.distances.ageGroups)).toBeInTheDocument()
    expect(screen.getByText(sakhi.distances.ageNote)).toBeInTheDocument()
  })

  test('the prize table has one row per place with both distances', () => {
    render(<SakhiPage />)
    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row')
    expect(rows).toHaveLength(sakhi.prizes.rows.length + 1)
    expect(within(table).getByText('₹15,000')).toBeInTheDocument()
  })

  test('key dates stay on one line', () => {
    render(<SakhiPage />)
    for (const item of sakhi.keyDates.items) {
      expect(screen.getByText(item.date)).toHaveClass('whitespace-nowrap')
    }
  })

  test('ends each section with a Paithani band', () => {
    render(<SakhiPage />)
    expect(screen.getAllByTestId('paithani-band')).toHaveLength(5)
  })
})

describe('SakhiPage — metadata', () => {
  test('canonical URL is the /sakhi page', () => {
    expect(String(metadata.alternates?.canonical)).toMatch(/\/sakhi$/)
  })
})
