require "csv"

CSV.foreach('db/dictionaries.csv') do |row|
  Dictionary.create(request: row[0], response: row[1])
end
