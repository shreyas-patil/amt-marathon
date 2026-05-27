import type { Metadata } from 'next'
import siteData from '@/lib/data'

const { site, event } = siteData
const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for the Amravati Half Marathon website — ${siteUrl}`,
  alternates: { canonical: `${siteUrl}/privacy` },
  robots: { index: false },
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-zinc-900 font-black text-xl mb-3">{heading}</h2>
      <div className="text-zinc-600 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  const lastUpdated = 'May 2026'

  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <p className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Legal
        </p>
        <h1 className="text-zinc-900 text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm mb-12">
          {site.name} · Last updated {lastUpdated}
        </p>

        <Section heading="Overview">
          <p>
            This website (<strong>{siteUrl}</strong>) is operated by the {site.name} Association to
            provide information about the {event.name} and related race events. We do not sell
            products, collect payments, or build user profiles.
          </p>
        </Section>

        <Section heading="Information we collect">
          <p>
            We do not collect any personal information directly on this website. There are no
            sign-up forms, login systems, or contact forms that store your data on our servers.
          </p>
          <p>
            Registration for the race is handled entirely by{' '}
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              Townscript
            </a>
            , a third-party ticketing platform. Any personal information you provide during
            registration is governed by Townscript&apos;s own privacy policy.
          </p>
        </Section>

        <Section heading="Google Analytics">
          <p>
            This website uses Google Analytics to understand how visitors use the site — pages
            visited, time spent, and general traffic patterns. This data is anonymous and aggregated;
            it cannot be used to identify you personally.
          </p>
          <p>
            Google Analytics sets cookies in your browser to distinguish visits. You can opt out at
            any time using the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            , or by enabling &ldquo;Do Not Track&rdquo; in your browser settings.
          </p>
        </Section>

        <Section heading="Cookies">
          <p>
            The only cookies set on this website are from Google Analytics (described above). We do
            not use cookies for advertising, personalisation, or any other purpose.
          </p>
        </Section>

        <Section heading="Third-party links">
          <p>
            This site links to external services including Townscript (registration), hotel booking
            platforms, and Google Maps. Once you leave this site, their respective privacy policies
            apply.
          </p>
        </Section>

        <Section heading="Contact">
          <p>
            If you have any questions about this privacy policy, you can reach us at{' '}
            <a
              href={`mailto:${site.email}`}
              className="text-orange-500 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </Section>

        <div className="border-t border-zinc-100 pt-8 mt-4">
          <p className="text-zinc-400 text-xs">
            © {event.year} {site.name} Association. This policy may be updated from time to time.
            Continued use of the site constitutes acceptance of any changes.
          </p>
        </div>
      </div>
    </div>
  )
}
