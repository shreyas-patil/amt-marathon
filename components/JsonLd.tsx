import { eventConfig, siteConfig } from '@/lib/config'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: eventConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    startDate: `${eventConfig.date}T06:00:00+05:30`,
    endDate: `${eventConfig.date}T12:00:00+05:30`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Amravati, Maharashtra',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amravati',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      '@type': 'Offer',
      url: eventConfig.registrationUrl,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-05-01',
    },
    sport: 'Running',
    image: `${siteConfig.url}/opengraph-image`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
