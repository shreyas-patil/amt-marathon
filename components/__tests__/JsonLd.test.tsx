import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import siteData from '@/lib/data'
import JsonLd from '../JsonLd'

const { site, event, seo } = siteData

describe('JsonLd — structured data is built from the data folder', () => {
  test('the JSON-LD payload mirrors the real site/event/seo values', () => {
    const { container } = render(<JsonLd />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()

    const data = JSON.parse(script!.textContent!)

    expect(data.name).toBe(event.name)
    expect(data.description).toBe(seo.pages.home.description)
    expect(data.url).toBe(`https://${site.domain}`)
    expect(data.offers.url).toBe(event.registrationUrl)
    expect(data.organizer.name).toBe(site.name)
    expect(data.location.name).toBe(event.location.display)
    expect(data.location.address.addressLocality).toBe(event.location.city)
    expect(data.location.address.addressRegion).toBe(event.location.state)
    expect(data.location.address.addressCountry).toBe(event.location.countryCode)
    expect(data.startDate).toBe(`${event.date}T${event.startTime}`)
    expect(data.endDate).toBe(`${event.date}T${event.endTime}`)
  })
})
