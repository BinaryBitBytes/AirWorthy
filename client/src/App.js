import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import About from "./components/About";
import Contact from "./components/Contact.js";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Intro></Intro>
      <About></About>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
}

export default App;
