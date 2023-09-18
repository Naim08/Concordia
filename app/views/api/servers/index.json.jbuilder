json.servers do
  @servers.each do |server|
    json.set! server.id do
      json.extract! server, :id, :name, :owner_id, :invite_code, :first_channel_id
      json.server_photo_url rails_blob_url(server.photo) if server.photo.attached?
    end
  end
end
