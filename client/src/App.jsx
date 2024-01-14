import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"; //! Fix import package for
import Footer from "./components/Footer.jsx"; //! Fix import package for
// import Wrapper from "./components/Wrapper";

import Intro from "./components/intro.jsx";
import Manager from "./components/manager/Manager.jsx";
import Technician from "./components/technician/Technician.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Navbar></Navbar>
        <div className="routes">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/technician" element={<Technician />} />
          </Routes>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
