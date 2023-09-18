json.member do
  member = membership.member

  json.extract! membership, :position, :nickname
  json.membership_id membership.id
  json.extract! member, :username, :custom_status, :profile_picture_url, :id
  status = (member.online_status == "Offline" || member.set_online_status == "Invisible") ?
    "Offline" : member.set_online_status
  json.online_status status
end
