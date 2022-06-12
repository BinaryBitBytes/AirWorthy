import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
// import Wrapper from "./components/Wrapper";

import Intro from "./components/intro";
import Manager from "./components/Manager";
import Technician from "./components/Technician";

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
        <LoginForm></LoginForm>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
