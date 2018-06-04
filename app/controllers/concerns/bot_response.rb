module BotResponse
  extend ActiveSupport::Concern

  def random_response
    random_response = ["何を言われたのかわかりません。",
                       "申し訳ございません。理解できません。",
                       "どういう意味でしょうか？"]
    @bot_response = random_response[rand(3)]
  end

  def weather_api(city)
    city = city_rename(city) if city_rename(city).present?
    api_key = ENV["WEATHER_API_KEY"]
    api_url = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + api_key + '&q=' + city
    uri = URI.parse(api_url)
    json = Net::HTTP.get(uri)
    result = JSON.parse(json)
    @weather = result["weather"][0]["main"]
  end

  def search_response
    @bot_response = Dictionary.find_by(request: @user_input)
    if @bot_response.nil?
      random_response
    else
      @bot_response = @bot_response.response
    end
  end
end
