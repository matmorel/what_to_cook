import React from 'react'
import { useQuery } from 'jsonapi-react'
import { useSearchParams } from 'react-router-dom'
import { Container, Heading, Hero, Pagination } from 'react-bulma-components'

import RecipeCardList from '../components/RecipeCardList'
import IngredientsPicker from '../components/IngredientsPicker'

const pageSize = 50

function RecipeIndex() {
  const [SearchParams, setSearchParams] = useSearchParams()

  const { data, meta } = useQuery(['recipes', {
    page: {
      number: SearchParams.get('page') || 1,
      size: pageSize
    },
    filter: {
      ...(SearchParams.get('ingredients') && {
        ingredients: {'': SearchParams.get('ingredients') }
      })
    },
    fields: {
      recipe: ['name', 'author', 'imageUrl', 'cookingTime', 'preparationTime', 'rating']
    }
  }])

  const search = (ingredients: string[]) => {
    if (ingredients.length === 0) { return setSearchParams("") }

    setSearchParams(`ingredients=${ingredients.join(', ')}`)
  }

  const changePage = (page: number) => {
    const params: string[] = [`page=${page}`]
    if (SearchParams.get('ingredients')) {
      params.push(`ingredients=${SearchParams.get('ingredients')}`)
    }

    setSearchParams(params.join('&'))
  }

  return (
    <>
      <Hero color="info" size="medium" gradient>
        <Hero.Body>
          <Heading textAlign="center">
            What to cook?!
          </Heading>
          <IngredientsPicker onChange={search}/>
        </Hero.Body>
      </Hero>
      <RecipeCardList data={data} />
      <Container mb={6}>
        <Pagination
          current={meta?.pagination.current}
          total={Math.ceil((meta?.pagination.records || 1) / pageSize)}
          onChange={changePage}
          align="center"
          showFirstLast
        />
      </Container>
    </>
  )
}

export default RecipeIndex
