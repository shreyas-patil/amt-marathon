import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import React from 'react'

// ── Next.js internals ───────────────────────────────────────────────────────
// We test component logic, not Next's image optimizer or router. Render plain
// elements so accessible queries (img alt, link href/onClick) work normally.
// JSX is avoided here because this file is .ts (not transformed for JSX).

vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) =>
    React.createElement('img', { src, alt, className }),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    onClick,
    className,
  }: {
    href: string
    children: React.ReactNode
    onClick?: () => void
    className?: string
  }) => React.createElement('a', { href, onClick, className }, children),
}))

// ── IntersectionObserver ────────────────────────────────────────────────────
// Manual mock that records instances and lets a test drive intersection via
// triggerEntry(). disconnect() flips a flag so triggerEntry() becomes a no-op
// afterwards — this faithfully models "fires once, then stops" (used by
// SectionTracker), which a naive mock would not.
export const ioInstances: IntersectionObserverMock[] = []

class IntersectionObserverMock {
  callback: IntersectionObserverCallback
  disconnected = false
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn(() => {
    this.disconnected = true
  })
  takeRecords = () => []
  root: Element | null = null
  rootMargin = ''
  thresholds: ReadonlyArray<number> = []

  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
    ioInstances.push(this)
  }

  triggerEntry(isIntersecting: boolean) {
    if (this.disconnected) return
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// ── localStorage ────────────────────────────────────────────────────────────
// Real in-memory store so consent state behaves like a browser. Backed by
// vi.fn()s so a test can make getItem throw (via mockImplementationOnce) to
// exercise the "storage blocked" safety path without poisoning later tests.
const store: Record<string, string> = {}
const localStorageMock = {
  getItem: vi.fn((key: string) => (key in store ? store[key] : null)),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = String(value)
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key]
  }),
  clear: vi.fn(() => {
    for (const key of Object.keys(store)) delete store[key]
  }),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
})

// ── navigator.clipboard ─────────────────────────────────────────────────────
// happy-dom does not implement clipboard; without this, UtmLinks' copy handler
// throws before any assertion can run.
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  writable: true,
  configurable: true,
})

// ── Silence happy-dom external-resource noise ───────────────────────────────
// RegisterIframe renders a real Townscript <link> and <iframe>. With resource
// loading disabled (see vitest.config.ts), happy-dom captures and console.errors
// a DOMException for each. Those are environmental, not assertion failures —
// swallow ONLY those two exact messages so genuine errors still surface.
const realConsoleError = console.error.bind(console)
const IGNORED_DOM_NOISE = [
  'CSS file loading is disabled',
  'Iframe page loading is disabled',
]
console.error = (...args: unknown[]) => {
  const message = args[0] instanceof Error ? args[0].message : String(args[0] ?? '')
  if (IGNORED_DOM_NOISE.some((noise) => message.includes(noise))) return
  realConsoleError(...args)
}

// ── Global hooks ────────────────────────────────────────────────────────────
beforeEach(() => {
  // Clear call history (NOT implementations) so per-test assertions on
  // trackEvent / gtag / writeText counts start from zero. Without this, mocked
  // calls accumulate across tests and toHaveBeenCalledTimes(n) gives false
  // failures while stale toHaveBeenCalledWith() gives false passes.
  vi.clearAllMocks()
  localStorageMock.clear()
  ioInstances.length = 0
})

afterEach(() => {
  cleanup()
})
