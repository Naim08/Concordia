json.user do
  json.extract! @user, :id, :username, :profile_picture, :status, :color, :email
  json.photoUrl @user.photo.attached? ? @user.photo.url : nil
end
