json.conversation do
  json.set! conversation.id do
    json.partial! "api/conversations/conversation", conversation: conversation
  end
end
