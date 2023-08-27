import React from "react";
import "./App.css"
import Header from "./components/header";
import { Sort } from "./components/table";

function App() {
  return (
    <>
      <Header />
      <div style={{paddingTop: "100px"}}></div>
      <div className="container">
        <Sort />
      </div>
    </>
  )
}

export default App;
