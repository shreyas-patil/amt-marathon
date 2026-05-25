import type { Metadata } from 'next'
import Image from 'next/image'
import { eventConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Route Maps',
  description: 'Official route maps for all Amravati Half Marathon 2026 categories — Half Marathon 21.1 km, 10 km Power Run, and 5 km Fitness Run.',
  alternates: { canonical: 'https://runamravati.com/route-maps' },
  openGraph: { url: 'https://runamravati.com/route-maps' },
}

const routes = [
  {
    id: 'half-marathon',
    label: 'Half Marathon',
    distance: '21.1 km',
    image: '/images/route-maps/21kmRoute.png',
    accent: '#ea580c',
    border: 'rgba(234,88,12,0.2)',
    categories: ['Half Marathon'],
    ageGroup: 'Age 18 & above',
  },
  {
    id: '10km',
    label: '10 km Power Run',
    distance: '10 km',
    image: '/images/route-maps/10kmRoute.png',
    accent: '#3d7a2c',
    border: 'rgba(61,122,44,0.2)',
    categories: ['10 km Power Run'],
    ageGroup: 'Age 15 & above',
  },
  {
    id: '5km',
    label: '5 km Run',
    distance: '5 km',
    image: '/images/route-maps/05kmRoute.png',
    accent: '#6b3a9c',
    border: 'rgba(107,58,156,0.2)',
    categories: ['5 km Fitness Run', "Children's Dream Run"],
    ageGroup: 'Age 10 & above',
  },
]

export default function RouteMapsPage() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {eventConfig.name}
          </p>
          <h1 className="text-zinc-900 text-4xl sm:text-5xl font-black mb-4">
            Route Maps
          </h1>
          <p className="text-zinc-500 max-w-md mx-auto">
            Official course routes for all race categories on October 25, 2026.
          </p>
        </div>

        {/* Route cards */}
        <div className="flex flex-col gap-12">
          {routes.map((route) => (
            <div
              key={route.id}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${route.border}` }}
            >
              {/* Card header */}
              <div
                className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-50"
                style={{ borderBottom: `1px solid ${route.border}` }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-4xl font-black leading-none"
                    style={{ color: route.accent }}
                  >
                    {route.distance}
                  </span>
                  <div>
                    <h2 className="text-zinc-900 font-black text-lg leading-tight">
                      {route.label}
                    </h2>
                    <p className="text-zinc-400 text-xs mt-0.5">{route.ageGroup}</p>
                  </div>
                </div>

                {/* Category badges */}
                <div className="flex flex-wrap gap-2">
                  {route.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: `rgba(${hexToRgb(route.accent)}, 0.08)`,
                        color: route.accent,
                        border: `1px solid ${route.border}`,
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
                  maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
                  maskComposite: 'intersect',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
                  WebkitMaskComposite: 'destination-in',
                }}
              >
                <Image
                  src={route.image}
                  alt={`${route.label} route map — Amravati Half Marathon 2026`}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority={route.id === 'half-marathon'}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
