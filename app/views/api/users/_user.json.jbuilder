json.extract! user, :id, :username, :email, :custom_status, :online_status
json.profile_picture_url user.photo.url if user.photo.attached?
