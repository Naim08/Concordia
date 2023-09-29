class AddColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :participant_id, :integer, null: false, default: 1
    add_foreign_key :conversations, :users, column: :participant_id
  end
end
