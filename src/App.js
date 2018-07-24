import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Demo from './components/Demo';
import Authentication from './components/Authentication';
import UserDashboard from './components/UserDashboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '', //no snake case so as to match data column
      isLoggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.getUser = this.getUser.bind(this);
    this.toggleDashboard = this.toggleDashboard.bind(this);
    this.updatedToggle = this.updatedToggle.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  }
  getUser(event) {
    event.preventDefault();
    const apiUrl = `http://localhost:8080/api/v1/users/${this.state.user_id}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(res => console.log(res));
  }
  toggleDashboard() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  updatedToggle(childData) {
    this.setState({ isLoggedIn: childData });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="App">
          <Header />
          {/* <Route path="/" component={About} /> */}
          <UserDashboard
            sendToParent={this.updatedToggle}/>
          <Footer />
        </div>
      )
    }
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={About} />
        {/* <Route path="/demo" component={Demo} /> */}
        {/* <Route path="/login" component={Authentication} /> */}
        <form onSubmit={this.getUser} className="App-intro">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="user_id"
            value={this.state.user_id}
            onChange={this.handleChange} />
          <button
            onClick={this.toggleDashboard}
            type="submit">Login</button>
          
        </form>
        {/* <Route path="/dashboard" component={UserDashboard} /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
