import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/Hero.css"; // Import global para garantir aplicação do CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
