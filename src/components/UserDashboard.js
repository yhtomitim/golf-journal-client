import React from 'react';
import RoundTracker from './RoundTracker';

const UserDashboard = () => {
  return (
    <section>
      <h3>Welcome Username Here</h3>
      <div className="Rounds-tracked">
        <article>latest round of golf</article>
        <article>other rounds of golf tracked</article>
      </div>
      <button>Start a New Round</button>
      <RoundTracker />
    </section>
  )
}

export default UserDashboard;