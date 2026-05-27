// Bridge file — re-exports derived values from siteData so existing component
// imports continue to work during the migration to lib/data.ts.
// Once all components import from lib/data.ts directly, delete this file.

import siteData from '@/lib/data'

export const siteConfig = {
  name: siteData.site.name,
  shortName: siteData.site.shortName,
  description: siteData.seo.pages.home.description,
  url: `https://${siteData.site.domain}`,
  domain: siteData.site.domain,
  ogImage: '/og-image.jpg',
  instagram: siteData.site.social.instagram.handle,
  author: siteData.site.author,
  email: siteData.site.email,
}

export const eventConfig = {
  year: siteData.event.year,
  name: siteData.event.name,
  date: siteData.event.date,
  location: siteData.event.location.display,
  registrationUrl: siteData.event.registrationUrl,
  maxParticipants: siteData.event.maxParticipants,
}

export const seoKeywords = siteData.site.seoKeywords

export const navigationLinks = siteData.navigation.main

export const moreLinks = siteData.navigation.more
