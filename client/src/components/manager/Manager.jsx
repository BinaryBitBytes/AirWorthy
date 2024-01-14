import React from "react";
import "../stars.scss"; //! Fix import package for
import "bootstrap/dist/css/bootstrap.min.css"; //! Fix import package for
import FormContainer from "./Form.jsx"; //! Fix import package for

class Manager extends React.Component {
  render() {
    return (
      <div className="workfrom ">
        <div
          id="manager "
          className="col-md-6 justify-center-md  pb-5 my-auto  "
        >
          <FormContainer />
          {/* <WorkCard /> */}
        </div>
      </div>
    );
  }
}

export default Manager;
