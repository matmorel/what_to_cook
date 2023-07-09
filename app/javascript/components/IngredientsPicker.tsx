import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Tag } from 'react-bulma-components'

export interface IngredientsPickerProps {
  onChange: Function
  ingredients: string[] | null
}

function IngredientsPicker({ onChange, ingredients }: IngredientsPickerProps) {
  const [ingredientToAdd, setIngredientToAdd] = useState('')
  const [ingredientsState, setIngredientsState] = useState<string[]>(ingredients || [])
  const notInitialRender = useRef(false)

  const onAddIngredient = (e) => {
    e.preventDefault()
    notInitialRender.current = true

    setIngredientsState(ingredientsState.concat(ingredientToAdd))
    setIngredientToAdd('')
  }
  const onRemoveIngredient = (ingredient: string) => {
    notInitialRender.current = true

    setIngredientsState(ingredientsState.filter(i => i !== ingredient))
  }

  useEffect(() => {
    if (notInitialRender.current) { onChange(ingredientsState) }
  }, [ingredientsState])

  return (
    <>
      <form className="mb-3" onSubmit={onAddIngredient}>
        <Form.Field className="is-justify-content-center" kind="addons">
          <Form.Control>
            <Form.Input
              value={ingredientToAdd}
              onChange={(e) => setIngredientToAdd(e.target.value)}
              placeholder="e.g. Cheese"
              type="text"
              required />
          </Form.Control>
          <Form.Control>
            <Button
              type="submit"
              color="success"
            >
              Add ingredient
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
      <div className="is-justify-content-center tags">
        {
          ingredientsState.map(i => {
            return <Tag key={i} color="success" rounded>
              {i}
              <Button
                onClick={() => onRemoveIngredient(i)}
                color="success" className="delete" />
            </Tag>
          })
        }
      </div>
    </>
  )
}

export default IngredientsPicker
