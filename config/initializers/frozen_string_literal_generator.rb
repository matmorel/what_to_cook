# frozen_string_literal: true

# Do not read this file unless we are in a generator context
return unless defined?(Rails::Generators)

#
# Adds frozen_string_literal magic comment on top of all generated .rb and .rake files.
#
module RailsGeneratorFrozenStringLiteralPrepend
  RUBY_EXTENSIONS = %w[.rb .rake].freeze

  def render
    generated = super

    return generated unless RUBY_EXTENSIONS.include? File.extname(destination)
    return generated if generated[/.*/].include? "frozen_string_literal"

    "# frozen_string_literal: true\n\n#{generated}"
  end
end

Thor::Actions::CreateFile.prepend RailsGeneratorFrozenStringLiteralPrepend
