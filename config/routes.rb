Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]

    resources :users, only: [:create, :show, :update]

    resources :servers, only: [:index, :create, :destroy, :update] do
      resources :channels, only: [:index]
      resources :memberships, only: [:index]
    end

    resources :channels, only: [:create, :destroy, :update] do
      resources :messages, only: [:index]
    end

    resources :messages, only: [:create, :destroy, :update]
    resources :friends, only: [:index, :destroy]
    resources :friend_requests, only: [:index, :create, :destroy, :update]
    resources :memberships, only: [:create, :destroy]
  end

  mount ActionCable.server => "/cable"
  get "*path", to: "static_pages#frontend_index"

  post "api/test", to: "application#test"
end
