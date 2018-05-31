class CreateHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :histories do |t|
      t.text        :user_input, null: false
      t.text        :bot_response, null: false
      t.timestamp   :response_timestamp, null: false
    end
  end
end
