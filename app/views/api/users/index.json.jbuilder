json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username, :profile_picture, :status, :color, :email
      json.photoUrl user.photo.attached? ? user.photo.url : nil
    end
  end
end
