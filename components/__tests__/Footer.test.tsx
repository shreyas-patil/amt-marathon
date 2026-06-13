import { afterEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import Footer from '../Footer'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const { site, navigation, footer, event } = siteData

describe('Footer — renders all content it pulls from data', () => {
  test('shows the brand block, column headings, and copyright from data', () => {
    render(<Footer />)
    expect(screen.getByText(footer.brand.tagline1)).toBeInTheDocument()
    expect(screen.getByText(footer.brand.nameWordmark[0])).toBeInTheDocument()
    expect(screen.getByText(footer.brand.nameWordmark[1])).toBeInTheDocument()
    expect(screen.getByText(footer.brand.description)).toBeInTheDocument()
    expect(screen.getByText(footer.sections.quickLinks.heading)).toBeInTheDocument()
    expect(screen.getByText(footer.sections.eventDetails.heading)).toBeInTheDocument()
    expect(
      screen.getByText(footer.copyright.replace('{year}', String(event.year)))
    ).toBeInTheDocument()
  })

  test('shows the event date/location and both partners from data', () => {
    render(<Footer />)
    expect(screen.getByText(new RegExp(event.displayDate))).toBeInTheDocument()
    // displayMedium ("Amravati, Maharashtra") also appears in the brand blurb.
    expect(screen.getAllByText(new RegExp(event.location.displayMedium)).length).toBeGreaterThan(0)
    expect(screen.getByText(new RegExp(site.partners.registration.label))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: site.partners.registration.name })).toBeInTheDocument()
    expect(screen.getByText(new RegExp(site.partners.timing.name))).toBeInTheDocument()
  })
})

describe('Footer — with real data', () => {
  test('renders the contact email as a mailto link when site.email is set', () => {
    render(<Footer />)
    const emailLink = screen.getByRole('link', { name: new RegExp(site.email, 'i') })
    expect(emailLink).toHaveAttribute('href', `mailto:${site.email}`)
  })

  test('clicking the email link fires email_click attributed to the footer', () => {
    render(<Footer />)
    fireEvent.click(screen.getByRole('link', { name: new RegExp(site.email, 'i') }))
    expect(mockTrack).toHaveBeenCalledWith('email_click', { location: 'footer' })
  })

  test('clicking a quick link fires nav_click with its real label and destination', () => {
    render(<Footer />)
    const target = navigation.main[0]
    fireEvent.click(screen.getByText(target.label))
    expect(mockTrack).toHaveBeenCalledWith('nav_click', {
      label: target.label,
      destination: target.href,
    })
  })

  test('the registration partner link fires cta_register_click attributed to the footer', () => {
    render(<Footer />)
    fireEvent.click(screen.getByRole('link', { name: site.partners.registration.name }))
    expect(mockTrack).toHaveBeenCalledWith('cta_register_click', { location: 'footer' })
  })
})

describe('Footer — when email is not configured', () => {
  afterEach(() => {
    vi.resetModules()
    vi.doUnmock('@/lib/data')
  })

  test('omits the email link entirely', async () => {
    vi.resetModules()
    vi.doMock('@/lib/data', async () => {
      const actual = await vi.importActual<typeof import('@/lib/data')>('@/lib/data')
      return {
        ...actual,
        default: { ...actual.default, site: { ...actual.default.site, email: '' } },
      }
    })

    const { default: FooterNoEmail } = await import('../Footer')
    render(<FooterNoEmail />)

    expect(screen.queryByRole('link', { name: new RegExp(site.email, 'i') })).not.toBeInTheDocument()
  })
})
