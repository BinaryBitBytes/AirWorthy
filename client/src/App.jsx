import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Wrapper from "./components/Wrapper";

import Intro from "./components/intro";
import Manager from "./components/manager/Manager";
import Technician from "./components/technician/Technician";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Navbar></Navbar>
        <div className="routes">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/Manager" element={<Manager />} />
            <Route path="/Technician" element={<Technician />} />
          </Routes>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
