import React from 'react';
import { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const [number, setNumber] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const value = Number(event.target.value);
    setNumber(value);
    setCurrentNOE(value);
  }

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="number"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  )
}

export default NumberOfEvents;