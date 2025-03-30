import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import App from "./App.tsx";
import { Provider as HeroProvider } from "./provider.tsx";
import "@/styles/globals.css";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "./state/store";
import { ToastProvider } from "@heroui/toast";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <HeroProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <ToastProvider
              placement="top-center"
              toastOffset={3}
              maxVisibleToasts={2}
            />
            <App />
          </PersistGate>
        </ReduxProvider>
      </HeroProvider>
    </Router>
  </React.StrictMode>
);
