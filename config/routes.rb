Rails.application.routes.draw do
  root 'posts#index'

  resources :posts
  resources :comments

  namespace :api do
    namespace :v1 do
      resources :posts
      resources :comments
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
