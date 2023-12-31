# == Schema Information
#
# Table name: direct_messages
#
#  id                 :bigint           not null, primary key
#  creator_id         :integer          not null
#  conversation_id    :integer          not null
#  replied_message_id :integer
#  content            :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class DirectMessage < ApplicationRecord
  # Associations
  belongs_to :replied_message, class_name: "DirectMessage", optional: true
  has_many :replies, class_name: "DirectMessage", foreign_key: "replied_message_id", dependent: :nullify

  belongs_to :author, foreign_key: :creator_id, class_name: :User
  belongs_to :conversation, foreign_key: :conversation_id, class_name: :Conversation

  # Validations (if needed)
  validates :creator_id, presence: true
  validates :conversation_id, presence: true
  validates :content, presence: true
end
