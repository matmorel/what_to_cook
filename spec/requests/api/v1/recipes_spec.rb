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
  end
end
