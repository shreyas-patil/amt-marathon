'use client'

import { useState } from 'react'
import siteData from '@/lib/data'
import type { RaceCategory } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import { SectionTracker } from '@/components/SectionTracker'

const { categories } = siteData

// Deadline sourced from categories.section — single source of truth
const EARLY_BIRD_DEADLINE = new Date(categories.section.earlyBirdDeadline)

function useEarlyBirdExpired() {
  const [expired] = useState(
    () => typeof window !== 'undefined' && new Date() > EARLY_BIRD_DEADLINE
  )
  return expired
}

function CategoryCard({ cat }: { cat: RaceCategory }) {
  const [distNum, distUnit] = cat.distance.split(' ')
  const earlyBirdExpired = useEarlyBirdExpired()

  const displayName = cat.name.startsWith(cat.distance)
    ? cat.name.slice(cat.distance.length).trim()
    : cat.name

  return (
    <a
      href="/register"
      onClick={() => trackEvent('cta_register_click', { location: 'category_card', category: cat.id })}
      className="flex flex-col w-full max-w-sm mx-auto group"
    >
      <div
        className="w-full sm:aspect-square rounded-2xl flex flex-col justify-between p-5 ring-1 ring-zinc-700/60 group-hover:ring-orange-500/50 transition-all duration-200"
        style={{
          background: 'linear-gradient(145deg, #3f3f46 0%, #27272a 55%, #18181b 100%)',
        }}
      >
        {/* Distance — right-aligned */}
        <div className="text-right">
          <p
            className="text-white leading-none"
            style={{ fontFamily: 'var(--font-black-ops-one)', fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', textShadow: 'none' }}
          >
            {distNum}
          </p>
          <p
            className="text-orange-500 leading-none"
            style={{ fontFamily: 'var(--font-black-ops-one)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            {distUnit}
          </p>
        </div>

        {/* Bottom: name + age + pricing */}
        <div>
          <div className="mb-3">
            <h3 className="text-white font-black text-base leading-tight">{displayName}</h3>
            {/* zinc-400 on zinc-900 = 5.9:1 — passes WCAG AA for small text */}
            <p className="text-zinc-400 text-xs font-semibold tracking-widest uppercase mt-1">{cat.ageGroup}</p>
          </div>
          <div className="border-t border-zinc-800 pt-3 space-y-1.5">
            <div className="flex justify-between items-baseline">
              {/* Active: zinc-300 on zinc-900 = 10.4:1 AAA. Expired: disabled exception applies */}
              <span
                className={`text-xs font-semibold ${earlyBirdExpired ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}
              >
                Early bird
              </span>
              <span
                className={`font-black text-sm ${earlyBirdExpired ? 'text-zinc-600 line-through' : 'text-white'}`}
              >
                ₹{cat.fees.earlyBird.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              {/* Active: zinc-400 on zinc-900 = 5.9:1 AA. Expired: promoted to zinc-300 */}
              <span className={`text-xs font-semibold ${earlyBirdExpired ? 'text-zinc-300' : 'text-zinc-400'}`}>
                Regular pricing
              </span>
              <span className={`font-black text-sm ${earlyBirdExpired ? 'text-white' : 'text-zinc-300'}`}>
                ₹{cat.fees.standard.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-white py-24 px-6 scroll-mt-16">
      <SectionTracker sectionId="categories" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-zinc-900 text-4xl sm:text-5xl font-black text-balance mb-4">
            {categories.section.heading}
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            Early-bird pricing available until{' '}
            <strong className="text-zinc-700">31 July 2026.</strong>
          </p>
        </div>

        {/* Desktop — 2-col on tablet, 4-col on large desktop */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* Mobile — single column */}
        <div className="sm:hidden flex flex-col gap-14 mb-16">
          {categories.categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* Fees summary table */}
        <div className="bg-zinc-50 rounded-2xl p-6 sm:p-10 mb-10">
          <h3 className="font-black text-zinc-900 text-xl mb-6">
            {categories.section.feesTableCaption}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-zinc-200">
                  <th className="text-left py-3 pr-8 font-semibold text-zinc-600 uppercase text-xs tracking-wider">
                    Category
                  </th>
                  <th className="text-right py-3 px-6 font-semibold text-zinc-600 uppercase text-xs tracking-wider">
                    Early Bird
                  </th>
                  <th className="text-right py-3 pl-6 font-semibold text-zinc-600 uppercase text-xs tracking-wider">
                    Regular Pricing
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.categories.map((cat, i) => (
                  <tr
                    key={cat.id}
                    className={
                      i < categories.categories.length - 1 ? 'border-b border-zinc-100' : ''
                    }
                  >
                    <td className="py-4 pr-8 font-semibold text-zinc-800">{cat.name}</td>
                    <td className="py-4 px-6 text-right font-black text-orange-700 text-base">
                      ₹{cat.fees.earlyBird.toLocaleString()}
                    </td>
                    <td className="py-4 pl-6 text-right font-black text-base text-zinc-600">
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
            href="/register"
            onClick={() => trackEvent('cta_register_click', { location: 'categories_cta' })}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-12 py-4 rounded-full text-lg transition-colors"
          >
            {categories.section.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
