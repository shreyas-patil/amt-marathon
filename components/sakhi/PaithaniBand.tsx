// A horizontal Paithani sari border placed between two sections of the women's
// run page. From top to bottom:
//   1. small triangles pointing up into the section above, in that section's border shade
//   2. the border in that section's shades: two thin lines and a checkered zari panel
//   3. two thin gold lines, then triangles of the same height pointing down into the
//      next section in that section's border shade, so the border hands off from one
//      colour to the next
// The background (triangles and the solid body) is teal everywhere; the foreground
// (lines and checks) is zari gold, as on a real Paithani. SVG patterns tile to any width.

/** The zari gold of the lines and checks. */
export const ZARI = '#f5b731'

export type PaithaniTone = 'teal' | 'white' | 'black'

export const PAITHANI_TONES: Record<
  PaithaniTone,
  { section: string; base: string; light: string }
> = {
  // On teal, a deeper teal so the border stands apart from the section.
  teal: { section: '#0d6e72', base: '#0a5357', light: ZARI },
  white: { section: '#ffffff', base: '#0d6e72', light: ZARI },
  black: { section: '#0a0a0a', base: '#0d6e72', light: ZARI },
}

const TEETH = 7 // triangle height, both directions
const BAND = 22 // two lines + checkered panel
const LINES = 8 // two thin gold lines in the next section
const HEIGHT = TEETH + BAND + TEETH + LINES

interface Props {
  /** Colour of the section this border closes. */
  tone: PaithaniTone
  /** Colour of the section that follows. */
  next: PaithaniTone
  /** Unique prefix for the SVG pattern ids on this page. */
  id: string
}

export default function PaithaniBand({ tone, next, id }: Props) {
  const { section, base, light } = PAITHANI_TONES[tone]
  const below = PAITHANI_TONES[next]
  const upId = `${id}-up`
  const checkId = `${id}-check`
  const downId = `${id}-down`
  const band = TEETH
  const lines = TEETH + BAND
  const down = lines + LINES

  return (
    <svg
      width="100%"
      height={HEIGHT}
      aria-hidden="true"
      focusable="false"
      className="block shrink-0"
      data-testid="paithani-band"
      data-tone={tone}
      data-next={next}
    >
      <defs>
        <pattern id={upId} width="6" height={TEETH} patternUnits="userSpaceOnUse">
          <rect width="6" height={TEETH} fill={section} />
          <path d={`M0 ${TEETH} L3 0 L6 ${TEETH} Z`} fill={base} />
        </pattern>
        <pattern id={checkId} y={band + 8} width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill={light} />
          <rect x="2" y="2" width="2" height="2" fill={light} />
        </pattern>
        <pattern id={downId} y={down} width="6" height={TEETH} patternUnits="userSpaceOnUse">
          <rect width="6" height={TEETH} fill={below.section} />
          <path d={`M0 0 L6 0 L3 ${TEETH} Z`} fill={below.base} />
        </pattern>
      </defs>

      {/* 1. Triangles up, this section */}
      <rect width="100%" height={TEETH} fill={`url(#${upId})`} />

      {/* 2. Border body, this section: two lines and the checkered panel */}
      <rect y={band} width="100%" height={BAND} fill={base} />
      <rect y={band + 3} width="100%" height="1" fill={light} />
      <rect y={band + 5.5} width="100%" height="1" fill={light} />
      <rect y={band + 8} width="100%" height="12" fill={`url(#${checkId})`} />

      {/* 3. Two gold lines on the downward triangles' colour, then the triangles,
             pointing down into the next section */}
      <rect y={lines} width="100%" height={LINES} fill={below.base} data-part="next-lines-ground" />
      <g data-part="next-lines">
        <rect y={lines + 2} width="100%" height="1" fill={below.light} />
        <rect y={lines + 5} width="100%" height="1" fill={below.light} />
      </g>
      <rect y={down} width="100%" height={TEETH} fill={`url(#${downId})`} />
    </svg>
  )
}

const STRIP = 18

/**
 * A slim version of the border (one line, two rows of checks, one line) with no
 * triangles, for tight spots such as the bottom edge of the fixed header.
 */
export function PaithaniStrip({ tone, id }: { tone: PaithaniTone; id: string }) {
  const { base, light } = PAITHANI_TONES[tone]
  const checkId = `${id}-check`
  return (
    <svg
      width="100%"
      height={STRIP}
      aria-hidden="true"
      focusable="false"
      className="block shrink-0"
      data-testid="paithani-strip"
    >
      <defs>
        <pattern id={checkId} y="5" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill={light} />
          <rect x="2" y="2" width="2" height="2" fill={light} />
        </pattern>
      </defs>
      <rect width="100%" height={STRIP} fill={base} />
      <rect y="2" width="100%" height="1" fill={light} />
      <rect y="5" width="100%" height="8" fill={`url(#${checkId})`} />
      <rect y="15" width="100%" height="1" fill={light} />
    </svg>
  )
}
