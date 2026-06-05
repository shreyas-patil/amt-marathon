'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function RegisterIframe() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.origin !== 'https://www.townscript.com') return
      if (e.data?.event === 'registration_complete') {
        trackEvent('registration_complete')
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-2xl relative" style={{ minHeight: '600px' }}>
      <link
        rel="stylesheet"
        href="https://www.townscript.com/static/Bookingflow/css/ts-iframe.style.css"
      />
      <iframe
        id="ts-iframe"
        src="https://www.townscript.com/v2/widget/amravati-half-marathon2026-221331/booking"
        style={{ border: 'none' }}
        height={1200}
        width="100%"
        title="Amravati Half Marathon 2026 Registration"
        onLoad={() => {
          setLoaded(true)
          trackEvent('townscript_iframe_load')
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
