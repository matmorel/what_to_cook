# frozen_string_literal: true

class Recipe < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :by_ingredients, against: :search_ingredients, using: {
    tsearch: { dictionary: "english" }
  }
end
