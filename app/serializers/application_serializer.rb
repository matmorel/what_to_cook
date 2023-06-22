# frozen_string_literal: true

class ApplicationSerializer
  include JSONAPI::Serializer

  # Available options :camel, :camel_lower, :dash, :underscore(default)
  set_key_transform :camel_lower
end
