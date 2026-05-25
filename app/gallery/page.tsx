import type { Metadata } from 'next'
import { getGalleryImages } from '@/lib/gallery'
import GalleryScroll from '@/components/GalleryScroll'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos from the Amravati Half Marathon — runners, crowds, and the spirit of the event.',
  alternates: { canonical: 'https://runamravati.com/gallery' },
  openGraph: { url: 'https://runamravati.com/gallery' },
}

export default function GalleryPage() {
  const images = getGalleryImages()

  return (
    <div className="pt-16 bg-black min-h-screen">
      <div className="py-16 text-center px-6">
        <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Moments
        </p>
        <h1 className="text-white text-4xl sm:text-5xl font-black mb-4">Gallery</h1>
        <p className="text-white/40 max-w-md mx-auto text-sm">
          Capturing the energy, community, and spirit of Amravati&apos;s premier running event.
        </p>
      </div>

      <GalleryScroll images={images} />
    </div>
  )
}
