import type { Metadata } from 'next'
import HotelsSection from '@/components/HotelsSection'

export const metadata: Metadata = {
  title: 'Hotels & Accommodation',
  description: 'Recommended hotels near the Amravati Half Marathon 2026 venue. Book your stay for race weekend.',
  alternates: { canonical: 'https://runamravati.com/hotels' },
  openGraph: { url: 'https://runamravati.com/hotels' },
}

export default function HotelsPage() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <HotelsSection />
    </div>
  )
}
