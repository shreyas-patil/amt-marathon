import { beforeEach, describe, expect, test, vi } from 'vitest'

// gallery.ts uses `import fs from 'fs'`, so we must mock the exact specifier
// 'fs' (not 'node:fs') or the mock silently no-ops and the real disk is read.
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
  },
}))

import fs from 'fs'
import { getGalleryImages } from '../gallery'

const mockExists = vi.mocked(fs.existsSync)
const mockReaddir = vi.mocked(fs.readdirSync)

beforeEach(() => {
  // Silence the expected console.error from the throw case.
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('getGalleryImages', () => {
  test('keeps only image extensions, dropping .txt/.mp4 and other junk', () => {
    mockExists.mockReturnValue(true)
    mockReaddir.mockReturnValue([
      'a.png',
      'notes.txt',
      'clip.mp4',
      'b.JPG',
      'c.jpeg',
      'd.webp',
    ] as unknown as ReturnType<typeof fs.readdirSync>)

    const images = getGalleryImages()

    expect(images.map((i) => i.src)).toEqual([
      '/images/gallery/a.png',
      '/images/gallery/b.JPG',
      '/images/gallery/c.jpeg',
      '/images/gallery/d.webp',
    ])
  })

  test('assigns a unique id to each image (used as React key)', () => {
    mockExists.mockReturnValue(true)
    mockReaddir.mockReturnValue([
      '1.png',
      '2.png',
      '3.png',
    ] as unknown as ReturnType<typeof fs.readdirSync>)

    const ids = getGalleryImages().map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('returns [] when the gallery directory does not exist', () => {
    mockExists.mockReturnValue(false)
    expect(getGalleryImages()).toEqual([])
  })

  test('returns [] when the directory is empty', () => {
    mockExists.mockReturnValue(true)
    mockReaddir.mockReturnValue([] as unknown as ReturnType<typeof fs.readdirSync>)
    expect(getGalleryImages()).toEqual([])
  })

  test('returns [] (does not crash) when readdirSync throws', () => {
    mockExists.mockReturnValue(true)
    mockReaddir.mockImplementation(() => {
      throw new Error('EACCES')
    })
    expect(getGalleryImages()).toEqual([])
  })
})
