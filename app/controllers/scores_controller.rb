class ScoresController < ApplicationController
  def create
	  score = Score.create(level: 1, lines: 0, time: 0)
	  render json: { scoreID: score.id }
  end

  def update
  	Score.find(params[:scoreID]).update_attributes(level: params[:level].to_i, lines: params[:lines].to_i, time: params[:time].to_i)
  	topscore = Score.topscore.first
	  render json: { count: Score.count,
	  							 hs: { lines: topscore.lines,
	  							 			 time: topscore.time }}
  end
end
