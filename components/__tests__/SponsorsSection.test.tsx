import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getSponsors } from '@/lib/sponsors'
import SponsorsSection from '../SponsorsSection'

// getSponsors reads the filesystem; mock it so we control both render branches.
vi.mock('@/lib/sponsors', () => ({ getSponsors: vi.fn() }))
vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockGetSponsors = vi.mocked(getSponsors)

describe('SponsorsSection', () => {
  test('renders the empty state when there are no sponsors', () => {
    mockGetSponsors.mockReturnValue([])
    render(<SponsorsSection />)
    expect(screen.getByText(/sponsor logos will appear here/i)).toBeInTheDocument()
  })

  test('renders a logo image (src + alt) for each sponsor', () => {
    const sponsors = [
      { id: 'sponsor-1', name: 'Acme Corp', logo: '/images/sponsors/acme.svg' },
      { id: 'sponsor-2', name: 'Globex', logo: '/images/sponsors/globex.png' },
    ]
    mockGetSponsors.mockReturnValue(sponsors)
    render(<SponsorsSection />)

    for (const sponsor of sponsors) {
      expect(screen.getByRole('img', { name: sponsor.name })).toHaveAttribute('src', sponsor.logo)
    }
    expect(screen.queryByText(/sponsor logos will appear here/i)).not.toBeInTheDocument()
  })
})
