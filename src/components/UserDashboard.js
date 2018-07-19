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
      user_id: '1', //no snakeCase to match a foreign key column in the table round
      rounds: []
    }
    this.createNewRound = this.createNewRound.bind(this);
  }

   componentWillMount() {
     this.getRounds();
   }
  
  createNewRound(event) {
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/api/v1/newround';
    const data = this.state;
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => console.log(res));
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
      <section>
        <h3>Welcome Username Here</h3>
        <div className="Rounds-tracked">
          <article>latest round of golf</article>
          <article>{this.state.rounds}</article>
        </div>
        <Link
          to='/protected/round'
          onClick={this.createNewRound}>Start a New Round</Link>
        <Route path='/protected/round' component={RoundTracker}/>
        <RoundTracker />
      </section>
    )
  }
}


export default UserDashboard;