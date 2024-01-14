import React from "react";
import "./stars.scss"; //! Fix import package for stars.scss
import "bootstrap/dist/css/bootstrap.min.css"; //! Fix import package for bootstrap

class Intro extends React.Component {
  render() {
    return (
      <div id="home" className="intro route bg-image ">
        <div className="intro-content display-table">
          <div className="table-cell">
            <h1 className="intro-title mb-4">Welcome To Air Worthy</h1>
            <p className="intro-subtitle">
              <span className="text-slider-items"></span>
              {/* <strong className="text-slider">
                  <Typed
                    strings={["Log In or Sign Up"]}
                    typeSpeed={80}
                    backDelay={1100}
                    backSpeed={30}
                    loop
                  />
                </strong> */}
            </p>
            <p className="pt-3">
              <a
                className="btn btn-light btn  px-4"
                href="client\src\components\Login.js"
                role="button"
              >
                Login Or Sign-Up
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
