import React, { Component } from 'react';
import Router from './components/Router'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Main from './components/Main'
import './App.css';

class App extends Component {
  render() {
    return (
      // <Router>
      //   Route
      //   Route
      //   Route component demo
      //   route component login
      //     route component protected
      //       route component new round
      // </Router>
      <Router>
        <div className="App">
          <Header />
          <Main />
          <About />
          <Footer />
          >
        </div>
      </Router>
    );
  }
}

export default App;
