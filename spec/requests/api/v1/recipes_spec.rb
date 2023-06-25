# frozen_string_literal: true

require "rails_helper"

RECIPE_COUNT = 100

RSpec.describe "Api::V1::Recipes" do
  before { create_list(:recipe, RECIPE_COUNT) }

  describe "GET /api/v1/recipes" do
    it "returns the first recipes page" do
      get "/api/v1/recipes"

      expect(response_body[:meta][:pagination][:current]).to eq 1
    end

    it "exposes pagination links" do
      get "/api/v1/recipes"

      expect(response_body).to have_link(:self, :current, :next, :last)
    end

    it "returns the requested recipes page" do
      get "/api/v1/recipes?page[number]=2"

      expect(response_body[:meta][:pagination][:current]).to eq 2
    end

    context "when using the ingredients filter" do
      before { create(:recipe, ingredients: ["test"]) }

      it "returns the recipe corresponding to the requested ingredient" do
        get "/api/v1/recipes?filter[ingredients][]=test"

        expect(response_body[:meta][:pagination][:records]).to eq 1
      end
    end
  end

  describe "GET /api/v1/recipes/:id" do
    before { create(:recipe, id: 1) }

    it "returns the requested recipe" do
      get "/api/v1/recipes/1"

      expect(response_body[:data][:id]).to eq "1"
    end
  end
end
