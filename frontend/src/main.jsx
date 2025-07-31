// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./Utils/Context";
import UserContext from "./Utils/UserContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContext>
      <Context>
        <App />
      </Context>
    </UserContext>
  </BrowserRouter>
);
