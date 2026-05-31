'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  // Lazy initializer is safe here because this component is loaded with ssr:false —
  // localStorage is guaranteed to exist when this runs.
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem('amt_cookie_consent')
    } catch {
      return false
    }
  })

  function accept() {
    try {
      localStorage.setItem('amt_cookie_consent', 'accepted')
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    } catch {}
    setVisible(false)
  }

  function decline() {
    try {
      localStorage.setItem('amt_cookie_consent', 'declined')
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-white/10 px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-zinc-300 text-sm flex-1">
          We use cookies to understand how visitors use this site.{' '}
          <Link
            href="/privacy"
            className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-zinc-400 hover:text-white text-sm font-semibold px-4 py-2 rounded-lg border border-white/10 hover:border-white/25 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
