class Membership < ApplicationRecord
  POSITIONS = [
    "member",
    "admin",
    "owner",
    "blocked",
  ]

  validates :member_id, :server_id, presence: true
  validates :server_id, uniqueness: { scope: :member_id, message: "already a member of the server." }

  after_validation :position,
    inclusion: { in: POSITIONS, message: "'%{value}' is not a valid position" }

  before_destroy :delete_messages

  belongs_to :member, class_name: :User
  belongs_to :server, class_name: :Server
end
