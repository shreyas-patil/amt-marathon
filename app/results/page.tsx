import type { Metadata } from 'next'
import siteData from '@/lib/data'

const { seo, results, site } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: seo.pages.results.title,
  description: seo.pages.results.description,
  alternates: { canonical: `${siteUrl}/results` },
  openGraph: { url: `${siteUrl}/results` },
}

const { placeholderContent: ph } = results

export default function ResultsPage() {
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
