class ChatsController < ApplicationController
  include CityRename
  require 'json'
  require 'uri'
  require 'net/http'

  def index
    @chat = History.new
  end

  def create
    @user_input = params[:history][:user_input]
    if @user_input == "今何時？"
      @bot_response = Time.now.strftime("%H時%M分です。")
    elsif city = @user_input.match(/今日の(.+)の天気は？/)
      city = city[1]
      weather_api(city)
      @bot_response = "#{I18n.t @weather}" + "です。"
    else
      search_response
    end
    @history = History.create(user_input: @user_input, bot_response: @bot_response)
  end

  private
  def random_response
    random_response = ["何を言われたのかわかりません。", "申し訳ございません。理解できません。", "どういう意味でしょうか？"]
    @bot_response = random_response[rand(3)]
  end

  def weather_api(city)
    city = city_rename(city) if city_rename(city).present?
    api_key = '#'
    api_url = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + api_key + '&q=' + city
    uri = URI.parse(api_url)
    json = Net::HTTP.get(uri)
    result = JSON.parse(json)
    @weather = result["weather"][0]["main"]
  end

  def search_response
    @bot_response = Dictionary.find_by( request: @user_input)
    if @bot_response.nil?
      random_response
    else
      @bot_response = @bot_response.response
    end
  end

end
