import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import IngredientsPicker from './IngredientsPicker'

const callback = jest.fn()

beforeEach(() => render(
  <IngredientsPicker onChange={callback} />
))

test('doesn\'t adds an ingredient tag when input is empty', async () => {
  fireEvent.click(screen.getByRole('button'))
  expect(callback).toHaveBeenCalledTimes(0)
})

describe('when adding an ingredient', () => {
  beforeEach(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
    fireEvent.click(screen.getByRole('button'))
  })

  test('adds an ingredient tag', async () => {
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  test('empties the input', async () => {
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  test('triggers onChange', async () => {
    expect(callback).toHaveBeenCalledWith(['test'])
  })
})

describe('when removing an ingredient', () => {
  beforeEach(() => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
    fireEvent.click(screen.getByRole('button'))

    const tag = screen.getByText('test')
    const removeBtn = within(tag).getByRole('button')

    fireEvent.click(removeBtn)
  })

  test('removes the tag', async () => {
    expect(screen.queryByText('test')).toBeNull
  })

  test('triggers onChange', async () => {
    expect(callback).toHaveBeenCalledWith([])
  })
})
