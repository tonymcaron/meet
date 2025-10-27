import React from 'react';
import { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const value = Number(event.target.value);
    setNumber(value);
    setCurrentNOE(value);

    if (isNaN(value) || value <= 0 || value > 32) {
      setErrorAlert("Please enter a valid number of events; max 32");
    } else {
      setErrorAlert("");
    }
  }

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input"><strong>Number of Events: </strong></label>
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