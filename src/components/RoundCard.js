import React from 'react';
import moment from 'moment';

const roundCard = ({ round }) => {
  return (
    <div className="card">
      < p className = "title" > { moment(round.playedOn).format('MMM Do YYYY') } </p>
    </div>
  )
}

export default roundCard;