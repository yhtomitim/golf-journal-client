import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import UserDashboard from './components/UserDashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      isLoggedIn: false,
      userId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updatedToggle = this.updatedToggle.bind(this);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getUser(event) {
    event.preventDefault();
    const apiUrl = `https://golf-journal-server.herokuapp.com/api/v1/users/${this.state.uid}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          userId: res.user.id,
          isLoggedIn: true
        })
      })
  };

  updatedToggle(childData) {
    this.setState({
      isLoggedIn: childData,
      uid: '',
    });
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="section is-paddingless">
          <Header />
          <UserDashboard
            uid={this.state.uid}
            userId={this.state.userId}
            sendToParent={this.updatedToggle}/>
          <Footer />
        </div>
      )
    };
    return (
      <div>
        <Header />
        <div className="columns">
          <form
            onSubmit={this.getUser}
            className="column is-4 is-offset-7">
            <div className = "field">
              <div className="control">
                <label
                  htmlFor="uid"
                  className="label">Username:</label>
                <div className="control">
                  <input
                    name="uid"
                    value={this.state.uid}
                    onChange={this.handleChange}
                    type="text"
                  className="input is-primary is-rounded" />
                </div>
                </div>
              </div>
            <button className="button is-primary is-rounded" type="submit">Login</button>
          </form>
        </div>
        <div className="section is-paddingless">
          <Route
            exact path="/"
            component={About} />
        </div>
        <Footer />
      </div>
    )
  };
};

export default App;
