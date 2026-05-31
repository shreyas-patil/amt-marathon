import type { Metadata } from 'next'
import { Geist, Notable, Black_Ops_One } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CookieConsent from '@/components/CookieConsentLoader'
import siteData from '@/lib/data'

const { site, event, seo } = siteData

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const notable = Notable({ weight: '400', subsets: ['latin'], variable: '--font-notable' })
const blackOpsOne = Black_Ops_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-ops-one',
})

const siteUrl = `https://${site.domain}`

export const metadata: Metadata = {
  title: {
    default: `${event.name} | ${site.domain}`,
    template: seo.titleTemplate,
  },
  description: seo.pages.home.description,
  keywords: site.seoKeywords,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: site.name,
    title: event.name,
    description: seo.pages.home.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: event.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: event.name,
    description: seo.pages.home.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${notable.variable} ${blackOpsOne.variable} scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="bg-black text-white antialiased flex flex-col min-h-screen">
        <GoogleAnalytics />
        <CookieConsent />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
