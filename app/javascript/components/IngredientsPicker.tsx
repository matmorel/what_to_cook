import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Tag } from 'react-bulma-components'

export interface IngredientsPickerProps {
  onChange: Function
}

function IngredientsPicker({ onChange }: IngredientsPickerProps) {
  const [ingredientToAdd, setIngredientToAdd] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const notInitialRender = useRef(false)

  const onAddIngredient = () => {
    if (ingredientToAdd == '') { return }

    setIngredients(ingredients.concat(ingredientToAdd))
    setIngredientToAdd('')
  }
  const onRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient))
  }

  useEffect(() => {
    notInitialRender.current ? onChange(ingredients) : notInitialRender.current = true
  }, [ingredients])

  return (
    <>
      <Form.Field className="is-justify-content-center" kind="addons">
        <Form.Control>
          <Form.Input
            value={ingredientToAdd}
            onChange={(e) => setIngredientToAdd(e.target.value)}
            placeholder="e.g. Cheese" type="text" />
        </Form.Control>
        <Form.Control>
          <Button
            onClick={onAddIngredient}
            color="success"
          >
            Add ingredient
          </Button>
        </Form.Control>
      </Form.Field>
      <div className="is-justify-content-center tags">
        {
          ingredients.map(i => {
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
