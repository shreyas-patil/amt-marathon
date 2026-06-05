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

function FlameIcon() {
  return (
    <div className="relative mx-auto" style={{ width: 32, height: 48 }}>
      <svg
        width="32"
        height="48"
        viewBox="0 0 32 48"
        fill="none"
        aria-hidden="true"
        className="relative"
      >
        {/* Outer flame — amber */}
        <path
          className="flame-body"
          d="M16 2C16 2 5 16 5 26a11 11 0 0 0 22 0C27 16 16 2 16 2Z"
          fill="#f59e0b"
          opacity="0.55"
          style={{ transformOrigin: '16px 37px' }}
        />
        {/* Mid flame — amber-yellow */}
        <path
          className="flame-inner"
          d="M16 11C16 11 10 22 10 28a6 6 0 0 0 12 0C22 22 16 11 16 11Z"
          fill="#fcd34d"
          opacity="0.85"
          style={{ transformOrigin: '16px 34px' }}
        />
        {/* Inner bright core — pale yellow */}
        <path
          d="M16 19C16 19 13 25 13 28a3 3 0 0 0 6 0C19 25 16 19 16 19Z"
          fill="#fef9c3"
          opacity="1"
        />
        {/* Candle body */}
        <rect x="13" y="37" width="6" height="11" rx="2" fill="#fcd34d" opacity="0.2" />
      </svg>
    </div>
  )
}

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

const raceCategories = [
  {
    num: '1',
    distance: '21.1',
    name: 'Half Marathon',
    eligibility: 'Participants must have completed 18 years of age on the day of event.',
    sub: [
      'Male below 45 — Open Category',
      'Male above 45 — Veteran Category',
      'Female below 40 — Open Category',
      'Female above 40 — Veteran Category',
    ],
  },
  {
    num: '2',
    distance: '10',
    name: '10 Km Power Run',
    eligibility: 'Male and Female above 15 years of age. No age category.',
    sub: [],
  },
  {
    num: '3',
    distance: '5',
    name: "Children's Dream Run",
    eligibility: 'Children between 10 to 15 years (Boys/Girls).',
    sub: [],
  },
  {
    num: '4',
    distance: '5',
    name: '5 Km Fitness Run',
    eligibility: 'Male and Female above 15 years of age. No age category.',
    sub: [],
  },
  {
    num: '5',
    distance: '21.1',
    name: 'Out of Maharashtra',
    eligibility:
      'Half Marathon: Male and Female, no age category. A special category for runners from outside Maharashtra, with separate cash prizes.',
    sub: [],
  },
]

