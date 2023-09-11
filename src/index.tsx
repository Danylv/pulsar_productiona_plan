import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <FluentProvider theme={teamsLightTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FluentProvider>
);
