json.channel do
  json.extract! channel, :id, :name, :description, :position, :is_private, :channel_type
end
