class CreateModulos < ActiveRecord::Migration[7.1]
  def change
    create_table :modulos do |t|
      t.string :nome
      t.string :url
      t.boolean :ativo
      t.integer :ordem
      t.string :icon

      t.timestamps
    end
  end
end
