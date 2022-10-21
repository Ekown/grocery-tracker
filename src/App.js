import { useEffect, useState } from "react";
import "./App.css";
import config from "./config/config";
import ClipLoader from "react-spinners/ClipLoader";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api`)
      .then(res => res.json())
      .then(data => setData(data.message))
      .then(() => setLoading(false));
  }, []);

  return (
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
        <Container>
          <div className="main-content">
            <p>{!data ? "Loading..." : data}</p>
            <div>
              <Button variant="primary">Add Invoice</Button>
              <Button variant="primary">View Invoice</Button>
            </div>
          </div>
        </Container>
      }
    </div>
  );
}
export default App;