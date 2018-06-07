Rails.application.routes.draw do
  root to:                     'chats#index'
  post '/chat'              => 'chats#create'
  get  '/history/list'      => 'histories#index'
  get  '/dictionaries/list' => 'dictionaries#list'
  resources :dictionaries, only: [:index, :create]

end
