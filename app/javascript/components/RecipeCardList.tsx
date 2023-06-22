import React from 'react'
import { StringMap } from 'jsonapi-react'
import { Link } from "react-router-dom";
import { Columns, Container, Pagination, Section } from 'react-bulma-components'

import RecipeCard from './RecipeCard'
import { Recipe } from '../entities/Recipe';

interface RecipeCardListProps {
  data: StringMap | StringMap[] | undefined
}

function mapData(data: StringMap | StringMap[] | undefined) {
  return data?.map((r: Recipe) => {
    return <Columns.Column data-testid="card" key={r.id} size="one-fifth">
      <Link to={`/recipes/${r.id}`}>
        <RecipeCard
          imageUrl={r.imageUrl}
          name={r.name}
          author={r.author}
          rating={r.rating}
          totalTime={r.preparationTime + r.cookingTime}
        />
      </Link>
    </Columns.Column>
  })
}

function RecipeCardList({ data }: RecipeCardListProps) {
  return (
    <Section>
      <Container>
        <Columns data-testid="list" multiline>
          {mapData(data)}
        </Columns>
      </Container>
    </Section>
  )
}

export default RecipeCardList
