import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'

// Shell for the Amravati Half Marathon pages. Special-event pages (e.g. /sakhi)
// live outside this route group and bring their own header, footer and structured
// data, so Google never reads the half marathon's event on them.
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
