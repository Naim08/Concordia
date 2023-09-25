json.friend_requests do
  json.sent do
    @sent_requests.each do |sent|
      json.set! sent.id do
        receiver = sent.receiver
        json.requestId sent.id
        json.userId receiver.id
        json.extract! receiver, :username, :profile_picture_url

        status = (receiver.online_status == "Offline" || receiver.set_online_status == "Invisible") ?
          "Offline" : receiver.set_online_status
        json.online_status status
      end
    end
  end

  json.received do
    @received_requests.each do |received|
      json.set! received.id do
        sender = received.sender
        json.requestId received.id
        json.userId sender.id
        json.extract! sender, :username, :profile_picture_url

        status = (sender.online_status == "Offline" || sender.set_online_status == "Invisible") ?
          "Offline" : sender.set_online_status
        json.online_status status
      end
    end
  end
end
