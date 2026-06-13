import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import Header from '../Header'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)
const { navigation, site } = siteData

function openMobileMenu() {
  fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }))
}

describe('Header — renders content from data', () => {
  test('shows the logo, register-button label, and "more" dropdown label from data', () => {
    render(<Header />)
    expect(screen.getByRole('img', { name: site.logoAlt })).toHaveAttribute('src', site.logoImage)
    expect(
      screen.getAllByRole('link', { name: navigation.header.registerButton.label }).length
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole('button', { name: navigation.header.registerButton.moreDropdownLabel })
    ).toBeInTheDocument()
  })
})

describe('Header — mobile drawer', () => {
  test('hamburger toggles the mobile drawer open and closed', () => {
    render(<Header />)
    const firstMore = navigation.more[0].label // only present once the drawer/dropdown is open

    expect(screen.queryByText(firstMore)).not.toBeInTheDocument()
    openMobileMenu()
    expect(screen.getByText(firstMore)).toBeInTheDocument()
    openMobileMenu() // toggle closed
    expect(screen.queryByText(firstMore)).not.toBeInTheDocument()
  })

  test('drawer lists every real main and "more" nav link', () => {
    render(<Header />)
    openMobileMenu()

    // Main links also appear in the (DOM-present) desktop nav, so allow >= 1.
    for (const link of navigation.main) {
      expect(screen.getAllByText(link.label).length).toBeGreaterThanOrEqual(1)
    }
    // "more" links live only in the drawer here, so they must appear.
    for (const link of navigation.more) {
      expect(screen.getByText(link.label)).toBeInTheDocument()
    }
  })

  test('mobile_menu_open fires on open only, not on close', () => {
    render(<Header />)
    openMobileMenu()
    openMobileMenu()
    expect(mockTrack).toHaveBeenCalledTimes(1)
    expect(mockTrack).toHaveBeenCalledWith('mobile_menu_open')
  })
})

describe('Header — More dropdown', () => {
  test('opens on click, closes on outside mousedown', () => {
    render(<Header />)
    const sponsors = navigation.more[0].label

    fireEvent.click(screen.getByRole('button', { name: /more/i }))
    expect(screen.getByText(sponsors)).toBeInTheDocument()

    // The component listens for `mousedown`, not `click`, to close on outside.
    fireEvent.mouseDown(document.body)
    expect(screen.queryByText(sponsors)).not.toBeInTheDocument()
  })

  test('more_dropdown_open fires on open only, not on close', () => {
    render(<Header />)
    const moreButton = screen.getByRole('button', { name: /more/i })

    fireEvent.click(moreButton) // open -> fires
    fireEvent.click(moreButton) // close -> must not fire again

    expect(mockTrack).toHaveBeenCalledTimes(1)
    expect(mockTrack).toHaveBeenCalledWith('more_dropdown_open')
  })

  test('clicking a dropdown link fires nav_click with that link’s real label and destination', () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: /more/i }))

    const target = navigation.more[0]
    fireEvent.click(screen.getByText(target.label))

    expect(mockTrack).toHaveBeenCalledWith('nav_click', {
      label: target.label,
      destination: target.href,
    })
  })
})
