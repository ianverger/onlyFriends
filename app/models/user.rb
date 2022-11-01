# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#  birthday        :string           not null
#  gender          :string           not null
#  bio             :text
#  relationship    :string
#  hometown        :string
#  current_city    :string
#  education       :string
#  work            :string
#
class User < ApplicationRecord
  has_secure_password

  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 5..100 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :first_name, :last_name, :birthday, presence: true
  validates :gender, presence: true

  before_validation :ensure_session_token

  has_many :posts,
    foreign_key: :author_id,
    inverse_of: :author,
    class_name: :Post

  has_many :likes, 
    dependent: :destroy

  has_many :sent_requests,
    foreign_key: :requester_id,
    inverse_of: :requester,
    class_name: :Friendship

  has_many :received_requests,
    foreign_key: :requestee_id,
    inverse_of: :requestee,
    class_name: :Friendship
    
  has_one_attached :profile_pic

  def self.find_by_credentials(credential, password)
    # user = User.find_by(email: email)
    # if user && user&.authenticate(password)
    #   user
    # else
    #   nil 
    # end
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save 
    self.session_token
  end

  def friends
    friends_1 = Friendship.where(requester_id: self.id, confirmed: true).pluck(:requestee_id)
    friends_2 = Friendship.where(requestee_id: self.id, confirmed: true).pluck(:requester_id)
    friend_ids = friends_1 + friends_2
    User.where(id: friend_ids)
  end

  def friend_ids
    self.friends.map do |friend|
      friend.id
    end
  end

  def pending_incoming_requests
    pending_reqs = Friendship.where(requestee_id: self.id, confirmed: false).pluck(:requester_id)
    User.where(id: pending_reqs)
  end

  def pending_incoming_ids
    self.pending_incoming_requests.map do |pending|
      pending.id
    end 
  end

  def pending_outgoing_requests
    pending_reqs = Friendship.where(requester_id: self.id, confirmed: false).pluck(:requestee_id)
    User.where(id: pending_reqs)
  end

  def pending_outgoing_ids
    self.pending_outgoing_requests.map do |pending|
      pending.id
    end
  end

  def friends_with?(user)
    Friendship.confirmed?(self.id, user.id)
  end

  def send_request(user)
    Friendship.create(requestee_id: user.id)
  end

  private
  def generate_unique_session_token
    token = SecureRandom.base64

    while User.exists?(session_token: token)
      token = SecureRandom.base64
    end

    token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end
