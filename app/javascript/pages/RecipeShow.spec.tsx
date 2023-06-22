import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useQuery } from 'jsonapi-react'

import { Recipe } from '../entities/Recipe'
import RecipeShow from './RecipeShow'

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

const recipeId = '42'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ recipeId: recipeId })
}))

jest.mock('jsonapi-react', () => ({
  useQuery: jest.fn().mockReturnValue({ data: recipe })
}))

const mockRecipeDetails = jest.fn()
jest.mock('../components/RecipeDetails', () => (props) => {
  mockRecipeDetails(props);
  return <div></div>
});

beforeEach(() => render(<RecipeShow />))

test('calls the api with the id given in url params', async () => {
  expect(useQuery).toHaveBeenCalledWith(['recipes', recipeId])
})

test('displays the recipe name as title', async () => {
  expect(screen.getByTestId('hero-body')).toHaveTextContent(recipe.name)
})

test('displays the recipe category as subtitle', async () => {
  expect(screen.getByTestId('hero-body')).toHaveTextContent(recipe.name)
})

test('displays the RecipeDetails component with its data', async () => {
  expect(mockRecipeDetails).toHaveBeenCalledWith(
    expect.objectContaining({
      data: recipe
    })
  )
})
