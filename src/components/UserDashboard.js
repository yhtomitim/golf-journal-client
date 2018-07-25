import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom'
import RoundTracker from './RoundTracker';
import moment from 'moment';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '', //no snakeCase to match a foreign key column in the table round
      rounds: [],
      roundId: '',
      isLoggedIn: false,
      showRoundTracker: false
    }
    this.createNewRound = this.createNewRound.bind(this);
    this.toggleDashboard = this.toggleDashboard.bind(this);
    this.getRounds = this.getRounds.bind(this);
  }

  componentDidMount() {
    // if (!this.props.userId) {
    //   return this.setState({ loading: true });
    // }
    this.getRounds();
      // .then(rounds => this.setState({
      //   rounds,
      //   loading: false
      // }))
   }
  
  createNewRound(event) {
    event.preventDefault();
    this.setState({
      userId: this.props.userId
    });
    const apiUrl = 'http://localhost:8080/api/v1/newround';
    const data = {user_id: this.props.userId };
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          roundId: res,
          showRoundTracker: true
        })

      });
  }

  getRounds() {
    const apiUrl = `http://localhost:8080/api/v1/rounds/${this.props.userId}`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then(Response => Response.json())
      .then(Response => {
        const rounds = Response.rounds.map(((round) => {
          return (
            <div key={round.id}>
              <p>{moment(round.playedOn).format('MMM Do YYYY')}</p>
            </div>
          )
        }))
        this.setState({ rounds });
      })
  }

   toggleDashboard() {
     this.setState({ isLoggedIn: !this.state.isLoggedIn });
     this.sendToParent(this.state.isLoggedIn);
   }
  
  sendToParent(loggedInBoolean) {
    this.props.sendToParent(loggedInBoolean);
  }
  
  render() {
    return (
      <section className="App-intro">
        {/* <h2>{this.props.userId}</h2> */}
        <h3>Welcome {this.props.username}</h3>
        <Link to="/">
          <button onClick={this.toggleDashboard}>Sign out</button>
          <button onClick={this.getRounds}>Load</button>
        </Link>
        <div className="Rounds-tracked">
          {this.state.rounds.length && (
            < div className="Rounds-tracked">
              <article>latest round of golf</article>
              <article>{this.state.rounds}</article>
            </div>
          )}
          {!this.state.rounds.length && (
            <h2>You have no rounds. Go play!</h2>
          )}
        </div>
        <button onClick={this.createNewRound}>Start New Round</button>
        {this.state.showRoundTracker && <RoundTracker roundId={this.state.roundId} />}
      </section>
    )
  }
}

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (isLoggedIn) {
//     return <UserGreeting / > ;
//   }
//   return <GuestGreeting / > ;
// }

export default UserDashboard;