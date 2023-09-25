json.friend_request do
  json.requestId friend_request.id
  json.userId user.id
  json.extract! user, :username, :profile_picture_url

  status = (user.online_status == "Offline" || user.set_online_status == "Invisible") ?
    "Offline" : user.set_online_status
  json.online_status status
end
