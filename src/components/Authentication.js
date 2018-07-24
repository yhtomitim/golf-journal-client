import React from 'react';
import { Route, Link } from 'react-router-dom';
class Authentication extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user_id: '', //no snake case so as to match data column
  //     params: this.user_id
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.getUser = this.getUser.bind(this);
  // }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  //   console.log(this.state);
  // }
  // getUser(event) {
  //   event.preventDefault();
  //   const apiUrl = `http://localhost:8080/api/v1/users/${this.state.user_id}`;

  //   fetch(apiUrl)
  //     .then(res => res.json())
  //     .then(res => console.log(res));
  // }

   render() {
    return (
      <div className="App-intro">
        {/* <div id="firebaseui-auth-container"></div> */}
        <p>This is where the "dropped in" auth piece will render</p>
        <form onSubmit={this.getUser}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="user_id"
            value={this.state.user_id}
            onChange={this.handleChange} />
          <Link to='/login/dashboard'>
            <button type="submit">Login</button>
          </Link>
        </form>
      </div>
    )
  }
}


export default Authentication;

  // configureAuth() {
  //   // FirebaseUI config.
  //   var uiConfig = {
  //     signInSuccessUrl: '<url-to-redirect-to-on-success>',
  //     signInOptions: [
  //       // Leave the lines as is for the providers you want to offer your users.
  //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     ],
  //     // Terms of service url.
  //     tosUrl: '<your-tos-url>'
  //   };

  //   // Initialize the FirebaseUI Widget using Firebase.
  //   var ui = new firebaseui.auth.AuthUI(firebase.auth());
  //   // The start method will wait until the DOM is loaded.
  //   //if () to check if there is a pending redirect operation to complete a sign-in attempt, check isPendingRedirect() before deciding whether to render FirebaseUI via start().

  //   if (ui.isPendingRedirect()) {
  //     ui.start('#firebaseui-auth-container', uiConfig);
  //   }
  // }