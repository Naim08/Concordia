# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  channel_id :bigint           not null
#  author_id  :bigint           not null
#  status     :string           default("original"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
  STATUS = [
    "original",
    "edited",
    "deleted",
    "pinned",
  ].freeze

  validates :body, :channel_id, :author_id, :status, presence: true
  validates :body, length: { maximum: 2000 }

  after_validation :status,
    inclusion: { in: STATUS, message: "'%{value}' is not a valid status" }

  belongs_to :author, class_name: :User
  belongs_to :channel
end
