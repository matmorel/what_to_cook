# frozen_string_literal: true

RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner[:active_record].tap do |dbc|
      dbc.strategy = :transaction
      dbc.clean_with(:truncation)
    end
  end

  config.around do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  config.after(:suite) do
    DatabaseCleaner[:active_record].clean_with(:truncation)
  end
end
