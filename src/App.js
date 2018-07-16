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
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <UserDashboard />
        <Footer />
      </div>
    );
  }
}

export default App;
