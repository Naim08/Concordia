@conversations.each do |conversation|
  json.set! conversation.id do
    json.partial! "api/conversations/conversation", conversation: conversation
  end
end

# json.array! @conversations do |conversation|
#   json.id conversation.id
#   json.owner_id conversation.owner_id
#   # Add other conversation attributes here as required
# end
