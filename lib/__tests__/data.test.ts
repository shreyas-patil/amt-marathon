import { describe, expect, test } from 'vitest'
import siteData, {
  getCategories,
  getHotels,
  getSakhi,
  isExternalHref,
  raceForHref,
  registerHref,
} from '../data'

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

  test('the main site\'s Register buttons go straight to the women\'s run sign-up page', () => {
    expect(siteData.navigation.header.registerButton.href).toBe(sakhi.registrationUrl)
    expect(siteData.hero.ctaButtons[0].href).toBe(sakhi.registrationUrl)
    expect(registerHref).toBe(sakhi.registrationUrl)
  })

  test('the women\'s run registration link is the Alpha Racing page for this race', () => {
    expect(sakhi.registrationUrl).toBe('https://alpharacingsolution.com/buy/amravati-women-10k')
  })
})

describe('data — raceForHref (the GA "race" parameter)', () => {
  test('/sakhi and its Alpha Racing link are the women\'s run', () => {
    expect(raceForHref('/sakhi')).toBe('womens_10k')
    expect(raceForHref('/sakhi#categories')).toBe('womens_10k')
    expect(raceForHref(getSakhi().registrationUrl)).toBe('womens_10k')
  })

  test('anything else is the half marathon', () => {
    expect(raceForHref('/register')).toBe('half_marathon')
    expect(raceForHref(siteData.event.registrationUrl)).toBe('half_marathon')
    expect(raceForHref('/sakhiextra')).toBe('half_marathon')
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
