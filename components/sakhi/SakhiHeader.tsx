'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import siteData from '@/lib/data'
import { trackEvent } from '@/lib/analytics'
import type { SakhiLink } from '@/lib/types'
import { PaithaniStrip } from '@/components/sakhi/PaithaniBand'

const { site } = siteData

interface Props {
  links: SakhiLink[]
  backLabel: string
  backHref: string
  registrationUrl: string
  registerLabel: string
  closedLabel: string
  /** The event's name, which labels the navigation for screen readers. */
  name: string
}

/**
 * Header for the women's run page, in the same design language as the main
 * site's Header (fixed black bar, logo, bold links, pill button) but with only
 * this page's sections and the teal Register button.
 */
export default function SakhiHeader({
  links,
  backLabel,
  backHref,
  registrationUrl,
  registerLabel,
  closedLabel,
  name,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const register = (extra: string, location: string) =>
    registrationUrl ? (
      <a
        href={registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackEvent('register_outbound_click', { location })
          setMenuOpen(false)
        }}
        className={`bg-sakhi hover:bg-sakhi-deep text-white text-sm font-bold px-5 rounded-full transition-colors whitespace-nowrap ${extra}`}
      >
        {registerLabel}
      </a>
    ) : (
      <span
        className={`bg-white/10 text-white/80 ring-1 ring-white/20 text-sm font-bold px-5 rounded-full whitespace-nowrap ${extra}`}
      >
        {closedLabel}
      </span>
    )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label={name}>
        <div className="flex items-center justify-between h-16">
          <Link
            href={backHref}
            className="flex items-center"
            onClick={() => trackEvent('nav_click', { label: 'logo', destination: backHref })}
          >
            <Image
              src={site.logoImage}
              alt={backLabel}
              width={site.logoSize.width}
              height={site.logoSize.height}
              className="rounded-lg"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() =>
                  trackEvent('nav_click', { label: link.label, destination: link.href })
                }
                className="text-white/90 hover:text-sakhi-gold-light text-base font-bold transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">{register('py-2 inline-block', 'sakhi_header')}</div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
            onClick={() => {
              if (!menuOpen) trackEvent('mobile_menu_open')
              setMenuOpen(!menuOpen)
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-6 flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-sakhi-gold-light text-base font-bold transition-colors px-1"
                onClick={() => {
                  trackEvent('nav_click', { label: link.label, destination: link.href })
                  setMenuOpen(false)
                }}
              >
                {link.label}
              </a>
            ))}
            <Link
              href={backHref}
              className="text-white/60 hover:text-white text-sm font-semibold transition-colors px-1"
              onClick={() => setMenuOpen(false)}
            >
              {backLabel}
            </Link>
            {register('py-3 text-center mt-2 block', 'sakhi_header_mobile')}
          </div>
        )}
      </nav>
      {/* The page's Paithani border (teal with gold zari) closes the header and its menu. */}
      <PaithaniStrip tone="black" id="sakhi-header" />
    </header>
  )
}
