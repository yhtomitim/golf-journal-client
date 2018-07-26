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
      isLoggedIn: false,
      showRoundTracker: false,
      holesForRound: [],
    };
    this.createNewRound = this.createNewRound.bind(this);
    this.toggleDashboard = this.toggleDashboard.bind(this);
    this.getRounds = this.getRounds.bind(this);
    this.updatedShowRoundTracker = this.updatedShowRoundTracker.bind(this);
    this.getHolesForRound = this.getHolesForRound.bind(this);
  };

  componentDidMount() {
    this.getRounds();
  };
  
  updatedShowRoundTracker(childData) {
    this.setState({ showRoundTracker: childData });
  };
  
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
  };

  getRounds() {
    const apiUrl = `http://localhost:8080/api/v1/rounds/${this.props.userId}`;
    fetch(apiUrl)
      .then(Response => Response.json())
      .then(Response => {
        const rounds = Response.rounds.map(round => {
          console.log(round);
          return (
            <div onClick={() => this.getHolesForRound(round.id)} className="card" key={round.id}>
              <h5 className="card-header-title">
                <a>{moment(round.playedOn).format('MMM Do YYYY')}</a>
              </h5>
            </div>
          )
        });
        this.setState({ rounds });
      })
  };

  getHolesForRound(roundId) {
    const apiUrl = `http://localhost:8080/api/v1/holes/${roundId}`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const holeCard = res.holes.map(hole => {
          return (
            <div key={hole.id} className="card">
              <header className="card-header">
                <h5 className="card-header-title"> Hole No.{hole.hole}</h5>
              </header>
              <div className="card-content">
                <p className="content">Par: {hole.par}</p>
                <p className="content">Score: {hole.score}</p>
                <p className="content">Notes: {hole.notes}</p>
              </div>
            </div>
          )
        });
        this.setState({ holesForRound: holeCard });
      });
  };

  toggleDashboard() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
    this.sendToParent(this.state.isLoggedIn);
  };
  
  sendToParent(loggedInState) {
    this.props.sendToParent(loggedInState);
  };
  
  render() {
    return (
      <div className="content">
        <section className="container">
          <h3 className="title">Welcome to your Dashboard, {this.props.uid}!</h3>
          <Link to="/">
            <button className="button is-danger is-rounded is-outlined" onClick={this.toggleDashboard}>Sign out</button>
          </Link>
          <div className="section">
            <div className="box columns">
              <div className="column">
                <h4 className="content has-text-centered">Track Round</h4>
                <button className="button is-rounded is-primary is-outlined" onClick={this.createNewRound}>Start New Round</button>
                {this.state.showRoundTracker
                  && <RoundTracker  
                    sendToParent={this.updatedShowRoundTracker}
                    roundId={this.state.roundId}
                    getRounds={this.getRounds}
                />}
              </div>    
              {this.state.rounds.length
                ? 
                <div className="column">
                    <h4 className="content has-text-centered">Rounds Tracked</h4>
                  <article>{this.state.rounds}</article>
                </div>
                :
                <div className="column">
                  <h3>You have no tracked rounds. Go play some golf!</h3>
                </div>
              }
              <div className="column">
                <h4 className="content has-text-centered">Round Review</h4>
                {this.state.holesForRound && 
                  <div>{this.state.holesForRound}</div>
                }
              </div>
            </div>
          </div> 
        </section>
      </div>
    )
  };
};

export default UserDashboard;