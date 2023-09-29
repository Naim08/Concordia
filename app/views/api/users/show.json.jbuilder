json.user do
  json.extract! @user,
    :id,
    :email,
    :username,
    :custom_status,
    :online_status,
    :created_at,
    :profile_picture_url
end
