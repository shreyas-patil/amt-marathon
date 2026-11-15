import { afterEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { trackEvent } from '@/lib/analytics'
import PaithaniBand, { PAITHANI_TONES, PaithaniStrip, ZARI } from '../PaithaniBand'
import SakhiRegisterButton from '../SakhiRegisterButton'
import ShareButton from '../ShareButton'
import DistanceCard from '../DistanceCard'
import SakhiHeader from '../SakhiHeader'
import { getSakhi } from '@/lib/data'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))
const mockTrack = vi.mocked(trackEvent)

describe('PaithaniBand', () => {
  test('is decorative: hidden from assistive tech', () => {
    render(<PaithaniBand tone="teal" next="white" id="t1" />)
    expect(screen.getByTestId('paithani-band')).toHaveAttribute('aria-hidden', 'true')
  })

  test('uses the id prefix for its patterns so two bands on a page never clash', () => {
    const { container } = render(
      <>
        <PaithaniBand tone="white" next="black" id="a" />
        <PaithaniBand tone="white" next="teal" id="b" />
      </>
    )
    const ids = Array.from(container.querySelectorAll('pattern')).map((p) => p.id)
    expect(ids).toEqual(['a-up', 'a-check', 'a-down', 'b-up', 'b-check', 'b-down'])
  })

  test('upward triangles use this section\'s border shade on this section\'s colour', () => {
    const { container } = render(<PaithaniBand tone="teal" next="white" id="r" />)
    const up = container.querySelector('#r-up')!
    expect(up.querySelector('rect')).toHaveAttribute('fill', '#0d6e72')
    expect(up.querySelector('path')).toHaveAttribute('fill', '#0a5357')
  })

  test('downward triangles hand off to the next section: its border shade on its colour', () => {
    const { container } = render(<PaithaniBand tone="teal" next="white" id="r" />)
    const down = container.querySelector('#r-down')!
    expect(down.querySelector('rect')).toHaveAttribute('fill', '#ffffff')
    expect(down.querySelector('path')).toHaveAttribute('fill', PAITHANI_TONES.white.base)
  })

  test('on black, the border is woven in teal so it stays visible', () => {
    const { container } = render(<PaithaniBand tone="black" next="white" id="b" />)
    expect(container.querySelector('#b-up path')).toHaveAttribute('fill', '#0d6e72')
    expect(container.querySelector('#b-up rect')).toHaveAttribute('fill', '#0a0a0a')
  })

  test('downward triangles are the same height as upward ones', () => {
    const { container } = render(<PaithaniBand tone="black" next="white" id="k" />)
    const h = (id: string) => Number(container.querySelector(id)!.getAttribute('height'))
    expect(h('#k-down')).toBe(h('#k-up'))
  })

  test('two thin gold lines sit in the next section', () => {
    const { container } = render(<PaithaniBand tone="teal" next="white" id="r" />)
    const lines = container.querySelectorAll('[data-part="next-lines"] rect')
    expect(lines).toHaveLength(2)
    lines.forEach((line) => expect(line).toHaveAttribute('fill', ZARI))
  })

  test('the two gold lines sit on the same colour as the downward triangles', () => {
    const { container } = render(<PaithaniBand tone="teal" next="white" id="g" />)
    const ground = container.querySelector('[data-part="next-lines-ground"]')
    const downTriangle = container.querySelector('#g-down path')
    expect(ground).toHaveAttribute('fill', downTriangle!.getAttribute('fill')!)
  })

  test('the checks are zari gold on every section', () => {
    const { container } = render(<PaithaniBand tone="white" next="black" id="z" />)
    container
      .querySelectorAll('#z-check rect')
      .forEach((check) => expect(check).toHaveAttribute('fill', ZARI))
  })
})

describe('PaithaniStrip', () => {
  test('is a decorative slim border with no triangles', () => {
    const { container } = render(<PaithaniStrip tone="black" id="s" />)
    expect(screen.getByTestId('paithani-strip')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelectorAll('path')).toHaveLength(0)
  })
})

