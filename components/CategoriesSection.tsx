'use client'

import { useEffect, useState } from 'react'
import categoriesData from '@/data/categories.json'
import { eventConfig } from '@/lib/config'

// Aug 1 2026, 12:00 AM IST = July 31 2026, 18:30 UTC
const EARLY_BIRD_DEADLINE = new Date('2026-07-31T18:30:00Z')

function useEarlyBirdExpired() {
  const [expired, setExpired] = useState(false)
  useEffect(() => {
    setExpired(new Date() > EARLY_BIRD_DEADLINE)
  }, [])
  return expired
}

type Category = (typeof categoriesData.categories)[0]

const categoryTheme: Record<string, {
  accent: string
  glow: string
  medalBg: string
  sheenColor: string
  stripeColor: string
  ageColor: string
}> = {
  'half-marathon': {
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.50)',
    medalBg: 'linear-gradient(155deg, #100804 0%, #1e0d06 15%, #321408 35%, #2a1006 55%, #180903 75%, #0c0502 100%)',
    sheenColor: 'rgba(150,80,25,0.20)',
    stripeColor: '#ea580c',
    ageColor: '#c4784a',
  },
  '10km-power-run': {
    accent: '#7aad68',
    glow: 'rgba(122,173,104,0.45)',
    medalBg: 'linear-gradient(155deg, #04100a 0%, #091e0e 15%, #0f2e14 35%, #0a2010 55%, #06140a 75%, #030a05 100%)',
    sheenColor: 'rgba(60,110,40,0.20)',
    stripeColor: '#4a8c3a',
    ageColor: '#6a9e58',
  },
  '5km-fitness-run': {
    accent: '#9c7ec0',
    glow: 'rgba(156,126,192,0.45)',
    medalBg: 'linear-gradient(155deg, #07050d 0%, #110820 15%, #1c0d32 35%, #150a26 55%, #0d0618 75%, #060310 100%)',
    sheenColor: 'rgba(90,50,140,0.20)',
    stripeColor: '#6b3a9c',
    ageColor: '#9070b8',
  },
  '5km-children-dream-run': {
    accent: '#c49a2e',
    glow: 'rgba(196,154,46,0.48)',
    medalBg: 'linear-gradient(155deg, #0c0a03 0%, #1c1608 15%, #2c2008 35%, #20180a 55%, #140f04 75%, #09080a 100%)',
    sheenColor: 'rgba(150,110,20,0.20)',
    stripeColor: '#b07c18',
    ageColor: '#b08828',
  },
}

function MedalLanyard({ stripeColor }: { stripeColor: string }) {
  return (
    <svg
      viewBox="0 0 300 96"
      width="100%"
      height="96"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', marginBottom: '-2px' }}
    >
      <path d="M 32 0 L 68 0 L 154 96 L 140 96 Z" fill="#191919" />
      <path d="M 58 0 L 66 0 L 150 96 L 144 96 Z" fill={stripeColor} />
      <path d="M 32 0 L 36 0 L 143 96 L 140 96 Z" fill="rgba(255,255,255,0.06)" />

      <path d="M 268 0 L 232 0 L 146 96 L 160 96 Z" fill="#191919" />
      <path d="M 242 0 L 234 0 L 150 96 L 156 96 Z" fill={stripeColor} />
      <path d="M 268 0 L 264 0 L 157 96 L 160 96 Z" fill="rgba(255,255,255,0.06)" />

      <ellipse cx="150" cy="90" rx="14" ry="9" fill="#5a5a5a" />
      <ellipse cx="150" cy="90" rx="9"  ry="6"  fill="#2e2e2e" />
      <ellipse cx="150" cy="89" rx="5"  ry="3.5" fill="#444" />
    </svg>
  )
}

