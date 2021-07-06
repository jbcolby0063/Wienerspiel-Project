import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

// In the first terminal, type "yarn start" --> React frontend running at http://localhost:3000
// In the second terminal, type "yarn start-api" --> Flask backend running at http://localhost:5000

function App() {
  const [currentTime, setCurrentTime] = useState(1)

  // send the request to Flask API through fetch() and convert the response to JavaScript Object through .json()
  useEffect(() => { 
    fetch("/time").then(res => res.json()).then(data => { // just use "/time" due to proxy configuration in package.json
      setCurrentTime(data.time)
    })
  }, [])   

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;
