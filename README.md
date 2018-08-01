# Golf Journal

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

A React app styled with Bulma that helps golfers keep track of, and take notes on, a round of golf. Backed with an Express API and PostgreSQL db. The server-side source code can be found [here](https://github.com/yhtomitim/golf-journal-api).

## Build Setup

``` bash
# install dependencies
$ npm install
# or
$ yarn install

# serve with hot reload at localhost:3000
$ npm run dev
# or
$ yarn run dev

# build for production and launch server
$ npm run build
$ npm start
# or
$ yarn run build
$ yarn start
```
### Overview

If you're anything like me when it comes to golf, you're terrible. You stop keeping score around hole 5 because you're already well on your way to a score in the low 100s. But, you also hit some great shots. Really good shots. Shots that make you keep coming back to the torture chamber that is a golf course. The thing is, the scorecard is only half of the story. If there was a way to both keep your score, and also take notes on each hole that could help you understand how you got that score and indentify trends for improvement.

Golf Journal solves this problem for golfers who want a place to keep their score data and notes on how they achieved that score in one place. Golfers can enter the par score for a hole, their own score, and notes on their perfomance. Leaving notes on a performance on each hole can dramatically improve a golfer's game round-to-round.

### Future Design

- I plan to add a feature to protect against duplicate users
- I plan to add a feature for logging into an account

