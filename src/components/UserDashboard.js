import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom'
import RoundTracker from './RoundTracker';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '1', //no snakeCase to match a foreign key column in the table round
      rounds: [],
      roundId: '',
      clicked: false,
    }
    this.createNewRound = this.createNewRound.bind(this);
  }

   componentWillMount() {
     this.getRounds();
   }
  
  createNewRound(event) {
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/api/v1/newround';
    const data = {user_id: this.state.user_id };
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({roundId: res})

      });
  }

  getRounds() {
    const apiUrl = 'http://localhost:8080/api/v1/rounds';
    fetch(apiUrl)
      .then(Response => Response.json())
      .then(Response => {
        let rounds = Response.rounds.map(((round) => {
          return (
            <div key={round.id}>
              <p>{round.playedOn}</p>
            </div>
          )
        }))
        this.setState({ rounds: rounds })
      })
  }

  render() {
    return (
      <section className="App-intro">
        <h3>Welcome {this.props.user_id}</h3>
        <Link to="/">
          <button>Sign out</button>
        </Link>
        <div className="Rounds-tracked">
          <article>latest round of golf</article>
          <article>{this.state.rounds}</article>
        </div>
        <button onClick={this.createNewRound}>Start New Round</button>
        <RoundTracker roundId={this.state.roundId} />
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