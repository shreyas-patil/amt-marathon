import { describe, expect, test, vi } from 'vitest'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { render, screen } from '@testing-library/react'
import { getSakhi } from '@/lib/data'
import SakhiRoutePage, { metadata } from '../page'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const { route } = getSakhi()

describe('SakhiRoutePage', () => {
  test('is titled as the women\'s run route, not the half marathon\'s', () => {
    render(<SakhiRoutePage />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent("Amravati Women's 10K route")
    expect(document.body).not.toHaveTextContent(/Half Marathon 2026|21\.1 km|Power Run|Dream Run/)
  })

  test('shows one map per distance with women\'s-run alt text', () => {
    render(<SakhiRoutePage />)
    for (const map of route.maps) {
      const img = screen.getByAltText(map.alt)
      expect(img).toHaveAttribute('src', map.image)
      expect(map.alt).toMatch(/Women's 10K/)
    }
  })

  test('every map image exists in public/', () => {
    for (const map of route.maps) {
      expect(existsSync(path.join(process.cwd(), 'public', map.image))).toBe(true)
    }
  })

  test('shows the "same course for now" note only while provisional', () => {
    render(<SakhiRoutePage />)
    const note = screen.queryByText(route.provisionalNote)
    if (route.provisional) expect(note).toBeInTheDocument()
    else expect(note).not.toBeInTheDocument()
  })

  test('links back to the women\'s run page and has its own canonical URL', () => {
    render(<SakhiRoutePage />)
    expect(screen.getByRole('link', { name: route.backLabel })).toHaveAttribute('href', route.backHref)
    expect(String(metadata.alternates?.canonical)).toMatch(/\/sakhi\/route$/)
  })
})
