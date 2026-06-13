import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import HeroSection from '../HeroSection'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const { hero } = siteData

describe('HeroSection — renders all content it pulls from data', () => {
  test('shows the location tag, every heading line, edition, description, and scroll label', () => {
    render(<HeroSection />)
    expect(screen.getByText(hero.locationTag)).toBeInTheDocument()
    for (const line of hero.headingLines) {
      expect(screen.getByText(line)).toBeInTheDocument()
    }
    expect(screen.getByText(hero.edition)).toBeInTheDocument()
    expect(screen.getByText(hero.description)).toBeInTheDocument()
    expect(screen.getByText(hero.scrollIndicator.label)).toBeInTheDocument()
  })
})

describe('HeroSection', () => {
  // Note: the primary CTA routes to the internal "/register" page (which hosts
  // the Townscript iframe). The resolved event.registrationUrl is consumed
  // there, not on the hero — so we pin "/register" as the real behavior.
  test('primary CTA links to the internal register route', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: hero.ctaButtons[0].label })).toHaveAttribute(
      'href',
      '/register'
    )
  })

  test('clicking the primary CTA fires cta_register_click attributed to the hero', () => {
    render(<HeroSection />)
    fireEvent.click(screen.getByRole('link', { name: hero.ctaButtons[0].label }))
    expect(mockTrack).toHaveBeenCalledWith('cta_register_click', { location: 'hero' })
  })

  test('secondary CTA uses its data href and fires nav_click with that destination', () => {
    render(<HeroSection />)
    const secondary = screen.getByRole('link', { name: hero.ctaButtons[1].label })

    expect(secondary).toHaveAttribute('href', hero.ctaButtons[1].href)
    fireEvent.click(secondary)
    expect(mockTrack).toHaveBeenCalledWith('nav_click', {
      label: hero.ctaButtons[1].label,
      destination: hero.ctaButtons[1].href,
    })
  })
})
