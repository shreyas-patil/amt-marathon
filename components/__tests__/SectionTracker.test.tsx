import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import { trackEvent } from '@/lib/analytics'
import { ioInstances } from '../../test/setup'
import { SectionTracker } from '../SectionTracker'

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }))

const mockTrack = vi.mocked(trackEvent)

describe('SectionTracker', () => {
  test('fires section_view with the section id when the section scrolls into view', () => {
    render(<SectionTracker sectionId="prizes" />)

    const observer = ioInstances.at(-1)!
    observer.triggerEntry(true)

    expect(mockTrack).toHaveBeenCalledWith('section_view', { section_id: 'prizes' })
  })

  test('does not fire while the section stays out of view', () => {
    render(<SectionTracker sectionId="hotels" />)

    ioInstances.at(-1)!.triggerEntry(false)

    expect(mockTrack).not.toHaveBeenCalled()
  })

  test('fires once, then disconnects so re-entering the viewport is not double-counted', () => {
    render(<SectionTracker sectionId="contact" />)

    const observer = ioInstances.at(-1)!
    observer.triggerEntry(true)
    observer.triggerEntry(true) // would re-fire if disconnect() were ignored

    expect(observer.disconnect).toHaveBeenCalled()
    expect(mockTrack).toHaveBeenCalledTimes(1)
  })
})
