import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ApiClient, ApiProvider } from 'jsonapi-react'

import RecipeIndex from './pages/RecipeIndex'
import RecipeShow from './pages/RecipeShow'

const client = new ApiClient({
  url: '/api/v1',
  schema: {
    recipe: {
      type: 'recipe'
    }
  }
})

ReactDOM.createRoot(document.getElementById('react-root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipeIndex />} />
          <Route path="recipes/:recipeId" element={<RecipeShow />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>
)
