import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { trackEvent } from '@/lib/analytics'
import SponsorEmptyState from '../SponsorEmptyState'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)

describe('SponsorEmptyState', () => {
  test('shows the placeholder message when there are no sponsors', () => {
    render(<SponsorEmptyState />)
    expect(screen.getByText(/sponsor logos will appear here/i)).toBeInTheDocument()
  })

  test('clicking "Get in touch" fires sponsor_contact_click', () => {
    render(<SponsorEmptyState />)
    fireEvent.click(screen.getByRole('link', { name: /get in touch/i }))
    expect(mockTrack).toHaveBeenCalledWith('sponsor_contact_click')
  })
})
