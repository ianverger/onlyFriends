# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`

    Friendship.destroy_all
    Post.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('posts')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    andy = User.create!(
      username: "demo_user", 
      email: "demo@user.com", 
      password: "password",
      first_name: "Andy",
      last_name: "Cohen",
      birthday: "June 2, 1968",
      gender: "male",
      bio: "Cohen is the host and executive producer of Bravo's late night talk show, Watch What Happens Live! He also has a pop culture channel on Sirius XM named Radio Andy. Cohen served as Bravo's executive vice president of Development and Talent until 2013. He was responsible for creating original content, developing innovative formats, and identifying new talent. Cohen also served as executive producer on the Emmy- and James Beard award–winning reality cooking competition television show, Top Chef. He continues to serve as an executive producer of the Real Housewives franchise, host of Watch What Happens Live on Bravo, host of Andy Cohen Live on SiriusXM, and hosted the revival of the television dating show Love Connection.",
      relationship: "Single",
      hometown: "St. Louis, Missouri",
      current_city: "NYC",
      education: "Boston University",
      work: "Bravo HQ"
    )

    dorit = User.create!(
      username: "dorit",
      email: "dorit@kemsley.com",
      password: "password",
      first_name: "Dorit",
      last_name: "Kemsley",
      birthday: "July 14, 1976",
      gender: "Female",
      bio: "Dorit Kemsley is an American fashion designer and television personality. She is known as a main cast member on The Real Housewives of Beverly Hills.",
      relationship: "Married",
      hometown: "CONNECTICUT",
      current_city: "Beverly Hills"
    )

    countess = User.create!(
      username: "countess",
      email: "countess@luann.com",
      password: "password",
      first_name: "Luann",
      last_name: "de Lesseps",
      birthday: "May 17, 1965",
      gender: "Female",
      bio: "Luann de Lesseps is an American socialite, television personality, model, author, and singer. In 1993, she married French entrepreneur and aristocrat Count Alexandre de Lesseps; they divorced in 2009 but she retained the courtesy title 'countess' until her remarriage in 2016.",
      relationship: "Single and ready 2 mingle",
      hometown: "Berlin, CT",
      current_city: "NYC"
    )

    nene = User.create!(
      username: "nene",
      email: "nene@leakes.com",
      password: "password",
      first_name: "Nene",
      last_name: "Leakes",
      birthday: "December 13, 1967",
      gender: "Female",
      bio: "Linnethia Monique 'NeNe' Leakes is an American television personality, actress, presenter, businesswoman, author, and fashion designer.",
      relationship: "It's complicated..",
      hometown: "Queens, NY",
      current_city: "Atlanta, GA"
    )

    camille = User.create!(
      username: "camille",
      email: "camille@grammer.com",
      password: "password",
      first_name: "Camille",
      last_name: "Grammer",
      birthday: "September 2, 1968",
      gender: "Female",
      bio: "Camille Grammer Meyer is an American dancer, model, actress, television personality, producer and writer. She is known for appearing on The Real Housewives of Beverly Hills. Grammer started her career as a dancer, model and actress, and worked as a producer and writer for Grammnet Productions.",
      relationship: "Married",
      hometown: "Newport Beach, CA",
      current_city: "Beverly Hills"
    )

    rinna = User.create!(
      username: "rinna",
      email: "lisa@rinna.com",
      password: "password",
      first_name: "Lisa",
      last_name: "Rinna",
      birthday: "July 11, 1963",
      gender: "Female",
      bio: "Lisa Deann Rinna is an American actress, author, and television personality. Since 2014, Rinna has been a main cast member on Bravo's reality television series The Real Housewives of Beverly Hills.",
      relationship: "Married to Harry frickin Hamlin",
      hometown: "Newport Beach, CA",
      current_city: "Beverly Hills"
    )

    karen = User.create!(
      username: "karen",
      email: "karen@huger.com",
      password: "password",
      first_name: "Karen",
      last_name: "Huger",
      birthday: "May 3, 1963",
      gender: "Female",
      bio: "THE Grande Dame of Potomac society",
      current_city: "Potomac, MD"
    )

    lvp = User.create!(
      username: "LVP",
      email: "lisa@vanderpump.com",
      password: "password",
      first_name: "Lisa",
      last_name: "Vanderpump",
      birthday: "September 15, 1960",
      gender: "Female",
      bio: "The crown is heavy darling, so leave it where it belongs",
      relationship: "Married",
      hometown: "London, UK",
      current_city: "Beverly Hills dahhhling",
      work: "Owner of SUR, TomTom, PUMP, and Villa Blanca (RIP)"
    )

    andy_profile_img = File.open('app/assets/images/Andy_Cohen_profile.jpg')
    andy.profile_pic.attach(io: andy_profile_img, filename: 'Andy_Cohen_profile.jpg')


    Post.create!(
        body: 'When you travel the world, you can speak in any accent you like',
        author_id: dorit.id
    )


    Post.create!(
        body: 'if you cant be COOL, you cant be with the countess!',
        author_id: countess.id
    )


    Post.create!(
        body: 'BLOOOOOOOOOOOOP!!!',
        author_id: nene.id
    )


    Post.create!(
        body: 'so pernicious.....',
        author_id: camille.id
    )


    Post.create!(
        body: 'YOU BETTER BELIEVE WERE GONNA TALK ABOUT IT',
        author_id: rinna.id
    )


    Post.create!(
        body: 'The Grande Dame can never be duplicated, imitated or intimidated.',
        author_id: karen.id
    )


    Post.create!(
        body: "Life's not all diamonds and rose' ..but it should be",
        author_id: lvp.id
    )

    Friendship.create!(
        requester_id: 1,
        requestee_id: 2,
        confirmed: true
    )

     Friendship.create!(
        requester_id: 1,
        requestee_id: 3,
        confirmed: true
    )

     Friendship.create!(
        requester_id: 4,
        requestee_id: 1,
        confirmed: false
    )

     Friendship.create!(
        requester_id: 5,
        requestee_id: 1,
        confirmed: false
    )

    Friendship.create!(
      requester_id: 6,
      requestee_id: 1,
      confirmed: false
  )

    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end
  
    puts "Done!"
  end
