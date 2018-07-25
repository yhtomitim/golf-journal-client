import React from 'react';

class RoundTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hole: '1',
      par: '',
      score: '',
      notes: '',
      roundComplete: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveHole = this.saveHole.bind(this);
    this.toggleRoundTracker = this.toggleRoundTracker.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  saveHole(event) {
    event.preventDefault();
    const apiUrl = 'https://golf-journal-server.herokuapp.com/api/v1/holes/savehole';
    const data = {
      hole: this.state.hole,
      par: this.state.par,
      score: this.state.score,
      notes: this.state.notes,
      round_id: this.props.roundId
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }
  
  toggleRoundTracker() {
    this.setState({ roundComplete: !this.state.roundComplete });
    this.sendToParent(this.state.roundComplete);
    this.props.getRounds();
    this.props.getHolesForRounds([7]);
  };

    sendToParent(roundComplete) {
      this.props.sendToParent(roundComplete);
    }
  
  render() {
    return (
      <form onSubmit={this.saveHole}>
        <div className="field">
          <label
            className="label"
            htmlFor="hole">Select hole:
          </label>
          <div className="control">
            <div className="select">
              <select
                name="hole"
                value={this.state.hole}
                onChange={this.handleChange}>
                  <option value="1">No. 1</option>
                  <option value="2">No. 2</option>
                  <option value="3">No. 3</option>
                  <option value="4">No. 4</option>
                  <option value="5">No. 5</option>
                  <option value="6">No. 6</option>
                  <option value="7">No. 7</option>
                  <option value="8">No. 8</option>
                  <option value="9">No. 9</option>
                  <option value="10">No. 10</option>
                  <option value="11">No. 11</option>
                  <option value="12">No. 12</option>
                  <option value="13">No. 13</option>
                  <option value="14">No. 14</option>
                  <option value="15">No. 15</option>
                  <option value="16">No. 16</option>
                  <option value="17">No. 17</option>
                  <option value="18">No. 18</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label
            className="label"
            htmlFor="par">Par:
          </label>
          <div className="control">
            <input
              className="input is-primary is-rounded"
              type="text"
              name="par"
              placeholder="i.e. 4"
              value={this.state.par}
              onChange={this.handleChange} />
          </div>
        </div>
        <div className="field">
          <label
            className="label"
            htmlFor="score">Your Score:
          </label>
          <div className="control">
            <input
              className="input is-primary is-rounded"
              type="text"
              name="score"
              placeholder="enter your score"
              value={this.state.score}
              onChange={this.handleChange} />
          </div>
        </div>
        <div className="field">
          <label
            className="label"
            htmlFor="notes">Hole Notes:
          </label>
          <div className="control">
            <textarea
              className="textarea"
              name="notes"
              placeholder="enter notes"
              value={this.state.notes}
              onChange={this.handleChange} />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-primary"
              type="submit">Save Hole
            </button>
          </div>
          <div className="control">
            <button
              className="button is-success"
              onClick={this.toggleRoundTracker}>Finish Round
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default RoundTracker;