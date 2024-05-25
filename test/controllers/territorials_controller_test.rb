require "test_helper"

class TerritorialsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @territorial = territorials(:one)
  end

  test "should get index" do
    get territorials_url
    assert_response :success
  end

  test "should get new" do
    get new_territorial_url
    assert_response :success
  end

  test "should create territorial" do
    assert_difference("Territorial.count") do
      post territorials_url, params: { territorial: { fields: @territorial.fields, geomJson: @territorial.geomJson } }
    end

    assert_redirected_to territorial_url(Territorial.last)
  end

  test "should show territorial" do
    get territorial_url(@territorial)
    assert_response :success
  end

  test "should get edit" do
    get edit_territorial_url(@territorial)
    assert_response :success
  end

  test "should update territorial" do
    patch territorial_url(@territorial), params: { territorial: { fields: @territorial.fields, geomJson: @territorial.geomJson } }
    assert_redirected_to territorial_url(@territorial)
  end

  test "should destroy territorial" do
    assert_difference("Territorial.count", -1) do
      delete territorial_url(@territorial)
    end

    assert_redirected_to territorials_url
  end
end
