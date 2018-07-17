import React from 'react';

class RoundTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hole: '1',
      par: '',
      score: '',
      notes: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
    
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`the data you entered is: hole: ${this.state.hole} par: ${this.state.par} score: ${this.state.score} notes: ${this.state.notes}` );
  }

  render() {
    return (
      <form className="Hole-form" onSubmit={this.handleSubmit}>
        <label htmlFor="hole">Select hole:</label>
        <select name="hole" id="" value={this.state.hole} onChange={this.handleChange}>
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
        <label htmlFor="">Par:</label>
        <input type="text" name="par" placeholder="as a number" value={this.state.par} onChange={this.handleChange} />
        <label htmlFor="">Your Score:</label>
        <input type="text" name="score" placeholder="enter your score" value={this.state.score} onChange={this.handleChange} />
        <label htmlFor="">Hole Notes:</label>
        <textarea name="notes" placeholder="enter notes" value={this.state.notes} onChange={this.handleChange} ></textarea>
        <button type="submit">Save Hole</button>
      </form>
    )
  }
}

export default RoundTracker;