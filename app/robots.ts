import { MetadataRoute } from 'next'
import siteData from '@/lib/data'

const siteUrl = `https://${siteData.site.domain}`

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'YandexBot',
        ],
        allow: '/',
      },
      {
        // Known scraper/harvester bots that generate junk traffic
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'BLEXBot',
          'DataForSeoBot',
          'PetalBot',
          'ia_archiver',
          'Bytespider',
          'GPTBot',
          'ClaudeBot',
          'CCBot',
          'anthropic-ai',
          'omgili',
          'omgilibot',
        ],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
