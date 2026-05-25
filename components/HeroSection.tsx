import { eventConfig } from '@/lib/config'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background — replace with next/image when hero photo is available */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(234,88,12,0.12),transparent)]" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-16">
        <p className="text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-8">
          Amravati, Maharashtra
        </p>

        <h1 className="text-6xl sm:text-8xl lg:text-[7rem] font-black text-white leading-[0.9] tracking-tighter mb-8">
          AMRAVATI
          <br />
          <span className="text-orange-500">HALF MARATHON</span>
          <br />
          <span className="text-white/30">25 October 2026</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Run through the heart of Vidarbha. Four categories. Thousands of runners.
          One unforgettable race day.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full text-base sm:text-lg transition-colors"
          >
            Register Now
          </a>
          <a
            href="#categories"
            className="border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-semibold px-10 py-4 rounded-full text-base sm:text-lg transition-all"
          >
            View Categories
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
