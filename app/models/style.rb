class Style < ApplicationRecord
    has_many :layers
    belongs_to :fill, class_name: "Fill", foreign_key: "fill_id", optional: true
    belongs_to :stroke, class_name: "Stroke", foreign_key: "stroke_id", optional: true
  end
  