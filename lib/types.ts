// TypeScript interfaces for all data shapes in data/*.json
// Components should receive props typed against these interfaces.

// ── site.json ─────────────────────────────────────────────────────────────────

export interface SocialPlatform {
  handle?: string
  displayName: string
  url: string | null
  available: boolean
  comingSoonLabel?: string
}

export interface SiteConfig {
  name: string
  shortName: string
  domain: string
  email: string
  author: string
  logoImage: string
  logoAlt: string
  logoSize: { width: number; height: number }
  tagline: string
  social: {
    instagram: SocialPlatform
    facebook: SocialPlatform
  }
  partners: {
    registration: { name: string; label: string }
    timing: { name: string; label: string }
  }
  seoKeywords: string[]
}

// ── event.json ────────────────────────────────────────────────────────────────

export interface EventLocation {
  city: string
  state: string
  stateShort: string
  country: string
  countryCode: string
  display: string
  displayShort: string
  displayMedium: string
}

export interface EventConfig {
  year: number
  edition: string
  name: string
  date: string
  displayDate: string
  displayDateMedium: string
  displayDateShort: string
  startTime: string
  endTime: string
  location: EventLocation
  startLine: {
    venueName: string
    address: string
    googleMapsUrl: string
  }
  bibCollection: {
    date: string
    subtext: string
    venueNote: string
  }
  registrationUrl: string
  maxParticipants: number
  totalPrizePool: string
  history: {
    organizedSince: number
    editionsCompleted: number
  }
}

// ── navigation.json ───────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
}

export interface NavigationConfig {
  main: NavLink[]
  more: NavLink[]
  header: {
    registerButton: {
      label: string
      moreDropdownLabel: string
    }
  }
}

// ── seo.json ──────────────────────────────────────────────────────────────────

export interface SeoPageConfig {
  title: string
  description: string
  canonical: string
  openGraph?: { url?: string; title?: string; description?: string }
  sitemap?: { priority: number; changefreq: string }
}

export interface SeoConfig {
  titleTemplate: string
  global: {
    metadataBase: string
    keywordsKey: string
    robots: object
    openGraph: object
    twitter: object
  }
  pages: Record<string, SeoPageConfig>
  openGraph: {
    imageAlt: string
    categoryBadges: string[]
  }
}

// ── hero.json ─────────────────────────────────────────────────────────────────

export interface HeroCtaButton {
  label: string
  variant: 'primary' | 'secondary'
  href?: string
  hrefKey?: string
}

export interface HeroContent {
  locationTag: string
  headingLines: [string, string, string]
  edition: string
  description: string
  ctaButtons: HeroCtaButton[]
  scrollIndicator: { label: string }
}

// ── event-overview.json ───────────────────────────────────────────────────────

export interface EventOverviewContent {
  sectionTag: string
  heading: { line1: string; line2: string }
  description: string
  uniqueFeatures: { heading: string; text: string }
  infoCards: {
    startLine: { title: string; colorScheme: string; mapLinkText: string }
    bibCollection: { title: string; colorScheme: string }
  }
}

// ── categories.json ───────────────────────────────────────────────────────────

export interface CategoryFees {
  earlyBird: number
  standard: number
  currency: string
  earlyBirdDeadline: string
}

export interface RaceCategory {
  id: string
  name: string
  distance: string
  description: string
  ageGroup: string
  fees: CategoryFees
}

export interface CategoriesData {
  section: {
    sectionTag: string
    heading: string
    description: string
    earlyBirdDeadline: string
    ctaLabel: string
    feesTableCaption: string
  }
  categories: RaceCategory[]
}

// ── prizes.json ───────────────────────────────────────────────────────────────

export interface PrizeRow {
  rank: number
  amounts: (number | null)[]
}

export interface PrizeCategory {
  id: string
  name: string
  ageNote: string
  columns: string[]
  prizes: PrizeRow[]
}

export interface PrizeTab {
  id: string
  label: string
  categoryIds: string[]
}

export interface PrizesData {
  section: {
    sectionTag: string
    heading: string
    description: string
    eligibilityNote: string
    outOfMaharashtraNote: string
  }
  tabs: PrizeTab[]
  categories: PrizeCategory[]
}

// ── hotels.json ───────────────────────────────────────────────────────────────

export interface Hotel {
  id: number
  name: string
  city: string
  contactNumbers: string[]
  bookingUrl: string
}

export interface HotelsData {
  section: {
    sectionTag: string
    heading: string
    description: string
    footerNote: string
    bookNowLabel: string
  }
  hotels: Hotel[]
}

// ── sponsors.json ─────────────────────────────────────────────────────────────

export interface Sponsor {
  id: string
  name: string
  logoImage: string
  websiteUrl: string
  tier: string
}

export interface SponsorsData {
  section: {
    sectionTag: string
    heading: string
    description: string
    emptyState: { message: string; ctaText: string; ctaHref: string }
  }
  sponsors: Sponsor[]
}

// ── gallery.json ──────────────────────────────────────────────────────────────

export interface GalleryContent {
  page: {
    sectionTag: string
    heading: string
    description: string
  }
  emptyState: {
    heading: string
    text: string
  }
}

// ── contact.json ──────────────────────────────────────────────────────────────

export interface ContactBox {
  id: string
  eyebrow: string
  heading: string
  note?: string
}

export interface ContactContent {
  organizers: {
    sectionTag: string
    heading: string
    description: string
  }
  contactBoxes: ContactBox[]
  quickFacts: {
    raceDayLabel: string
    locationLabel: string
    emailLabel: string
  }
}

// ── footer.json ───────────────────────────────────────────────────────────────

export interface FooterDetailItem {
  icon: string
  valueKey: string
  linkType?: string
}

export interface FooterContent {
  brand: {
    tagline1: string
    nameWordmark: [string, string]
    description: string
  }
  sections: {
    quickLinks: { heading: string }
    eventDetails: { heading: string; items: FooterDetailItem[] }
  }
  copyright: string
}

// ── route-maps.json ───────────────────────────────────────────────────────────

export interface RouteMap {
  id: string
  label: string
  distance: string
  categoryLabels: string[]
  ageGroup: string
  image: string
  imageAlt: string
}

export interface RouteMapsData {
  page: {
    sectionTag: string
    heading: string
    description: string
  }
  routes: RouteMap[]
}

// ── organizers.json ───────────────────────────────────────────────────────────

export interface Organizer {
  id: number
  name: string
  role: string
  title: string
  bio: string
  avatar: string
}

// ── results/2026.json ─────────────────────────────────────────────────────────

export interface ResultEntry {
  rank: number
  name: string
  category: string
  time: string
  prize: number
}

export interface ResultsData {
  year: number
  eventDate: string
  status: 'pending' | 'completed'
  message: string
  placeholderContent: {
    icon: string
    tag: string
    heading: string
    subtext: string
    description: string
  }
  results: ResultEntry[]
}
