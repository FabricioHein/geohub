class CreateLayers < ActiveRecord::Migration[7.1]
  def change
    create_table :layers do |t|
      t.string :name
      t.string :layer
      t.boolean :show_legend
      t.string :type
      t.string :source
      t.integer :srid
      t.boolean :display
      t.string :primitive
      t.string :imagery
      t.integer :style_id
      t.integer :ordem
      t.references :map, null: false, foreign_key: true

      t.timestamps
    end
  end
end
