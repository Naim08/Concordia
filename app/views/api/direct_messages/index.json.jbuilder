@direct_messages.each do |direct_message|
  json.set! direct_message.id do
    json.extract! direct_message, :id, :conversation_id, :content, :created_at, :updated_at

    json.author direct_message.author, :id, :username
    json.authorId direct_message.author.id
    json.profile_picture_url direct_message.author.photo.url if direct_message.author.photo.attached?
  end
end
