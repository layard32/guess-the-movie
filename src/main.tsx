import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import App from "./App.tsx";
import { Provider as HeroProvider } from "./provider.tsx";
import "@/styles/globals.css";
import { Provider as ReduxProvider } from "react-redux";
import store from "./state/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <HeroProvider>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </HeroProvider>
    </Router>
  </React.StrictMode>
);
