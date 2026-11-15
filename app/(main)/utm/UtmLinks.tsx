'use client'

import { useState } from 'react'

const BASE = 'https://runamravati.com'

const LINKS = [
  { label: 'Instagram post',    url: `${BASE}?utm_source=instagram&utm_medium=social&utm_campaign=2026_launch` },
  { label: 'Instagram story',   url: `${BASE}?utm_source=instagram&utm_medium=social&utm_campaign=2026_stories` },
  { label: 'WhatsApp blast',    url: `${BASE}?utm_source=whatsapp&utm_medium=social&utm_campaign=running_clubs` },
  { label: 'Email newsletter',  url: `${BASE}?utm_source=email&utm_medium=newsletter&utm_campaign=early_bird` },
  { label: 'Facebook post',     url: `${BASE}?utm_source=facebook&utm_medium=social&utm_campaign=2026_launch` },
  { label: 'Poster / flyer QR', url: `${BASE}?utm_source=print&utm_medium=offline&utm_campaign=2026_poster` },
]

export default function UtmLinks() {
  const [copied, setCopied] = useState<string | null>(null)

  async function copy(url: string, label: string) {
    await navigator.clipboard.writeText(url)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="pt-16 bg-black min-h-screen text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Amravati Marathon
        </p>
        <h1 className="text-white text-4xl font-black mb-2">Tracking Links</h1>
        <p className="text-zinc-500 text-sm mb-12">
          Copy a link and use it when sharing on that platform. GA4 will automatically
          show where your visitors came from.
        </p>

        <div className="space-y-3">
          {LINKS.map(({ label, url }) => (
            <div
              key={label}
              className="bg-zinc-900 border border-white/10 rounded-lg px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-white text-sm font-medium mb-1">{label}</p>
                <p className="text-zinc-500 text-xs font-mono truncate">{url}</p>
              </div>
              <button
                onClick={() => copy(url, label)}
                className="shrink-0 text-xs font-medium px-4 py-1.5 rounded bg-orange-500 hover:bg-orange-400 text-white transition-colors"
              >
                {copied === label ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
