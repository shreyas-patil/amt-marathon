import type { Metadata } from 'next'
import siteData from '@/lib/data'
import type { RaceCategory } from '@/lib/types'
import RegisterIframe from '@/components/RegisterIframe'

const { event, site, categories } = siteData

export const metadata: Metadata = {
  title: `Register — ${event.name}`,
  description: `Register for the ${event.name}. Choose your category and complete your booking securely.`,
  alternates: {
    canonical: `https://${site.domain}/register`,
  },
}

function CategoryCard({ cat }: { cat: RaceCategory }) {
  const [distNum, distUnit] = cat.distance.split(' ')
  const displayName = cat.name.startsWith(cat.distance)
    ? cat.name.slice(cat.distance.length).trim()
    : cat.name

  return (
    <a
      href="#register-form"
      className="block bg-zinc-900 rounded-2xl p-5 hover:bg-zinc-800 transition-colors"
    >
      <div className="leading-none mb-3">
        <span className="font-black text-white text-3xl">{distNum}</span>
        <span className="font-black text-zinc-400 text-sm ml-1">{distUnit}</span>
      </div>
      <p className="text-zinc-200 font-black text-sm leading-snug mb-2">{displayName}</p>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
        Eligibility
      </p>
      <p className="text-zinc-400 text-xs">
        Male &amp; Female · {cat.ageGroup}
        {cat.noAgeCategory ? ' · No Age Category' : ''}
      </p>
    </a>
  )
}

export default function RegisterPage() {
  const halfMarathon = categories.categories.find((c) => c.id === 'half-marathon')!
  const ticketCats = categories.categories.filter((c) => c.id !== 'half-marathon')

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Page header */}
      <div className="pt-32 pb-12 px-6 text-center">
        <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Secure Registration
        </p>
        <h1 className="text-white text-4xl sm:text-5xl font-black mb-4">{event.name}</h1>
        <p className="text-zinc-400 text-lg">
          {event.displayDate} · {event.location.city}
        </p>
      </div>

      {/* Eligibility & Age Groups */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-white font-black text-2xl mb-6">
          {categories.section.eligibilityHeading}
        </h2>

        {/* Half Marathon — full width, sub-categories in 2×2 grid */}
        <div className="bg-zinc-900 rounded-2xl p-5 mb-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Half Marathon
            </p>
            <span className="font-black text-white text-2xl md:text-3xl leading-none">21.1</span>
            <span className="text-zinc-400 font-black text-sm">km</span>
            <span className="text-zinc-500 text-xs">{halfMarathon.ageGroup}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {halfMarathon.subCategories!.map((sub, i) => (
              <a
                key={i}
                href="#register-form"
                className="flex flex-col bg-zinc-800 rounded-xl px-4 py-3 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-colors"
              >
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                  {sub.gender} — {sub.label}
                </span>
                <span className="text-sm text-zinc-400 mt-0.5">{sub.ageRange}</span>
              </a>
            ))}
          </div>
        </div>

        {/* 3 other categories — side by side in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {ticketCats.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* Out of Maharashtra */}
        <div className="rounded-2xl p-6 border-2 border-orange-500/40 bg-orange-500/10">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <span className="font-black text-white text-base">
              {categories.outOfMaharashtra.heading}
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase bg-orange-500 text-white px-2.5 py-0.5 rounded-full">
              {categories.outOfMaharashtra.applicableTo}
            </span>
          </div>
          <p className="text-sm text-zinc-300 mb-1">{categories.outOfMaharashtra.description}</p>
          <p className="text-sm font-semibold text-orange-400">
            ★ {categories.outOfMaharashtra.note}
          </p>
        </div>
      </div>

      {/* Iframe container */}
      <div id="register-form" className="max-w-5xl mx-auto px-4 pb-24 scroll-mt-24">
        <RegisterIframe />
        <p className="text-center text-zinc-600 text-xs mt-6">
          Registration is securely processed by{' '}
          <a
            href="https://www.townscript.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-400 transition-colors underline underline-offset-2"
          >
            Townscript
          </a>
          . Your data is protected by their privacy policy.
        </p>
      </div>
    </div>
  )
}
