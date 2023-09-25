json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username, :custom_status,
                    :online_status, :email
      json.profile_picture_url user.photo.url if user.photo.attached?
    end
  end
end
