import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RecipeIndex from './RecipeIndex'

const pageSize = 50
const jsonapi = {
  data: ['Mock'],
  meta: {
    pagination: { current: 42, records: 20000 }
  }
}
jest.mock('jsonapi-react', () => ({
  useQuery: jest.fn().mockReturnValue(jsonapi)
}))

const mockSetSearchParams = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [{ get: (paramName) => {
    if (paramName === 'ingredients') { return 'water' }
    if (paramName === 'page') { return '12' }
  }}, mockSetSearchParams]
}))

const mockRecipeCardList = jest.fn()
jest.mock('../components/RecipeCardList', () => (props) => {
  mockRecipeCardList(props);
  return <div></div>
});

const mockIngredientsPicker = jest.fn()
jest.mock('../components/IngredientsPicker', () => (props) => {
  mockIngredientsPicker(props);
  return <div></div>
});

const mockPagination = jest.fn()
jest.mock('react-bulma-components', () => ({
  ...jest.requireActual('react-bulma-components'),
  Pagination: (props) => mockPagination(props)
}))

beforeEach(() => render(<RecipeIndex />))

test('displays the RecipeCardList component with its data', async () => {
  expect(mockRecipeCardList).toHaveBeenCalledWith(
    expect.objectContaining({
      data: ['Mock']
    })
  )
})

test('displays the Pagination component with its props', async () => {
  expect(mockPagination).toHaveBeenCalledWith(
    expect.objectContaining({
      current: jsonapi.meta.pagination.current,
      total: Math.ceil(jsonapi.meta.pagination.records / pageSize)
    })
  )
})

test('updates search params on page change', async () => {
  mockPagination.mock.calls[0][0].onChange(42)
  expect(mockSetSearchParams).toHaveBeenCalledWith('ingredients=water&page=42')
})

test('updates search params on ingredient search', async () => {
  mockIngredientsPicker.mock.calls[0][0].onChange(['flour', 'water'])
  expect(mockSetSearchParams).toHaveBeenCalledWith('ingredients=flour, water')
})
