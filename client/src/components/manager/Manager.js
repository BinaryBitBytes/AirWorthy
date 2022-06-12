import React from "react";
import "../stars.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import FormContainer from "./Form";
import WorkCard from "./WorkCard";

class Manager extends React.Component {
  render() {
    return (
      <div className="workfrom ">
        <div
          id="manager "
          className="col-md-6 justify-center-md card bg-light pb-5 my-auto  "
        >
          <FormContainer />
          {/* <WorkCard /> */}
        </div>
      </div>
    );
  }
}

export default Manager;
