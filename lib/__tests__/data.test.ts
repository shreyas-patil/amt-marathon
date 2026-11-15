import { describe, expect, test } from 'vitest'
import siteData, { getCategories, getHotels, getSakhi, isExternalHref } from '../data'

describe('data — hero CTAs', () => {
  test('every hero CTA ends up with an href (literal or resolved from hrefKey)', () => {
    for (const btn of siteData.hero.ctaButtons) {
      expect(btn.href).toBeTruthy()
    }
  })

  test('a hero CTA with hrefKey "registrationUrl" would resolve to the event registration URL', () => {
    for (const btn of siteData.hero.ctaButtons) {
      if ('hrefKey' in btn && btn.hrefKey === 'registrationUrl') {
        expect(btn.href).toBe(siteData.event.registrationUrl)
      }
    }
  })

  test('a CTA without an hrefKey keeps its literal href', () => {
    const literal = siteData.hero.ctaButtons.find((b) => !('hrefKey' in b && b.hrefKey))
    expect(literal?.href).toBeTruthy()
    expect(literal?.href).not.toMatch(/^https?:/)
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

describe('data — women\'s run (getSakhi)', () => {
  const sakhi = getSakhi()

  test('lives at /sakhi and is kept out of siteData', () => {
    expect(sakhi.path).toBe('/sakhi')
    expect(siteData).not.toHaveProperty('sakhi')
  })

  test('prize rows add up to the advertised total (both age groups, both distances)', () => {
    const perGroup = sakhi.prizes.rows.reduce((sum, r) => sum + r.first + r.second, 0)
    const total = Number(sakhi.prizes.total.replace(/[^0-9]/g, ''))
    expect(perGroup * 2).toBe(total)
  })

  test('early-bird fees are ₹200 below the regular fees', () => {
    for (const d of sakhi.distances.items) {
      expect(d.fees.standard - d.fees.earlyBird).toBe(200)
    }
  })

  test('site-wide Register buttons go straight to registration when live, else to /sakhi', () => {
    const expected = sakhi.registrationUrl || sakhi.path
    expect(siteData.navigation.header.registerButton.href).toBe(expected)
    expect(siteData.hero.ctaButtons[0].href).toBe(expected)
  })
})

describe('data — isExternalHref', () => {
  test('only http(s) links count as external', () => {
    expect(isExternalHref('https://alpharacingsolution.com/buy/x')).toBe(true)
    expect(isExternalHref('http://x.test')).toBe(true)
    expect(isExternalHref('/sakhi')).toBe(false)
    expect(isExternalHref('#categories')).toBe(false)
    expect(isExternalHref(undefined)).toBe(false)
  })
})
