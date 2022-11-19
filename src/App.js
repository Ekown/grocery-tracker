import React, { useEffect, useState } from "react";
import "./App.scss";
import config from "./config/config";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Home from "./pages/home/home";
import NotFoundPage from "./pages/404/404";
import AddInvoice from "./pages/invoice/add-invoice/add-invoice";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './styles/react-stepzilla.scss';
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/system";

function App() {
  const [loading, setLoading] = useState(false);

  // Custom theme
  const theme = createTheme({
    transitions: {
      duration: {
        enteringScreen: 225,
        leavingScreen: 195,
      }
    }
  });

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
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container fixed className="App" sx={{ bgcolor: '#efefef' }}>
              <Router>
                <Routes>
                  <Route path="/grocery-tracker">
                    <Route path="" element={<Navigate to="home" />} />
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
        </ThemeProvider>
      }
    </div>
  );
}
export default App;