import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import ResultsPage from '../page'

const ph = siteData.results.placeholderContent

describe('ResultsPage', () => {
  test('renders the placeholder content from the results data', () => {
    render(<ResultsPage />)
    expect(screen.getByText(ph.icon)).toBeInTheDocument()
    expect(screen.getByText(ph.tag)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: ph.heading })).toBeInTheDocument()
    expect(screen.getByText(ph.subtext)).toBeInTheDocument()
    expect(screen.getByText(ph.description)).toBeInTheDocument()
  })
})
