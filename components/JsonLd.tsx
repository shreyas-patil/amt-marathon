import siteData from '@/lib/data'

const { site, event, seo } = siteData

export default function JsonLd() {
  const siteUrl = `https://${site.domain}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.name,
    description: seo.pages.home.description,
    url: siteUrl,
    startDate: `${event.date}T${event.startTime}`,
    endDate: `${event.date}T${event.endTime}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.location.display,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        addressCountry: event.location.countryCode,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: site.name,
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      url: event.registrationUrl,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-05-01',
    },
    sport: 'Running',
    image: `${siteUrl}/opengraph-image`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
