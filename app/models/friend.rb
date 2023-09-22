# == Schema Information
#
# Table name: friends
#
#  id         :bigint           not null, primary key
#  user1_id   :bigint           not null
#  user2_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friend < ApplicationRecord
  validates :user1_id, :user2_id, presence: true
  validates :user1_id, uniqueness: { scope: :user2_id, message: "already friends with that user" }

  belongs_to :user1, class_name: :User
  belongs_to :user2, class_name: :User
end
