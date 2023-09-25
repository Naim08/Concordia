# == Schema Information
#
# Table name: conversation_participants
#
#  id              :bigint           not null, primary key
#  participant_id  :integer          not null
#  conversation_id :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class ConversationParticipant < ApplicationRecord
  belongs_to :conversation, foreign_key: :conversation_id, class_name: :Conversation
  belongs_to :participant, foreign_key: :participant_id, class_name: :User

  has_one :owner, through: :conversation, source: :owner

  # Validations (if needed)
  validates :participant_id, presence: true
  validates :conversation_id, presence: true
end
