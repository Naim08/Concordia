class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.references :channel, foreign_key: true, index: true, null: false
      t.references :author, foreign_key: { to_table: :users }, index: true, null: false
      t.string :status, null: false, default: "original"

      t.timestamps
    end
  end
end
