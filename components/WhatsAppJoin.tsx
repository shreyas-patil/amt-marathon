'use client'

import { useSyncExternalStore } from 'react'

// Treat the device as "mobile" (show the tap-to-join button rather than the QR)
// when the viewport is phone-sized. We can't rely on the user agent alone: it
// misses iPads (which report a desktop UA) and anyone testing via the browser's
// responsive mode or a narrow window. A coarse-pointer device or a narrow
// viewport is the reliable signal for "this screen is the phone you'd scan with."
const MOBILE_QUERY = '(max-width: 768px), (pointer: coarse)'

const isMobileUA = (ua: string) =>
  /android|iphone|ipad|ipod|iemobile|blackberry|opera mini/i.test(ua)

/**
 * Whether to show the phone experience. Returns `null` on the server and during
 * hydration (so SSR and the first client render match), then resolves to a real
 * boolean in the browser and stays in sync as the viewport changes (e.g. the
 * user rotates the device or resizes the window).
 */
function useIsMobile(): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(MOBILE_QUERY)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(MOBILE_QUERY).matches || isMobileUA(navigator.userAgent),
    () => null
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/**
 * Joins the participant to the runners' WhatsApp group.
 *
 * Phones get a tappable button — the chat.whatsapp.com link deep-links straight
 * into the installed WhatsApp app, which prompts to join the group. Desktops get
 * a QR code (pre-rendered SVG in /public) to scan with their phone, which opens
 * the same link and joins.
 *
 * The device split is decided client-side via the user agent. Until mounted we
 * render a fixed-height placeholder so SSR and the first client render match
 * (no hydration mismatch) and there's no layout shift when the real UI appears.
 */
export default function WhatsAppJoin({ groupUrl }: { groupUrl: string }) {
  const isMobile = useIsMobile()

  return (
    <div className="w-full max-w-lg bg-zinc-900 rounded-2xl px-6 py-8 mb-10 flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
        <h2 className="text-white text-lg font-bold">Join the runners&apos; WhatsApp group</h2>
      </div>
      <p className="text-zinc-400 text-sm mb-6 max-w-xs">
        Get race-day updates, route details, and connect with fellow runners.
      </p>

      {/* Placeholder while we work out whether this is a phone or a desktop. */}
      <div className="min-h-[13rem] flex items-center justify-center">
        {isMobile === null && (
          <div className="h-44 w-44 rounded-xl bg-zinc-800 animate-pulse" aria-hidden="true" />
        )}

        {isMobile === true && (
          <a
            href={groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold px-8 py-3.5 rounded-full transition-colors text-sm"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Join on WhatsApp
          </a>
        )}

        {isMobile === false && (
          <div className="flex flex-col items-center">
            <div className="bg-white p-3 rounded-xl">
              {/* Plain img (not next/image): the QR is a tiny static SVG and
                  next/image would need dangerouslyAllowSVG to serve it. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/whatsapp-group-qr.svg"
                alt="QR code to join the Amravati Half Marathon WhatsApp group"
                width={176}
                height={176}
                className="h-44 w-44"
              />
            </div>
            <p className="text-zinc-500 text-xs mt-4 max-w-[12rem]">
              Scan with your phone&apos;s camera to join the group.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
