import Image from 'next/image'
import { getSponsors } from '@/lib/sponsors'
import { SectionTracker } from '@/components/SectionTracker'
import SponsorEmptyState from '@/components/SponsorEmptyState'

export default function SponsorsSection() {
  const sponsors = getSponsors()

  return (
    <section id="sponsors" className="bg-zinc-950 py-24 px-6">
      <SectionTracker sectionId="sponsors" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl sm:text-5xl font-black text-balance mb-4">Our Sponsors</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            The organizations that make this event possible.
          </p>
        </div>

        {sponsors.length === 0 ? (
          <SponsorEmptyState />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="flex items-center justify-center p-6 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-zinc-600 transition-colors"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-14 w-auto"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
