import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import siteData, { getSakhi } from '@/lib/data'
import PaithaniBand from '@/components/sakhi/PaithaniBand'
import { container, rise, HeroMarathi } from '@/components/sakhi/shared'

// The women's run route page. It deliberately lives under /sakhi (not the main
// site's /route-maps) so runners never land on the half marathon's 21.1 km map
// or its category names. Until the women's course is set it reuses the main
// site's 10 km and 5 km map files; see requirements/womens-run/DESIGN.md.

const { site, seo } = siteData
const page = seo.pages.sakhiRoute
const sakhi = getSakhi()
const { route } = sakhi
const pageUrl = `https://${site.domain}${route.path}`

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: pageUrl },
  openGraph: { url: pageUrl, title: page.title, description: page.description },
}

export default function SakhiRoutePage() {
  return (
    <main className="flex-1 text-white">
      {/* ── Hero (teal); pt-[82px] clears the fixed header and its strip ── */}
      <section className="bg-sakhi pt-[82px]">
        <div
          className={`${container} flex flex-col items-center gap-3.5 pb-11 pt-10 text-center md:pt-16 lg:items-start lg:pb-16 lg:text-left`}
        >
          <p
            className="sakhi-rise text-lg font-semibold leading-snug text-sakhi-cream md:text-xl"
            style={rise(0)}
          >
            <HeroMarathi>{route.kicker}</HeroMarathi>
          </p>
          <h1
            className="sakhi-rise font-sakhi-display text-[44px] font-normal leading-none text-balance md:text-7xl"
            style={rise(1)}
          >
            <span className="block">{route.title.line1}</span>{' '}
            <em>{route.title.emphasis}</em> {route.title.rest}
          </h1>
          {route.provisional && (
            <p
              className="sakhi-rise max-w-[600px] text-[17px] leading-relaxed text-sakhi-cream md:text-lg"
              style={rise(2)}
            >
              {route.provisionalNote}
            </p>
          )}
        </div>
      </section>
      <PaithaniBand tone="teal" next="white" id="band-route-hero" />

      {/* ── Maps (white) ─────────────────────────────────── */}
      <section className="bg-white text-zinc-900">
        <div className={`${container} flex flex-col gap-12 py-14 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {route.maps.map((map) => (
              <figure key={map.id} id={`route-${map.id}`} className="flex flex-col gap-4">
                <figcaption className="flex items-baseline justify-center gap-3 lg:justify-start">
                  <span
                    className="leading-none text-sakhi"
                    style={{ fontFamily: 'var(--font-black-ops-one)', fontSize: '2.5rem' }}
                  >
                    {map.label}
                  </span>
                  <span className="text-lg font-black">{map.name}</span>
                </figcaption>
                <div className="overflow-hidden rounded-2xl ring-1 ring-sakhi-rule">
                  <Image
                    src={map.image}
                    alt={map.alt}
                    width={map.width}
                    height={map.height}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </figure>
            ))}
          </div>
          <div className="flex justify-center lg:justify-start">
            <Link
              href={route.backHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-sakhi-night px-6 py-3 text-base font-bold text-sakhi-night transition-colors hover:bg-sakhi-night hover:text-white"
            >
              {route.backLabel}
            </Link>
          </div>
        </div>
      </section>
      <PaithaniBand tone="white" next="black" id="band-route-maps" />
    </main>
  )
}
