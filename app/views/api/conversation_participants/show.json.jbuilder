if @common_conversations.present?
  @common_conversations.each do |conversation|
    json.set! conversation.id do
      # ... any other attributes of conversation you want to display

      json.participants conversation.conversation_participants do |participant|
        json.id participant.id
        json.username participant.participant.username
        # ... any other attributes of participant you want to display
      end
    end
  end
else
  json.participants do
    json.array! @participants do |participant|
      json.id participant.id
      json.participant_id participant.participant_id
      json.conversation_id participant.conversation_id
      # Include the user details as well, if needed

    end
  end
end

# json.conversation do
#   json.partial! "api/conversations/conversation", conversation: @conversation
# end

# json.conversation_participant do
#   json.extract! conversation_participant, :id, :participant_id, :conversation_id
# end

# json.current_user_conversation_participant do
#   json.extract! current_user_conversation_participant, :id, :participant_id, :conversation_id
# end

# json.array @conversation_participants do |conversation_participant|
#   json.extract! conversation_participant, :id, :participant_id, :conversation_id
# end

# json.conversation_participants do
#   json.array! conversation_participants do |participant|
#     json.id participant.id
#     json.conversation_id participant.conversation_id
#     # Add other desired fields from ConversationParticipant model
#   end
# end
