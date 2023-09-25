class CreateFriendRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :friend_requests do |t|
      t.references :sender, foreign_key: { to_table: :users }, index: true, null: false
      t.references :receiver, foreign_key: { to_table: :users }, index: true, null: false
      t.string :status, null: false, default: "pending"

      t.timestamps
    end
  end
end
