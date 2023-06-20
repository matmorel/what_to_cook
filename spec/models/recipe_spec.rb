# frozen_string_literal: true

require "rails_helper"

RSpec.describe Recipe do
  describe "the recipes factory" do
    let(:recipe) { create(:recipe) }

    it "creates a valid recipe" do
      expect(recipe).to be_valid
    end
  end
end
