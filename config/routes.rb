Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :servers, only: [:index, :show, :create, :update, :destroy]
    resources :friends, only: [:index, :create, :update, :destroy]
    resources :subscriptions, only: [:create, :destroy]
    resources :channels, only: [:create, :update, :destroy] do
      resources :messages, only: [:index, :create]
    end
    resources :messages, only: [:update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end

  post "api/test", to: "application#test"
end
