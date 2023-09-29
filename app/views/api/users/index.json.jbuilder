json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username, :custom_status,
                    :online_status, :email, :profile_picture_url
    end
  end
end
