import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import EventOverview from '@/components/EventOverview'
import CategoriesSection from '@/components/CategoriesSection'
import SponsorsSection from '@/components/SponsorsSection'
import siteData from '@/lib/data'

const { site, event, seo } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    url: siteUrl,
    title: seo.pages.home.openGraph?.title ?? event.name,
    description: seo.pages.home.openGraph?.description ?? seo.pages.home.description,
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventOverview />
      <CategoriesSection />
      <SponsorsSection />
    </>
  )
}
