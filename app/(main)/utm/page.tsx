import type { Metadata } from 'next'
import UtmLinks from './UtmLinks'

export const metadata: Metadata = {
  title: 'UTM Links',
  robots: { index: false, follow: false },
}

export default function UtmPage() {
  return <UtmLinks />
}
