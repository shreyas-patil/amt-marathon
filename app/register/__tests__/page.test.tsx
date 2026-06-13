import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import RegisterPage from '../page'

const { event, categories } = siteData
const halfMarathon = categories.categories.find((c) => c.id === 'half-marathon')!
const ticketCats = categories.categories.filter((c) => c.id !== 'half-marathon')

describe('RegisterPage — event header', () => {
  test('renders the event name, date, and city from data', () => {
    render(<RegisterPage />)
    expect(screen.getByRole('heading', { name: event.name })).toBeInTheDocument()
    expect(
      screen.getByText(`${event.displayDate} · ${event.location.city}`)
    ).toBeInTheDocument()
  })
})

describe('RegisterPage — eligibility panel', () => {
  test('renders the eligibility heading and half-marathon age group from data', () => {
    render(<RegisterPage />)
    expect(
      screen.getByRole('heading', { name: categories.section.eligibilityHeading })
    ).toBeInTheDocument()
    expect(screen.getByText(halfMarathon.ageGroup)).toBeInTheDocument()
  })

  test('renders every half-marathon sub-category age range from data', () => {
    render(<RegisterPage />)
    for (const sub of halfMarathon.subCategories!) {
      expect(screen.getByText(sub.ageRange)).toBeInTheDocument()
    }
  })

  test('renders each ticket category’s display name from data', () => {
    render(<RegisterPage />)
    for (const cat of ticketCats) {
      const displayName = cat.name.startsWith(cat.distance)
        ? cat.name.slice(cat.distance.length).trim()
        : cat.name
      expect(screen.getByText(displayName)).toBeInTheDocument()
    }
  })
})

describe('RegisterPage — out-of-Maharashtra panel', () => {
  test('renders the special category heading, scope, description, and note from data', () => {
    render(<RegisterPage />)
    const oom = categories.outOfMaharashtra
    expect(screen.getByText(oom.heading)).toBeInTheDocument()
    expect(screen.getByText(oom.applicableTo)).toBeInTheDocument()
    expect(screen.getByText(oom.description)).toBeInTheDocument()
    expect(screen.getByText(`★ ${oom.note}`)).toBeInTheDocument()
  })
})
