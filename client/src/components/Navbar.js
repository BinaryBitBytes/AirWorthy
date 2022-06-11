import React from "react";
import "react-bootstrap";
import "./stars.scss";

class Navbar extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-b navbar-trans navbar-expand-md fixed-top"
        id="mainNav"
      >
        <div className="container">
          <div class="d-flex navbar navbar-expand-lg">AirWorthy</div>

          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarDefault"
            aria-controls="navbarDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            className="navbar-collapse collapse justify-content-end"
            id="navbarDefault"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link  active" href="#intro">
                  Home
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link " href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#contact">
                 
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#contact">
                 
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
