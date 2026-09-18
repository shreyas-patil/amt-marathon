import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import RegisterCta from '../RegisterCta'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const { event } = siteData

describe('RegisterCta', () => {
  test('links to the registration URL from data, opening in a new tab', () => {
    render(<RegisterCta />)
    const cta = screen.getByRole('link', { name: /continue to registration/i })
    expect(cta).toHaveAttribute('href', event.registrationUrl)
    // Opens the provider in a new tab, with rel hardening against reverse tabnabbing.
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('clicking the CTA fires register_outbound_click', () => {
    render(<RegisterCta />)
    fireEvent.click(screen.getByRole('link', { name: /continue to registration/i }))
    expect(mockTrack).toHaveBeenCalledWith('register_outbound_click')
  })
})
