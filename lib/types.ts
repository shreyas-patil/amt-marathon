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
    venueName: string
    googleMapsUrl: string
  }
  registrationUrl: string
  /** Sent as the `race` parameter on Google Analytics register events. */
  analyticsId: string
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
      /** Resolved from hrefKey in lib/data.ts */
      href: string
      hrefKey?: string
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
  /** Home only: the half marathon's own description for its structured data. */
  halfMarathonEventDescription?: string
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
  /** Colour theme: 'orange' (half marathon) or 'sakhi' (women's run, teal and gold) */
  theme?: 'orange' | 'sakhi'
  locationTag: string
  headingLines: [string, string, string]
  edition: string
  /** Set to 'mr' when the edition line is Marathi (no uppercase or letter spacing) */
  editionLang?: string
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

export interface AgeSubCategory {
  gender: string
  label: string
  ageRange: string
}

export interface RaceCategory {
  id: string
  name: string
  distance: string
  description: string
  ageGroup: string
  noAgeCategory?: boolean
  subCategories?: AgeSubCategory[]
  fees: CategoryFees
}

export interface OutOfMaharashtraCategory {
  heading: string
  description: string
  applicableTo: string
  note: string
}

export interface CategoriesData {
  section: {
    sectionTag: string
    heading: string
    description: string
    earlyBirdDeadline: string
    ctaLabel: string
    feesTableCaption: string
    eligibilityHeading: string
  }
  categories: RaceCategory[]
  outOfMaharashtra: OutOfMaharashtraCategory
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
  time?: string
}

export interface ResultGroup {
  label: string
  entries: ResultEntry[]
}

export interface ResultEvent {
  id: string
  name: string
  /** false keeps the entries in the data file but shows rc.pendingNote instead of the tables */
  published: boolean
  showTiming: boolean
  groups: ResultGroup[]
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
  resultsContent: {
    tag: string
    heading: string
    subtext: string
    provisionalNote: string
    pendingNote: string
    rankLabel: string
    nameLabel: string
    timeLabel: string
  }
  events: ResultEvent[]
}

// ── sakhi.json (Amravati Women's 10K page) ───────────────────────────────────

export interface SakhiLink {
  label: string
  href: string
}

export interface SakhiDistance {
  id: string
  label: string
  name: string
  fees: { earlyBird: number; standard: number }
}

/** A photo of women from the club, shown in the "Bring your sakhi" section. */
export interface SakhiPhoto {
  src: string
  alt: string
  width: number
  height: number
}

export interface SakhiPrizeRow {
  place: string
  first: number
  second: number
}

export interface SakhiData {
  name: string
  path: string
  date: string
  registrationUrl: string
  /** Sent as the `race` parameter on Google Analytics register events. */
  analyticsId: string
  registrationClosedLabel: string
  nav: { backLabel: string; backHref: string; links: SakhiLink[] }
  hero: {
    kicker: string
    intro: string
    title: { line1: string; emphasis: string; rest: string }
    date: string
    dateMr: string
    summary: string
    cta: { label: string; labelMr: string }
    earlyBirdNote: string
  }
  sakhi: {
    heading: string
    headingEmphasis: string
    headingMr: string
    body: string
    shareLabel: string
    shareText: string
    photosLabel: string
    photos: SakhiPhoto[]
  }
  distances: {
    heading: string
    earlyBirdDeadline: string
    earlyBirdLabel: string
    regularLabel: string
    items: SakhiDistance[]
    ageGroups: string
    ageGroupsShort: string
    ageGroupsMr: string
  }
  prizes: {
    total: string
    headingRest: string
    headingMr: string
    intro: string
    columns: { place: string; first: string; second: string }
    rows: SakhiPrizeRow[]
  }
  keyDates: {
    heading: string
    headingMr: string
    items: { date: string; label: string }[]
    tba: string
    tbaMr: string
  }
  footer: { byLine: string; wordmark: [string, string]; links: SakhiLink[] }
  route: {
    path: string
    kicker: string
    title: { line1: string; emphasis: string; rest: string }
    /** true while the women's run reuses the half marathon's 10 km / 5 km courses */
    provisional: boolean
    provisionalNote: string
    maps: SakhiRouteMap[]
    backLabel: string
    backHref: string
  }
}

export interface SakhiRouteMap {
  id: string
  label: string
  name: string
  image: string
  width: number
  height: number
  alt: string
}
