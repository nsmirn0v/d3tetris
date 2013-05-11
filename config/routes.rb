D3tetris::Application.routes.draw do
  get "scores/create"
  root to: "staticpages#index"
end
