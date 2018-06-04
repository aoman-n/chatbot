class CreateDictionaries < ActiveRecord::Migration[5.0]
  def change
    create_table :dictionaries do |t|
      t.text :response, null: false
      t.text :request,  null: false
    end
  end
end
