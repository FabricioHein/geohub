require "application_system_test_case"

class LayersTest < ApplicationSystemTestCase
  setup do
    @layer = layers(:one)
  end

  test "visiting the index" do
    visit layers_url
    assert_selector "h1", text: "Layers"
  end

  test "should create layer" do
    visit layers_url
    click_on "New layer"

    check "Display" if @layer.display
    fill_in "Imagery", with: @layer.imagery
    fill_in "Layer", with: @layer.layer
    fill_in "Map", with: @layer.map_id
    fill_in "Name", with: @layer.name
    fill_in "Ordem", with: @layer.ordem
    fill_in "Primitive", with: @layer.primitive
    check "Show legend" if @layer.show_legend
    fill_in "Source", with: @layer.source
    fill_in "Srid", with: @layer.srid
    fill_in "Style", with: @layer.style_id
    fill_in "Type", with: @layer.type
    click_on "Create Layer"

    assert_text "Layer was successfully created"
    click_on "Back"
  end

  test "should update Layer" do
    visit layer_url(@layer)
    click_on "Edit this layer", match: :first

    check "Display" if @layer.display
    fill_in "Imagery", with: @layer.imagery
    fill_in "Layer", with: @layer.layer
    fill_in "Map", with: @layer.map_id
    fill_in "Name", with: @layer.name
    fill_in "Ordem", with: @layer.ordem
    fill_in "Primitive", with: @layer.primitive
    check "Show legend" if @layer.show_legend
    fill_in "Source", with: @layer.source
    fill_in "Srid", with: @layer.srid
    fill_in "Style", with: @layer.style_id
    fill_in "Type", with: @layer.type
    click_on "Update Layer"

    assert_text "Layer was successfully updated"
    click_on "Back"
  end

  test "should destroy Layer" do
    visit layer_url(@layer)
    click_on "Destroy this layer", match: :first

    assert_text "Layer was successfully destroyed"
  end
end
