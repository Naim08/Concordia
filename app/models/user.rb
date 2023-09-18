class User < ApplicationRecord
  has_secure_password

  STATUS = [
    "Offline",
    "Online",
    "Idle",
    "Do Not Disturb",
    "Invisible",
  ].freeze

  validates :session_token,
    presence: true,
    uniqueness: true
  validates :username,
            presence: true,
            uniqueness: true
  validates :email,
    length: { in: 3..255 },
    format: { with: URI::MailTo::EMAIL_REGEXP },
    uniqueness: true
  validates :password,
    length: {
      minimum: 8,
      maximum: 72,
      too_short: "Must be at least 8 characters long",
      too_long: "Must be 72 or fewer in length",
    },
    allow_nil: true
  validates :custom_status,
    length: { maximum: 128 }
  validate :validate_username

  before_validation :ensure_session_token
  before_create :add_tag_number
  before_update :ensure_unique_tag_username

  after_validation :custom_status, :online_status, :set_online_status,
    presence: true
  after_validation :online_status,
    inclusion: { in: STATUS, message: "'%{value}' is not a valid status" }
  after_validation :set_online_status,
    inclusion: { in: STATUS[1..-1], message: "'%{value}' is not a valid status" }

  has_one_attached :photo

  has_many :memberships,
    inverse_of: :member,
    foreign_key: :member_id,
    dependent: :destroy

  has_many :servers,
    inverse_of: :owner,
    foreign_key: :owner_id,
    dependent: :destroy

  has_many :server_memberships, through: :memberships, source: :server

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
    self.session_token = generate_unique_session_token()
    # self.save!
    return self.session_token
  end

  def custom_status
    if self.status == "Custom"
      self.status = self.custom_status
    end
  end

  def online_status=(status)
    if self.status == "Online"
      self.status = status
    end
  end

  def online_status
    if self.status == "Online"
      self.status = self.set_online_status
    end
  end

  def set_online_status
    if self.status == "Online"
      self.status = "Online"
    end
  end

  private

  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

  def generate_random_tag_number
    "##{rand(0..9)}#{rand(0..9)}#{rand(0..9)}#{rand(0..9)}"
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token()
  end

  def add_tag_number
    while true
      tag_number = generate_random_tag_number
      unless User.exists?("#{self.username}#{tag_number}")
        self.username = "#{self.username}#{tag_number}"
        return
      end
    end
  end

  def ensure_unique_tag_username
    if self.username_changed?
      validate_username()

      while User.exists?(self.username)
        tag = generate_random_tag_number
        self.username = username + tag
      end
    end
  end

  def validate_username
    username = self.username
    if self.persisted?
      username = self.username.rpartition("#")[0]
    end

    if username.length < 2 || username.length > 32
      errors.add(:username, "Must between 2 and 32 characters in length")
    elsif URI::MailTo::EMAIL_REGEXP.match(username)
      errors.add(:username, "Can't be an email")
    elsif /@|#|:|```|discord/.match(username)
      errors.add(:username, "Can't include: @ # : ``` discord")
    elsif /(^everyone$)|(^here$)/.match(username)
      errors.add(:username, "Can't be 'everyone' or 'here'")
    end
  end
end
