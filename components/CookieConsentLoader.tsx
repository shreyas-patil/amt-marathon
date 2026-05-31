'use client'

// dynamic({ ssr: false }) must live in a client component — cannot be used
// directly in layout.tsx (a server component).
import dynamic from 'next/dynamic'

const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false })

export default function CookieConsentLoader() {
  return <CookieConsent />
}
