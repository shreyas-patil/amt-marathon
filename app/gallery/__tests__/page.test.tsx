import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import GalleryPage from '../page'

// getGalleryImages reads the filesystem; stub it so the page render is
// deterministic. We're asserting the page's own header copy here — the image
// grid / empty state is covered by GalleryScroll's own tests.
vi.mock('@/lib/gallery', () => ({ getGalleryImages: vi.fn(() => []) }))

const { gallery } = siteData

describe('GalleryPage', () => {
  test('renders the gallery header copy from gallery.json', () => {
    render(<GalleryPage />)
    expect(screen.getByText(gallery.page.sectionTag)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: gallery.page.heading })).toBeInTheDocument()
    expect(screen.getByText(gallery.page.description)).toBeInTheDocument()
  })
})
