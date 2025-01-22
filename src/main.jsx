import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <ErrorBoundary>
    <BrowserRouter>
      <App />
      </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
