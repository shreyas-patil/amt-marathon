import Link from 'next/link'
import { navigationLinks, siteConfig, eventConfig } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              Brought to you by
            </h4>
            <div className="text-white font-black text-2xl mb-4">
              Amravati Marathon <span className="text-orange-500">Association</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Annual running event celebrating fitness and community in Amravati, Maharashtra,
              India.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              Event Details
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>📅 25 October 2026</li>
              <li>📍 Amravati, Maharashtra</li>
              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-zinc-300 transition-colors"
                  >
                    ✉️ {siteConfig.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© {eventConfig.year} Amravati Marathon. All rights reserved.</p>
          <p>
            Registrations via{' '}
            <a
              href={eventConfig.registrationUrl}
              className="hover:text-zinc-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Townscript
            </a>
            {' · '}
            Timing by Alpha Racing Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
