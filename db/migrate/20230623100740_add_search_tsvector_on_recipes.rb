# frozen_string_literal: true

class AddSearchTsvectorOnRecipes < ActiveRecord::Migration[7.0]
  def up
    add_column :recipes, :search_ingredients, :tsvector
    add_index :recipes, :search_ingredients, using: "gin"

    create_tsvector_update_function
    create_tsvector_update_trigger
  end

  def down
    drop_tsvector_update_trigger
    drop_tsvector_update_function

    remove_index :recipes, :search_ingredients
    remove_column :recipes, :search_ingredients
  end

  private

  def create_tsvector_update_function
    execute <<~SQL.squish
      CREATE FUNCTION recipes_update_tsvector_trigger() RETURNS trigger
      LANGUAGE PLPGSQL
      AS $$
      BEGIN
        NEW.search_ingredients = to_tsvector('english', regexp_replace(array_to_string(NEW.ingredients, ' '), '[^[:alpha:]\s]', '', 'g'));

        RETURN NEW;
      END; $$
    SQL
  end

  def create_tsvector_update_trigger
    execute <<~SQL.squish
      CREATE TRIGGER recipes_update_tsvector BEFORE INSERT OR UPDATE OF ingredients ON recipes
      FOR EACH ROW EXECUTE PROCEDURE public.recipes_update_tsvector_trigger();
    SQL
  end

  def drop_tsvector_update_function
    execute <<~SQL.squish
      DROP FUNCTION recipes_update_tsvector_trigger;
    SQL
  end

  def drop_tsvector_update_trigger
    execute <<~SQL.squish
      DROP TRIGGER recipes_update_tsvector
      ON ingredients;
    SQL
  end
end
