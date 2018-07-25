import React from 'react';

const roundCard = ({ round }) => {
  return (
    <div className="card">
      <p className="title"> {round.playedOn} </p>
    </div>
  )
}

export default roundCard