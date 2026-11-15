import Link from 'next/link'
import type { SakhiData } from '@/lib/types'
import { container } from '@/components/sakhi/shared'

/** Footer for every /sakhi page: credits the half marathon organisers. */
export default function SakhiFooter({ footer }: { footer: SakhiData['footer'] }) {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div
        className={`${container} flex flex-col items-center gap-2.5 py-8 text-center md:items-start md:text-left`}
      >
        <div className="h-0.5 w-12 bg-orange-500" aria-hidden="true" />
        <p className="mt-1.5 text-xs text-zinc-400">{footer.byLine}</p>
        <p className="text-[21px] font-black tracking-[-0.02em]">
          {footer.wordmark[0]} <span className="text-orange-500">{footer.wordmark[1]}</span>
        </p>
        <ul className="flex gap-5 text-sm">
          {footer.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sakhi-gold-light hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