describe('Paithani tones', () => {
  test('the background is teal and the foreground is gold on every section', () => {
    for (const tone of Object.values(PAITHANI_TONES)) {
      expect(tone.base).toMatch(/^#0(d6e72|a5357)$/)
      expect(tone.light).toBe(ZARI)
    }
  })
})

describe('SakhiRegisterButton', () => {
  const props = {
    label: 'Register now',
    labelMr: 'नोंदणी करा',
    closedLabel: 'Registration opens 20 November',
    location: 'sakhi_hero',
  }

  test('without a registration link, shows when registration opens and is not a link', () => {
    render(<SakhiRegisterButton {...props} registrationUrl="" />)
    expect(screen.getByText(props.closedLabel)).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  test('with a link, opens the registration site in a new tab and tracks the click', () => {
    render(<SakhiRegisterButton {...props} registrationUrl="https://example.com/reg" />)
    const link = screen.getByRole('link', { name: /Register now/ })
    expect(link).toHaveAttribute('href', 'https://example.com/reg')
    expect(link).toHaveAttribute('target', '_blank')
    expect(screen.getByText(props.labelMr)).toHaveAttribute('lang', 'mr')
    fireEvent.click(link)
    expect(mockTrack).toHaveBeenCalledWith('register_outbound_click', { location: 'sakhi_hero' })
  })
})

describe('ShareButton', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'share')
  })

  test('is readable on the dark section: white outline and text at rest', () => {
    render(<ShareButton label="Share with a friend" text="Run with us" url="https://x.test/sakhi" />)
    const link = screen.getByRole('link', { name: 'Share with a friend' })
    expect(link).toHaveClass('text-white', 'border-white')
  })

  test('falls back to a WhatsApp link carrying the message and page URL', () => {
    render(<ShareButton label="Share with a friend" text="Run with us" url="https://x.test/sakhi" />)
    const link = screen.getByRole('link', { name: 'Share with a friend' })
    expect(link.getAttribute('href')).toBe(
      `https://wa.me/?text=${encodeURIComponent('Run with us https://x.test/sakhi')}`
    )
    fireEvent.click(link)
    expect(mockTrack).toHaveBeenCalledWith('share_click', { method: 'whatsapp', page: 'sakhi' })
  })

  test('uses the phone share sheet when the browser has one', () => {
    const share = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', { value: share, configurable: true })
    render(<ShareButton label="Share with a friend" text="Run with us" url="https://x.test/sakhi" />)
    fireEvent.click(screen.getByRole('link', { name: 'Share with a friend' }))
    expect(share).toHaveBeenCalledWith({ text: 'Run with us', url: 'https://x.test/sakhi' })
    expect(mockTrack).toHaveBeenCalledWith('share_click', { method: 'native', page: 'sakhi' })
  })
})

describe('DistanceCard', () => {
  const distance = { id: '10k', label: '10 km', name: '10 km Run', fees: { earlyBird: 600, standard: 800 } }
  const props = {
    distance,
    ageGroups: '15–39 · 40 & above',
    deadline: '2026-12-31T23:59:59+05:30',
    earlyBirdLabel: 'Early bird',
    regularLabel: 'Regular pricing',
  }

  afterEach(() => {
    vi.useRealTimers()
  })

  test('shows the distance, name, age groups and both prices', () => {
    render(<DistanceCard {...props} registrationUrl="" />)
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('km')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '10 km Run' })).toBeInTheDocument()
    expect(screen.getByText(props.ageGroups)).toBeInTheDocument()
    expect(screen.getByText('₹600')).toBeInTheDocument()
    expect(screen.getByText('₹800')).toBeInTheDocument()
  })

  test('is not a link until registration opens', () => {
    render(<DistanceCard {...props} registrationUrl="" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  test('once registration is live, the whole card links straight to it', () => {
    render(<DistanceCard {...props} registrationUrl="https://example.com/reg" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com/reg')
    expect(link).toHaveAttribute('target', '_blank')
    fireEvent.click(link)
    expect(mockTrack).toHaveBeenCalledWith('register_outbound_click', {
      location: 'sakhi_card',
      category: '10k',
    })
  })

  test('after the early-bird deadline the early-bird price is struck through', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2027-01-01T00:00:01+05:30'))
    render(<DistanceCard {...props} registrationUrl="" />)
    expect(screen.getByText('₹600')).toHaveClass('line-through')
    expect(screen.getByText('₹800')).not.toHaveClass('line-through')
  })
})

describe('SakhiHeader', () => {
  const sakhi = getSakhi()
  const props = {
    links: sakhi.nav.links,
    backLabel: sakhi.nav.backLabel,
    backHref: sakhi.nav.backHref,
    registrationUrl: '',
    registerLabel: 'Register now',
    closedLabel: sakhi.registrationClosedLabel,
  }

  test('logo goes back to the main site; links use the main site\'s wording', () => {
    render(<SakhiHeader {...props} />)
    expect(screen.getByAltText(sakhi.nav.backLabel).closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Categories' })).toHaveAttribute('href', '/sakhi#categories')
  })

  test('Route goes to the women\'s run route page, never the half marathon\'s', () => {
    render(<SakhiHeader {...props} />)
    const route = screen.getByRole('link', { name: 'Route' })
    expect(route).toHaveAttribute('href', '/sakhi/route')
    for (const link of sakhi.nav.links) expect(link.href).not.toMatch(/^\/route-maps/)
  })

  test('ends with the Paithani strip', () => {
    render(<SakhiHeader {...props} />)
    expect(screen.getByTestId('paithani-strip')).toBeInTheDocument()
  })
})
