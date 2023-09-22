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
  # Associations
  belongs_to :user, foreign_key: "participant_id"
  belongs_to :conversation

  # Validations (if needed)
  validates :participant_id, presence: true
  validates :conversation_id, presence: true
end
