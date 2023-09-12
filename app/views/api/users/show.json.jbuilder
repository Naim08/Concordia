json.user do
  json.extract! @user, :id, :username, :profile_picture, :status, :color, :email
end
