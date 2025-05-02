import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-gwpms22afgh3xnex.us.auth0.com"
        clientId="MvihB0y1by8CE9aIuycZtGdvTIYadAyI"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);
