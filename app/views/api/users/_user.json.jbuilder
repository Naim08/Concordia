json.extract! user, :id, :username, :email, :custom_status, :online_status
json.profile_picture_url user.photo.url if user.photo.attached?

json.servers user.servers.map(&:id)
json.conversations user.conversations.map(&:id)
json.direct_messages user.direct_messages.map(&:id)
json.messages user.messages.map(&:id)
