# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

return if Recipe.exists?

puts "Seeding database '#{ActiveRecord::Base.connection.current_database}'" # rubocop:disable Rails/Output

json = File.read File.join(__dir__, "seeds.json")
parsed = JSON.parse(json, symbolize_names: true)

parsed.each do |recipe|
  Recipe.create(
    {
      name: recipe[:title],
      cooking_time: recipe[:cook_time],
      preparation_time: recipe[:prep_time],
      ingredients: recipe[:ingredients],
      rating: recipe[:ratings],
      cuisine: recipe[:cuisine],
      category: recipe[:category],
      author: recipe[:author],
      image_url: recipe[:image]
    }
  )
end
