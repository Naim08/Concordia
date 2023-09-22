json.friends do
  @friendships1.each do |friendship|
    json.set! friendship.id do
      friend = friendship.user2

      json.friendshipId friendship.id
      json.userId friend.id
      json.extract! friend, :username, :custom_status, :profile_picture_url
      status = (friend.online_status == "Offline" || friend.set_online_status == "Invisible") ?
        "Offline" : friend.set_online_status
      json.online_status status
    end
  end

  @friendships2.each do |friendship|
    json.set! friendship.id do
      friend = friendship.user1

      json.friendshipId friendship.id
      json.userId friend.id
      json.extract! friend, :username, :custom_status, :profile_picture_url
      status = (friend.online_status == "Offline" || friend.set_online_status == "Invisible") ?
        "Offline" : friend.set_online_status
      json.online_status status
    end
  end
end
