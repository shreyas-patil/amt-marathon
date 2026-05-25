import type { Metadata } from 'next'
import { Geist, Notable, Rubik_Doodle_Triangles } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { siteConfig, eventConfig, seoKeywords } from '@/lib/config'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const notable = Notable({ weight: '400', subsets: ['latin'], variable: '--font-notable' })
const rubikDoodle = Rubik_Doodle_Triangles({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-doodle',
})

export const metadata: Metadata = {
  title: {
    default: `${eventConfig.name} | ${siteConfig.domain}`,
    template: `%s | Amravati Marathon`,
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: eventConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: eventConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: eventConfig.name,
    description: siteConfig.description,
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
      className={`${geist.variable} ${notable.variable} ${rubikDoodle.variable} scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="bg-black text-white antialiased flex flex-col min-h-screen">
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
