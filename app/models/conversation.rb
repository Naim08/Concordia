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
  belongs_to :owner, foreign_key: :owner_id, class_name: :User
  has_many :conversation_participants, foreign_key: :conversation_id, class_name: :ConversationParticipant
  has_many :participants, through: :conversation_participants, source: :participant
  has_many :direct_messages, foreign_key: :conversation_id, class_name: :DirectMessage
  # Validations (if needed)
  validates :owner_id, presence: true
  before_validation :set_random_name, if: -> { name.blank? }

  private

  def set_random_name
    # Generate the initial random name using Faker
    generated_name = "#{Faker::Lorem.word.capitalize}#{Faker::Lorem.word.capitalize}"

    # Check for uniqueness and regenerate if necessary
    while Conversation.exists?(name: generated_name)
      generated_name = "#{Faker::Lorem.word.capitalize}#{Faker::Lorem.word.capitalize}"
    end

    self.name = generated_name
  end
end
