class StaticpagesController < ApplicationController
  def index
  	@score = Score.topscore.first
  	@count = Score.count + 1068
  end
end
