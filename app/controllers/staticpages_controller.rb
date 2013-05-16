class StaticpagesController < ApplicationController
  def index
  	@score = Score.topscore.first
  	@count = Score.count
  end
end
