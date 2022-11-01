json.extract! @post, :id, :body, :author_id, :created_at, :updated_at
json.likes @post.likes