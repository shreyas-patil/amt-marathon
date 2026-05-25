import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'Contact & Organizers',
  description: 'Meet the team behind the Amravati Half Marathon 2026. Get in touch with the organizers.',
  alternates: { canonical: 'https://runamravati.com/contact' },
  openGraph: { url: 'https://runamravati.com/contact' },
}

export default function ContactPage() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <ContactSection />
    </div>
  )
}
