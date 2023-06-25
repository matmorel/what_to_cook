# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Home" do
  describe "GET /" do
    it "resolves successfuly" do
      get "/"

      expect(response).to have_http_status(:success)
    end
  end
end
