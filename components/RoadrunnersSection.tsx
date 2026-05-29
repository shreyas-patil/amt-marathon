import Image from 'next/image'

export default function RoadrunnersSection() {
  return (
    <section className="bg-zinc-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-hidden">
          {/* Image — floated right on desktop, full-width on mobile */}
          <div
            className="mb-8 lg:float-right lg:ml-12 lg:mb-6 lg:w-[60%]"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
              borderRadius: '1rem',
            }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src="/images/roadrunners/group.webp"
                alt="Amravati Road Runners group"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>

          {/* Text flows around the image */}
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            The People Behind the Race
          </p>
          <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight mb-6">
            Amravati <span className="text-orange-500">Road Runners</span>
          </h2>
          <p className="text-zinc-300 text-lg leading-relaxed mb-6">
            Amravati Road Runners is a group of passionate marathon runners who are actively
            involved in the planning, organization, and participation of the Amravati Half Marathon.
            From the first training session to the final finish line, every member of this group
            carries a responsibility — and they carry it with pride.
          </p>
          <p className="text-zinc-400 text-base leading-relaxed mb-6">
            Their ambition doesn&apos;t stop locally. Members have gone on to participate in
            comrades marathons, Abbott World Marathon Majors, and events far beyond the city limits
            — proving that a small community can dream big.
          </p>
          <p className="text-zinc-400 text-base leading-relaxed">
            At its heart, Amravati Road Runners is a health and fitness community. It exists to
            bring everyday people together, build confidence, and show that anyone can toe the start
            line of their next marathon.
          </p>
        </div>
      </div>
    </section>
  )
}
