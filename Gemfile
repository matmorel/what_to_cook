# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.5"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Bundle and transpile JavaScript [https://github.com/rails/jsbundling-rails]
gem "jsbundling-rails"

# Bundle and process CSS [https://github.com/rails/cssbundling-rails]
gem "cssbundling-rails"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Sass to process CSS
# gem "sassc-rails"

# Use jsonpai.rb [https://github.com/stas/jsonapi.rb]
gem "jsonapi.rb", "~> 2.0"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[mri mingw x64_mingw]
  # Use factory bot and faker instead of fixtures
  gem "factory_bot_rails", "~> 6.2"
  gem "faker", "~> 3.2"
  # Add RSpec and configure it for Rails
  gem "rspec-rails", "~> 6.0"
end

group :test do
  # Use database cleaner to manage db state during tests
  gem "database_cleaner", "~> 2.0"
  # RSpec matchers for JSON:API
  gem "jsonapi-rspec", "~> 0.0.11"

  # Use simplecov to monitor test coverage
  gem "simplecov", "~> 0.22.0"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"

  # Add rubocop with ruby 3.2 guidelines
  gem "rubocop", "~> 1.51", require: false
  gem "rubocop-rails", "~> 2.20", require: false
  gem "rubocop-rspec", "~> 2.22", require: false
end
