json.extract! conversation, :id, :owner_id, :name

json.participant do
  conversation.participants.each do |user|
    if user.id != conversation.owner_id
      json.partial! "api/users/user", user: user
    end
  end
end

json.direct_messages do
  conversation.direct_messages.each do |direct_message|
    json.set! direct_message.id do
      json.extract! direct_message, :id, :conversation_id, :content, :created_at, :updated_at
      json.author direct_message.author
      json.authorId direct_message.author.id
    end
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
