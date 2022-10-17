import { useEffect, useState } from "react";
import "./App.css";
import OcrReader from "./components/OcrReader/OcrReader";
import config from "./config/config";

function App() {
  const [data, setData] = useState(null);
  const [ocrData, setOcrData] = useState("");

  // Receive OCR data as a prop from the child component
  const onReadOcrData = (ocrData) => {
    setOcrData(ocrData)
  }

  // Prop detects that the change image button was clicked
  const onRemoveClicked = () => {
    setOcrData("")
  }

  useEffect(() => {
    fetch(`${config.API_URL}/api`)
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div className="App">
      <div>
        <p>{!data ? "Loading..." : data}</p>
      </div>
      <header>Welcome to the OCR app!</header>
      <OcrReader
        onReadOcrData={onReadOcrData}
        onRemoveClicked={onRemoveClicked}
      />
      {ocrData}
    </div>
  );
}
export default App;