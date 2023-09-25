json.user do
  json.extract! @user,
    :id,
    :email,
    :username,
    :custom_status,
    :online_status,
    :created_at

  json.profile_picture_url @user.photo.url if @user.photo.attached?
end
