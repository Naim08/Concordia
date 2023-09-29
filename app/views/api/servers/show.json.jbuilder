json.server do
  json.extract! server, :id, :name, :owner_id, :invite_code, :first_channel_id
  json.server_photo_url server.photo.record.server_photo_url if server.photo.attached?
end
