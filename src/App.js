import React, { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apiUrl, setApiUrl] = useState(null);
  const [apiData, setApiData] = useState(null);

  const fetchPath = async (path) => {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  };

  const fetchApiUrl = useCallback(async () => {
    const data = await fetchPath("data/stack.json");

    const envId = process.env.REACT_APP_ENV_ID || "test";

    setApiUrl(data[`cdk-react-stack-${envId}`].apiUrl);
  }, []);

  const fetchRandomImage = useCallback(async () => {
    let isImage = false;

    while (!isImage) {
      const data = await fetchPath(apiUrl);

      if (data.media_type === "image") {
        setApiData(data);
        isImage = true;
      }
    }
  }, [apiUrl]);

  useEffect(() => {
    if (!apiUrl) {
      fetchApiUrl();
    }
  }, [apiUrl, fetchApiUrl]);

  useEffect(() => {
    if (apiUrl && !apiData) {
      fetchRandomImage();
    }
  }, [apiUrl, apiData, fetchRandomImage]);

  if (!apiUrl || !apiData) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ fontSize: "46px" }}>{apiData.title}</h1>
        <img
          src={apiData.url}
          style={{ maxWidth: "800px", maxHeight: "600px" }}
          alt="apod"
        />
        <button
          onClick={fetchRandomImage}
          style={{ width: "150px", height: "30px", margin: "16px" }}
        >
          Fetch Image
        </button>
      </header>
    </div>
  );
}

export default App;
