@friends.each do |friend|
    json.set! friend.id do
        json.extract! friend, :id, :email, :username, :birthday, :first_name, :last_name, :gender, :bio, :relationship, :hometown, :current_city, :education, :work, :created_at, :updated_at
        json.profilePicUrl friend.profile_pic.url
        json.friends friend.friend_ids
        json.in_pending friend.pending_incoming_ids
        json.out_pending friend.pending_outgoing_ids
    end
end