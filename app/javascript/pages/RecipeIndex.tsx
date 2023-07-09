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
        ingredients: { '': SearchParams.get('ingredients') }
      })
    },
    fields: {
      recipe: ['name', 'author', 'imageUrl', 'cookingTime', 'preparationTime', 'rating']
    }
  }])

  const updateSearchParams = (params) => {
    const paramsNames = ['page', 'ingredients']
    const searchParams = {}

    paramsNames.forEach(key => {
      const value = SearchParams.get(key)
      if (value) { searchParams[key] = `${key}=${value}` }
    })

    for (const [key, value] of Object.entries(params)) {
      if (value == null) {
        delete searchParams[key]
        continue
      }

      searchParams[key] = `${key}=${value}`
    }

    setSearchParams(Object.values(searchParams).sort().join('&'))
  }

  const search = (ingredients: string[]) => {
    if (ingredients.length === 0) { return updateSearchParams({ ingredients: null, page: null }) }

    updateSearchParams({ ingredients: ingredients.join(', '), page: null })
  }

  const changePage = (page: number) => {
    if (page === 1) { return updateSearchParams({ page: null }) }

    updateSearchParams({ page: page })
  }

  const currentIngredients = () => {
    const ingredients = SearchParams.get('ingredients')?.split(', ')

    if (ingredients == null) { return [] }
    if (!Array.isArray(ingredients)) { return [ingredients] }

    return ingredients
  }

  return (
    <>
      <Hero color="info" size="medium" gradient>
        <Hero.Body>
          <Heading textAlign="center">
            What to cook?!
          </Heading>
          <IngredientsPicker ingredients={currentIngredients()} onChange={search} />
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
