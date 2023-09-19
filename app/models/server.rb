require "open-uri"

class Server < ApplicationRecord
  validates :owner_id, presence: true
  validates :name, length: { in: 2..100, message: "Must be between 2 and 100 in length." }
  validates :invite_code, uniqueness: true

  before_validation :generate_default_pic
  before_create :add_invite_code
  after_create :add_owner_membership, :create_first_channel

  has_one_attached :photo

  belongs_to :owner, class_name: :User
  has_many :memberships, inverse_of: :server, dependent: :destroy
  has_many :members, through: :memberships, source: :member

  private

  def add_invite_code
    while true
      self.invite_code = SecureRandom.uuid.split("-")[0]
      return unless Server.exists?(self.invite_code)
    end
  end

  def add_owner_membership
    Membership.create!({
      member_id: owner_id,
      server_id: self.id,
      position: "owner",
    })
  end

  def create_first_channel
    # first_channel = Channel.create!({
    #   name: "general",
    #   server_id: self.id,
    # })

    # self.first_channel_id = first_channel.id
    # self.save!
    return true
  end

  def generate_default_pic
    unless self.photo.attached?
      # Presumably you have already stored a default pic in your seeds bucket
      file = URI.open("https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg")
      self.photo.attach(io: file, filename: "default.jpg")
    end
  end
end
