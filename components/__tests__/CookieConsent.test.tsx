import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import CookieConsent from '../CookieConsent'

const CONSENT_KEY = 'amt_cookie_consent'

beforeEach(() => {
  // accept() / decline() call window.gtag directly (not via trackEvent), so we
  // observe gtag itself — this is the call that matters for consent compliance.
  window.gtag = vi.fn()
})

describe('CookieConsent', () => {
  test('shows the banner on first visit (no stored consent)', () => {
    render(<CookieConsent />)
    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument()
  })

  test('hides the banner once consent has been recorded', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    render(<CookieConsent />)
    expect(screen.queryByRole('button', { name: /accept/i })).not.toBeInTheDocument()
  })

  test('Accept grants analytics consent via gtag, stores it, and dismisses the banner', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByRole('button', { name: /accept/i }))

    expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
    })
    expect(localStorage.getItem(CONSENT_KEY)).toBe('accepted')
    expect(screen.queryByRole('button', { name: /accept/i })).not.toBeInTheDocument()
  })

  test('Decline stores the choice WITHOUT granting consent, then dismisses the banner', () => {
    render(<CookieConsent />)
    fireEvent.click(screen.getByRole('button', { name: /decline/i }))

    expect(window.gtag).not.toHaveBeenCalled()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('declined')
    expect(screen.queryByRole('button', { name: /decline/i })).not.toBeInTheDocument()
  })

  test('does not render (no crash) when localStorage access throws', () => {
    vi.mocked(localStorage.getItem).mockImplementationOnce(() => {
      throw new Error('storage blocked')
    })
    render(<CookieConsent />)
    expect(screen.queryByRole('button', { name: /accept/i })).not.toBeInTheDocument()
  })
})
