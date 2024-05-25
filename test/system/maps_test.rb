require "application_system_test_case"

class MapsTest < ApplicationSystemTestCase
  setup do
    @map = maps(:one)
  end

  test "visiting the index" do
    visit maps_url
    assert_selector "h1", text: "Maps"
  end

  test "should create map" do
    visit maps_url
    click_on "New map"

    fill_in "Initialzoom", with: @map.initialZoom
    fill_in "Latitude", with: @map.latitude
    fill_in "Longitude", with: @map.longitude
    fill_in "Maxzoom", with: @map.maxZoom
    fill_in "Minzoom", with: @map.minZoom
    check "Public" if @map.public
    fill_in "Srid", with: @map.srid
    fill_in "Target", with: @map.target
    click_on "Create Map"

    assert_text "Map was successfully created"
    click_on "Back"
  end

  test "should update Map" do
    visit map_url(@map)
    click_on "Edit this map", match: :first

    fill_in "Initialzoom", with: @map.initialZoom
    fill_in "Latitude", with: @map.latitude
    fill_in "Longitude", with: @map.longitude
    fill_in "Maxzoom", with: @map.maxZoom
    fill_in "Minzoom", with: @map.minZoom
    check "Public" if @map.public
    fill_in "Srid", with: @map.srid
    fill_in "Target", with: @map.target
    click_on "Update Map"

    assert_text "Map was successfully updated"
    click_on "Back"
  end

  test "should destroy Map" do
    visit map_url(@map)
    click_on "Destroy this map", match: :first

    assert_text "Map was successfully destroyed"
  end
end
