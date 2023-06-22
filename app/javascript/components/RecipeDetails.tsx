import React from 'react'
import { StringMap } from 'jsonapi-react'
import { Columns, Content, Heading, Image } from 'react-bulma-components'
import { Recipe } from '../entities/Recipe'


interface RecipeDetailsProps {
  data: StringMap | StringMap[] | undefined
}

function RecipeDetails({ data }: RecipeDetailsProps) {
  const recipe = data as Recipe

  return (
    <>
      <Content p={4}>
        <div className="is-flex is-justify-content-space-between">
          <p data-testid="header-left">
            🔪 <b>Preparation:</b> {recipe?.preparationTime}min<br />
            🍳 <b>Cooking:</b> {recipe?.cookingTime}min
          </p>
          <p data-testid="header-right" className="has-text-right">
            ⭐ {recipe?.rating}<br />
            By <span className="has-text-grey is-italic">{recipe?.author}</span>
          </p>
        </div>
      </Content>
      <Columns>
        <Columns.Column>
          <Image src={recipe?.imageUrl} alt={recipe?.name} />
        </Columns.Column>
        <Columns.Column>
          <Content p={4}>
            <Heading id="ingredients-heading">Ingredients</Heading>
            <ul aria-labelledby="ingredients-heading">
              {recipe?.ingredients?.map((i: string) => <li key={i}>{i}</li>)}
            </ul>
          </Content>
        </Columns.Column>
      </Columns>
    </>
  )
}

export default RecipeDetails
