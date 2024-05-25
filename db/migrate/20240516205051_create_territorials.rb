class CreateTerritorials < ActiveRecord::Migration[7.1]
  def change
    create_table :territorials do |t|
      t.json :geomJson
      t.json :fields

      t.timestamps
    end
  end
end
