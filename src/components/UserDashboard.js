import React from 'react';
import { Link } from 'react-router-dom'
import RoundTracker from './RoundTracker';
import moment from 'moment';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      rounds: [],
      roundIds: [],
      isLoggedIn: false,
      showRoundTracker: false,
      roundWithHoles: [],
    }
    this.createNewRound = this.createNewRound.bind(this);
    this.toggleDashboard = this.toggleDashboard.bind(this);
    this.getRounds = this.getRounds.bind(this);
    this.updatedShowRoundTracker = this.updatedShowRoundTracker.bind(this);
    this.getHolesForRounds = this.getHolesForRounds.bind(this);
    
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
    fetch(apiUrl)
      .then(Response => Response.json())
      .then(Response => {
        const arr = [];
        const rounds = Response.rounds.map(((round) => {
          arr.push(round.id);
          console.log(round);
          return (
            <div className="card" key={round.id}>
              <p>{moment(round.playedOn).format('MMM Do YYYY')}</p>
            </div>
          )
        }))
        this.setState({
          rounds,
          selectedRound: Response.rounds[0],
          roundIds: arr,
        });
        this.getHolesForRounds(this.state.roundIds);
      })
  }

  getHolesForRounds(arr) {
    arr.forEach(roundId => {
      const apiUrl = `http://localhost:8080/api/v1/holes/${roundId}`;
      fetch(apiUrl)
        .then(res => res.json())
        .then(res => {
          const holes = res.holes.map(round => {
            return (
              <div key={round.id} className="card">
                <header className="card-header">
                  <p className="card-header-title"> Hole No.{round.hole}</p>
                </header>
                <div className="card-content">
                  <p className="content">Par: {round.par}</p>
                  <p className="content">Score: {round.score}</p>
                  <p className="content">Notes: {round.notes}</p>
                </div>
              </div>
            )
          })
          this.setState({ roundWithHoles: holes })
        });
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
                    <h4 className="content has-text-centered">Rounds Tracked</h4>
                  <article>{this.state.rounds}</article>
                </div>
              )}
              </div>
              <div className="box column">
                <h4 className="content has-text-centered">Latest Notes</h4>
                {this.state.roundWithHoles && (
                  <div>{this.state.roundWithHoles}</div>
                )}
              </div>
            <div className="column">
              <button className="button is-rounded is-primary is-outlined" onClick={this.createNewRound}>Start New Round</button>
              {this.state.showRoundTracker
                && <RoundTracker  
                  sendToParent={this.updatedShowRoundTracker}
                  roundId={this.state.roundId}
                  getRounds={this.getRounds}
                  getHolesForRounds={this.getHolesForRounds}
              />}
            </div>    
          </div>
        </div> 
      </section>
      </div>
    )
  }
}

export default UserDashboard;