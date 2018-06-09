class DictionariesController < ApplicationController
  def index
    @dictionary = Dictionary.new
  end

  def create
    @dictionary = Dictionary.new(dictionary_params)
    render :index unless @dictionary.save
  end

  def list
    @dictionaries = Dictionary.all
  end

  def destroy
    @dictionary = Dictionary.find(params[:id])
    @dictionary.destroy
    render json: { status: 'success' }
  end

  private
  def dictionary_params
    params.require(:dictionary).permit(:request, :response)
  end
end
