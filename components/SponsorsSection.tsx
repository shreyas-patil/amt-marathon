import Image from 'next/image'
import Link from 'next/link'
import { getSponsors } from '@/lib/sponsors'

function EmptyState() {
  return (
    <div className="text-center py-16 border-2 border-dashed border-zinc-700 rounded-2xl">
      <p className="text-zinc-500 text-base font-medium mb-2">Sponsor logos will appear here</p>
      <p className="text-zinc-500 text-sm">
        Interested in sponsoring?{' '}
        <Link href="/contact" className="text-orange-500 hover:underline">
          Get in touch.
        </Link>
      </p>
    </div>
  )
}

export default function SponsorsSection() {
  const sponsors = getSponsors()

  return (
    <section id="sponsors" className="bg-zinc-950 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Partners
          </p>
          <h2 className="text-white text-4xl sm:text-5xl font-black mb-4">Our Sponsors</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            The organizations that make this event possible.
          </p>
        </div>

        {sponsors.length === 0 ? (
          <EmptyState />
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
