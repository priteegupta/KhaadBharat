import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes/AppRoutes";
import AppProviders from "./app/providers/AppProviders";
import "./i18n/config";
import "./styles/globals.css";
import KhaadChat from "./components/ui/KhaadChat/KhaadChat";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element with ID 'root'");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders>
      <AppRoutes />
      <KhaadChat />
    </AppProviders>
  </React.StrictMode>
);
