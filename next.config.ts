import type { NextConfig } from 'next'
import sakhi from './data/sakhi.json'

const securityHeaders = [
  // Prevent clickjacking — stops other sites from embedding your pages in iframes
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME-type sniffing attacks
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Only send full referrer to same origin, just the origin to HTTPS cross-origin sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features this site doesn't need
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Force HTTPS for 1 year (only effective once on a real HTTPS host)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // XSS filter for older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // Easy-to-say aliases for the women's run page (/sakhi), for word-of-mouth sharing.
  // Temporary (307) so the main slug can still change without browsers caching it.
  async redirects() {
    const aliases = ['/mahila', '/women', '/womens', '/womens10k', '/womens-10k', '/women10k'].map(
      (source) => ({ source, destination: sakhi.path, permanent: false })
    )
    // /register is the 2026 half marathon's page, whose registration has closed.
    // While the women's run is the open race, old /register links go straight to its
    // sign-up page on Alpha Racing. Remove this when half marathon registration reopens.
    const register = {
      source: '/register',
      destination: sakhi.registrationUrl || sakhi.path,
      permanent: false,
    }
    return [...aliases, register]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
