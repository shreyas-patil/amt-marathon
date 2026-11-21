import siteData, { getSakhi } from '@/lib/data'

const { site, seo, event } = siteData

/**
 * Structured data (schema.org SportsEvent) for the women's run, so search engines
 * can show /sakhi as an event with its date, place and registration link.
 * Everything comes from data/sakhi.json and data/seo.json.
 */
export default function SakhiJsonLd() {
  const sakhi = getSakhi()
  const siteUrl = `https://${site.domain}`
  const pageUrl = `${siteUrl}${sakhi.path}`
  const fees = sakhi.distances.items.flatMap((d) => [d.fees.earlyBird, d.fees.standard])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: sakhi.name,
    description: seo.pages.sakhi.description,
    url: pageUrl,
    startDate: sakhi.date,
    endDate: sakhi.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    sport: 'Running',
    image: `${pageUrl}/opengraph-image`,
    location: {
      '@type': 'Place',
      // The venue is still to be announced; the city is the same as the half marathon's.
      name: event.location.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        addressCountry: event.location.countryCode,
      },
    },
    organizer: { '@type': 'Organization', name: site.name, url: siteUrl },
    ...(sakhi.registrationUrl && {
      offers: {
        '@type': 'AggregateOffer',
        url: sakhi.registrationUrl,
        priceCurrency: 'INR',
        lowPrice: Math.min(...fees),
        highPrice: Math.max(...fees),
        offerCount: sakhi.distances.items.length,
        availability: 'https://schema.org/InStock',
      },
    }),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  )
}
