import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Recipe } from '../entities/Recipe'

import RecipeCardList from './RecipeCardList'
import { MemoryRouter } from 'react-router-dom'

const recipeOne = {
  id: 42,
  name: 'some recipe',
  preparationTime: 12,
  cookingTime: 34,
  imageUrl: 'https://placehold.co/600x400',
  author: 'michel2000',
  rating: 4.2,
  category: 'cake',
  ingredients: ['salt', 'sugar', 'water', 'flour', 'butter']
} as Recipe

const recipeTwo = {
  id: 43,
  name: 'some other recipe',
  preparationTime: 12,
  cookingTime: 34,
  imageUrl: 'https://placehold.co/600x400',
  author: 'michel2000',
  rating: 4.2,
  category: 'cake',
  ingredients: ['salt', 'sugar', 'water', 'flour', 'butter']
} as Recipe

beforeEach(() => render(
  <MemoryRouter>
    <RecipeCardList data={[recipeOne, recipeTwo]} />
  </MemoryRouter>
))

test('displays the cards', async () => {
  const cards = screen.getAllByTestId('card')

  expect(cards.length).toEqual(2)
})

test('puts a link on the cards', async () => {
  const card = screen.getAllByTestId('card')[0]
  const link = within(card).getByRole('link')

  expect(link).toHaveAttribute('href', '/recipes/42')
})
