class ChatsController < ApplicationController
  def index
    @chat = History.new
  end

  def create
  end
end
