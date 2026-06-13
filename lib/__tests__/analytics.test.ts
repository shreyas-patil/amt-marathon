import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { trackEvent } from '../analytics'

// analytics.ts is the real module here (not mocked) — we're testing its guards.
// We swap window.location to control hostname, and stub window.gtag to observe
// whether the event is forwarded.

const originalLocation = window.location

function setHostname(hostname: string) {
  Object.defineProperty(window, 'location', {
    value: { hostname },
    writable: true,
    configurable: true,
  })
}

beforeEach(() => {
  window.gtag = vi.fn()
})

afterEach(() => {
  Object.defineProperty(window, 'location', {
    value: originalLocation,
    writable: true,
    configurable: true,
  })
})

describe('trackEvent', () => {
  test('does nothing on localhost — keeps dev noise out of analytics', () => {
    setHostname('localhost')
    trackEvent('nav_click', { label: 'x' })
    expect(window.gtag).not.toHaveBeenCalled()
  })

  test('forwards event to gtag with name and params on a production hostname', () => {
    setHostname('runamravati.com')
    trackEvent('nav_click', { label: 'Prizes', destination: '/prizes' })
    expect(window.gtag).toHaveBeenCalledWith('event', 'nav_click', {
      label: 'Prizes',
      destination: '/prizes',
    })
  })

  test('does not throw when window.gtag is undefined (safe optional delegation)', () => {
    setHostname('runamravati.com')
    window.gtag = undefined
    expect(() => trackEvent('cta_register_click')).not.toThrow()
  })

  test('no-op when window is undefined (SSR guard) — never crash on the server', () => {
    vi.stubGlobal('window', undefined)
    expect(() => trackEvent('section_view', { section_id: 'prizes' })).not.toThrow()
    vi.unstubAllGlobals()
  })

  // Known gap, pinned deliberately: the guard matches the literal 'localhost'
  // only, so 127.0.0.1 / LAN IPs DO fire events. Documented in the testing
  // plan's adversarial review (#10). If the guard is tightened, flip this test.
  test('fires on 127.0.0.1 — guard covers only the "localhost" hostname', () => {
    setHostname('127.0.0.1')
    trackEvent('nav_click')
    expect(window.gtag).toHaveBeenCalledWith('event', 'nav_click', undefined)
  })
})
