require "application_system_test_case"

class TerritorialsTest < ApplicationSystemTestCase
  setup do
    @territorial = territorials(:one)
  end

  test "visiting the index" do
    visit territorials_url
    assert_selector "h1", text: "Territorials"
  end

  test "should create territorial" do
    visit territorials_url
    click_on "New territorial"

    fill_in "Fields", with: @territorial.fields
    fill_in "Geomjson", with: @territorial.geomJson
    click_on "Create Territorial"

    assert_text "Territorial was successfully created"
    click_on "Back"
  end

  test "should update Territorial" do
    visit territorial_url(@territorial)
    click_on "Edit this territorial", match: :first

    fill_in "Fields", with: @territorial.fields
    fill_in "Geomjson", with: @territorial.geomJson
    click_on "Update Territorial"

    assert_text "Territorial was successfully updated"
    click_on "Back"
  end

  test "should destroy Territorial" do
    visit territorial_url(@territorial)
    click_on "Destroy this territorial", match: :first

    assert_text "Territorial was successfully destroyed"
  end
end
