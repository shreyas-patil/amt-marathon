import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import PrivacyPage from '../page'

const { site, event } = siteData

describe('PrivacyPage — data-driven content', () => {
  test('references the site name, event name, and copyright year from data', () => {
    render(<PrivacyPage />)
    expect(screen.getAllByText(new RegExp(site.name)).length).toBeGreaterThan(0)
    expect(screen.getByText(new RegExp(event.name))).toBeInTheDocument()
    // The year appears in both the event name and the copyright line.
    expect(screen.getAllByText(new RegExp(String(event.year))).length).toBeGreaterThan(0)
  })

  test('links registration to the Townscript URL from data', () => {
    render(<PrivacyPage />)
    expect(screen.getByRole('link', { name: 'Townscript' })).toHaveAttribute(
      'href',
      event.registrationUrl
    )
  })

  test('links the contact email as a mailto from data', () => {
    render(<PrivacyPage />)
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute(
      'href',
      `mailto:${site.email}`
    )
  })
})
