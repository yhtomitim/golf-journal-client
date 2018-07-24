import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import UserDashboard from './components/UserDashboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', //no snake case so as to match data column
      isLoggedIn: false,
      userId: ''
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
    const apiUrl = `http://localhost:8080/api/v1/users/${this.state.username}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          userId: res.user.id
        })
      })
      // .then(res => this.setState({ userId: res.user.id }))
      .then(this.toggleDashboard());
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
          <UserDashboard
            username={this.state.username}
            userId={this.state.userId}
            sendToParent={this.updatedToggle}/>
          <Footer />
        </div>
      )
    }
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={About} />
        <form onSubmit={this.getUser} className="App-intro">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange} />
          <button type="submit">Login</button>
        </form>
        <Footer />
      </div>
    );
  }
}

export default App;
