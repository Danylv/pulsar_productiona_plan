import React from "react";
import "./App.css"
import Header from "./components/Header";
import { PlanTable } from "./components/PlanTable";
import { FirebaseData } from "./components/FirebaseData";
import CurrentDateTime from "./components/CurrentDateTime";

function App() {
  return (
    <>
      <Header />
      <div style={{paddingTop: "100px"}}></div>
      <div className="container">
        <PlanTable />
        {/* <FirebaseData/> */}
        {/* <CurrentDateTime/> */}
      </div>
    </>
  )
}

export default App;
