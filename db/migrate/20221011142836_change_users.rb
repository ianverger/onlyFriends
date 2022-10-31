class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_column :users, :birthday, :string, null: false
    add_column :users, :gender, :string, null: false
    add_column :users, :bio, :text
    add_column :users, :relationship, :string
    add_column :users, :hometown, :string
    add_column :users, :current_city, :string
    add_column :users, :education, :string
    add_column :users, :work, :string
    add_column :users, :profile_pic, :string
    add_column :users, :cover_pic, :string
  end
end
