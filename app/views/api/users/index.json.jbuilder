@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :email, :username, :birthday, :first_name, :last_name
        json.profilePicUrl user.profile_pic.url
    end
end