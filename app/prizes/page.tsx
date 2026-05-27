import type { Metadata } from 'next'
import CashPrizesSection from '@/components/CashPrizesSection'
import siteData from '@/lib/data'

const { seo, site } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: seo.pages.prizes.title,
  description: seo.pages.prizes.description,
  alternates: { canonical: `${siteUrl}/prizes` },
  openGraph: { url: `${siteUrl}/prizes` },
}

export default function PrizesPage() {
  return (
    <div className="pt-16">
      <CashPrizesSection />
    </div>
  )
}
