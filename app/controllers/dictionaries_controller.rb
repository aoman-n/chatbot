class DictionariesController < ApplicationController
  def index
    @dictionary = Dictionary.new
  end

  def create
    @dictionary = Dictionary.new(dictionary_params)
    redirect_to action: :index unless @dictionary.save
  end

  private
  def dictionary_params
    params.require(:dictionary).permit(:request, :response)
  end
end
