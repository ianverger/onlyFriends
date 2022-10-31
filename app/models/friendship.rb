# == Schema Information
#
# Table name: friendships
#
#  id           :bigint           not null, primary key
#  requester_id :bigint           not null
#  requestee_id :bigint           not null
#  confirmed    :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Friendship < ApplicationRecord
    validates :requester_id, :requestee_id, presence: true
    validates :confirmed, inclusion: { in: [true, false] }

    belongs_to :requester,
        foreign_key: :requester_id,
        class_name: :User

    belongs_to :requestee,
        foreign_key: :requestee_id,
        class_name: :User


    def self.find_request(id1, id2)
        case_1 = Friendship.find_by(requester_id: id1, requestee_id: id2)
        return case_1 if case_1
        return Friendship.find_by(requester_id: id2, requestee_id: id1)
    end

    def self.confirmed?(id1, id2)
        case_1 = !Friendship.where(requester_id: id1, requestee_id: id2, confirmed: true).empty?
        case_2 = !Friendship.where(requester_id: id2, requestee_id: id1, confirmed: true).empty?
        case_1 || case_2
    end
end
