import type { Metadata } from 'next'
import siteData from '@/lib/data'
import RegisterIframe from '@/components/RegisterIframe'

const { event, site, categories } = siteData

export const metadata: Metadata = {
  title: `Register — ${event.name}`,
  description: `Register for the ${event.name}. Choose your category and complete your booking securely.`,
  alternates: {
    canonical: `https://${site.domain}/register`,
  },
}

export default function RegisterPage() {
  const halfMarathon = categories.categories.find((c) => c.id === 'half-marathon')!
  const ticketCats = categories.categories.filter((c) => c.id !== 'half-marathon')

  const males = halfMarathon.subCategories!.filter((s) => s.gender === 'Male')
  const females = halfMarathon.subCategories!.filter((s) => s.gender === 'Female')

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Page header */}
      <div className="pt-32 pb-12 px-6 text-center">
        <h1 className="text-white text-4xl sm:text-5xl font-black text-balance mb-4">
          {event.name}
        </h1>
        <p className="text-zinc-400 text-lg">
          {event.displayDate} · {event.location.city}
        </p>
      </div>

      {/* Category reference panel */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <h2 className="text-white font-black text-2xl text-balance mb-5">
          {categories.section.eligibilityHeading}
        </h2>

        <div className="bg-zinc-900 rounded-2xl overflow-hidden">

          {/* ── Half Marathon ─────────────────────────────── */}
          <div className="px-6 pt-6 pb-5">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="text-white font-black text-xl mb-1">Half Marathon</div>
                <div className="text-zinc-500 text-sm">{halfMarathon.ageGroup}</div>
              </div>
              <div className="flex items-baseline gap-1 shrink-0">
                <span
                  className="text-white text-5xl leading-none"
                  style={{ fontFamily: 'var(--font-black-ops-one)' }}
                >
                  21.1
                </span>
                <span
                  className="text-orange-500 text-2xl leading-none"
                  style={{ fontFamily: 'var(--font-black-ops-one)' }}
                >
                  km
                </span>
              </div>
            </div>

            {/* Sub-category pivot table */}
            <div className="border-t border-zinc-800 text-sm">
              <div className="grid grid-cols-3 bg-zinc-800/40 border-b border-zinc-800">
                <div className="px-4 py-2.5" />
                <div className="px-4 py-2.5 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                  Open
                </div>
                <div className="px-4 py-2.5 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                  Veteran
                </div>
              </div>
              <div className="grid grid-cols-3 border-b border-zinc-800">
                <div className="px-4 py-3 font-bold text-white">Male</div>
                <div className="px-4 py-3 text-zinc-300">
                  {males.find((s) => s.label === 'Open Category')?.ageRange}
                </div>
                <div className="px-4 py-3 text-zinc-300">
                  {males.find((s) => s.label === 'Veteran Category')?.ageRange}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="px-4 py-3 font-bold text-white">Female</div>
                <div className="px-4 py-3 text-zinc-300">
                  {females.find((s) => s.label === 'Open Category')?.ageRange}
                </div>
                <div className="px-4 py-3 text-zinc-300">
                  {females.find((s) => s.label === 'Veteran Category')?.ageRange}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800" />

          {/* ── Other categories ──────────────────────────── */}
          <div>
            {ticketCats.map((cat, i) => {
              const [distNum, distUnit] = cat.distance.split(' ')
              const displayName = cat.name.startsWith(cat.distance)
                ? cat.name.slice(cat.distance.length).trim()
                : cat.name
              return (
                <div
                  key={cat.id}
                  className={`flex items-center gap-6 px-6 py-4${
                    i < ticketCats.length - 1 ? ' border-b border-zinc-800' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm">{displayName}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">
                      Male &amp; Female · {cat.ageGroup}
                      {cat.noAgeCategory ? ' · No age category' : ''}
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 shrink-0">
                    <span
                      className="text-white text-5xl leading-none"
                      style={{ fontFamily: 'var(--font-black-ops-one)' }}
                    >
                      {distNum}
                    </span>
                    <span
                      className="text-orange-500 text-2xl leading-none"
                      style={{ fontFamily: 'var(--font-black-ops-one)' }}
                    >
                      {distUnit}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="border-t border-zinc-800" />

          {/* ── Out of Maharashtra ────────────────────────── */}
          <div className="px-6 py-5 bg-orange-500/[0.08]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
              <span className="font-black text-white text-sm">
                {categories.outOfMaharashtra.heading}
              </span>
              <span className="text-xs font-semibold tracking-wide uppercase bg-orange-500 text-white px-2.5 py-1 rounded-full">
                {categories.outOfMaharashtra.applicableTo}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mb-2 text-pretty">
              {categories.outOfMaharashtra.description}
            </p>
            <p className="text-sm font-semibold text-orange-400">
              ★ {categories.outOfMaharashtra.note}
            </p>
          </div>
        </div>

        {/* Scroll CTA */}
        <div className="text-center mt-6">
          <a
            href="#register-form"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:rounded"
          >
            Continue to registration
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Iframe container */}
      <div
        id="register-form"
        role="region"
        aria-label="Registration form"
        className="max-w-5xl mx-auto px-4 pb-24 scroll-mt-24"
      >
        <RegisterIframe />
        <p className="text-center text-zinc-400 text-xs mt-6">
          Registration is securely processed by{' '}
          <a
            href="https://www.townscript.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors underline underline-offset-2"
          >
            Townscript
          </a>
          . Your data is protected by their privacy policy.
        </p>
      </div>
    </div>
  )
}
