import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import HotelsSection from '../HotelsSection'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const { hotels } = siteData

describe('HotelsSection — section copy and per-hotel data', () => {
  test('renders the section tag, heading, description, and footer note from data', () => {
    render(<HotelsSection />)
    expect(screen.getByText(hotels.section.sectionTag)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: hotels.section.heading })).toBeInTheDocument()
    expect(screen.getByText(hotels.section.description)).toBeInTheDocument()
    expect(screen.getByText(hotels.section.footerNote)).toBeInTheDocument()
  })

  test('renders each hotel’s city and a Book Now link to its booking URL', () => {
    render(<HotelsSection />)
    const bookHrefs = screen
      .getAllByRole('link', { name: hotels.section.bookNowLabel })
      .map((link) => link.getAttribute('href'))

    for (const hotel of hotels.hotels) {
      expect(screen.getAllByText(hotel.city).length).toBeGreaterThan(0)
      expect(bookHrefs).toContain(hotel.bookingUrl)
    }
  })
})

describe('HotelsSection', () => {
  test('renders every hotel from the real data', () => {
    render(<HotelsSection />)
    for (const hotel of hotels.hotels) {
      expect(screen.getByText(hotel.name)).toBeInTheDocument()
    }
  })

  test('every phone link is a tel: link stripped to digits only', () => {
    render(<HotelsSection />)
    for (const hotel of hotels.hotels) {
      for (const num of hotel.contactNumbers) {
        const digits = num.replace(/\D/g, '')
        expect(screen.getByRole('link', { name: num })).toHaveAttribute('href', `tel:${digits}`)
      }
    }
  })

  test('shows each hotel’s initials with the "Hotel" prefix dropped', () => {
    render(<HotelsSection />)
    // Derive the expected initials from each real hotel name (e.g.
    // "Hotel Shreepad Continental" -> "SC"). getAllByText tolerates the
    // collisions that real names produce (e.g. two hotels both -> "RI").
    for (const hotel of hotels.hotels) {
      const initials = hotel.name
        .replace(/^Hotel\s+/i, '')
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

      expect(screen.getAllByText(initials).length).toBeGreaterThan(0)
    }
  })

  test('clicking a phone link fires hotel_phone_click tagged with the hotel name', () => {
    render(<HotelsSection />)
    const hotel = hotels.hotels[0]
    fireEvent.click(screen.getByRole('link', { name: hotel.contactNumbers[0] }))
    expect(mockTrack).toHaveBeenCalledWith('hotel_phone_click', { hotel_name: hotel.name })
  })
})
