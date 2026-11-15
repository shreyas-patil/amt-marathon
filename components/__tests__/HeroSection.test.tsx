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
  // The primary CTA sends visitors to the featured event page (currently the
  // women's run at /sakhi); the href lives in data/hero.json.
  test('primary CTA links to the href set in data', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: hero.ctaButtons[0].label })).toHaveAttribute(
      'href',
      hero.ctaButtons[0].href
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

describe('HeroSection — theme', () => {
  test('a Marathi edition line is marked as Marathi', () => {
    render(<HeroSection />)
    const edition = screen.getByText(hero.edition)
    if (hero.editionLang === 'mr') {
      expect(edition).toHaveAttribute('lang', 'mr')
      expect(edition.className).not.toMatch(/uppercase|tracking/)
    }
  })

  test('the primary button follows the theme colour', () => {
    render(<HeroSection />)
    const button = screen.getByRole('link', { name: hero.ctaButtons[0].label })
    expect(button.className).toMatch(hero.theme === 'sakhi' ? /bg-sakhi/ : /bg-orange-500/)
  })
})
