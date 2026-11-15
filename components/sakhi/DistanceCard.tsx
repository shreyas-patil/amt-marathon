'use client'

import { useSyncExternalStore } from 'react'
import { trackEvent } from '@/lib/analytics'
import type { SakhiDistance } from '@/lib/types'

interface Props {
  distance: SakhiDistance
  ageGroups: string
  deadline: string
  earlyBirdLabel: string
  regularLabel: string
  registrationUrl: string
}

const noopSubscribe = () => () => {}
const formatInr = (n: number) => `₹${n.toLocaleString('en-IN')}`

/**
 * A race card in the same style as the main site's "Choose Your Challenge"
 * cards (Black Ops One distance, zinc gradient), with the women's run pink in
 * place of orange. When registration is live the whole card links straight to
 * it, so a runner who has picked a distance goes to sign-up in one tap.
 */
export default function DistanceCard({
  distance,
  ageGroups,
  deadline,
  earlyBirdLabel,
  regularLabel,
  registrationUrl,
}: Props) {
  const [num, unit] = distance.label.split(' ')
  // Server render assumes early bird is still on; the browser corrects it after the deadline.
  const expired = useSyncExternalStore(
    noopSubscribe,
    () => Date.now() > new Date(deadline).getTime(),
    () => false
  )

  const card = (
    <div
      className="flex w-full flex-col justify-between gap-8 rounded-2xl p-5 ring-1 ring-zinc-700/60 transition-all duration-200 group-hover:ring-sakhi-gold/60 sm:aspect-square"
      style={{ background: 'linear-gradient(145deg, #3f3f46 0%, #27272a 55%, #18181b 100%)' }}
    >
      <div className="text-right">
        <p
          className="leading-none text-white"
          style={{
            fontFamily: 'var(--font-black-ops-one)',
            fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
          }}
        >
          {num}
        </p>
        <p
          className="leading-none text-sakhi-gold"
          style={{
            fontFamily: 'var(--font-black-ops-one)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          }}
        >
          {unit}
        </p>
      </div>

      <div>
        <div className="mb-3">
          <h3 className="text-base font-black leading-tight text-white">{distance.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {ageGroups}
          </p>
        </div>
        <div className="space-y-1.5 border-t border-zinc-800 pt-3">
          <div className="flex items-baseline justify-between">
            <span
              className={`text-xs font-semibold ${expired ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}
            >
              {earlyBirdLabel}
            </span>
            <span
              className={`text-sm font-black ${expired ? 'text-zinc-600 line-through' : 'text-white'}`}
            >
              {formatInr(distance.fees.earlyBird)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span
              className={`text-xs font-semibold ${expired ? 'text-zinc-300' : 'text-zinc-400'}`}
            >
              {regularLabel}
            </span>
            <span className={`text-sm font-black ${expired ? 'text-white' : 'text-zinc-300'}`}>
              {formatInr(distance.fees.standard)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  if (!registrationUrl) {
    return <div className="mx-auto flex w-full max-w-sm flex-col">{card}</div>
  }

  return (
    <a
      href={registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent('register_outbound_click', { location: 'sakhi_card', category: distance.id })
      }
      className="group mx-auto flex w-full max-w-sm flex-col"
    >
      {card}
    </a>
  )
}
