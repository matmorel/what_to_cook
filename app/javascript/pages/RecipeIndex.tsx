import React from 'react'
import { useQuery } from 'jsonapi-react'
import { useSearchParams } from 'react-router-dom'
import { Container, Heading, Hero, Pagination } from 'react-bulma-components'

import RecipeCardList from '../components/RecipeCardList'

const pageSize = 50

function RecipeIndex() {
  const [SearchParams, setSearchParams] = useSearchParams()

  const { data, meta } = useQuery(['recipes', {
    page: {
      number: SearchParams.get('page') || 1,
      size: pageSize
    },
    fields: {
      recipe: ['name', 'author', 'imageUrl', 'cookingTime', 'preparationTime', 'rating']
    }
  }])

  return (
    <>
      <Hero color={'link'} size={'medium'} gradient>
        <Hero.Body>
          <Heading textAlign={'center'}>
            What to cook?!
          </Heading>
        </Hero.Body>
      </Hero>
      <RecipeCardList data={data} />
      <Container mb={6}>
        <Pagination
          current={meta?.pagination.current}
          total={Math.ceil(meta?.pagination.records / pageSize)}
          onChange={(page) => setSearchParams(`page=${page}`)}
          align="center"
          showFirstLast
        />
      </Container>
    </>
  )
}

export default RecipeIndex
