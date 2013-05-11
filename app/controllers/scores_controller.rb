class ScoresController < ApplicationController
  def create
	  Score.create(level: params[:level].to_i, lines: params[:lines].to_i, time: params[:time].to_i)
	  topscore = Score.topscore.first
	  render json: { count: Score.count + 1068,
	  							 hs: { lines: topscore.lines,
	  							 			 time: topscore.time }}
  end
end
