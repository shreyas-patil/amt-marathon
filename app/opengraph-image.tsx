import { ImageResponse } from 'next/og'
import { eventConfig, siteConfig } from '@/lib/config'

export const runtime = 'edge'
export const alt = `${eventConfig.name} — ${eventConfig.date}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d1500 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Orange accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#f97316',
          }}
        />

        {/* Domain */}
        <div
          style={{
            fontSize: 22,
            color: '#f97316',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          {siteConfig.domain}
        </div>

        {/* Event title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 20,
            padding: '0 60px',
          }}
        >
          {eventConfig.name}
        </div>

        {/* Date & location */}
        <div
          style={{
            fontSize: 28,
            color: '#d1d5db',
            display: 'flex',
            gap: 32,
            marginBottom: 40,
          }}
        >
          <span>October 25, 2026</span>
          <span style={{ color: '#f97316' }}>•</span>
          <span>Amravati, Maharashtra</span>
        </div>

        {/* Categories badges */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['Half Marathon', '10 km', '5 km', "Children's Run"].map((cat) => (
            <div
              key={cat}
              style={{
                background: 'rgba(249,115,22,0.15)',
                border: '1px solid rgba(249,115,22,0.4)',
                borderRadius: 8,
                padding: '8px 20px',
                fontSize: 18,
                color: '#fed7aa',
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: '#f97316',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
