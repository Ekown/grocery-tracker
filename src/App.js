import React from "react";
import logo from "./logo.svg";
import "./App.css";
import config from './config/config';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`${config.API_URL}/api`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    })
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;