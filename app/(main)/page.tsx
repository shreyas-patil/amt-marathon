import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import EventOverview from '@/components/EventOverview'
import CategoriesSection from '@/components/CategoriesSection'
import RoadrunnersSection from '@/components/RoadrunnersSection'
import SponsorsSection from '@/components/SponsorsSection'
import SakhiJsonLd from '@/components/sakhi/SakhiJsonLd'
import siteData from '@/lib/data'

const { site, event, seo } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: { absolute: seo.pages.home.title },
  description: seo.pages.home.description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    url: siteUrl,
    title: seo.pages.home.openGraph?.title ?? event.name,
    description: seo.pages.home.openGraph?.description ?? seo.pages.home.description,
  },
  twitter: {
    title: seo.pages.home.openGraph?.title ?? event.name,
    description: seo.pages.home.openGraph?.description ?? seo.pages.home.description,
  },
}

export default function Home() {
  return (
    <>
      {/* The homepage leads with the women's run, so it also lists that event (url: /sakhi). */}
      <SakhiJsonLd />
      <HeroSection />
      <EventOverview />
      <CategoriesSection />
      <RoadrunnersSection />
      <SponsorsSection />
    </>
  )
}
