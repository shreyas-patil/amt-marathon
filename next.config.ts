import type { NextConfig } from 'next'

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
    return ['/mahila', '/women', '/womens', '/womens10k', '/womens-10k', '/women10k'].map(
      (source) => ({ source, destination: '/sakhi', permanent: false })
    )
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
