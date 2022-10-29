import React, { useEffect, useState } from "react";
import "./App.scss";
import config from "./config/config";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from "./pages/home";
import NotFoundPage from "./pages/404";
import AddInvoice from "./pages/invoice/add-invoice";
import { Container } from "react-bootstrap";

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
        <Container className="App">
          <Router>
            <Routes>
              <Route path="/grocery-tracker">
                <Route path="home" element={<Home />} />
                <Route path="invoice">
                  <Route path="add" element={<AddInvoice />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </Container>
      }
    </React.StrictMode>
  );
}
export default App;