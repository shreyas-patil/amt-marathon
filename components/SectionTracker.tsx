'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

export function SectionTracker({ sectionId }: { sectionId: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent('section_view', { section_id: sectionId })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(parent)
    return () => observer.disconnect()
  }, [sectionId])

  return <div ref={ref} className="sr-only" aria-hidden />
}
