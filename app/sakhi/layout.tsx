import { Tiro_Devanagari_Marathi, Mukta, Baloo_2 } from 'next/font/google'
import { getSakhi } from '@/lib/data'
import SakhiHeader from '@/components/sakhi/SakhiHeader'
import SakhiFooter from '@/components/sakhi/SakhiFooter'

// Fonts for the women's run only, so the main site doesn't download them.
// Tiro: English display headings. Baloo 2: Marathi in the hero. Mukta: all other
// Marathi. Geist (from the root layout) stays the English body font, shared with the main site.
const tiro = Tiro_Devanagari_Marathi({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-tiro',
  display: 'swap',
})

const mukta = Mukta({
  weight: ['400', '600', '700', '800'],
  subsets: ['devanagari', 'latin'],
  variable: '--font-mukta',
  display: 'swap',
})

const baloo = Baloo_2({
  weight: ['600', '800'],
  subsets: ['devanagari', 'latin'],
  variable: '--font-baloo',
  display: 'swap',
})

// Every /sakhi page shares the women's run header and footer.
const sakhi = getSakhi()

export default function SakhiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${tiro.variable} ${mukta.variable} ${baloo.variable} flex-1 flex flex-col bg-black font-sans`}
    >
      <SakhiHeader
        links={sakhi.nav.links}
        backLabel={sakhi.nav.backLabel}
        backHref={sakhi.nav.backHref}
        registrationUrl={sakhi.registrationUrl}
        registerLabel={sakhi.hero.cta.label}
        closedLabel={sakhi.registrationClosedLabel}
        name={sakhi.name}
      />
      {children}
      <SakhiFooter footer={sakhi.footer} />
    </div>
  )
}
