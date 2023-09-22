class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.integer :server_id, null: false, index: true, foreign_key: { to_table: :servers }
      t.string :description
      t.integer :position, null: false, default: 0
      t.boolean :is_private, null: false, default: false
      t.string :channel_type, null: false, default: "text"

      t.timestamps
    end
  end
end
