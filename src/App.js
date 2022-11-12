import React, { useEffect, useState } from "react";
import "./App.scss";
import config from "./config/config";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from "./pages/home/home";
import NotFoundPage from "./pages/404/404";
import AddInvoice from "./pages/invoice/add-invoice/add-invoice";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './styles/react-stepzilla.scss';

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
    <div>
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container fixed className="App" sx={{ bgcolor: '#efefef' }}>
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
        </LocalizationProvider>

      }
    </div>
  );
}
export default App;