import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import UserDashboard from './components/UserDashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          This web app will allow a golfer to take notes on his or her round.The golfer can select from nearby golf courses and retrieve relevant info on the selected course like
          if they have a driving range.
        </p>
        <p className="App-intro">
          Problem Solved with App: This app solves a problem
          for golfers who want a place to keep their score data and notes on how they achieved that score in one place.For instance, a score on a hole only tells part of the story— what if that double-bogey was the result of a penalty and a poor chip ? Leaving notes on how a golfer performs on each hole can dramatically improve the golfer’ s game round to round.
        </p>
        <p className="App-intro">
          How it Solves this problem : Allows for a golfer to record their scores on a hole as well as notes on each shot or how they played the hole overall.These notes can be viewed later to help a golfer improve areas of their game round-to-round
        </p>
        <UserDashboard />
        <Footer />
      </div>
    );
  }
}

export default App;
