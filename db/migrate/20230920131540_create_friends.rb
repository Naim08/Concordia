class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.references :user1, foreign_key: { to_table: :users }, null: false, index: false
      t.references :user2, foreign_key: { to_table: :users }, null: false
      t.index [:user1_id, :user2_id], unique: true

      t.timestamps
    end
  end
end
