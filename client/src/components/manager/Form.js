import React, { Component } from "react";

/* Import Components */
import Input from "../Input";
import TextArea from "../TextArea";
import Select from "../Select";
import Button from "../Button";
import DatePicker from "react-datepicker";
import { Card } from "react-bootstrap";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      work: {
        //delete above this
        id: "",
        projectName: "",
        workDescription: "",
        startingDate: new Date(),
        modelAircraft: "",
        managerName: "",
        technicianName: "",
      },
      technicians: [
        "Tom Green",
        "Rake Yohn",
        "Phillup Ondeez",
        "Jack Blue",
        "linda Hand",
      ],
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleTechnicianName = this.handleTechnicianName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
    this.handleManagerName = this.handleManagerName.bind(this);
    this.handleModelNumber = this.handleModelNumber.bind(this);
    this.handleStartingDate = this.handleStartingDate.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleTechnicianName(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        work: {
          ...prevState.work,
          technicianName: value,
        },
      }),
      () => console.log(this.state.work)
    );
  }

  handleProjectName(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        work: {
          ...prevState.work,
          projectName: value,
        },
      }),
      () => console.log(this.state.work)
    );
  }

  handleManagerName(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        work: {
          ...prevState.work,
          managerName: value,
        },
      }),
      () => console.log(this.state.work)
    );
  }

  handleModelNumber(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        work: {
          ...prevState.work,
          modelAircraft: value,
        },
      }),
      () => console.log(this.state.work)
    );
  }

  handleStartingDate(date) {
    this.setState({
      work: {
        startingDate: date,
      },
    });
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        work: {
          ...prevState.work,
          workDescription: value,
        },
      }),
      () => console.log(this.state.work)
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let managerData = this.state.work;

    fetch(`/api/manager/${managerData}`, {
      method: "PUT",
      body: JSON.stringify(managerData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log("Successful" + data);
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      work: {
        name: "",
        age: "",
        gender: "",
        skills: [],

        ///
        id: "",
        projectName: "",
        workDescription: "",
        startingDate: "",
        modelAircraft: "",
        managerName: "",
        technicianName: "",
      },
    });
  }

  render() {
    return (
      <Card>
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
          <h3> Enter Work </h3>
          <Input
            inputType={"text"}
            title={"Project Name"}
            name={"name"}
            value={this.state.work.projectName}
            placeholder={"Enter your project name"}
            handleChange={this.handleProjectName}
          />{" "}
          {/* Name of the user */}
          <Input
            inputType={"text"}
            name={"Manager Name"}
            title={"Manager Name"}
            value={this.state.work.managerName}
            placeholder={"Enter Manager's Name"}
            handleChange={this.handleManagerName}
          />{" "}
          <Input
            inputType={"text"}
            name={"Model Aircraft"}
            title={"Model Aircraft"}
            value={this.state.work.modelAircraft}
            placeholder={"Enter Model Aircraft"}
            handleChange={this.handleModelNumber}
          />{" "}
          {/* Age */}
          <Select
            title={"Technicians"}
            name={"technicians"}
            options={this.state.technicians}
            value={this.state.work.technicianName}
            placeholder={"Select Technicians Name "}
            handleChange={this.handleTechnicianName}
          />{" "}
          {/* Age Selection */}
          {/* <DatePicker
            name="day1"
            onChange={this.handleStartingDate}
            minDate={this.state.work.startingDate}
            dateFormat="mm/dd/yyyy"
          /> */}
          {/* Skill */}
          <TextArea
            title={"Work Description"}
            rows={10}
            value={this.state.work.workDescription}
            name={"Work Description"}
            handleChange={this.handleTextArea}
            placeholder={"Enter Work Description"}
          />
          {/* workDescription you */}
          <Button
            action={this.handleFormSubmit}
            type={"primary"}
            title={"Submit"}
            style={buttonStyle}
          />{" "}
          {/*Submit */}
          <Button
            action={this.handleClearForm}
            type={"secondary"}
            title={"Clear"}
            style={buttonStyle}
          />{" "}
          {/* Clear the form */}
        </form>
      </Card>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px",
};

export default FormContainer;
