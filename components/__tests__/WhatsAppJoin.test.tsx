import { afterEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import WhatsAppJoin from '../WhatsAppJoin'

const GROUP_URL = 'https://chat.whatsapp.com/TESTGROUP?mode=gi_t'

function setUserAgent(ua: string) {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(ua)
}

// The component decides phone-vs-desktop from a media query (viewport size /
// pointer type). Stub it so each test controls the answer.
function setMatchMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  }))
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('WhatsAppJoin — common content', () => {
  test('always shows the group invitation heading', () => {
    setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)')
    setMatchMedia(false)
    render(<WhatsAppJoin groupUrl={GROUP_URL} />)
    expect(
      screen.getByRole('heading', { name: /join the runners' whatsapp group/i })
    ).toBeInTheDocument()
  })
})

describe('WhatsAppJoin — phones', () => {
  test('shows a tappable button (no QR) on a phone-sized / touch viewport', () => {
    // Desktop UA, but the media query reports a phone-sized viewport — this is
    // the responsive-mode / iPad case that must still show the button.
    setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)')
    setMatchMedia(true)
    render(<WhatsAppJoin groupUrl={GROUP_URL} />)

    const link = screen.getByRole('link', { name: /join on whatsapp/i })
    expect(link).toHaveAttribute('href', GROUP_URL)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('shows the button when the user agent is a phone, regardless of viewport', () => {
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')
    setMatchMedia(false)
    render(<WhatsAppJoin groupUrl={GROUP_URL} />)

    expect(screen.getByRole('link', { name: /join on whatsapp/i })).toHaveAttribute(
      'href',
      GROUP_URL
    )
  })
})

describe('WhatsAppJoin — desktop', () => {
  test('shows the QR code to scan instead of a button', () => {
    setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)')
    setMatchMedia(false)
    render(<WhatsAppJoin groupUrl={GROUP_URL} />)

    expect(screen.getByRole('img', { name: /qr code to join/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /join on whatsapp/i })).not.toBeInTheDocument()
  })
})
