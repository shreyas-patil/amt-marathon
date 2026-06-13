import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import ContactSection from '../ContactSection'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const { site, organizers, contact } = siteData

describe('ContactSection — section copy and organizers', () => {
  test('renders the organizers heading/description and both contact-box headings from data', () => {
    render(<ContactSection />)
    expect(screen.getByRole('heading', { name: contact.organizers.heading })).toBeInTheDocument()
    expect(screen.getByText(contact.organizers.description)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: contact.contactBoxes[0].heading })
    ).toBeInTheDocument()
    expect(screen.getByText(contact.contactBoxes[0].note!)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: contact.contactBoxes[1].heading })
    ).toBeInTheDocument()
  })

  test('renders every organizer’s name and role from data', () => {
    render(<ContactSection />)
    for (const org of organizers.organizers) {
      expect(screen.getByText(org.name)).toBeInTheDocument()
      if (org.role) {
        expect(screen.getAllByText(org.role).length).toBeGreaterThan(0)
      }
    }
  })
})

describe('ContactSection — organizer avatar', () => {
  test('renders an avatar image (alt = name) for every organizer that has one', () => {
    render(<ContactSection />)
    // Drive this from the real organizer list — whoever has an avatar should
    // render as an <img>, not an initials fallback.
    for (const org of organizers.organizers) {
      if (org.avatar) {
        expect(screen.getByRole('img', { name: org.name })).toBeInTheDocument()
      }
    }
  })
})

describe('ContactSection — social platforms', () => {
  test('an available platform renders a clickable handle link', () => {
    render(<ContactSection />)
    const instagram = screen.getByRole('link', {
      name: `@${site.social.instagram.displayName}`,
    })
    expect(instagram).toHaveAttribute('href', site.social.instagram.url!)
  })

  test('an unavailable platform shows "coming soon" text instead of a link', () => {
    render(<ContactSection />)
    const comingSoon = site.social.facebook.comingSoonLabel!
    expect(screen.getByText(comingSoon)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: comingSoon })).not.toBeInTheDocument()
  })

  test('clicking a social link fires social_click with platform and destination', () => {
    render(<ContactSection />)
    fireEvent.click(
      screen.getByRole('link', { name: `@${site.social.instagram.displayName}` })
    )
    expect(mockTrack).toHaveBeenCalledWith('social_click', {
      platform: 'Instagram',
      destination_url: site.social.instagram.url,
    })
  })
})

describe('ContactSection — email', () => {
  test('renders the email as a mailto link and tracks clicks from the contact box', () => {
    render(<ContactSection />)
    const emailLink = screen.getByRole('link', { name: new RegExp(site.email, 'i') })
    expect(emailLink).toHaveAttribute('href', `mailto:${site.email}`)

    fireEvent.click(emailLink)
    expect(mockTrack).toHaveBeenCalledWith('email_click', { location: 'contact_box' })
  })
})
