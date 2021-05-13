/*global chrome*/
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [events, setEvents] = useState([])
  chrome.alarms.getAll((alarms) => {
    setEvents(alarms.filter((alarm) => alarm.name.split('--')[0] == 'auto_join_meet-meeting'))
  })
  return (
    <div className="App">
      {
        events.map((alarm) => {
          const [_, time, id, title] = alarm.name.split('--')
          const date = new Date(parseInt(time))

          return (
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: 10 }}>{`${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`}</div>
              <div>{title}</div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
