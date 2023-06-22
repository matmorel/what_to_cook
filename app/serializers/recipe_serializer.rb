# frozen_string_literal: true

class RecipeSerializer < ApplicationSerializer
  attributes :name, :cooking_time, :preparation_time, :rating, :cuisine, :category, :author, :image_url, :ingredients
end
