# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_22_181704) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "channels", force: :cascade do |t|
    t.string "name", null: false
    t.integer "server_id", null: false
    t.string "description"
    t.integer "position", default: 0, null: false
    t.boolean "is_private", default: false, null: false
    t.string "channel_type", default: "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "conversation_participants", force: :cascade do |t|
    t.integer "participant_id", null: false
    t.integer "conversation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_conversation_participants_on_conversation_id"
    t.index ["participant_id"], name: "index_conversation_participants_on_participant_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_conversations_on_name"
    t.index ["owner_id"], name: "index_conversations_on_owner_id"
  end

  create_table "direct_messages", force: :cascade do |t|
    t.integer "creator_id", null: false
    t.integer "conversation_id", null: false
    t.integer "replied_message_id"
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_direct_messages_on_conversation_id"
    t.index ["creator_id"], name: "index_direct_messages_on_creator_id"
    t.index ["replied_message_id"], name: "index_direct_messages_on_replied_message_id"
  end

  create_table "friend_requests", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_friend_requests_on_receiver_id"
    t.index ["sender_id"], name: "index_friend_requests_on_sender_id"
  end

  create_table "friends", force: :cascade do |t|
    t.bigint "user1_id", null: false
    t.bigint "user2_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user1_id", "user2_id"], name: "index_friends_on_user1_id_and_user2_id", unique: true
    t.index ["user2_id"], name: "index_friends_on_user2_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "server_id", null: false
    t.bigint "member_id", null: false
    t.string "position", default: "member", null: false
    t.string "nickname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_memberships_on_member_id"
    t.index ["server_id", "member_id"], name: "index_memberships_on_server_id_and_member_id", unique: true
    t.index ["server_id"], name: "index_memberships_on_server_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "body", null: false
    t.bigint "channel_id", null: false
    t.bigint "author_id", null: false
    t.string "status", default: "original", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["channel_id"], name: "index_messages_on_channel_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "owner_id", null: false
    t.string "invite_code", null: false
    t.string "server_photo_url"
    t.boolean "private", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "first_channel_id"
    t.index ["owner_id"], name: "index_servers_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "online_status", default: "Offline", null: false
    t.string "set_online_status", default: "Online", null: false
    t.string "custom_status", default: "", null: false
    t.string "profile_picture_url", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "conversation_participants", "conversations"
  add_foreign_key "conversation_participants", "users", column: "participant_id"
  add_foreign_key "conversations", "users", column: "owner_id"
  add_foreign_key "direct_messages", "conversations"
  add_foreign_key "direct_messages", "direct_messages", column: "replied_message_id"
  add_foreign_key "direct_messages", "users", column: "creator_id"
  add_foreign_key "friend_requests", "users", column: "receiver_id"
  add_foreign_key "friend_requests", "users", column: "sender_id"
  add_foreign_key "friends", "users", column: "user1_id"
  add_foreign_key "friends", "users", column: "user2_id"
  add_foreign_key "memberships", "servers"
  add_foreign_key "memberships", "users", column: "member_id"
  add_foreign_key "messages", "channels"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "servers", "users", column: "owner_id"
end
