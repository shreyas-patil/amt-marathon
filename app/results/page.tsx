import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Results',
  description: 'Results for the Amravati Half Marathon 2026. Race day is October 25, 2026.',
  alternates: { canonical: 'https://runamravati.com/results' },
  openGraph: { url: 'https://runamravati.com/results' },
}

export default function ResultsPage() {
  return (
    <div className="pt-16 bg-white min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        <p className="text-6xl mb-8">🏁</p>

        <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Results
        </p>

        <h1 className="text-zinc-900 text-4xl font-black mb-4">
          Not yet.
        </h1>

        <p className="text-zinc-500 text-lg leading-relaxed mb-2">
          The race is on <span className="text-zinc-800 font-semibold">October 25, 2026</span>.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Results, rankings, and prize winners will be published here once the last runner crosses the finish line. Come back then.
        </p>

      </div>
    </div>
  )
}
