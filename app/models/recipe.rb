# frozen_string_literal: true

class Recipe < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :by_ingredients, against: :ingredients, using: {
    tsearch: {
      dictionary: "english",
      tsvector_column: "search_ingredients"
    }
  }
end
