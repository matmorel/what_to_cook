import React from 'react'
import { Card } from 'react-bulma-components'

export interface RecipeCardProps {
  imageUrl: string
  name: string
  author?: string
  rating: number
  totalTime: number
}

function RecipeCard({ imageUrl, name, author, rating, totalTime }: RecipeCardProps) {
  return (
    <Card>
      <Card.Header><Card.Header.Title data-testid="title">{name}</Card.Header.Title></Card.Header>
      <Card.Image alt={name} src={imageUrl} />
      <Card.Content data-testid="content" p={4}>
        <p className="is-flex is-justify-content-space-between">
          <span>⭐{rating} &nbsp; ⏱️{totalTime}</span>
          <span className="has-text-grey is-italic">{author}</span>
        </p>
      </Card.Content>
    </Card>
  )
}

export default RecipeCard
