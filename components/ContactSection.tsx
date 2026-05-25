import Image from 'next/image'
import organizersData from '@/data/organizers.json'
import { siteConfig } from '@/lib/config'

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
    </svg>
  )
}

function OrganizerCard({ org }: { org: (typeof organizersData.organizers)[0] }) {
  const initials = getInitials(org.name)

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-start gap-5">
        {/* Avatar */}
        {org.avatar ? (
          <div className="w-16 h-16 rounded-2xl shrink-0 shadow-md shadow-orange-200 overflow-hidden">
            <Image src={org.avatar} alt={org.name} width={64} height={64} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-orange-200">
            <span className="text-white font-black text-xl tracking-tight">{initials}</span>
          </div>
        )}
        <div>
          <h3 className="text-zinc-900 font-black text-xl leading-tight">{org.name}</h3>
          <p className="text-orange-500 font-semibold text-sm mt-0.5">{org.role}</p>
          <p className="text-zinc-400 text-xs mt-0.5 uppercase tracking-wider">{org.title}</p>
        </div>
      </div>

      <p className="text-zinc-600 text-sm leading-relaxed border-t border-zinc-100 pt-6">
        {org.bio}
      </p>

      {siteConfig.email && (
        <div className="flex items-center gap-2.5 border-t border-zinc-100 pt-5">
          <span className="text-zinc-300"><MailIcon /></span>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-zinc-600 hover:text-orange-500 text-sm font-medium transition-colors"
          >
            {siteConfig.email}
          </a>
        </div>
      )}
    </div>
  )
}

const socialPlatforms = [
  { label: 'Instagram', handle: '@runamravati', href: '#', icon: 'IG' },
  { label: 'Facebook', handle: 'Amravati Marathon', href: '#', icon: 'FB' },
  { label: 'X / Twitter', handle: '@amravatimarathon', href: '#', icon: 'X' },
]

export default function ContactSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Organizers */}
        <div className="text-center mb-16">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            The Team
          </p>
          <h2 className="text-zinc-900 text-4xl sm:text-5xl font-black mb-4">
            Meet the Organizers
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto">
            The people behind Amravati's premier running event.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-24">
          {organizersData.organizers.map(org => (
            <OrganizerCard key={org.id} org={org} />
          ))}
        </div>

        {/* Contact info */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
            <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-5">
              Get in Touch
            </p>
            <h3 className="text-zinc-900 font-black text-2xl mb-4">General Enquiries</h3>
            {siteConfig.email ? (
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2.5 text-zinc-700 hover:text-orange-500 transition-colors font-medium"
              >
                <span className="text-zinc-400"><MailIcon /></span>
                {siteConfig.email}
              </a>
            ) : null}
            <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
              For registration queries, please visit Townscript. For timing and results, contact Alpha Racing Solutions directly.
            </p>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
            <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-5">
              Follow Along
            </p>
            <h3 className="text-zinc-900 font-black text-2xl mb-6">Social Media</h3>
            <div className="space-y-4">
              {socialPlatforms.map(p => (
                <div
                  key={p.label}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-200 flex items-center justify-center shrink-0">
                    <span className="text-zinc-500 text-xs font-black">{p.icon}</span>
                  </div>
                  <div>
                    <p className="text-zinc-900 text-sm font-semibold">{p.label}</p>
                    <p className="text-zinc-400 text-xs">{p.handle} · <span className="italic">link coming soon</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event quick facts */}
        <div className="bg-orange-500 rounded-2xl p-8 sm:p-10 text-white">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-orange-200 text-xs uppercase tracking-widest mb-2">Race Day</p>
              <p className="font-black text-2xl">Oct 25, 2026</p>
            </div>
            <div>
              <p className="text-orange-200 text-xs uppercase tracking-widest mb-2">Location</p>
              <p className="font-black text-2xl">Amravati, MH</p>
            </div>
            {siteConfig.email && (
              <div>
                <p className="text-orange-200 text-xs uppercase tracking-widest mb-2">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="font-black text-lg hover:text-orange-200 transition-colors break-all">
                  {siteConfig.email}
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
