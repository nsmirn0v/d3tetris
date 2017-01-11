# class Score
#   include Mongoid::Document
#   include Mongoid::Timestamps
#
#   field :level, type: Integer
#   field :lines, type: Integer
#   field :time, type: Integer
#   scope :topscore, ->{ desc(:lines).asc(:time).limit(1) }
# end
