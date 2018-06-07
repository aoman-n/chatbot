class Dictionary < ApplicationRecord
  validates :request,  presence: true
  validates :response, presence: true
  validates :request,  uniqueness: true
end
