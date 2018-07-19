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
      uid: 'thurley'
    }
    this.createNewRound = this.createNewRound.bind(this);
  }
  createNewRound(event) {
    event.preventDefault();
    console.log('clicked this');
    
  }
  render() {
    return (
      <section>
        <h3>Welcome Username Here</h3>
        <div className="Rounds-tracked">
          <article>latest round of golf</article>
          <article>other rounds of golf tracked</article>
        </div>
        <Link
          to='/protected/round'
          onClick={this.createNewRound}>Start a New Round</Link>
        <Route path='/protected/round' component={RoundTracker}/>
        {/* <RoundTracker /> */}
      </section>
    )
  }
}


export default UserDashboard;