import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Shell for the Amravati Half Marathon pages. Special-event pages (e.g. /sakhi)
// live outside this route group and bring their own header and footer.
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
