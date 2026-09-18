'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * @deprecated NOT CURRENTLY USED. The `/register` page renders
 * {@link ../components/RegisterCta} (an outbound link) instead.
 *
 * This component embeds a third-party registration widget in an iframe. It is
 * retained for when our registration provider ships an embeddable widget that
 * whitelists our domain.
 *
 * Why it's shelved: Alpha Racing Solution's checkout currently returns
 * `X-Frame-Options: SAMEORIGIN`, so browsers refuse to render it in an iframe
 * from our domain. Embedding also needs cross-site session/cookie support for
 * their multi-step checkout + payment step. Both are the vendor's to fix.
 *
 * When their widget is ready, swap `<RegisterCta />` for this on the register
 * page and pass the widget's embed URL + expected postMessage origin, e.g.:
 *
 *   <RegisterIframe
 *     src="https://<provider>/embed/amravati-hm-2026"
 *     messageOrigin="https://<provider>"
 *   />
 *
 * It is intentionally provider-agnostic: no origin/URL is hardcoded, so it
 * works for whichever provider we embed. `messageOrigin` is validated on every
 * postMessage to reject spoofed events. Keep it covered by
 * `__tests__/RegisterIframe.test.tsx`.
 */
export default function RegisterIframe({
  src,
  messageOrigin,
  stylesheetHref,
  title = 'Registration',
}: {
  /** The provider's iframe embed URL. */
  src: string
  /** Exact origin (scheme + host) postMessage events must come from. */
  messageOrigin: string
  /** Optional provider stylesheet the widget needs. */
  stylesheetHref?: string
  title?: string
}) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.origin !== messageOrigin) return
      if (e.data?.event === 'registration_complete') {
        trackEvent('registration_complete')
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [messageOrigin])

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-2xl relative" style={{ minHeight: '600px' }}>
      {stylesheetHref && <link rel="stylesheet" href={stylesheetHref} />}
      <iframe
        id="register-iframe"
        src={src}
        style={{ border: 'none' }}
        height={1200}
        width="100%"
        title={title}
        onLoad={() => {
          setLoaded(true)
          trackEvent('register_iframe_load')
        }}
      />
      {!loaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white gap-4"
          role="status"
          aria-label="Loading registration form"
        >
          <div
            className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-orange-500 animate-spin"
            aria-hidden="true"
          />
          <p className="text-zinc-400 text-sm font-medium">Loading registration form</p>
        </div>
      )}
    </div>
  )
}
