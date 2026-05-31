'use client'

import { trackEvent } from '@/lib/analytics'

export default function RegisterIframe() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-2xl">
      <link
        rel="stylesheet"
        href="https://www.townscript.com/static/Bookingflow/css/ts-iframe.style.css"
      />
      <iframe
        id="ts-iframe"
        src="https://www.townscript.com/v2/widget/amravati-half-marathon2026-221331/booking"
        frameBorder={0}
        height={800}
        width="100%"
        title="Amravati Half Marathon 2026 Registration"
        onLoad={() => trackEvent('townscript_iframe_load')}
      />
    </div>
  )
}
