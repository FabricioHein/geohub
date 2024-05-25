class AddFieldsToTerritorials < ActiveRecord::Migration[7.1]
  def change
    add_column :territorials, :ind_fiscal, :string, limit: 255
    add_column :territorials, :unidade, :string, limit: 21
    add_column :territorials, :cpf_cnpj, :string, limit: 21
    add_column :territorials, :url_autonoma, :string, limit: 500
    add_column :territorials, :nome_prop, :string, limit: 150
    add_column :territorials, :email, :string, limit: 100
    add_column :territorials, :telefone, :string, limit: 20
    add_column :territorials, :quadra, :string, limit: 10
  end
end
