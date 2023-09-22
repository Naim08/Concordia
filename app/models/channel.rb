# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  server_id    :integer          not null
#  description  :string
#  position     :integer          default(0), not null
#  is_private   :boolean          default(FALSE), not null
#  channel_type :string           default("text"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Channel < ApplicationRecord
  TYPES = %w(text voice).freeze

  validates :name, presence: true, length: { in: 2..100, message: "Must be between 2 and 100 in length." }
  validates :server_id, presence: true
  validates :channel_type, presence: true, inclusion: { in: TYPES, message: "Must be either text or voice." }

  belongs_to :server
  has_many :messages, inverse_of: :channel, dependent: :destroy

  # after_create :add_channel_to_server

  # private

  # def add_channel_to_server
  #   server = Server.find(self.server_id)
  #   server.channel_ids << self.id
  #   server.save
  # end
end
