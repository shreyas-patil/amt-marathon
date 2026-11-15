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
import organizers from '@/data/organizers.json'
import sakhiJson from '@/data/sakhi.json'
import type { SakhiData } from '@/lib/types'

// Where "Register" buttons go. `sakhiRegistration` is the women's run: straight to
// the registration site once its link is set in data/sakhi.json, otherwise to the
// /sakhi page (which says when registration opens). One tap to sign up, not two.
const registerTargets: Record<string, string> = {
  registrationUrl: event.registrationUrl,
  sakhiRegistration: sakhiJson.registrationUrl || sakhiJson.path,
}

type Linkish = { label: string; href?: string; hrefKey?: string }

function resolveHref<T extends Linkish>(item: T): T & { href: string } {
  const href = (item.hrefKey && registerTargets[item.hrefKey]) || item.href || '/register'
  return { ...item, href }
}

// Resolve cross-references: inject register targets into hero CTAs and the header button
const resolvedHero = {
  ...hero,
  ctaButtons: hero.ctaButtons.map((btn) => resolveHref(btn as Linkish & { variant: string })),
}

const resolvedNavigation = {
  ...navigation,
  header: {
    ...navigation.header,
    registerButton: resolveHref(
      navigation.header.registerButton as Linkish & { moreDropdownLabel: string }
    ),
  },
}

export const siteData = {
  site,
  event,
  navigation: resolvedNavigation,
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
  organizers,
}

export type SiteData = typeof siteData

// Named convenience exports (so existing imports keep working during migration)
export type Category = (typeof categories.categories)[0]
export type Hotel = (typeof hotels.hotels)[0]
export type Organizer = (typeof organizers.organizers)[0]

export function getCategories(): Category[] {
  return categories.categories
}

export function getHotels(): Hotel[] {
  return hotels.hotels
}

export function getOrganizers(): Organizer[] {
  return organizers.organizers
}

// The women's run page data. Kept out of siteData so the main site's client
// components don't ship it to the browser.
export function getSakhi(): SakhiData {
  return sakhiJson as SakhiData
}

export default siteData

/** True for links that leave the site (e.g. the registration provider). */
export function isExternalHref(href: string | undefined): boolean {
  return !!href && /^https?:\/\//.test(href)
}
