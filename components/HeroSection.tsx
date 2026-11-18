'use client'

import siteData, { isExternalHref } from '@/lib/data'
import { trackEvent } from '@/lib/analytics'

const { hero } = siteData

// Hero colour themes. 'orange' is the half marathon; 'sakhi' is the women's run (teal and gold)
// (set in data/hero.json → theme). Swap back by changing the data, not this file.
const THEMES = {
  orange: {
    glow: 'bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(234,88,12,0.12),transparent)]',
    line: 'via-orange-500/40',
    tag: 'text-orange-500',
    accent: 'text-orange-500',
    edition: 'text-orange-500/80',
    button: 'bg-orange-500 hover:bg-orange-700 focus-visible:ring-orange-500',
  },
  sakhi: {
    glow: 'bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(224,40,127,0.3),transparent)]',
    line: 'via-sakhi-gold/50',
    tag: 'text-sakhi-gold-light',
    accent: 'text-sakhi-gold',
    edition: 'text-sakhi-gold-light',
    button: 'bg-sakhi hover:bg-sakhi-deep focus-visible:ring-sakhi-gold',
  },
} as const

const theme = THEMES[('theme' in hero && hero.theme === 'sakhi' ? 'sakhi' : 'orange') as keyof typeof THEMES]
const editionIsMarathi = 'editionLang' in hero && hero.editionLang === 'mr'

export default function HeroSection() {
  const primary = hero.ctaButtons[0]
  const secondary = hero.ctaButtons[1]
  const primaryHref = primary.href ?? '/register'
  const primaryExternal = isExternalHref(primaryHref)

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background — replace with next/image when hero photo is available */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />
      <div className={`absolute inset-0 ${theme.glow}`} />

      {/* Decorative line */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${theme.line} to-transparent`}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-24 pb-24">
        <p
          className={`${theme.tag} text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-8`}
        >
          {hero.locationTag}
        </p>

        <h1 className="text-6xl sm:text-8xl lg:text-[6rem] font-black text-white leading-[0.9] tracking-[-0.03em] text-balance mb-8">
          {hero.headingLines[0]}
          <br />
          <span className={theme.accent}>{hero.headingLines[1]}</span>
          <br />
          <span className="text-white/60">{hero.headingLines[2]}</span>
        </h1>

        {editionIsMarathi ? (
          // Devanagari breaks apart with letter spacing, so no tracking or uppercase here.
          <p lang="mr" className={`${theme.edition} text-3xl sm:text-4xl font-bold -mt-2 mb-10`}>
            {hero.edition}
          </p>
        ) : (
          <p
            className={`${theme.edition} text-2xl sm:text-3xl font-semibold tracking-[0.2em] uppercase -mt-4 mb-12`}
          >
            {hero.edition}
          </p>
        )}

        <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-pretty">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryHref}
            {...(primaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => {
              trackEvent('cta_register_click', { location: 'hero' })
              if (primaryExternal) trackEvent('register_outbound_click', { location: 'home_hero' })
            }}
            className={`${theme.button} text-white font-bold px-10 py-4 rounded-full text-base sm:text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
          >
            {primary.label}
          </a>
          <a
            href={secondary.href}
            onClick={() =>
              trackEvent('nav_click', {
                label: secondary.label,
                destination: secondary.href ?? '',
              })
            }
            className="border border-white/20 hover:border-white/50 hover:bg-white/10 text-white font-semibold px-10 py-4 rounded-full text-base sm:text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {secondary.label}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-[0.3em] uppercase">{hero.scrollIndicator.label}</span>
        <svg
          className="w-4 h-4 animate-scroll-hint"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
