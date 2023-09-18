class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.string :name, null: false
      t.references :owner, null: false, foreign_key: { to_table: :users }, index: true
      t.string :invite_code, null: false, uniqueness: true
      t.string :server_photo_url
      t.boolean :private, null: false, default: false

      t.timestamps
    end
    add_column :servers, :first_channel_id, :bigint
  end
end
