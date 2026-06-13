import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import GalleryScroll from '../GalleryScroll'
import type { GalleryImage } from '@/lib/gallery'

function makeImages(n: number): GalleryImage[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `g-${i}`,
    src: `/images/gallery/${i}.jpg`,
    alt: `gallery image ${i}`,
  }))
}

describe('GalleryScroll', () => {
  test('shows the empty state when there are no images', () => {
    render(<GalleryScroll images={[]} />)
    expect(screen.getByText(/photos coming soon/i)).toBeInTheDocument()
    expect(screen.queryAllByRole('img')).toHaveLength(0)
  })

  test('splits images across two columns, each duplicated for the seamless loop', () => {
    // 4 images -> col1 [0,2], col2 [1,3]; each column duplicated -> 8 imgs total.
    render(<GalleryScroll images={makeImages(4)} />)
    expect(screen.getAllByRole('img')).toHaveLength(8)
  })

  test('renders a single column (no empty second column) for one image', () => {
    // 1 image -> col1 [0] duplicated -> 2 imgs; col2 is empty and suppressed.
    render(<GalleryScroll images={makeImages(1)} />)
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })
})
