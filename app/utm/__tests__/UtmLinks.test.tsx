import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import UtmLinks from '../UtmLinks'

const writeText = vi.mocked(navigator.clipboard.writeText)

afterEach(() => {
  vi.useRealTimers()
})

describe('UtmLinks', () => {
  test('Copy writes the row’s own displayed URL to the clipboard and confirms', async () => {
    render(<UtmLinks />)
    // Read the URL the first row actually shows, rather than hardcoding it —
    // this also pins the real contract: Copy must copy the URL on screen.
    const firstUrl = screen.getAllByText(/utm_source=/)[0].textContent!
    const firstCopy = screen.getAllByRole('button', { name: 'Copy' })[0]

    await act(async () => {
      fireEvent.click(firstCopy)
    })

    expect(writeText).toHaveBeenCalledWith(firstUrl)
    expect(screen.getAllByRole('button', { name: 'Copied!' })).toHaveLength(1)
  })

  test('the button reverts from "Copied!" back to "Copy" after 2 seconds', async () => {
    vi.useFakeTimers()
    render(<UtmLinks />)
    const firstCopy = screen.getAllByRole('button', { name: 'Copy' })[0]

    await act(async () => {
      fireEvent.click(firstCopy)
    })
    expect(screen.getAllByRole('button', { name: 'Copied!' })).toHaveLength(1)

    await act(async () => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.queryByRole('button', { name: 'Copied!' })).not.toBeInTheDocument()
  })

  test('each row tracks its copied state independently', async () => {
    render(<UtmLinks />)
    const copyButtons = screen.getAllByRole('button', { name: 'Copy' })
    const totalRows = copyButtons.length

    await act(async () => {
      fireEvent.click(copyButtons[0])
    })

    // Only the clicked row flips to "Copied!"; every other row stays "Copy".
    expect(screen.getAllByRole('button', { name: 'Copied!' })).toHaveLength(1)
    expect(screen.getAllByRole('button', { name: 'Copy' })).toHaveLength(totalRows - 1)
  })
})
