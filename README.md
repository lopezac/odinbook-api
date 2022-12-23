# [odinbook-api](https://odinbook-api-production-1c05.up.railway.app/)

![GitHub top language](https://img.shields.io/github/languages/top/lopezac/odinbook-api)

This project is part of the final exercise of [The Odin Project](https://www.theodinproject.com) curriculum. [Live frontend website](https://odinbooker.netlify.app/), and [frontend project](https://github.com/lopezac/odinbook-frontend/) repository.

# Features

This is the RESTful API, of my odinbook-frontend, a Facebook clone.

I did authentication with [passport-js](https://www.passportjs.org/), users can register with email, or sign in as guests, I tried to add facebook login but my backend site was targeted as malicious and was not allowed.

I used JSON Web Token for authentication.

Implemented many CRUD methods.

- Get post, get posts, delete post, update post, create post, get post likes, get post comments.
- Get user chats, get users, get user friends, create user, delete user, get user, get user posts.
- Get notifications, create notification, delete notification.
- Create message, delete message.
- Create like, get likes, get count likes, delete like.
- Create friendship, get friendships, delete friendships.
- Create friend request, get friend requests, delete friend request.
- Create comment, get comment, get comment likes, update comment, delete comment.
- Create chat, delete chat, get chat messages, get chat users.
- Sign up, sign in, sign out.

# Learnings

I put in practice TypeScript in this project, I also tested many routes and controller with SuperTest and Jest.

I did Test Driven Development many times, first writing the tests, checking the failed, then writing the code to make it success, writing the routes, controllers, models and services.

I learned more about Socket.io, about broadcasting events.

# Technology stack

- **NodeJS Framework**: [`express`](http://expressjs.com/)
- **Language**: [`typescript`](https://www.typescriptlang.org/)
- **Data fetching**: [`faker`](https://fakerjs.dev/)
- **Lint**: [`prettier`](https://prettier.io/), [`eslint`](https://eslint.org/)
- **Deployment**: [`railway`](https://railway.app)
- **Architecture**: [`rest`](https://en.wikipedia.org/wiki/Representational_state_transfer), [`jamstack`](https://jamstack.org/)
- **Network requests**: [`socket.io`](https://socket.io/), `fetch`
- **Database**: [`MongoDB`](https://www.mongodb.com/)
- **Object Modeling**: [`Mongoose`](https://mongoosejs.com/)

<div align="center">
  <img title="typescript" alt="typescript" height=48 src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png"/>
  <img title="eslint" alt="eslint" height=48 src="https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg"/>
  <img title="prettier" alt="prettier" height=48 src="https://prettier.io/icon.png"/>
  <img title="faker" alt="faker" height=48 src="https://raw.githubusercontent.com/faker-js/faker/4ce8e98fcc19d99bf6df3abb3e24c4667f586076/docs/public/logo.svg"/>
  <img title="socket.io" alt="socket.io" height=48 src="https://socket.io/images/logo-dark.svg"/>
  <img title="railway" alt="railway" height=48 src="https://railway.app/brand/logo-light.png" />
  <img title="express" alt="express" height=48 src="https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png" />
  <img title="mongodb" alt="mongodb" height=48 src="https://storage-us-gcs.bfldr.com/hj345wvxsvpbc82vchqcj9qh/v/1069931054/original/MongoDB_Logomark_SpringGreen.png?Expires=1671903865&KeyName=gcs-bfldr-prod&Signature=-O31Zwc9X3M0olz245Q-R41lQwI=" />
</div>
