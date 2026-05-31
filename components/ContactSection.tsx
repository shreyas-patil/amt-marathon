'use client'

import Image from 'next/image'
import siteData from '@/lib/data'
import type { Organizer } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import { SectionTracker } from '@/components/SectionTracker'

const { organizers, site, event, contact } = siteData

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75"
      />
    </svg>
  )
}

function OrganizerCard({ org }: { org: Organizer }) {
  const initials = getInitials(org.name)

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-start gap-5">
        {org.avatar ? (
          <div className="w-16 h-16 rounded-2xl shrink-0 shadow-md shadow-orange-200 overflow-hidden">
            <Image
              src={org.avatar}
              alt={org.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
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

      {site.email && (
        <div className="flex items-center gap-2.5 border-t border-zinc-100 pt-5">
          <span className="text-zinc-300">
            <MailIcon />
          </span>
          <a
            href={`mailto:${site.email}`}
            onClick={() => trackEvent('email_click', { location: 'organizer_card' })}
            className="text-zinc-600 hover:text-orange-500 text-sm font-medium transition-colors"
          >
            {site.email}
          </a>
        </div>
      )}
    </div>
  )
}

// Derive social platforms list from site.social
const socialPlatforms = [
  {
    label: 'Instagram',
    handle: site.social.instagram.displayName,
    href: site.social.instagram.available ? site.social.instagram.url : null,
    icon: 'IG',
  },
  {
    label: 'Facebook',
    handle: site.social.facebook.available
      ? site.social.facebook.displayName
      : (site.social.facebook.comingSoonLabel ?? 'link coming soon'),
    href: site.social.facebook.available ? site.social.facebook.url : null,
    icon: 'FB',
  },
]

export default function ContactSection() {
  return (
    <section className="bg-white py-24 px-6">
      <SectionTracker sectionId="contact" />
      <div className="max-w-5xl mx-auto">
        {/* Organizers */}
        <div className="text-center mb-16">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {contact.organizers.sectionTag}
          </p>
          <h2 className="text-zinc-900 text-4xl sm:text-5xl font-black mb-4">
            {contact.organizers.heading}
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto">{contact.organizers.description}</p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-24">
          {organizers.organizers.map((org) => (
            <OrganizerCard key={org.id} org={org} />
          ))}
        </div>

        {/* Contact info */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
            <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-5">
              {contact.contactBoxes[0].eyebrow}
            </p>
            <h3 className="text-zinc-900 font-black text-2xl mb-4">
              {contact.contactBoxes[0].heading}
            </h3>
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                onClick={() => trackEvent('email_click', { location: 'contact_box' })}
                className="inline-flex items-center gap-2.5 text-zinc-700 hover:text-orange-500 transition-colors font-medium"
              >
                <span className="text-zinc-400">
                  <MailIcon />
                </span>
                {site.email}
              </a>
            ) : null}
            <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
              {contact.contactBoxes[0].note}
            </p>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
            <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-5">
              {contact.contactBoxes[1].eyebrow}
            </p>
            <h3 className="text-zinc-900 font-black text-2xl mb-6">
              {contact.contactBoxes[1].heading}
            </h3>
            <div className="space-y-4">
              {socialPlatforms.map((p) => (
                <div key={p.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-200 flex items-center justify-center shrink-0">
                    <span className="text-zinc-500 text-xs font-black">{p.icon}</span>
                  </div>
                  <div>
                    <p className="text-zinc-900 text-sm font-semibold">{p.label}</p>
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent('social_click', {
                            platform: p.label,
                            destination_url: p.href ?? '',
                          })
                        }
                        className="text-orange-500 hover:text-orange-600 text-xs font-medium transition-colors"
                      >
                        @{p.handle}
                      </a>
                    ) : (
                      <p className="text-zinc-400 text-xs italic">{p.handle}</p>
                    )}
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
              <p className="text-orange-200 text-xs uppercase tracking-widest mb-2">
                {contact.quickFacts.raceDayLabel}
              </p>
              <p className="font-black text-2xl">{event.displayDateShort}</p>
            </div>
            <div>
              <p className="text-orange-200 text-xs uppercase tracking-widest mb-2">
                {contact.quickFacts.locationLabel}
              </p>
              <p className="font-black text-2xl">{event.location.displayShort}</p>
            </div>
            {site.email && (
              <div>
                <p className="text-orange-200 text-xs uppercase tracking-widest mb-2">
                  {contact.quickFacts.emailLabel}
                </p>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => trackEvent('email_click', { location: 'contact_quick_facts' })}
                  className="font-black text-lg hover:text-orange-200 transition-colors break-all"
                >
                  {site.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
