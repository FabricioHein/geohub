class HomeController < ApplicationController
  def index
    # @mapa_config = Map.find()
    @mapmas = Map.all
  end 
end
