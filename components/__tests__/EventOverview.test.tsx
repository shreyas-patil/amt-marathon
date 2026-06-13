import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import EventOverview from '../EventOverview'

const { overview, event } = siteData

describe('EventOverview — renders all the copy it pulls from data', () => {
  test('shows the heading, description, and unique-features text from event-overview.json', () => {
    render(<EventOverview />)
    expect(screen.getByText(overview.heading.line1)).toBeInTheDocument()
    expect(screen.getByText(overview.heading.line2)).toBeInTheDocument()
    expect(screen.getByText(overview.description)).toBeInTheDocument()
    expect(screen.getByText(overview.uniqueFeatures.heading)).toBeInTheDocument()
    expect(screen.getByText(overview.uniqueFeatures.text)).toBeInTheDocument()
  })

  test('shows the start-line card with its title, venue, address, and map link from data', () => {
    render(<EventOverview />)
    expect(screen.getByText(overview.infoCards.startLine.title)).toBeInTheDocument()
    expect(screen.getByText(overview.infoCards.startLine.mapLinkText)).toBeInTheDocument()
    expect(screen.getByText(event.startLine.venueName)).toBeInTheDocument()
    expect(screen.getByText(event.startLine.address)).toBeInTheDocument()

    // The whole card is a link to the Google Maps URL from event.json.
    expect(screen.getByRole('link')).toHaveAttribute('href', event.startLine.googleMapsUrl)
  })

  test('shows the bib-collection card with its title, date, subtext, and venue note from data', () => {
    render(<EventOverview />)
    expect(screen.getByText(overview.infoCards.bibCollection.title)).toBeInTheDocument()
    expect(screen.getByText(event.bibCollection.date)).toBeInTheDocument()
    expect(screen.getByText(event.bibCollection.subtext)).toBeInTheDocument()
    expect(screen.getByText(event.bibCollection.venueNote)).toBeInTheDocument()
  })
})
