import site from '@/data/site.json'
import event from '@/data/event.json'
import navigation from '@/data/navigation.json'
import seo from '@/data/seo.json'
import hero from '@/data/hero.json'
import overview from '@/data/event-overview.json'
import categories from '@/data/categories.json'
import prizes from '@/data/prizes.json'
import hotels from '@/data/hotels.json'
import sponsors from '@/data/sponsors.json'
import gallery from '@/data/gallery.json'
import contact from '@/data/contact.json'
import footer from '@/data/footer.json'
import routeMaps from '@/data/route-maps.json'
import results from '@/data/results/2026.json'
import organizers from '@/data/organizers.json'

// Resolve cross-references: inject registrationUrl into hero CTA buttons
const resolvedHero = {
  ...hero,
  ctaButtons: hero.ctaButtons.map((btn) =>
    'hrefKey' in btn && btn.hrefKey === 'registrationUrl'
      ? { ...btn, href: event.registrationUrl }
      : btn
  ),
}

export const siteData = {
  site,
  event,
  navigation,
  seo,
  hero: resolvedHero,
  overview,
  categories,
  prizes,
  hotels,
  sponsors,
  gallery,
  contact,
  footer,
  routeMaps,
  results,
  organizers,
}

export type SiteData = typeof siteData

// Named convenience exports (so existing imports keep working during migration)
export type Category = (typeof categories.categories)[0]
export type Hotel = (typeof hotels.hotels)[0]
export type Organizer = (typeof organizers.organizers)[0]
export type ResultsData = typeof results

export function getCategories(): Category[] {
  return categories.categories
}

export function getHotels(): Hotel[] {
  return hotels.hotels
}

export function getOrganizers(): Organizer[] {
  return organizers.organizers
}

export function getResults(): ResultsData {
  return results
}

export default siteData
