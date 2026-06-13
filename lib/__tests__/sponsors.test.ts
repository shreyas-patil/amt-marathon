import { beforeEach, describe, expect, test, vi } from 'vitest'

// sponsors.ts uses `import fs from 'fs'` — mock the same specifier.
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
  },
}))

import fs from 'fs'
import { getSponsors } from '../sponsors'

const mockExists = vi.mocked(fs.existsSync)
const mockReaddir = vi.mocked(fs.readdirSync)

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('getSponsors', () => {
  test('allows .svg alongside raster formats, excluding unsupported types', () => {
    mockExists.mockReturnValue(true)
    mockReaddir.mockReturnValue([
      'a.svg',
      'b.png',
      'c.jpeg',
      'd.gif', // not in the allowlist
      'readme.md', // not an image
    ] as unknown as ReturnType<typeof fs.readdirSync>)

    const logos = getSponsors().map((s) => s.logo)

    expect(logos).toEqual([
      '/images/sponsors/a.svg',
      '/images/sponsors/b.png',
      '/images/sponsors/c.jpeg',
    ])
  })

  test('strips the file extension to derive the sponsor name', () => {
    mockExists.mockReturnValue(true)
    mockReaddir.mockReturnValue([
      'logo-1.png',
      'acme.svg',
    ] as unknown as ReturnType<typeof fs.readdirSync>)

    expect(getSponsors().map((s) => s.name)).toEqual(['logo-1', 'acme'])
  })

  test('returns [] when the sponsors directory does not exist', () => {
    mockExists.mockReturnValue(false)
    expect(getSponsors()).toEqual([])
  })

  test('returns [] (does not crash) when readdirSync throws', () => {
    mockExists.mockReturnValue(true)
    mockReaddir.mockImplementation(() => {
      throw new Error('EACCES')
    })
    expect(getSponsors()).toEqual([])
  })
})
