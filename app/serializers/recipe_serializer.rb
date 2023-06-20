# frozen_string_literal: true

class RecipeSerializer
  include JSONAPI::Serializer

  attributes :name, :cooking_time, :preparation_time, :rating, :cuisine, :category, :author, :image_url, :ingredients
end
