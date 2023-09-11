Rails.application.routes.draw do
    get '*path', to: "static_pages#frontend_index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
