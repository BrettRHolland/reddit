class Post < ApplicationRecord
  has_many :comments
  
  validates :username, presence: true
  validates :title, presence: true
  validates :url, presence: true
end
