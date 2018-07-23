import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Demo from './components/Demo';
import Login from './components/Login';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
        <Header />
        <Route exact path="/" component={About} />
        <Route path="/demo" component={Demo} />
        <Route path ="/login" component={Login} />
        <Footer />
        </div>
    );
  }
}

export default App;
