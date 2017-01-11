# class ScoresController < ApplicationController
#   def create
# 	  score = Score.create(level: 1, lines: 0, time: 0)
#     session[:scoreID] = score.id
#     render json: { scoreID: score.id }
#   end
#
#   def update
#     score = Score.find(session[:scoreID]);
#     session[:scoreID] = nil
#
#     if score
#     	score.update_attributes(level: params[:level].to_i, lines: params[:lines].to_i, time: params[:time].to_i)
#       topscore = Score.topscore.first
#   	  render json: { count: Score.count,
#   	  							 hs: { lines: topscore.lines,
#   	  							 			 time: topscore.time }}
#     end
#   end
# end
