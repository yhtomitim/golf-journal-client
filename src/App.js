import React, { Component } from 'react';
import Router from './Router'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <About />
        <Router />
        <Footer />
      </div>
    );
  }
}

export default App;
