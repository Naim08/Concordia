json.extract! direct_message, :id, :conversation_id, :content, :created_at

json.user direct_message.author, :id, :username