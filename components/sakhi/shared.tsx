// Small helpers shared by every /sakhi page.

/** Page-width container used by every section. */
export const container = 'mx-auto w-full max-w-6xl px-[22px] md:px-10 lg:px-20'

/** Staggered hero entrance: each step 90ms after the previous one (see .sakhi-rise). */
export const rise = (step: number) => ({ '--sakhi-delay': `${step * 90}ms` }) as React.CSSProperties

/** Marathi body text, in Mukta. */
export function Marathi({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span lang="mr" className={`font-sakhi-mr ${className}`}>
      {children}
    </span>
  )
}

/** Marathi in a hero, in Baloo 2 (as in the approved mockup). */
export function HeroMarathi({ children }: { children: React.ReactNode }) {
  return (
    <span lang="mr" className="font-sakhi-hero">
      {children}
    </span>
  )
}
