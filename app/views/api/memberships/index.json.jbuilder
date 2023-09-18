json.members do
  @memberships.each do |membership|
    member = membership.member

    json.set! member.id do
      json.extract! membership, :position, :nickname
      json.member_id membership.id
      json.extract! member, :username, :custom_status, :profile_picture_url, :id
      status = (member.online_status == "Offline" || member.set_online_status == "Invisible") ?
        "Offline" : member.set_online_status
      json.online_status status
    end
  end
end
