json.server do
  json.extract! server, :id, :name, :owner_id, :invite_code, :first_channel_id
  json.server_photo_url server.photo.url if server.photo.attached?
end
