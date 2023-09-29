
json.conversation do

  json.set! conversation.id do
    json.extract! conversation, :id, :owner_id, :name

json.participant do
  if conversation.participant_id == conversation.owner_id
    json.partial! "api/users/user", user: conversation.owner
  else
    json.partial! "api/users/user", user: conversation.participant
  end
end

# json.currentUser do
#   json.partial! "api/users/user", user: @current_user
# end

conversation.conversation_participants.each do |conversation_participant|
  json.set! "conversation_participant" do
    json.set! conversation_participant.id do
      json.extract! conversation_participant, :id, :participant_id, :conversation_id
    end
  end
end

  end
end
