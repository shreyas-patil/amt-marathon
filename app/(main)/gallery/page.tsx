import type { Metadata } from 'next'
import { getGalleryImages } from '@/lib/gallery'
import GalleryScroll from '@/components/GalleryScroll'
import siteData from '@/lib/data'

const { seo, site, gallery } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: seo.pages.gallery.title,
  description: seo.pages.gallery.description,
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: { url: `${siteUrl}/gallery` },
}

export default function GalleryPage() {
  const images = getGalleryImages()

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="py-16 text-center px-6">
        <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          {gallery.page.sectionTag}
        </p>
        <h1 className="text-white text-4xl sm:text-5xl font-black mb-4">{gallery.page.heading}</h1>
        <p className="text-white/40 max-w-md mx-auto text-sm">{gallery.page.description}</p>
      </div>

      <GalleryScroll images={images} />
    </div>
  )
}
