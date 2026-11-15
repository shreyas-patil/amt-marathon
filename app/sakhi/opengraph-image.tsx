import { ImageResponse } from 'next/og'
import siteData, { getSakhi } from '@/lib/data'

// Link preview for WhatsApp and social shares of /sakhi. English only: the
// edge image renderer has no Devanagari font loaded.
const { site } = siteData
const sakhi = getSakhi()

export const runtime = 'edge'
export const alt = `${sakhi.name}, ${sakhi.hero.date}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TEAL = '#0d6e72'
const DEEP = '#0a5357'
const ZARI = '#f5b731'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: TEAL,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'serif',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', padding: '72px 80px 0' }}>
        <div style={{ fontSize: 26, color: '#fde7a8', marginBottom: 24, fontFamily: 'sans-serif' }}>
          {`${site.domain}${sakhi.path}`}
        </div>
        <div style={{ fontSize: 96, lineHeight: 1 }}>{sakhi.hero.title.line1}</div>
        <div style={{ fontSize: 96, lineHeight: 1.05, display: 'flex', gap: 24 }}>
          <span style={{ fontStyle: 'italic' }}>{sakhi.hero.title.emphasis}</span>
          <span>{sakhi.hero.title.rest}</span>
        </div>
        <div style={{ fontSize: 34, marginTop: 32, fontFamily: 'sans-serif', fontWeight: 700 }}>
          {sakhi.hero.date}
        </div>
        <div style={{ fontSize: 28, marginTop: 8, color: '#fde7a8', fontFamily: 'sans-serif' }}>
          {sakhi.hero.summary}
        </div>
      </div>

      {/* Paithani band, simplified: teal base, gold lines and panel, two gold lines */}
      <div style={{ display: 'flex', flexDirection: 'column', background: DEEP, height: 60 }}>
        <div style={{ height: 6 }} />
        <div style={{ height: 2, background: ZARI }} />
        <div style={{ height: 4 }} />
        <div style={{ height: 2, background: ZARI }} />
        <div style={{ height: 6 }} />
        <div style={{ height: 18, background: ZARI, opacity: 0.45 }} />
        <div style={{ height: 6 }} />
        <div style={{ height: 2, background: ZARI }} />
        <div style={{ height: 3 }} />
        <div style={{ height: 2, background: ZARI }} />
      </div>
    </div>,
    { ...size }
  )
}
