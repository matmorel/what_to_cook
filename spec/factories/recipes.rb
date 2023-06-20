# frozen_string_literal: true

FactoryBot.define do
  factory :recipe do
    name { Faker::Food.dish }
    cooking_time { Faker::Number.within(range: 1..128) }
    preparation_time { Faker::Number.within(range: 1..128) }
    rating { Faker::Number.within(range: 0.0..5.0) }
    cuisine { Faker::Food.description }
    category { Faker::Food.ethnic_category }
    author { Faker::Internet.username }
    image_url { Faker::LoremFlickr.image }
    ingredients do
      Array.new(Faker::Number.within(range: 1..15)) do
        Faker::Food.ingredient
      end
    end
  end
end
