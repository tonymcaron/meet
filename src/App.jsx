import React, { useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
  const [currentNOE, setCurrentNOE] = useState(32);

  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
      />
      <EventList />
    </div>
  );
}

export default App;
