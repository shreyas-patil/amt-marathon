export default function EventOverview() {
  return (
    <section className="bg-zinc-950 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Header + Descriptive Text */}
          <div>
            <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              About the Event
            </p>
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight mb-8">
              The Heart of
              <br />
              <span className="text-zinc-400">Vidarbha Runs</span>
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Organized since 2016 with eight successful editions, the Amravati Half Marathon is
              celebrated for its meticulous organization and participant-focused approach. Open to
              runners of all levels — from elite athletes to first-timers — with categories for
              every pace and age.
            </p>
            <p className="text-zinc-400 text-base leading-relaxed mt-4">
              <strong className="text-zinc-200">Unique Features: </strong> Special &ldquo;Out of
              Maharashtra&rdquo; category for national and international runners. Children&apos;s
              Dream Run (5 km) to encourage young athletes. Total prize pool: ₹4,50,000.
            </p>
          </div>

          {/* Right: Stacked Cards */}
          <div className="flex flex-col gap-6">
            {/* Start Line Card */}
            <a
              href="https://www.google.com/maps/place/Shri+Shivaji+College+of+Physical+Education/@20.9415074,77.7654201,17z/data=!4m10!1m2!2m1!1sSri+Shivaji+College+of+Physical+Education+Phanchavati+Chhowk+Amravati!3m6!1s0x3bd6a360e81101e1:0x286a93cdffad8a3e!8m2!3d20.9415074!4d77.7701837!15sCkVTcmkgU2hpdmFqaSBDb2xsZWdlIG9mIFBoeXNpY2FsIEVkdWNhdGlvbiBQaGFuY2hhdmF0aSBDaGhvd2sgQW1yYXZhdGlaRyJFc3JpIHNoaXZhamkgY29sbGVnZSBvZiBwaHlzaWNhbCBlZHVjYXRpb24gcGhhbmNoYXZhdGkgY2hob3drIGFtcmF2YXRpkgEHY29sbGVnZZoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQycEdibFV4UWtObFJHeDNVMnRHTWxGVlNYaGthM2d4VG10d1JGbHNSUkFC4AEA-gEECAAQFg!16s%2Fg%2F11f3j8j31f?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
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
                Start Line
              </p>
              <p className="text-white text-lg font-bold leading-snug mb-1">
                Sri Shivaji College of Physical Education
              </p>
              <p className="text-zinc-300 text-base mb-4">Phanchavati Chouk, Amravati</p>
              <p className="text-orange-400 text-base font-semibold group-hover:text-orange-300 transition-colors">
                View on Google Maps →
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
                Bib Collection
              </p>
              <p className="text-white text-lg font-bold leading-snug mb-1">24 October, 2026</p>
              <p className="text-zinc-300 text-base mb-4">Day before the race</p>
              <p className="text-zinc-300 text-base">
                Venue to be announced closer to race day. Stay tuned.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
