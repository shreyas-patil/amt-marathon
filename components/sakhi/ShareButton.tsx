'use client'

import { trackEvent } from '@/lib/analytics'

interface Props {
  label: string
  text: string
  url: string
}

/**
 * Shares the women's run page. Uses the phone's share sheet when available,
 * otherwise opens WhatsApp with the message ready, since that is how this
 * site spreads.
 */
export default function ShareButton({ label, text, url }: Props) {
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      e.preventDefault()
      trackEvent('share_click', { method: 'native', page: 'sakhi' })
      try {
        await navigator.share({ text, url })
      } catch {
        // The visitor closed the share sheet; nothing to do.
      }
      return
    }
    trackEvent('share_click', { method: 'whatsapp', page: 'sakhi' })
  }

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex w-full md:w-auto items-center justify-center gap-2.5 rounded-full border-2 border-white px-6 py-3.5 text-base font-bold text-white transition-colors hover:border-sakhi-gold hover:bg-sakhi-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakhi-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
        <path d="M16 6l-4-4-4 4" />
        <path d="M12 2v13" />
      </svg>
      {label}
    </a>
  )
}
