import React from 'react';

const RoundTracker = (props) => {
  return (
    <form>
      <label htmlFor="hole">Select hole:</label>
      <select name="hole" id="">
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
      <input type="text" defaultValue="as a number"/>
      <label htmlFor="">Your Score:</label>
      <input type="text" defaultValue="enter your score" />
      <label htmlFor="">Hole Notes:</label>
      <textarea defaultValue="enter notes"></textarea>
      <button>Save Hole</button>
    </form>
  )
}

export default RoundTracker;