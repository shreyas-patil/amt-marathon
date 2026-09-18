'use client'

import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'

const { event, site } = siteData

/**
 * Outbound registration CTA.
 *
 * Registration is handled on Alpha Racing Solution's ticketing platform. Their
 * checkout sends `X-Frame-Options: SAMEORIGIN`, so it cannot be embedded in an
 * iframe from this domain — we send the visitor to their hosted page instead.
 * When Alpha ships an embeddable widget (whitelisting our domain), swap this
 * button for the iframe; the surrounding page layout stays the same.
 */
export default function RegisterCta() {
  return (
    <div className="rounded-2xl bg-zinc-900 shadow-2xl px-6 py-12 sm:py-16 flex flex-col items-center text-center">
      <h3 className="text-white text-2xl sm:text-3xl font-black text-balance mb-3">
        Ready to run {event.name}?
      </h3>
      <p className="text-zinc-400 text-sm sm:text-base max-w-md mb-8 text-pretty">
        Pick your category and complete your booking securely on {site.partners.registration.name}.
      </p>
      <a
        href={event.registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('register_outbound_click')}
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-9 py-4 rounded-full transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 focus-visible:ring-orange-500"
      >
        Continue to registration
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12H3" />
        </svg>
      </a>
    </div>
  )
}
