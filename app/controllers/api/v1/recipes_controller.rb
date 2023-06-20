# frozen_string_literal: true

module Api
  module V1
    class RecipesController < ApplicationController
      include JSONAPI::Pagination

      def index
        jsonapi_paginate(Recipe.all) do |paginated|
          render jsonapi: paginated
        end
      end

      private

      def jsonapi_meta(resources)
        pagination = jsonapi_pagination_meta(resources)

        { pagination: pagination.presence }.compact
      end
    end
  end
end
