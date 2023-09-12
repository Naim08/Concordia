class User < ApplicationRecord
  has_secure_password

    validates(:username, :password_digest, :session_token, :email, presence: true)
    validates(:username, :session_token, :email, uniqueness: true)
    validates(:email, format: { with: URI::MailTo::EMAIL_REGEXP },
                      length: {in: 3..255})
    validates(:username, format: { without: URI::MailTo::EMAIL_REGEXP ,
                                   message: "can't be an email"},
                         length: {in: 2..32})
    validates(:password, length: {in: 8..255}, allow_nil: true)

    before_validation :ensure_session_token

    def self.find_by_credentials(credential, password)
        email_regex = URI::MailTo::EMAIL_REGEXP
        if (email_regex.match(credential))
            user = User.find_by(email: credential)
        else
            user = User.find_by(username: credential)
        end

        if !user
            return nil
        else
            return user.authenticate(password)
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        return self.session_token
    end

    private

    def generate_unique_session_token
        while (true)
            token = SecureRandom::urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end
