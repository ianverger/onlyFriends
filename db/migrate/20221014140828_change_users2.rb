class ChangeUsers2 < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :profile_pic
    remove_column :users, :cover_pic
  end
end
