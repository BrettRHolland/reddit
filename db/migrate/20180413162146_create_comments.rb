class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.integer :post_id, null: false
      t.string :username, null: false
      t.text :body, null: false
      t.integer :votes, default: 0

      t.timestamps
    end
  end
end
