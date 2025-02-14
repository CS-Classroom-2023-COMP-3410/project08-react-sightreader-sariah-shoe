import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // We will create this next
// import "./sightreader.js"; // Assuming this can be loaded globally

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
