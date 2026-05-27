import { MetadataRoute } from 'next'
import siteData from '@/lib/data'

const base = `https://${siteData.site.domain}`
const { seo } = siteData

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: seo.pages.home.sitemap?.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: seo.pages.home.sitemap?.priority,
    },
    {
      url: `${base}/prizes`,
      lastModified: new Date(),
      changeFrequency: seo.pages.prizes.sitemap?.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: seo.pages.prizes.sitemap?.priority,
    },
    {
      url: `${base}/hotels`,
      lastModified: new Date(),
      changeFrequency: seo.pages.hotels.sitemap?.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: seo.pages.hotels.sitemap?.priority,
    },
    {
      url: `${base}/gallery`,
      lastModified: new Date(),
      changeFrequency: seo.pages.gallery.sitemap?.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: seo.pages.gallery.sitemap?.priority,
    },
    {
      url: `${base}/route-maps`,
      lastModified: new Date(),
      changeFrequency: seo.pages.routeMaps.sitemap?.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: seo.pages.routeMaps.sitemap?.priority,
    },
    {
      url: `${base}/results`,
      lastModified: new Date(),
      changeFrequency: seo.pages.results.sitemap?.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: seo.pages.results.sitemap?.priority,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: seo.pages.contact.sitemap?.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: seo.pages.contact.sitemap?.priority,
    },
  ]
}
