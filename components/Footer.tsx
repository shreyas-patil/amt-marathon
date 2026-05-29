import Link from 'next/link'
import siteData from '@/lib/data'

const { site, event, navigation, footer } = siteData

export default function Footer() {
  const copyright = footer.copyright.replace('{year}', String(event.year))

  return (
    <footer className="bg-black border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              {footer.brand.tagline1}
            </h4>
            <div className="text-white font-black text-2xl mb-4">
              {footer.brand.nameWordmark[0]}{' '}
              <span className="text-orange-500">{footer.brand.nameWordmark[1]}</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">{footer.brand.description}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              {footer.sections.quickLinks.heading}
            </h4>
            <ul className="space-y-3">
              {navigation.main.map((link) => (
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
              {footer.sections.eventDetails.heading}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                {footer.sections.eventDetails.items[0].icon} {event.displayDate}
              </li>
              <li>
                {footer.sections.eventDetails.items[1].icon} {event.location.displayMedium}
              </li>
              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-zinc-300 transition-colors"
                  >
                    {footer.sections.eventDetails.items[2].icon} {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>{copyright}</p>
          <p>
            {site.partners.registration.label}{' '}
            <a
              href="/register"
              className="hover:text-zinc-400 transition-colors"
            >
              {site.partners.registration.name}
            </a>
            {' · '}
            {site.partners.timing.label} {site.partners.timing.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
