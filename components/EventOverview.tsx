const stats = [
  { value: '21.1 km', label: 'Half Marathon distance' },
  { value: '4', label: 'Race categories' },
  { value: '₹4.25L', label: 'Total prize pool' },
  { value: 'Oct 25', label: 'Race day 2026' },
]

export default function EventOverview() {
  return (
    <section className="bg-zinc-950 py-24 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              About the Event
            </p>
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight mb-6">
              The Heart of<br />
              <span className="text-zinc-400">Vidarbha Runs</span>
            </h2>
          </div>
          <div>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Organized since 2016 with eight successful editions, the Amravati Half Marathon is celebrated for its meticulous organization and participant-focused approach. Open to runners of all levels — from elite athletes to first-timers — with categories for every pace and age.
            </p>
            <p className="text-zinc-500 text-base leading-relaxed mt-4">
              <strong className="text-zinc-300">Unique Features:</strong> Special "Out of Maharashtra" category for national and international runners. Children's Dream Run (5 km) to encourage young athletes. Total prize pool: ₹4,25,000.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mt-4">
              Registrations via Townscript. Timing & results via Alpha Racing Solutions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {stats.map(stat => (
            <div key={stat.label} className="bg-zinc-950 p-8 text-center">
              <div className="text-4xl sm:text-5xl font-black text-orange-500 mb-2">
                {stat.value}
              </div>
              <div className="text-zinc-500 text-xs uppercase tracking-widest leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
