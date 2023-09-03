import React from "react";
import "./App.css"
import Header from "./components/header";
import { Sort } from "./components/table";
import { FirebaseData } from "./components/FirebaseData";

function App() {
  return (
    <>
      <Header />
      <div style={{paddingTop: "100px"}}></div>
      <div className="container">
        <Sort />
        <FirebaseData/>
      </div>
    </>
  )
}

export default App;
