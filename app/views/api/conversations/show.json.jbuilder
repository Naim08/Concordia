# json.set! @conversation.id do
#   json.extract! @conversation, :id, :name, :owner_id, :created_at, :updated_at
#   json.set! :conversation_participant do
#     @conversation.conversation_participants.each do |participant|
#       json.set! participant.id do
#         json.extract! participant, :id, :participant_id, :conversation_id, :created_at, :updated_at
#       end
#     end
#   end
# end

json.set! @conversation.id do
  json.partial! "api/conversations/conversation", conversation: @conversation
end
