import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RecipeCard from './RecipeCard'

const name = 'some recipe'
const imageUrl = 'https://placehold.co/600x400'
const author = 'michel2000'
const rating = 4.2
const totalTime = 42


beforeEach(() => render(
  <RecipeCard imageUrl={imageUrl} name={name} author={author} rating={rating} totalTime={totalTime} />
))

test('displays the recipe name as title', async () => {
  expect(screen.getByTestId('title')).toHaveTextContent(name)
})

test('displays the recipe image', async () => {
  expect(screen.getByAltText(name)).toHaveAttribute('src', imageUrl)
})

test('displays the recipe rating', async () => {
  expect(screen.getByTestId('content')).toHaveTextContent(rating.toString())
})

test('displays the recipe total time', async () => {
  expect(screen.getByTestId('content')).toHaveTextContent(totalTime.toString())
})

test('displays the recipe author', async () => {
  expect(screen.getByTestId('content')).toHaveTextContent(author)
})
