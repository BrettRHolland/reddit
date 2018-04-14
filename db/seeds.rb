# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.create(username: 'someuser', title: 'This is a test post', url: 'https://github.com/', body: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.')
Post.create(username: 'different_user', title: 'Another test post right here', url: 'http://www.espn.com/', body: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.')
Post.create(username: 'guy', title: 'Check this out', url: 'http://www.espn.com/', body: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.')
Post.create(username: 'girl', title: 'Hello', url: 'http://www.espn.com/', body: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.')
