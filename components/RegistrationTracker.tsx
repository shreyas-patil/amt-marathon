'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function RegistrationTracker() {
  useEffect(() => {
    trackEvent('registration_complete')
  }, [])

  return null
}
