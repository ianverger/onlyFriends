# Welcome to OnlyFriends!

OnlyFriends [(Live Link 🚀)](https://onlyfriends24.herokuapp.com/) is a facebook clone with interactive features such as adding and browsing friends, writing posts, comments, and likes.

<br>

## Tech

- React with Redux: handling data on the front end and rendering interactive components
- Javascript: manipulate the react/html components
- Ruby on Rails (as an API): backend for serving data
- PostgreSQL: database
- AWS S3: cloud storage for profile pictures
- CSS: pixel-perfect site styling
- Heroku: hosting

## Core Features

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/Screen%20Shot%202023-02-07%20at%2010.19.39%20AM.png)
New account creation, login, and guest/demo login

<br><br>

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/browse_friends.gif)
Peruse the site and browse friends profiles with the click of a button

<br><br>

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/new_post.gif)
New post creation

<br><br>

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/add_friend.gif)
Accept and deny incoming friend requests, send out new friend requests and more 

<br><br>

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/profile_pic.gif)
Full profile creation where users can update their information, upload a profile picture, see their friends, etc.

<br><br>

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/search_bar.gif)<br>
Search bar implemented using RegEx

<br><br>

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/responsive_css_2.gif)
Entire site is responsive and works on any size screen, including mobile

## Technical Implementation Details

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/Screen%20Shot%202023-02-07%20at%2011.45.25%20AM.png)<br>
I implemented friends in a way I thought was not overcomplicating the matter, using just two foreign keys representing the users and a boolean that is initially set to false when the request is sent, and then flipped to true when it is accepted.

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/Screen%20Shot%202023-02-07%20at%2011.41.47%20AM.png)
![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/Screen%20Shot%202023-02-07%20at%2011.42.14%20AM.png)
Search bar implemented using RegEx

![](https://github.com/ianverger/onlyFriends/blob/main/app/assets/images/Screen%20Shot%202023-02-07%20at%2011.44.22%20AM.png)
The feed is created by grabbing all of the existing posts, pushing them into an array, and displaying them with the most recent post on top.

## Bonus Features

- Delete User
- Unfriend
