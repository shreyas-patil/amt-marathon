// RegisterIframe is deprecated and not currently rendered anywhere (the register
// page uses RegisterCta). These tests keep the component working so it can be
// dropped back in when our provider ships an embeddable widget. See the
// component's JSDoc for context.
import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { trackEvent } from '@/lib/analytics'
import RegisterIframe from '../RegisterIframe'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const PROVIDER_ORIGIN = 'https://provider.example'
const EMBED_SRC = `${PROVIDER_ORIGIN}/embed/amravati-hm-2026`

function renderIframe() {
  return render(<RegisterIframe src={EMBED_SRC} messageOrigin={PROVIDER_ORIGIN} />)
}

function postMessageToWindow(data: unknown, origin: string) {
  fireEvent(window, new MessageEvent('message', { data, origin }))
}

describe('RegisterIframe — loading state', () => {
  test('shows a loading status until the iframe finishes loading', () => {
    renderIframe()
    expect(screen.getByRole('status')).toBeInTheDocument()

    fireEvent.load(screen.getByTitle(/registration/i))

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(mockTrack).toHaveBeenCalledWith('register_iframe_load')
  })

  test('embeds the src it is given', () => {
    renderIframe()
    expect(screen.getByTitle(/registration/i)).toHaveAttribute('src', EMBED_SRC)
  })
})

describe('RegisterIframe — postMessage origin handling', () => {
  test('tracks registration_complete for a message from the configured origin', () => {
    renderIframe()
    postMessageToWindow({ event: 'registration_complete' }, PROVIDER_ORIGIN)
    expect(mockTrack).toHaveBeenCalledWith('registration_complete')
  })

  test.each([
    'https://provider.example.evil.com', // suffix-spoof attempt
    'https://evil.com',
    'http://provider.example', // wrong scheme
    '',
  ])('ignores a spoofed registration message from origin %p', (origin) => {
    renderIframe()
    postMessageToWindow({ event: 'registration_complete' }, origin)
    expect(mockTrack).not.toHaveBeenCalledWith('registration_complete')
  })
})
