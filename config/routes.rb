Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :show, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :posts, only: [:index, :create, :update, :destroy]
    resources :friendships, only: [:create, :index, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
