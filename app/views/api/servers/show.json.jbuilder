json.server do
  json.extract! server, :id, :name, :owner_id, :invite_code, :first_channel_id
  json.server_photo_url server.photo.record.server_photo_url if server.photo.attached?
  json.server_photo_url2 server.photo.url if server.photo.attached?
            json.is_valid_photo aws_access_denied?(server.photo.record.server_photo_url)
end
