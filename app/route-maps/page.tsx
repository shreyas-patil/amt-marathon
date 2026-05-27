import type { Metadata } from 'next'
import Image from 'next/image'
import siteData from '@/lib/data'
import type { RouteMap } from '@/lib/types'

const { routeMaps, seo, site } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: seo.pages.routeMaps.title,
  description: seo.pages.routeMaps.description,
  alternates: { canonical: `${siteUrl}/route-maps` },
  openGraph: { url: `${siteUrl}/route-maps` },
}

// Accent colors are presentation-layer — will move to CSS tokens in Phase 9
const routeAccents: Record<string, { accent: string; border: string }> = {
  'half-marathon': { accent: '#ea580c', border: 'rgba(234,88,12,0.2)' },
  '10km': { accent: '#3d7a2c', border: 'rgba(61,122,44,0.2)' },
  '5km': { accent: '#6b3a9c', border: 'rgba(107,58,156,0.2)' },
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

function RouteCard({ route }: { route: RouteMap }) {
  const { accent, border } = routeAccents[route.id] ?? { accent: '#f97316', border: 'rgba(249,115,22,0.2)' }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
      {/* Card header */}
      <div
        className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-50"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl font-black leading-none" style={{ color: accent }}>
            {route.distance}
          </span>
          <div>
            <h2 className="text-zinc-900 font-black text-lg leading-tight">{route.label}</h2>
            <p className="text-zinc-400 text-xs mt-0.5">{route.ageGroup}</p>
          </div>
        </div>

        {/* Category badges */}
        <div className="flex flex-wrap gap-2">
          {route.categoryLabels.map((cat) => (
            <span
              key={cat}
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: `rgba(${hexToRgb(accent)}, 0.08)`,
                color: accent,
                border: `1px solid ${border}`,
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Route map image — mask fades edges into white container */}
      <div
        className="w-full bg-white"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
          maskComposite: 'intersect',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
          WebkitMaskComposite: 'destination-in',
        }}
      >
        <Image
          src={route.image}
          alt={route.imageAlt}
          width={1200}
          height={800}
          className="w-full h-auto"
          priority={route.id === 'half-marathon'}
        />
      </div>
    </div>
  )
}

export default function RouteMapsPage() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {routeMaps.page.sectionTag}
          </p>
          <h1 className="text-zinc-900 text-4xl sm:text-5xl font-black mb-4">
            {routeMaps.page.heading}
          </h1>
          <p className="text-zinc-500 max-w-md mx-auto text-lg sm:text-xl">
            {routeMaps.page.description}
          </p>
        </div>

        {/* Route cards */}
        <div className="flex flex-col gap-12">
          {routeMaps.routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    </div>
  )
}
