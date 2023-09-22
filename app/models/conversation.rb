# == Schema Information
#
# Table name: conversations
#
#  id         :bigint           not null, primary key
#  owner_id   :integer          not null
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Conversation < ApplicationRecord
  # Associations
  belongs_to :owner, class_name: "User"
  has_many :conversation_participants, dependent: :destroy
  has_many :participants, through: :conversation_participants, source: :user
  has_many :direct_messages, dependent: :destroy

  # Validations (if needed)
  validates :owner_id, presence: true

  def self.find_or_create_conversation(user1, user2)
    conversation = Conversation.joins(:conversation_participants)
                               .where(conversation_participants: { user_id: user1.id })
                               .where(conversation_participants: { user_id: user2.id })
                               .first
    if conversation
      conversation
    else
      conversation = Conversation.create(owner_id: user1.id)
      ConversationParticipant.create(user_id: user1.id, conversation_id: conversation.id)
      ConversationParticipant.create(user_id: user2.id, conversation_id: conversation.id)
      conversation
    end
  end
end
