import { MetadataRoute } from 'next'
import siteData from '@/lib/data'

const siteUrl = `https://${siteData.site.domain}`

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
