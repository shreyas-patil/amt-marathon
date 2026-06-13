import { describe, expect, test } from 'vitest'
import siteData, { getCategories, getHotels } from '../data'

describe('data — cross-reference resolution', () => {
  test('hero CTA with hrefKey "registrationUrl" is resolved to the event registration URL', () => {
    const registerCta = siteData.hero.ctaButtons.find(
      (b) => 'hrefKey' in b && b.hrefKey === 'registrationUrl'
    )
    expect(registerCta?.href).toBe(siteData.event.registrationUrl)
  })

  test('hero CTA without an hrefKey is left unchanged (no href injected)', () => {
    // The "View Categories" button has a literal href and no hrefKey — it must
    // not be rewritten by the resolution step.
    const plainCta = siteData.hero.ctaButtons.find((b) => !('hrefKey' in b))
    expect(plainCta?.href).toBe('#categories')
  })
})

describe('data — convenience accessors', () => {
  test('getCategories returns the real categories array', () => {
    const categories = getCategories()
    expect(categories).toBe(siteData.categories.categories)
    expect(categories.length).toBeGreaterThan(0)
  })

  test('getHotels returns the real hotels array', () => {
    const hotels = getHotels()
    expect(hotels).toBe(siteData.hotels.hotels)
    expect(hotels.length).toBeGreaterThan(0)
  })
})
