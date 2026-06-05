'use client'

import { useState } from 'react'
import siteData from '@/lib/data'
import type { PrizeCategory } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import { SectionTracker } from '@/components/SectionTracker'

const { prizes } = siteData

function WarningIcon() {
  return (
    <svg
      className="w-4 h-4 text-orange-400 shrink-0 mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

const fmt = (amount: number | null) => (amount == null ? '—' : `₹${amount.toLocaleString('en-IN')}`)

function PrizeTable({ cat }: { cat: PrizeCategory }) {
  const validPrizes = cat.prizes.filter((p) => p.amounts.some((a) => a != null))
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 w-full">
      <div className="px-6 py-5 border-b border-white/10">
        <h4 className="text-white font-black text-base leading-tight">{cat.name}</h4>
        <p className="text-zinc-400 text-xs mt-1">{cat.ageNote}</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-6 py-3 text-zinc-500 text-xs uppercase tracking-wider font-semibold w-20">
              Rank
            </th>
            {cat.columns.map((col) => (
              <th
                key={col}
                className="text-right px-6 py-3 text-zinc-400 text-xs uppercase tracking-wider font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {validPrizes.map((prize, i) => (
            <tr
              key={prize.rank}
              className={`${i < validPrizes.length - 1 ? 'border-b border-white/5' : ''} ${prize.rank === 1 ? 'bg-white/5' : ''}`}
            >
              <td className="px-6 py-4">
                <span
                  className={`font-bold text-sm ${
                    prize.rank === 1
                      ? 'text-yellow-400'
                      : prize.rank === 2
                        ? 'text-zinc-300'
                        : prize.rank === 3
                          ? 'text-amber-600'
                          : 'text-zinc-500'
                  }`}
                >
                  {`#${prize.rank}`}
                </span>
              </td>
              {prize.amounts.map((amount, j) => (
                <td
                  key={j}
                  className={`px-6 py-4 text-right font-black ${prize.rank === 1 ? 'text-white text-base' : 'text-zinc-400 text-sm'}`}
                >
                  {fmt(amount)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CashPrizesSection() {
  const [activeTab, setActiveTab] = useState(prizes.tabs[0].id)

  const activeTabData = prizes.tabs.find((t) => t.id === activeTab)!
  const activeCategories = prizes.categories.filter((c) =>
    activeTabData.categoryIds.includes(c.id)
  )

  return (
    <section id="prizes" className="bg-zinc-950 py-24 px-4 scroll-mt-16">
      <SectionTracker sectionId="prizes" />
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-white text-4xl sm:text-5xl font-black mb-4 [text-wrap:balance]">
          Run for Glory,{' '}
          <span className="text-orange-400">₹4,50,000 in prizes.</span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto text-base mb-14">
          Awarded across all categories — half marathon, 10 km, 5 km, and the children&apos;s dream run.
        </p>

        {/* Eligibility note */}
        <div className="inline-flex items-start gap-3 bg-orange-500/10 border border-orange-500/30 rounded-xl px-5 py-4 mb-14 text-left max-w-xl">
          <WarningIcon />
          <p className="text-orange-200 text-sm leading-relaxed">
            <span className="font-bold text-orange-400">Eligibility:</span>{' '}
            {prizes.section.eligibilityNote}
          </p>
        </div>

        {/* Tabs — horizontal scroll on mobile */}
        <div
          className="overflow-x-auto mb-8 -mx-4 px-4"
          style={{ paddingTop: '16px', paddingBottom: '16px' }}
        >
          <div className="flex gap-2 w-max mx-auto">
            {prizes.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  trackEvent('prize_tab_click', { tab_id: tab.id, tab_label: tab.label })
                }}
                className="px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap"
                style={
                  activeTab === tab.id
                    ? { background: '#f97316', color: '#ffffff' }
                    : { background: 'rgba(255,255,255,0.06)', color: '#a1a1aa' }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prize tables */}
        <div
          className={`text-left grid gap-4 ${
            activeCategories.length >= 3
              ? 'grid-cols-1 md:grid-cols-3'
              : activeCategories.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 max-w-md mx-auto'
          }`}
        >
          {activeCategories.map((cat) => (
            <PrizeTable key={cat.id} cat={cat} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-zinc-400 text-xs mt-8 leading-relaxed">
          {prizes.section.outOfMaharashtraNote}
        </p>
      </div>
    </section>
  )
}
