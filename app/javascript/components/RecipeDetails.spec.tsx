import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Recipe } from '../entities/Recipe'
import RecipeDetails from './RecipeDetails'

const recipe = {
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

beforeEach(() => render(<RecipeDetails data={recipe} />))

test('displays the preparation time', async () => {
  expect(screen.getByTestId('header-left')).toHaveTextContent(recipe.preparationTime.toString())
})

test('displays the cooking time', async () => {
  expect(screen.getByTestId('header-left')).toHaveTextContent(recipe.cookingTime.toString())
})

test('displays the rating', async () => {
  expect(screen.getByTestId('header-right')).toHaveTextContent(recipe.rating.toString())
})

test('displays the author', async () => {
  expect(screen.getByTestId('header-right')).toHaveTextContent(recipe.author || 'error')
})

test('displays the recipe image', async () => {
  expect(screen.getByAltText(recipe.name)).toHaveAttribute('src', recipe.imageUrl)
})

test('displays the ingredients', async () => {
  const list = screen.getByRole('list', { name: 'Ingredients' })
  const ingredients = within(list).getAllByRole('listitem').map(i => i.textContent)

  expect(ingredients).toEqual(recipe.ingredients)
})
