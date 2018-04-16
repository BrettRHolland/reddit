require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do
  Post.create(username: Faker::Internet.user_name, title: Faker::Lorem.sentence, url: Faker::Internet.url, body: Faker::Lorem.paragraph, votes: Faker::Number.between(1, 200), created_at: Faker::Time.between(DateTime.now - 7, DateTime.now))
end

30.times do
  Comment.create(post_id: Faker::Number.between(1, 10), username: Faker::Internet.user_name, body: Faker::Lorem.paragraph, created_at: Faker::Time.between(DateTime.now - 7, DateTime.now))
end
