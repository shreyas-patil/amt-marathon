'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

export default function SponsorEmptyState() {
  return (
    <div className="text-center py-16 border-2 border-dashed border-zinc-700 rounded-2xl">
      <p className="text-zinc-500 text-base font-medium mb-2">Sponsor logos will appear here</p>
      <p className="text-zinc-500 text-sm">
        Interested in sponsoring?{' '}
        <Link
          href="/contact"
          onClick={() => trackEvent('sponsor_contact_click')}
          className="text-orange-500 hover:underline"
        >
          Get in touch.
        </Link>
      </p>
    </div>
  )
}
