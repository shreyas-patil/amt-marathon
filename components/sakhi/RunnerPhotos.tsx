import Image from 'next/image'
import type { SakhiPhoto } from '@/lib/types'

// Women from Amravati Road Runners, shown as a line-up at the top of the
// "Bring your sakhi" section so the page shows that women already run with the
// club. Always a group, never one photo on its own. Every other photo sits a
// little lower, like runners strung out along a road. On phones it is a row
// you swipe sideways (each swipe stops on a photo); from lg up all five fit in
// one row. No caption: the photos speak for themselves.

interface Props {
  photos: SakhiPhoto[]
  /** Names the swipeable region for screen readers. */
  label: string
}

export default function RunnerPhotos({ photos, label }: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl lg:px-20">
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        data-testid="runner-photos"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[22px] pb-9 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sakhi-gold md:px-10 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="m-0 aspect-[3/4] w-[58%] flex-none snap-center overflow-hidden rounded-xl bg-sakhi-deep even:translate-y-9 sm:w-[40%] lg:w-auto"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 40vw, 58vw"
              className="h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
