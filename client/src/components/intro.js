import React from "react";
import "./stars.scss";
// import earth from "assets/images/earth.jpg";
import intro from "./intro.jpg";

class Intro extends React.Component {
  render() {
    return (
      // <div id="home" className="intro route bg-image " style={{backgroundImage: "url("+bigImage+")"}}>
      <div
        id="home"
        className="intro route bg-image "
        style={{ backgroundImage: "url(" + intro.jpg + ")" }}
      >
        <div className="intro-content display-table">
          <div className="table-cell">
            <div className="container">
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
                  href="/Users/emmanueljeanbaptiste/react/my-app/src/components/contact.jsx"
                  role="button"
                >
                  Login Or Sign-Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
