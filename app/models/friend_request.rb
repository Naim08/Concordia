# == Schema Information
#
# Table name: friend_requests
#
#  id          :bigint           not null, primary key
#  sender_id   :bigint           not null
#  receiver_id :bigint           not null
#  status      :string           default("pending"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class FriendRequest < ApplicationRecord
  STATUS = [
    "pending",
    "ignored",
    "accepted",
  ].freeze

  before_validation :ensure_valid_request
  validates :sender_id, :receiver_id, presence: true
  after_validation :status,
                   inclusion: { in: STATUS, message: "'%{value}' is not a valid status" }

  before_update :check_status
  after_create :check_duplicate

  belongs_to :sender, class_name: :User
  belongs_to :receiver, class_name: :User

  private

  def ensure_valid_request
    if (!self.persisted?)
      if (self.receiver_id === self.sender_id)
        errors.add(:error, "Hm, didn't work. Double check that the capitalization, spelling, any space, and numbers are correct.")
      elsif (Friend.where([
        "(user1_id = :sender AND user2_id = :receiver) OR (user1_id = :receiver AND user2_id = :sender)",
        { sender: self.sender_id, receiver: self.receiver_id },
      ]).length > 0)
        errors.add(:error, "You're already friends with that user!")
      else
        request = FriendRequest.where([
          "sender_id = :receiver AND receiver_id = :sender AND status = 'pending'",
          { sender: self.sender_id, receiver: self.receiver_id },
        ])[0]
        if (request != nil)
          request.update!(status: "accepted")
          return
        end

        request = FriendRequest.where([
          "sender_id = :sender AND receiver_id = :receiver AND status = 'pending'",
          { sender: self.sender_id, receiver: self.receiver_id },
        ])[0]
        errors.add(:duplicate, true) if (request != nil)
      end
    end
  end

  def check_status
    if self.status_changed?
      if (self.status == "accepted")
        Friend.create!({
          user1_id: self.sender_id,
          user2_id: self.receiver_id,
        })
      end
    else
      errors.add("Can only update status on friend request!")
    end
  end

  def check_duplicate
    if (Friend.where([
      "(user1_id = :sender AND user2_id = :receiver) OR (user1_id = :receiver AND user2_id = :sender)",
      { sender: self.sender_id, receiver: self.receiver_id },
    ]).length > 0)
      self.destroy!
    end
  end
end
