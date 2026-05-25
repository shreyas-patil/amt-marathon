'use client'

import { useState } from 'react'
import cashPrizesData from '@/data/cash-prizes.json'

const fmt = (amount: number | null) => (amount == null ? '—' : `₹${amount.toLocaleString('en-IN')}`)

const tabs = [
  {
    id: 'half-marathon',
    label: 'Half Marathon',
    categoryIds: ['half-marathon-male', 'half-marathon-female', 'half-marathon-out-of-maharashtra'],
    color: '#f97316',
  },
  {
    id: '10km',
    label: '10 km Power Run',
    categoryIds: ['10km-power-run'],
    color: '#7aad68',
  },
  {
    id: '5km-fitness',
    label: '5 km Fitness Run',
    categoryIds: ['5km-fitness-run'],
    color: '#a78bfa',
  },
  {
    id: 'dream-run',
    label: "Children's Dream Run",
    categoryIds: ['5km-dream-run'],
    color: '#c49a2e',
  },
]

type PrizeCategory = (typeof cashPrizesData.categories)[0]

function PrizeTable({ cat }: { cat: PrizeCategory }) {
  const validPrizes = cat.prizes.filter((p) => p.amounts.some((a) => a != null))
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/8 w-full">
      <div className="px-6 py-5 border-b border-white/8">
        <h4 className="text-white font-black text-base leading-tight">{cat.name}</h4>
        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">{cat.ageNote}</p>
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
              className={`${i < validPrizes.length - 1 ? 'border-b border-white/5' : ''} ${prize.rank === 1 ? 'bg-white/3' : ''}`}
            >
              <td className="px-6 py-4">
                <span
                  className={`font-bold text-sm ${prize.rank === 1 ? 'text-yellow-400' : prize.rank === 2 ? 'text-zinc-300' : prize.rank === 3 ? 'text-amber-600' : 'text-zinc-600'}`}
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
  const [activeTab, setActiveTab] = useState('half-marathon')

  const activeTabData = tabs.find((t) => t.id === activeTab)!
  const activeCategories = cashPrizesData.categories.filter((c) =>
    activeTabData.categoryIds.includes(c.id)
  )

  return (
    <section id="prizes" className="bg-zinc-950 py-24 px-4 scroll-mt-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Cash Prizes & Trophies
        </p>
        <h2 className="text-white text-4xl sm:text-5xl font-black mb-4">
          Run for Glory, <span className="text-zinc-400">Win Big</span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto text-base mb-14">
          Total prize pool of <span className="text-orange-400 font-bold">₹4,50,000</span> across
          all categories.
        </p>

        {/* Eligibility note */}
        <div className="inline-flex items-start gap-3 bg-orange-500/10 border border-orange-500/30 rounded-xl px-5 py-4 mb-14 text-left max-w-xl">
          <span className="text-orange-400 text-lg shrink-0 mt-0.5">⚠</span>
          <p className="text-orange-200 text-sm leading-relaxed">
            <span className="font-bold text-orange-400">Eligibility:</span> Half Marathon runners
            finishing in more than 2:30 hours are not eligible for cash prizes.
          </p>
        </div>

        {/* Tabs — horizontal scroll on mobile */}
        <div
          className="overflow-x-auto mb-8 -mx-4 px-4"
          style={{ paddingTop: '16px', paddingBottom: '16px' }}
        >
          <div className="flex gap-2 w-max mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap"
                style={
                  activeTab === tab.id
                    ? {
                        background: tab.color,
                        color: '#000',
                        boxShadow: `0 0 20px -4px ${tab.color}`,
                      }
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
        <p className="text-zinc-600 text-xs mt-8 leading-relaxed">
          * Out of Maharashtra Runners includes runners from any other state other than Maharashtra
          and international runners.
        </p>
      </div>
    </section>
  )
}
