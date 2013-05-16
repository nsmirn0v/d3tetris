D3tetris::Application.routes.draw do
  get "scores/create"
  get "scores/update"
  root to: "staticpages#index"
end
