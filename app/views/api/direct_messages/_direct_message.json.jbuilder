json.message do
  json.extract! direct_message, :id, :conversation_id, :content, :created_at, :updated_at

  json.author direct_message.author, :id, :username
  json.authorId direct_message.author.id
  json.profile_picture_url direct_message.author.photo.url if direct_message.author.photo.attached?
end
