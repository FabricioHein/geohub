class CreateMaps < ActiveRecord::Migration[7.1]
  def change
    create_table :maps do |t|
      t.string :target
      t.integer :maxZoom
      t.integer :minZoom
      t.integer :initialZoom
      t.string :srid
      t.boolean :public
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
