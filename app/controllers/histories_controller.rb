class HistoriesController < ApplicationController
  def index
    @histories = History.order('created_at DESC').limit(10)
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json
    end
  end
end
