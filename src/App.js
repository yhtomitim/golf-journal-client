import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Demo from './components/Demo';
// import AuthComponent from './components/AuthComponent';
import UserDashboard from './components/UserDashboard';
import './App.css';

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

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

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
    const { from } = this.props.location.state || { from: { pathname: `/dashboard/${this.state.user_id}` } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the Dashboard at {from.pathname}</p>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="user_id"
          value={this.state.user_id}
          onChange={this.handleChange}/>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={About} />
        <Route path="/demo" component={Demo} />
        {/* <Route path="/login" component={AuthComponent} /> */}
          <div>
            <AuthButton />
            <Link to="/dashboard">User Dashboard</Link>
            <Route path="/login" component={Login} />
            <PrivateRoute path='/dashboard' component={UserDashboard} user_id={this.user_id}/>
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;
