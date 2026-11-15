import type { Metadata } from 'next'
import siteData from '@/lib/data'
import { getResults } from '@/lib/results'
import type { ResultEvent, ResultGroup } from '@/lib/types'

const { seo, site } = siteData
const results = getResults()
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: seo.pages.results.title,
  description: seo.pages.results.description,
  alternates: { canonical: `${siteUrl}/results` },
  openGraph: { url: `${siteUrl}/results` },
}

const { placeholderContent: ph, resultsContent: rc } = results

const rankColor = (rank: number) =>
  rank === 1
    ? 'text-yellow-400'
    : rank === 2
      ? 'text-zinc-300'
      : rank === 3
        ? 'text-amber-600'
        : 'text-zinc-500'

function GroupTable({ group, showTiming }: { group: ResultGroup; showTiming: boolean }) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 w-full">
      <div className="px-6 py-5 border-b border-white/10">
        <h3 className="text-white font-black text-base leading-tight">{group.label}</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-6 py-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold w-16">
              {rc.rankLabel}
            </th>
            <th className="text-left px-2 py-3 text-zinc-400 text-xs uppercase tracking-wider font-semibold">
              {rc.nameLabel}
            </th>
            {showTiming && (
              <th className="text-right px-6 py-3 text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                {rc.timeLabel}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {group.entries.map((entry, i) => (
            <tr
              key={entry.rank}
              className={`${i < group.entries.length - 1 ? 'border-b border-white/5' : ''} ${entry.rank === 1 ? 'bg-white/5' : ''}`}
            >
              <td className="px-6 py-4">
                <span className={`font-bold text-sm ${rankColor(entry.rank)}`}>{`#${entry.rank}`}</span>
              </td>
              <td
                className={`px-2 py-4 font-bold ${entry.rank === 1 ? 'text-white' : 'text-zinc-300'}`}
              >
                {entry.name}
              </td>
              {showTiming && (
                <td className="px-6 py-4 text-right font-black tabular-nums text-zinc-400 whitespace-nowrap">
                  {entry.time}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EventSection({ event }: { event: ResultEvent }) {
  return (
    <section id={event.id} className="scroll-mt-20">
      <h2 className="text-white text-2xl sm:text-3xl font-black mb-6">{event.name}</h2>
      {event.published ? (
        <div
          className={`grid gap-4 ${event.groups.length >= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-xl'}`}
        >
          {event.groups.map((group) => (
            <GroupTable key={group.label} group={group} showTiming={event.showTiming} />
          ))}
        </div>
      ) : (
        <p className="bg-zinc-900 border border-white/10 rounded-2xl px-6 py-8 text-zinc-400 text-sm leading-relaxed">
          {rc.pendingNote}
        </p>
      )}
    </section>
  )
}

export default function ResultsPage() {
  if (results.status !== 'completed') {
    return (
      <div className="pt-16 bg-white min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-8">{ph.icon}</p>

          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {ph.tag}
          </p>

          <h1 className="text-zinc-900 text-4xl font-black mb-4">{ph.heading}</h1>

          <p className="text-zinc-500 text-lg leading-relaxed mb-2">{ph.subtext}</p>

          <p className="text-zinc-400 leading-relaxed">{ph.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 bg-zinc-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {rc.tag}
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-black mb-4 [text-wrap:balance]">
            {rc.heading}
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto text-base">{rc.subtext}</p>
          <p
            role="note"
            className="inline-block mt-8 bg-orange-500/10 border border-orange-500/30 rounded-xl px-5 py-3 text-orange-200 text-sm leading-relaxed"
          >
            {rc.provisionalNote}
          </p>
        </div>

        <nav aria-label="Race categories" className="flex flex-wrap justify-center gap-2 mb-16">
          {results.events.map((event) => (
            <a
              key={event.id}
              href={`#${event.id}`}
              className="px-5 py-2.5 rounded-full text-sm font-bold bg-white/5 text-zinc-400 hover:bg-orange-500 hover:text-white transition-colors"
            >
              {event.name}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {results.events.map((event) => (
            <EventSection key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}
