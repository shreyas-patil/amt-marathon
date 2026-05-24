'use client'

import Link from 'next/link'
import { useState } from 'react'
import { navigationLinks, eventConfig } from '@/lib/config'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-3">
            <span className="text-white font-black text-xl tracking-tight">
              AMT<span className="text-orange-500">26</span>
            </span>
            <span className="hidden sm:block text-white/40 text-xs tracking-widest uppercase">
              Amravati Marathon
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href={eventConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors"
            >
              Register Now
            </a>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-6 flex flex-col gap-5">
            {navigationLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors px-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={eventConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-3 rounded-full transition-colors text-center mt-2"
            >
              Register Now
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
