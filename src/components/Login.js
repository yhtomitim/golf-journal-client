import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";
import UserDashboard from './UserDashboard';
import PrivateRoute from './PrivateRoute';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/dashboard",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      user_id: '' //no snake case so as to match data column
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
    const { redirectToReferrer } = this.state;

    if (false) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="user_id"
          value={this.state.user_id}
          onChange={this.handleChange}/>
        <button onClick={this.login}>Log in</button>
        <PrivateRoute path="/dashboard" component={UserDashboard} />
      </div>
    );
  }
}

export default Login;