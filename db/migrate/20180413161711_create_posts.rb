class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :username, null: false
      t.string :title, null: false
      t.string :url, null: false
      t.text :body
      t.integer :votes, default: 0

      t.timestamps
    end
  end
end
