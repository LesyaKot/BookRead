import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "../config.js"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
