import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Intro from "./components/intro";
import About from "./components/about";
import Contact from "./components/contact.js";

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
