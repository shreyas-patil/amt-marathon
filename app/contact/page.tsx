import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import siteData from '@/lib/data'

const { seo, site } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: seo.pages.contact.title,
  description: seo.pages.contact.description,
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: { url: `${siteUrl}/contact` },
}

export default function ContactPage() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <ContactSection />
    </div>
  )
}
