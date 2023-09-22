class CreateDirectMessagingTables < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.integer :owner_id, null: false
      t.string :name
      t.timestamps
    end
    add_index :conversations, :name
    add_index :conversations, :owner_id
    add_foreign_key :conversations, :users, column: :owner_id

    create_table :conversation_participants do |t|
      t.integer :participant_id, null: false
      t.integer :conversation_id, null: false
      t.timestamps
    end
    add_index :conversation_participants, :conversation_id
    add_index :conversation_participants, :participant_id
    add_foreign_key :conversation_participants, :users, column: :participant_id
    add_foreign_key :conversation_participants, :conversations, column: :conversation_id

    create_table :direct_messages do |t|
      t.integer :creator_id, null: false
      t.integer :conversation_id, null: false
      t.integer :replied_message_id
      t.text :content, null: false
      t.timestamps
    end
    add_index :direct_messages, :conversation_id
    add_index :direct_messages, :creator_id
    add_index :direct_messages, :replied_message_id
    add_foreign_key :direct_messages, :users, column: :creator_id
    add_foreign_key :direct_messages, :conversations, column: :conversation_id
    add_foreign_key :direct_messages, :direct_messages, column: :replied_message_id
  end
end