function MedalCard({ cat }: { cat: Category }) {
  const theme = categoryTheme[cat.id]
  const [distNum, distUnit] = cat.distance.split(' ')
  const earlyBirdExpired = useEarlyBirdExpired();

  // Strip redundant distance prefix from name
  const displayName = cat.name.startsWith(cat.distance)
    ? cat.name.slice(cat.distance.length).trim()
    : cat.name

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <MedalLanyard stripeColor={theme.stripeColor} />

      <div
        className="w-full aspect-square rounded-2xl relative overflow-hidden flex flex-col"
        style={{
          background: theme.medalBg,
          boxShadow: `0 10px 28px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4)`,
        }}
      >
        {/* Metallic sheen */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 25% 15%, ${theme.sheenColor} 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-7">

          {/* Distance — right-aligned, number large, unit half size */}
          <div className="text-right leading-none">
            <span
              style={{
                fontFamily: '"Rubik Doodle Triangles", serif',
                fontSize: '7rem',
                lineHeight: 1,
                color: theme.accent,
                textShadow: `0 0 36px ${theme.glow}`,
              }}
            >
              {distNum}
            </span>
            <span
              style={{
                fontFamily: '"Rubik Doodle Triangles", serif',
                fontSize: '2.5rem',
                lineHeight: 1,
                color: theme.accent,
                textShadow: `0 0 36px ${theme.glow}`,
                marginLeft: '0.2em',
              }}
            >
              {distUnit}
            </span>
          </div>

          {/* Negative space */}
          <div className="flex-1" />

          {/* Name + age — left-aligned, just above divider */}
          <div className="text-left mb-4">
            <h3 className="text-white font-black text-xl leading-snug">
              {displayName}
            </h3>
            <p
              className="text-xs tracking-widest uppercase mt-1"
              style={{ color: theme.ageColor }}
            >
              {cat.ageGroup}
            </p>
          </div>

          {/* Pricing — divider + rows */}
          <div className="border-t pt-4 space-y-2" style={{ borderColor: 'rgba(255,255,255,0.09)' }}>
            <div className="flex justify-between items-baseline">
              <span
                className="text-base font-medium transition-colors"
                style={{ color: earlyBirdExpired ? 'rgba(161,161,170,0.5)' : '#d4d4d8',
                         textDecoration: earlyBirdExpired ? 'line-through' : 'none' }}
              >
                Early bird
              </span>
              <span
                className="font-black text-2xl transition-colors"
                style={{ color: earlyBirdExpired ? 'rgba(161,161,170,0.5)' : '#ffffff',
                         textDecoration: earlyBirdExpired ? 'line-through' : 'none' }}
              >
                ₹{cat.fees.earlyBird.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span
                className="text-base font-medium transition-colors"
                style={{ color: earlyBirdExpired ? '#d4d4d8' : 'rgba(161,161,170,0.6)' }}
              >
                After Aug 1
              </span>
              <span
                className="font-black text-2xl transition-colors"
                style={{ color: earlyBirdExpired ? '#ffffff' : 'rgba(161,161,170,0.5)',
                         fontSize: earlyBirdExpired ? '1.5rem' : '1.25rem' }}
              >
                ₹{cat.fees.standard.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CategoriesSection() {
  const leftCol = categoriesData.categories.filter((_, i) => i % 2 === 0)
  const rightCol = categoriesData.categories.filter((_, i) => i % 2 === 1)

  return (
    <section id="categories" className="bg-white py-24 px-6 scroll-mt-16">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Race Categories
          </p>
          <h2 className="text-zinc-900 text-4xl sm:text-5xl font-black mb-4">
            Choose Your Challenge
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            Early-bird pricing available until 31 July 2026.
          </p>
        </div>

        {/* Desktop — 2-col staggered */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-x-10 mb-20">
          <div className="flex flex-col gap-20">
            {leftCol.map(cat => <MedalCard key={cat.id} cat={cat} />)}
          </div>
          <div className="flex flex-col gap-20 pt-28">
            {rightCol.map(cat => <MedalCard key={cat.id} cat={cat} />)}
          </div>
        </div>

        {/* Mobile — single column */}
        <div className="sm:hidden flex flex-col gap-14 mb-16">
          {categoriesData.categories.map(cat => <MedalCard key={cat.id} cat={cat} />)}
        </div>

        {/* Fees summary table */}
        <div className="bg-zinc-50 rounded-2xl p-6 sm:p-10 mb-10">
          <h3 className="font-black text-zinc-900 text-xl mb-6">Registration Fees (₹)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-zinc-200">
                  <th className="text-left py-3 pr-8 font-semibold text-zinc-500 uppercase text-xs tracking-wider">Category</th>
                  <th className="text-right py-3 px-6 font-semibold text-zinc-500 uppercase text-xs tracking-wider">Upto 31 July 2026</th>
                  <th className="text-right py-3 pl-6 font-semibold text-zinc-500 uppercase text-xs tracking-wider">1 Aug 2026 onwards</th>
                </tr>
              </thead>
              <tbody>
                {categoriesData.categories.map((cat, i) => (
                  <tr key={cat.id} className={i < categoriesData.categories.length - 1 ? 'border-b border-zinc-100' : ''}>
                    <td className="py-4 pr-8 font-semibold text-zinc-800">{cat.name}</td>
                    <td className="py-4 px-6 text-right font-black text-orange-600 text-base">
                      ₹{cat.fees.earlyBird.toLocaleString()}
                    </td>
                    <td className="py-4 pl-6 text-right text-zinc-400">
                      ₹{cat.fees.standard.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-12 py-4 rounded-full text-lg transition-colors"
          >
            Register Now
          </a>
        </div>

      </div>
    </section>
  )
}
