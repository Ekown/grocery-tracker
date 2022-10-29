import React, { useEffect, useState } from "react";
import "./App.css";
import config from "./config/config";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from "./pages/home";
import NotFoundPage from "./pages/404";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api`)
      .then(res => res.json())
      .then(data => {
        if (data && data.message === 'Hello from server!') {
          setLoading(false);
        }
      });
  }, []);

  return (
    <React.StrictMode>
      <div className="App">
        {loading ?
          <div className="loader-container">
            <ClipLoader
              color="limegreen"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          :
          <Router>
            <Routes>
              <Route path="/grocery-tracker">
                <Route path="home" element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        }
      </div>
    </React.StrictMode>
  );
}
export default App;