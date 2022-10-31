json.user do
    json.extract! @user, :id, :email, :username, :birthday, :first_name, :last_name, :gender, :bio, :relationship, :hometown, :current_city, :education, :work, :created_at, :updated_at
    json.profilePicUrl @user.profile_pic.url
    json.friends @user.friend_ids
    json.in_pending @user.pending_incoming_ids
    json.out_pending @user.pending_outgoing_ids
end