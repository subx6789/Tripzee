import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DarkModeProvider } from './DarkModeContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Router>
          <Toaster />
          <App />
        </Router>
      </GoogleOAuthProvider>
    </DarkModeProvider>
  </React.StrictMode>
);