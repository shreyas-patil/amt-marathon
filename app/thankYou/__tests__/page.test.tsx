import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import { ThankYouContent } from '../page'

const { event } = siteData

describe('ThankYouContent — event details from data', () => {
  test('names the event and shows its date and city', () => {
    render(<ThankYouContent firstName="Asha" />)
    expect(screen.getByText(new RegExp(event.name))).toBeInTheDocument()
    expect(screen.getByText(`${event.displayDate} · ${event.location.city}`)).toBeInTheDocument()
  })
})

describe('ThankYouContent — personalization', () => {
  test('greets the runner by first name when provided', () => {
    render(<ThankYouContent firstName="Asha" />)
    expect(screen.getByRole('heading', { name: /thank you, asha!/i })).toBeInTheDocument()
  })

  test('falls back to a generic greeting when no name is provided', () => {
    render(<ThankYouContent firstName={null} />)
    expect(screen.getByRole('heading', { name: /^thank you!$/i })).toBeInTheDocument()
  })
})

describe('ThankYouContent — details card', () => {
  test('is hidden when no registration details are present', () => {
    render(<ThankYouContent firstName="Asha" />)
    expect(screen.queryByText(/confirmation sent to/i)).not.toBeInTheDocument()
  })

  test('shows the email row and confirmation note when an email is present', () => {
    render(<ThankYouContent firstName="Asha" email="asha@example.com" />)
    expect(screen.getByText(/confirmation sent to/i)).toBeInTheDocument()
    expect(screen.getAllByText('asha@example.com').length).toBeGreaterThan(0)
  })

  test('appears when only a ticket id is present (no email)', () => {
    render(<ThankYouContent firstName={null} ticketIds="TS-12345" />)
    expect(screen.getByText(/ticket id/i)).toBeInTheDocument()
    expect(screen.getByText('TS-12345')).toBeInTheDocument()
    // The email-specific confirmation note must not render without an email.
    expect(screen.queryByText(/check your inbox/i)).not.toBeInTheDocument()
  })
})
