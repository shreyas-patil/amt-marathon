import type { Metadata } from 'next'
import Link from 'next/link'
import siteData from '@/lib/data'
import RegistrationTracker from '@/components/RegistrationTracker'
import WhatsAppJoin from '@/components/WhatsAppJoin'

const { event, site } = siteData

export const metadata: Metadata = {
  title: `Registration Confirmed — ${event.name}`,
  description: 'Your registration for the Amravati Half Marathon is confirmed.',
  alternates: { canonical: `https://${site.domain}/thankYou` },
  robots: { index: false },
}

type SearchParams = {
  name?: string
  email?: string
  phone?: string
  eventcode?: string
  ticketIds?: string
  merchantReferenceId?: string
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-4 border-b border-zinc-800 last:border-0">
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 sm:w-44 shrink-0">
        {label}
      </span>
      <span className="text-zinc-200 font-medium break-all">{value}</span>
    </div>
  )
}

// Pure, synchronous content. Extracted from the async page so React Testing
// Library can render it directly — RTL cannot render async Server Components.
// The page shell stays async and passes already-resolved params down.
export function ThankYouContent({
  firstName,
  email,
  phone,
  ticketIds,
  merchantReferenceId,
}: {
  firstName: string | null
  email?: string
  phone?: string
  ticketIds?: string
  merchantReferenceId?: string
}) {
  const hasAnyDetail = email || phone || ticketIds || merchantReferenceId

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
      {/* Check mark */}
      <div className="w-20 h-20 rounded-full bg-orange-500/10 border-2 border-orange-500/40 flex items-center justify-center mb-8">
        <svg
          className="w-10 h-10 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Heading */}
      <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
        Registration Confirmed
      </p>
      <h1 className="text-white text-4xl sm:text-5xl font-black mb-3 text-center">
        {firstName ? `Thank you, ${firstName}!` : 'Thank you!'}
      </h1>
      <p className="text-zinc-400 text-lg text-center mb-2">
        You&apos;re officially registered for the {event.name}.
      </p>
      <p className="text-zinc-500 text-sm text-center mb-12">
        {event.displayDate} · {event.location.city}
      </p>

      {/* Details card */}
      {hasAnyDetail && (
        <div className="w-full max-w-lg bg-zinc-900 rounded-2xl px-6 py-2 mb-10">
          {email && <DetailRow label="Confirmation sent to" value={email} />}
          {ticketIds && <DetailRow label="Ticket ID" value={ticketIds} />}
          {merchantReferenceId && <DetailRow label="Reference ID" value={merchantReferenceId} />}
          {phone && <DetailRow label="Updates on" value={phone} />}
        </div>
      )}

      {/* Note */}
      {email && (
        <p className="text-zinc-500 text-sm text-center max-w-sm mb-10">
          We&apos;ve sent your registration details to{' '}
          <span className="text-zinc-300">{email}</span>. Check your inbox (and spam folder) for
          your confirmation email from Townscript.
        </p>
      )}

      {/* Join the WhatsApp group */}
      <WhatsAppJoin groupUrl={event.whatsappGroupUrl} />

      {/* Back home */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3.5 rounded-full transition-colors text-sm"
      >
        Back to home
      </Link>
    </div>
  )
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { name, email, phone, ticketIds, merchantReferenceId } = await searchParams

  const firstName = name?.trim().split(/\s+/)[0] ?? null

  return (
    <div className="min-h-screen bg-zinc-950">
      <RegistrationTracker />
      <ThankYouContent
        firstName={firstName}
        email={email}
        phone={phone}
        ticketIds={ticketIds}
        merchantReferenceId={merchantReferenceId}
      />
    </div>
  )
}
