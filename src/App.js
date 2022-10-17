import { useEffect, useState } from "react";
import "./App.css";
import config from "./config/config";
import ScaleLoader from "react-spinners/ClipLoader";


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
    { loading ? 
      <div className="loader-container">
        <ScaleLoader
          color="limegreen"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
       :
      <div className="main-content">
        <p>{!data ? "Loading..." : data}</p>
      </div>
    }      
    </div>
  );
}
export default App;