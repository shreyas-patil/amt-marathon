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

function TicketStub({ cat }: { cat: RaceCategory }) {
  const [distNum, distUnit] = cat.distance.split(' ')

  return (
    <div
      className="flex flex-col md:flex-row rounded-2xl overflow-hidden flex-1 bg-zinc-900"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)' }}
    >
      {/* Main body */}
      <div className="flex flex-col flex-1 p-3 md:p-5">
        {/* Distance — top of card on sm, hidden on md+ (lives in stub panel) */}
        <div className="md:hidden leading-none mb-2">
          <span className="font-black text-white text-2xl">{distNum}</span>
          <span className="font-black text-zinc-400 ml-1 text-xs">{distUnit}</span>
        </div>
        <p className="text-zinc-200 font-black text-xs md:text-sm leading-snug flex-1">{cat.name}</p>
        <div className="mt-3">
          <p className="hidden md:block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
            Eligibility
          </p>
          <p className="text-zinc-400 text-[10px] md:text-xs leading-snug">
            Male &amp; Female · {cat.ageGroup}
          </p>
        </div>
      </div>

      {/* Tear line — horizontal on sm, vertical on md+ */}
      <div className="relative md:hidden flex items-center">
        <div className="absolute -left-3 w-5 h-5 rounded-full bg-zinc-950 z-10" />
        <div className="absolute -right-3 w-5 h-5 rounded-full bg-zinc-950 z-10" />
        <div className="w-full border-t-2 border-dashed border-zinc-700 mx-3" />
      </div>
      <div className="relative hidden md:flex flex-col items-center">
        <div className="absolute -top-3 w-6 h-6 rounded-full bg-zinc-950 z-10" />
        <div className="absolute -bottom-3 w-6 h-6 rounded-full bg-zinc-950 z-10" />
        <div className="h-full border-l-2 border-dashed border-zinc-700 my-3" />
      </div>

      {/* Stub */}
      <div className="flex flex-row md:flex-col justify-between items-center md:items-start px-3 py-3 md:px-5 md:py-5 bg-zinc-800 md:w-36 md:shrink-0">
        {/* Distance — hidden on sm (shown above), visible on md+ */}
        <div className="hidden md:block leading-none mb-auto">
          <span className="font-black text-white text-4xl">{distNum}</span>
          <span className="font-black text-zinc-400 ml-1 text-base">{distUnit}</span>
        </div>
        <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] text-zinc-300">
          {cat.noAgeCategory ? 'No Age Category' : cat.ageGroup}
        </span>
      </div>
    </div>
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

        {/* sm: half marathon full-width above, 3 stubs in a row below
            md+: half marathon tall left (38%), 3 stubs stacked on right */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          {/* Half Marathon card */}
          <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col md:w-[38%] md:shrink-0">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                Half Marathon
              </p>
              <span className="font-black text-white text-2xl md:text-4xl leading-none">21.1</span>
              <span className="text-zinc-400 font-black text-xs md:text-base ml-1">km</span>
            </div>
            <p className="text-zinc-400 text-xs mb-4">{halfMarathon.ageGroup}</p>
            <div className="grid grid-cols-1 gap-2 flex-1">
              {halfMarathon.subCategories!.map((sub, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-zinc-800 rounded-xl px-4 py-3 border border-zinc-700"
                >
                  <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                    {sub.gender} — {sub.label}
                  </span>
                  <span className="text-xs text-zinc-500 mt-0.5">{sub.ageRange}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 stubs: horizontal row on sm, stacked column on md+ */}
          <div className="flex flex-row md:flex-col gap-3 flex-1">
            {ticketCats.map((cat) => (
              <TicketStub key={cat.id} cat={cat} />
            ))}
          </div>
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
      <div className="max-w-5xl mx-auto px-4 pb-24">
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
