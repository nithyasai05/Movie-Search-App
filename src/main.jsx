import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Ensure this path is correct and index.css exists
import App from "./App.jsx"; // Ensure this path is correct

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
