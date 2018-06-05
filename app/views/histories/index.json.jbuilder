json.array! @histories do |history|
  json.user_input history.user_input
  json.bot_response history.bot_response
  json.response_timestamp history.created_at
end
