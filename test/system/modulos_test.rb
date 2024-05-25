require "application_system_test_case"

class ModulosTest < ApplicationSystemTestCase
  setup do
    @modulo = modulos(:one)
  end

  test "visiting the index" do
    visit modulos_url
    assert_selector "h1", text: "Modulos"
  end

  test "should create modulo" do
    visit modulos_url
    click_on "New modulo"

    check "Ativo" if @modulo.ativo
    fill_in "Icon", with: @modulo.icon
    fill_in "Nome", with: @modulo.nome
    fill_in "Ordem", with: @modulo.ordem
    fill_in "Url", with: @modulo.url
    click_on "Create Modulo"

    assert_text "Modulo was successfully created"
    click_on "Back"
  end

  test "should update Modulo" do
    visit modulo_url(@modulo)
    click_on "Edit this modulo", match: :first

    check "Ativo" if @modulo.ativo
    fill_in "Icon", with: @modulo.icon
    fill_in "Nome", with: @modulo.nome
    fill_in "Ordem", with: @modulo.ordem
    fill_in "Url", with: @modulo.url
    click_on "Update Modulo"

    assert_text "Modulo was successfully updated"
    click_on "Back"
  end

  test "should destroy Modulo" do
    visit modulo_url(@modulo)
    click_on "Destroy this modulo", match: :first

    assert_text "Modulo was successfully destroyed"
  end
end
