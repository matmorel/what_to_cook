# frozen_string_literal: true

require "rails_helper"

RSpec.describe Recipe do
  let(:recipe) { create(:recipe) }
  let(:attributes) do
    snake_attrs = recipe.attribute_names.reject do |a|
      %w[search_ingredients created_at updated_at id].include? a
    end
    snake_attrs.sort.map { |attr| attr.camelize(:lower).to_sym }
  end

  describe "the recipes factory" do
    it "creates a valid recipe" do
      expect(recipe).to be_valid
    end
  end

  describe "the Recipe serializer" do
    let(:serialized) { RecipeSerializer.new(recipe).serializable_hash.to_json }
    let(:parsed) { JSON.parse(serialized, symbolize_names: true) }

    it "serializes the recipe into JSON" do
      expect(parsed[:data]).to have_type(:recipe)
    end

    it "serializes all attributes" do
      expect(parsed[:data]).to have_jsonapi_attributes(*attributes)
    end
  end
end
