import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import siteData from '@/lib/data'
import RouteMapsPage from '../page'

const { routeMaps } = siteData

describe('RouteMapsPage', () => {
  test('renders the page header copy from route-maps.json', () => {
    render(<RouteMapsPage />)
    expect(screen.getByText(routeMaps.page.sectionTag)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: routeMaps.page.heading })).toBeInTheDocument()
    expect(screen.getByText(routeMaps.page.description)).toBeInTheDocument()
  })

  test('renders every route with its label, distance, age group, badges, and map image', () => {
    render(<RouteMapsPage />)

    for (const route of routeMaps.routes) {
      // Heading role disambiguates the label from a same-named category badge.
      expect(screen.getByRole('heading', { name: route.label })).toBeInTheDocument()
      expect(screen.getByText(route.distance)).toBeInTheDocument()
      expect(screen.getByText(route.ageGroup)).toBeInTheDocument()
      expect(screen.getByRole('img', { name: route.imageAlt })).toHaveAttribute('src', route.image)

      for (const label of route.categoryLabels) {
        expect(screen.getAllByText(label).length).toBeGreaterThan(0)
      }
    }
  })
})
