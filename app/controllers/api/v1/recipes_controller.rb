# frozen_string_literal: true

module Api
  module V1
    class RecipesController < ApplicationController
      include JSONAPI::Pagination
      include JSONAPI::Fetching

      def index
        filter = (params.dig(:filter, :ingredients) || []).join(" ")
        recipes = filter.empty? ? Recipe.all.order(:id) : Recipe.by_ingredients(filter)

        jsonapi_paginate(recipes) do |paginated|
          render jsonapi: paginated
        end
      end

      def show
        render jsonapi: Recipe.find(params[:id])
      end

      private

      def jsonapi_meta(resources)
        pagination = jsonapi_pagination_meta(resources)

        { pagination: pagination.presence }.compact
      end
    end
  end
end
