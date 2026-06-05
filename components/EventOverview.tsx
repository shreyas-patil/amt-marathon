import siteData from '@/lib/data'

const { overview, event } = siteData

export default function EventOverview() {
  return (
    <section className="bg-zinc-950 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Header + Descriptive Text */}
          <div>
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight text-balance mb-8">
              {overview.heading.line1}
              <br />
              <span className="text-zinc-400">{overview.heading.line2}</span>
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed text-pretty">{overview.description}</p>
            <p className="text-zinc-400 text-base leading-relaxed mt-4 text-pretty">
              <strong className="text-zinc-200">{overview.uniqueFeatures.heading} </strong>
              {overview.uniqueFeatures.text}
            </p>
          </div>

          {/* Right: Stacked Cards */}
          <div className="flex flex-col gap-6">
            {/* Start Line Card */}
            <a
              href={event.startLine.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors overflow-hidden"
            >
              {/* Decorative background icon */}
              <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-orange-500 opacity-15 pointer-events-none">
                <svg className="w-52 h-52" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 1 0-16 0c0 3.63 1.556 6.324 3.5 8.327a19.583 19.583 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.144.742ZM12 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <p className="text-xl font-black tracking-wide text-orange-500 uppercase mb-4">
                {overview.infoCards.startLine.title}
              </p>
              <p className="text-white text-lg font-bold leading-snug mb-1">
                {event.startLine.venueName}
              </p>
              <p className="text-zinc-300 text-base mb-4">{event.startLine.address}</p>
              <p className="text-orange-400 text-base font-semibold group-hover:text-orange-300 transition-colors">
                {overview.infoCards.startLine.mapLinkText}
              </p>
            </a>

            {/* Bib Collection Card */}
            <div className="relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl p-6 overflow-hidden">
              {/* Decorative background icon */}
              <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-amber-400 opacity-15 pointer-events-none">
                <svg className="w-52 h-52" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                  />
                </svg>
              </span>
              <p className="text-xl font-black tracking-wide text-amber-400 uppercase mb-4">
                {overview.infoCards.bibCollection.title}
              </p>
              <p className="text-white text-lg font-bold leading-snug mb-1">
                {event.bibCollection.date}
              </p>
              <p className="text-zinc-300 text-base mb-4">{event.bibCollection.subtext}</p>
              <p className="text-zinc-300 text-base">{event.bibCollection.venueNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
