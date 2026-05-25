import Image from 'next/image'
import type { GalleryImage } from '@/lib/gallery'

interface Props {
  images: GalleryImage[]
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-5 text-center px-6">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <svg
          className="w-9 h-9 text-white/20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
          />
        </svg>
      </div>
      <div>
        <p className="text-white/60 text-lg font-semibold">Photos coming soon</p>
        <p className="text-white/30 text-sm mt-1">Check back after the event — October 25, 2026</p>
      </div>
    </div>
  )
}

export default function GalleryScroll({ images }: Props) {
  if (images.length === 0) return <EmptyState />

  // Split images into two columns for masonry feel
  const col1 = images.filter((_, i) => i % 2 === 0)
  const col2 = images.filter((_, i) => i % 2 === 1)

  // Duplicate each column so the CSS loop animation (-50% translateY) works seamlessly
  const loopedCol1 = [...col1, ...col1]
  const loopedCol2 = col2.length > 0 ? [...col2, ...col2] : null

  return (
    <div className="relative overflow-hidden" style={{ height: '70vh', minHeight: '500px' }}>
      <div className="max-w-7xl mx-auto flex gap-3 px-4 sm:px-8 h-full items-start">
        {/* Column 1 — slower */}
        <div
          className="flex-1 flex flex-col gap-3"
          style={{ animation: 'scroll-gallery 90s linear infinite' }}
        >
          {loopedCol1.map((img, i) => (
            <div key={i} className="relative w-full aspect-[3/2]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 896px) 50vw, 448px"
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Column 2 — faster, offset start so columns feel independent */}
        {loopedCol2 && (
          <div
            className="flex-1 flex flex-col gap-3"
            style={{ animation: 'scroll-gallery 70s linear infinite', animationDelay: '-12s' }}
          >
            {loopedCol2.map((img, i) => (
              <div key={i} className="relative w-full aspect-[3/2]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 896px) 50vw, 448px"
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cinematic vignette — top and bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #000 0%, transparent 28%, transparent 72%, #000 100%)',
        }}
      />
    </div>
  )
}
