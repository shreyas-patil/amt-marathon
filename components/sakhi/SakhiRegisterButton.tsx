'use client'

import { trackEvent } from '@/lib/analytics'
import { getSakhi } from '@/lib/data'

const race = getSakhi().analyticsId

interface Props {
  registrationUrl: string
  label: string
  labelMr: string
  closedLabel: string
  location: string
}

/**
 * Register button for the women's run. Registration is hosted by Alpha Racing
 * Solution; until their link is set in data/sakhi.json the button shows when
 * registration opens and is not a link.
 */
export default function SakhiRegisterButton({
  registrationUrl,
  label,
  labelMr,
  closedLabel,
  location,
}: Props) {
  const base =
    'inline-block text-center rounded-full px-8 py-4 text-[17px] font-extrabold whitespace-nowrap transition-colors'

  if (!registrationUrl) {
    return (
      <p
        className="inline-block whitespace-nowrap rounded-full bg-white/15 px-6 py-3 text-center text-[15px] font-bold text-white ring-1 ring-white/40"
        aria-live="polite"
      >
        {closedLabel}
      </p>
    )
  }

  return (
    <a
      href={registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('register_outbound_click', { location, race })}
      className={`${base} bg-white text-sakhi-deep hover:bg-sakhi-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sakhi`}
    >
      {label} ·{' '}
      <span lang="mr" className="font-sakhi-hero">
        {labelMr}
      </span>
    </a>
  )
}
