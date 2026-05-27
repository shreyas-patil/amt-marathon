import siteData from '@/lib/data'
import type { Hotel } from '@/lib/types'

const { hotels } = siteData

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  )
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  const initials = hotel.name
    .replace(/^Hotel\s+/i, '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all p-6 flex flex-col gap-5 group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
          <span className="text-orange-500 font-black text-sm tracking-tight">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-zinc-900 font-black text-base leading-snug">{hotel.name}</h3>
          <p className="text-zinc-400 text-xs mt-0.5 uppercase tracking-widest">{hotel.city}</p>
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-4 space-y-2">
        {hotel.contactNumbers.map((num) => {
          const digits = num.replace(/\D/g, '')
          return (
            <a
              key={num}
              href={`tel:${digits}`}
              className="flex items-center gap-2.5 text-zinc-600 hover:text-orange-500 transition-colors group/phone"
            >
              <span className="text-zinc-300 group-hover/phone:text-orange-400 transition-colors">
                <PhoneIcon />
              </span>
              <span className="text-sm font-medium">{num}</span>
            </a>
          )
        })}
      </div>

      <a
        href={hotel.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
      >
        {hotels.section.bookNowLabel}
        <ExternalLinkIcon />
      </a>
    </div>
  )
}

export default function HotelsSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {hotels.section.sectionTag}
          </p>
          <h2 className="text-zinc-900 text-4xl sm:text-5xl font-black mb-4">
            {hotels.section.heading}
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">{hotels.section.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {hotels.hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        <p className="text-center text-zinc-400 text-xs mt-10">{hotels.section.footerNote}</p>
      </div>
    </section>
  )
}
