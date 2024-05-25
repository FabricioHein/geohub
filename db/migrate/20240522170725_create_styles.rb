class CreateStyles < ActiveRecord::Migration[7.1]
  def change
    create_table :styles do |t|
      t.float :opacity
      t.integer :fill_id
      t.integer :stroke_id

      t.timestamps
    end
  end
end
