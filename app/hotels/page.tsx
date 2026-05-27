import type { Metadata } from 'next'
import HotelsSection from '@/components/HotelsSection'
import siteData from '@/lib/data'

const { seo, site } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: seo.pages.hotels.title,
  description: seo.pages.hotels.description,
  alternates: { canonical: `${siteUrl}/hotels` },
  openGraph: { url: `${siteUrl}/hotels` },
}

export default function HotelsPage() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <HotelsSection />
    </div>
  )
}
