json.extract! user, :id, :username, :email
if user.profile_picture_url == nil
  json.profile_picture_url ""
else
  json.profile_picture_url user.profile_picture_url
end

json.servers user.servers.map(&:id)
json.conversations user.conversations.map(&:id)
json.direct_messages user.direct_messages.map(&:id)
json.messages user.messages.map(&:id)
