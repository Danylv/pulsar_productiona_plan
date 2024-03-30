import React from "react";
import "./App.css"
import Header from "./components/Header";
import { PlanTable } from "./components/PlanTable";
import { GraphicsPage } from "./pages/GraphicsPage"
import { Routes, Route } from 'react-router-dom';
// import { FirebaseData } from "./components/FirebaseData";
// import CurrentDateTime from "./components/CurrentDateTime";

function App() {
  return (
    <>
      <Header />
      <div style={{paddingTop: "30px"}}></div>
      <div className="container">
        {/* <PlanTable /> */}
        {/* <FirebaseData/> */}
        <Routes>
          <Route path="/" element={<PlanTable />} />
          <Route path="/graphics" element={<GraphicsPage />} />
       </Routes>
      </div>
    </>
  )
}

export default App;
