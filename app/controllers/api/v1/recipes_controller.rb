# frozen_string_literal: true

module Api
  module V1
    class RecipesController < ApplicationController
      include JSONAPI::Pagination
      include JSONAPI::Fetching

      def index
        jsonapi_paginate(Recipe.all) do |paginated|
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
