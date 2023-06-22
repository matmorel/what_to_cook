export interface Recipe {
  id: number
  name: string
  imageUrl: string
  cookingTime: number
  preparationTime: number
  rating: number
  cuisine?: string
  category?: string
  author?: string
  ingredients?: string[]
}
