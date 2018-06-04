class ChatsController < ApplicationController
  include CityRename
  include BotResponse
  require 'json'
  require 'uri'
  require 'net/http'

  def index
    @chat = History.new
  end

  def create
    @user_input = params[:history][:user_input]

    case @user_input
    when "今何時？", "今何時ですか？"
      @bot_response = Time.now.to_s(:time) + "です。"
    when /今日の(.+)の天気は？/
      city = @user_input.match(/今日の(.+)の天気は？/)
      city = city[1]
      weather_api(city)
      @bot_response = "#{I18n.t @weather}" + "です。"
    else
      search_response
    end

    @history = History.create(user_input: @user_input, bot_response: @bot_response)
  end
end
