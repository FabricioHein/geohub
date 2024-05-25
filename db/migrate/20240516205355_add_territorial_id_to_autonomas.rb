class AddTerritorialIdToAutonomas < ActiveRecord::Migration[7.1]
  def change
    add_column :autonomas, :territorial_id, :integer
  end
end
