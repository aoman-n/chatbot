class History < ApplicationRecord
  validates :user_input, presence: true
  validates :bot_response, presence: true
end
