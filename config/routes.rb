Rails.application.routes.draw do
  resources :maps
  resources :styles
  resources :layers
  resources :territorials
  resources :modulos
  get 'home/index'
  
  
  root 'home#index'
end
