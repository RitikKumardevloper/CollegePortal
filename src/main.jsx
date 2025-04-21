import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Impo      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add here */}rt Toaster

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
  position="top-right"
  toastOptions={{
    style: {
      borderRadius: '8px',
      background: '#fff',
      color: '#333',
    },
    success: {
      style: { background: "#dcfce7", color: "#15803d" },
    },
    error: {
      style: { background: "#fee2e2", color: "#b91c1c" },
    },
  }}
/>

    </BrowserRouter>
  </StrictMode>
);
