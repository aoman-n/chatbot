class HistoriesController < ApplicationController
  def index
    @histories = History.order('created_at DESC').limit(10)
  end
end
