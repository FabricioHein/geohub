class ApplicationController < ActionController::Base
    before_action :load_modulos

    private
  
    def load_modulos
      @modulos = Modulo.all
    end
end
