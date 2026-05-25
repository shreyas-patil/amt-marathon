import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import EventOverview from '@/components/EventOverview'
import CategoriesSection from '@/components/CategoriesSection'
import SponsorsSection from '@/components/SponsorsSection'
import { siteConfig, eventConfig } from '@/lib/config'

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    url: siteConfig.url,
    title: eventConfig.name,
    description: `Register now for the ${eventConfig.name} on October 25, 2026 in Amravati, Maharashtra. Half Marathon, 10 km, 5 km & Children's Dream Run. Total prize pool ₹4,50,000.`,
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
