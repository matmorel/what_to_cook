import React from 'react'
import { useQuery } from 'jsonapi-react'
import { useParams } from 'react-router-dom'
import { Container, Heading, Hero, Section } from 'react-bulma-components'

import { Recipe } from '../entities/Recipe'
import RecipeDetails from '../components/RecipeDetails'


function RecipeShow() {
  const { recipeId } = useParams()
  const { data } = useQuery(['recipes', recipeId])
  const recipe = data as Recipe

  return (
    <>
      <Hero color="info" size="medium" gradient>
        <Hero.Body data-testid="hero-body">
          <Heading textAlign="center">
            {recipe?.name}
          </Heading>
          <Heading textAlign="center" subtitle>
            {recipe?.category}
          </Heading>
        </Hero.Body>
      </Hero>
      <Section>
        <Container>
          <RecipeDetails data={data}></RecipeDetails>
        </Container>
      </Section>
    </>
  )
}

export default RecipeShow
