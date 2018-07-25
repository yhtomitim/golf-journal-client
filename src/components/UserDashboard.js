import React from 'react';
import { Link } from 'react-router-dom'
import RoundTracker from './RoundTracker';
import RoundCard from './RoundCard';
import moment from 'moment';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '', //no snakeCase to match a foreign key column in the table round
      rounds: [],
      roundId: '',
      isLoggedIn: false,
      showRoundTracker: false,
      // selectedRound: {},
    }
    this.createNewRound = this.createNewRound.bind(this);
    this.toggleDashboard = this.toggleDashboard.bind(this);
    this.getRounds = this.getRounds.bind(this);
    this.updatedShowRoundTracker = this.updatedShowRoundTracker.bind(this);
    
  }

  componentDidMount() {
    this.getRounds();
   }
  
  updatedShowRoundTracker(childData) {
    this.setState({ showRoundTracker: childData });
  }
  
  createNewRound(event) {
    event.preventDefault();
    this.setState({
      userId: this.props.userId
    });
    const apiUrl = 'http://localhost:8080/api/v1/rounds/newround';
    const data = { user_id: this.props.userId };
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
            <div className="card" key={round.id}>
              <p>{moment(round.playedOn).format('MMM Do YYYY')}</p>
            </div>
          )
        }))
        this.setState({ rounds, selectedRound: Response.rounds[0] });
      })
  }

   toggleDashboard() {
     this.setState({ isLoggedIn: !this.state.isLoggedIn });
     this.sendToParent(this.state.isLoggedIn);
   }
  
  sendToParent(loggedInState) {
    this.props.sendToParent(loggedInState);
  }
  
  render() {
    return (
      <div className="content">
      <section className="container">
        {/* <h2>{this.props.userId}</h2> */}
        <h3 className="title">Welcome to your Dashboard, {this.props.uid}!</h3>
        <Link to="/">
          <button className="button is-danger is-rounded is-outlined" onClick={this.toggleDashboard}>Sign out</button>
        </Link>
        <div className="section">
          <div className="columns">
            <div className="box column">
            {!this.state.rounds.length && (
              <div className="column">
                <h3>You have no tracked rounds. Go play some golf!</h3>
              </div>
            )}
              {this.state.rounds.length && (
                <div className="column">
                  <article>{this.state.rounds}</article>
                </div>
              )}
              </div>
              <div className="column">
                <h4 className="content has-text-centered">holes recorded go here</h4>
              </div>
            <div className="column">
              {/* {this.state.selectedRound && <RoundCard round={this.state.selectedRound} />} */}
              <button className="button is-rounded is-primary is-outlined" onClick={this.createNewRound}>Start New Round</button>
            {this.state.showRoundTracker && <RoundTracker sendToParent={this.updatedShowRoundTracker} roundId={this.state.roundId} />}
            </div>    
          </div>
        </div> 
      </section>
      </div>
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