class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.references :server, foreign_key: { to_table: :servers }, index: true, null: false
      t.references :member, foreign_key: { to_table: :users }, index: true, null: false
      t.string :position, null: false, default: "member"
      t.string :nickname
      t.index [:server_id, :member_id], unique: true

      t.timestamps
    end
  end
end
