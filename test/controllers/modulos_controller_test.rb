require "test_helper"

class ModulosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @modulo = modulos(:one)
  end

  test "should get index" do
    get modulos_url
    assert_response :success
  end

  test "should get new" do
    get new_modulo_url
    assert_response :success
  end

  test "should create modulo" do
    assert_difference("Modulo.count") do
      post modulos_url, params: { modulo: { ativo: @modulo.ativo, icon: @modulo.icon, nome: @modulo.nome, ordem: @modulo.ordem, url: @modulo.url } }
    end

    assert_redirected_to modulo_url(Modulo.last)
  end

  test "should show modulo" do
    get modulo_url(@modulo)
    assert_response :success
  end

  test "should get edit" do
    get edit_modulo_url(@modulo)
    assert_response :success
  end

  test "should update modulo" do
    patch modulo_url(@modulo), params: { modulo: { ativo: @modulo.ativo, icon: @modulo.icon, nome: @modulo.nome, ordem: @modulo.ordem, url: @modulo.url } }
    assert_redirected_to modulo_url(@modulo)
  end

  test "should destroy modulo" do
    assert_difference("Modulo.count", -1) do
      delete modulo_url(@modulo)
    end

    assert_redirected_to modulos_url
  end
end