function OrganizerTile({ org }: { org: Organizer }) {
  const initials = getInitials(org.name)
  return (
    <div className="flex flex-col items-center gap-4 text-center group">
      {org.avatar ? (
        <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 ring-2 ring-zinc-100 transition-all duration-300 group-hover:ring-orange-500/60 group-hover:scale-105">
          <Image
            src={org.avatar}
            alt={org.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-40 h-40 rounded-full bg-orange-500 flex items-center justify-center shrink-0 ring-2 ring-zinc-100 transition-all duration-300 group-hover:ring-orange-500/60 group-hover:scale-105">
          <span className="text-white font-black text-3xl">{initials}</span>
        </div>
      )}
      <div>
        <p className="text-zinc-900 font-black text-base leading-tight">{org.name}</p>
        {org.role && <p className="text-zinc-400 text-xs mt-1 font-medium">{org.role}</p>}
      </div>
    </div>
  )
}

export default function ContactSection() {
  return (
    <>
      <SectionTracker sectionId="contact" />

      {/* ── Page Header ── */}
      <div className="bg-zinc-950 pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1
            className="text-white font-black text-balance"
            style={{
              fontSize: 'clamp(2.75rem, 7vw, 4.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            About Us
          </h1>
          <p className="text-zinc-400 mt-5 text-lg leading-relaxed max-w-lg text-pretty">
            Nine editions. One city. Built by runners, for runners.
          </p>
        </div>
      </div>

      {/* ── Our Story ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_260px] gap-14 items-start">
            <div className="space-y-5">
              <h2
                className="text-zinc-900 font-black text-balance"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                }}
              >
                Our Story
              </h2>
              <p className="text-zinc-600 leading-relaxed max-w-prose text-pretty">
                Amravati Marathon Association has been organizing the Amravati Half Marathon since
                2016. This event is well known for its neat and excellent organization, with
                Rs.4,50,000 in total cash prizes across different categories.
              </p>
              <p className="text-zinc-600 leading-relaxed max-w-prose text-pretty">
                To encourage runners from outside Maharashtra, a dedicated Out of Maharashtra
                category is created with separate cash prizes. Our earlier eight events were a great
                success, with people from all walks of life — from 10 years to 80 years —
                enthusiastically participating. We encourage children to participate, and a special
                Children&apos;s Dream Run, a 5 km category, has been part of the event from the very
                beginning.
              </p>
            </div>

            <div className="space-y-0 rounded-2xl overflow-hidden border border-zinc-100">
              <div className="bg-zinc-50 px-7 py-6 border-b border-zinc-100">
                <p className="text-zinc-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  Prize Pool
                </p>
                <p
                  className="text-zinc-900 font-black"
                  style={{
                    fontFamily: 'var(--font-black-ops-one)',
                    fontSize: '2.25rem',
                    lineHeight: 1,
                  }}
                >
                  ₹4.5L
                </p>
                <p className="text-zinc-500 text-sm mt-1">across all categories</p>
              </div>
              <div className="bg-zinc-50 px-7 py-6 border-b border-zinc-100">
                <p className="text-zinc-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  Running Since
                </p>
                <p
                  className="text-zinc-900 font-black"
                  style={{
                    fontFamily: 'var(--font-black-ops-one)',
                    fontSize: '2.25rem',
                    lineHeight: 1,
                  }}
                >
                  2016
                </p>
                <p className="text-zinc-500 text-sm mt-1">nine editions completed</p>
              </div>
              <div className="bg-zinc-50 px-7 py-6">
                <p className="text-zinc-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  Open To
                </p>
                <p
                  className="text-zinc-900 font-black"
                  style={{
                    fontFamily: 'var(--font-black-ops-one)',
                    fontSize: '2.25rem',
                    lineHeight: 1,
                  }}
                >
                  Age 10+
                </p>
                <p className="text-zinc-500 text-sm mt-1">runners of all levels</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Race Categories ── */}
      <section className="bg-zinc-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-zinc-900 font-black mb-10 text-balance"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            Race Categories
          </h2>
          <div className="space-y-px">
            {raceCategories.map((cat) => (
              <div
                key={cat.num}
                className="bg-white flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 px-6 py-5 first:rounded-t-2xl last:rounded-b-2xl"
              >
                <div className="shrink-0 flex items-baseline gap-1.5 w-28">
                  <span
                    className="text-orange-500 leading-none"
                    style={{
                      fontFamily: 'var(--font-black-ops-one)',
                      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    }}
                  >
                    {cat.distance}
                  </span>
                  <span className="text-zinc-400 text-xs font-semibold tracking-wider uppercase">
                    km
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-900 font-black text-base">{cat.name}</p>
                  <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{cat.eligibility}</p>
                  {cat.sub.length > 0 && (
                    <ul className="mt-2.5 space-y-1">
                      {cat.sub.map((s, i) => (
                        <li key={i} className="text-zinc-400 text-xs flex gap-2 items-start">
                          <span className="text-orange-300 mt-0.5 shrink-0">›</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Organizers ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2
              className="text-zinc-900 font-black text-balance"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {contact.organizers.heading}
            </h2>
            <p className="text-zinc-400 mt-4 text-base max-w-sm">
              {contact.organizers.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-14 items-start">
            {/* Race Director — inverted card for maximum contrast */}
            {(() => {
              const dilip = organizers.organizers.find((o) => o.name === 'Dilip Patil')
              if (!dilip) return null
              const initials = getInitials(dilip.name)
              return (
                <div className="bg-orange-600 rounded-2xl p-8">
                  <div className="flex flex-col items-center text-center gap-4 mb-7">
                    {dilip.avatar ? (
                      <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 ring-2 ring-white/30">
                        <Image
                          src={dilip.avatar}
                          alt={dilip.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-orange-900 flex items-center justify-center shrink-0">
                        <span className="text-white font-black text-3xl">{initials}</span>
                      </div>
                    )}
                    <div>
                      <p className="text-white font-black text-xl leading-tight">{dilip.name}</p>
                      <p className="text-orange-200 font-bold text-sm mt-1">{dilip.role}</p>
                    </div>
                  </div>
                  <p
                    className="text-white/90 text-m leading-relaxed text-pretty"
                    style={{ lineHeight: 1.75 }}
                  >
                    {dilip.bio}
                  </p>
                </div>
              )
            })()}

            {/* Rest of the team */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 justify-items-center content-start pt-8">
              {organizers.organizers
                .filter((o) => o.name !== 'Dilip Patil')
                .map((org) => (
                  <OrganizerTile key={org.id} org={org} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── In Memoriam ── */}
      <section className="bg-zinc-950 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <FlameIcon />
          </div>
          <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase font-semibold mb-8">
            In Memoriam
          </p>
          <div
            className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6"
            style={{
              maskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
            }}
          >
            <Image
              src="/images/organizers/mamesh.jpg"
              alt="Mamesh Mathankar"
              width={160}
              height={160}
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <h2
            className="text-white font-black mb-1 text-balance"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', letterSpacing: '-0.01em' }}
          >
            Mamesh Mathankar
          </h2>
          <div className="w-10 h-px bg-zinc-700 mx-auto my-8" />
          <p
            className="text-zinc-300 leading-relaxed max-w-lg mx-auto text-pretty"
            style={{ lineHeight: 1.75 }}
          >
            You gave everything to this event. Your meticuluous hands shaped the operations that
            made the marathon run smoothly year after year. Your passing was sudden and devastating
            for everyone in this community. We feel your absence in every corner of this event, and
            this year is not the same without you here. This year we run with you in our hearts.
          </p>
          <p className="text-zinc-500 mt-6 text-sm italic">Rest in peace Mamesh, we miss you.</p>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
              <h3 className="text-zinc-900 font-black text-xl mb-4">
                {contact.contactBoxes[0].heading}
              </h3>
              {site.email && (
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => trackEvent('email_click', { location: 'contact_box' })}
                  className="inline-flex items-center gap-2.5 text-zinc-700 hover:text-orange-500 transition-colors font-medium text-sm"
                >
                  <span className="text-zinc-400">
                    <MailIcon />
                  </span>
                  {site.email}
                </a>
              )}
              {contact.contactBoxes[0].note && (
                <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
                  {contact.contactBoxes[0].note}
                </p>
              )}
            </div>

            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
              <h3 className="text-zinc-900 font-black text-xl mb-6">
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
        </div>
      </section>
    </>
  )
}
