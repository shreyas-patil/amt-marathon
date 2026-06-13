import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { trackEvent } from '@/lib/analytics'
import RegisterIframe from '../RegisterIframe'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const TOWNSCRIPT_ORIGIN = 'https://www.townscript.com'

function postMessageToWindow(data: unknown, origin: string) {
  fireEvent(window, new MessageEvent('message', { data, origin }))
}

describe('RegisterIframe — loading state', () => {
  test('shows a loading status until the iframe finishes loading', () => {
    render(<RegisterIframe />)
    expect(screen.getByRole('status')).toBeInTheDocument()

    fireEvent.load(screen.getByTitle(/registration/i))

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(mockTrack).toHaveBeenCalledWith('townscript_iframe_load')
  })
})

describe('RegisterIframe — postMessage origin handling', () => {
  test('tracks registration_complete for a message from the Townscript origin', () => {
    render(<RegisterIframe />)
    postMessageToWindow({ event: 'registration_complete' }, TOWNSCRIPT_ORIGIN)
    expect(mockTrack).toHaveBeenCalledWith('registration_complete')
  })

  test.each([
    'https://www.townscript.com.evil.com', // suffix-spoof attempt
    'https://evil.com',
    'https://townscript.com', // missing the www. host the code requires
    '',
  ])('ignores a spoofed registration message from origin %p', (origin) => {
    render(<RegisterIframe />)
    postMessageToWindow({ event: 'registration_complete' }, origin)
    expect(mockTrack).not.toHaveBeenCalledWith('registration_complete')
  })
})
