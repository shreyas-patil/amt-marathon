import type { Metadata } from 'next'
import CashPrizesSection from '@/components/CashPrizesSection'

export const metadata: Metadata = {
  title: 'Cash Prizes & Trophies',
  description: 'Full cash prize breakdown for all categories at Amravati Half Marathon 2026. Total prize pool of ₹4,50,000.',
  alternates: { canonical: 'https://runamravati.com/prizes' },
  openGraph: { url: 'https://runamravati.com/prizes' },
}

export default function PrizesPage() {
  return (
    <div className="pt-16">
      <CashPrizesSection />
    </div>
  )
}
