json.set! @conversation.id do
  json.extract! @conversation, :id, :name, :owner_id, :created_at, :updated_at
end
