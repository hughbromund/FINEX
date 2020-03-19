import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";

import classes from "./ResetName.module.css";

import { UPDATE_NAME_URL } from "../constants/Constants";
import { ACCOUNT_PATH } from "../constants/Constants";
import history from "../routing/History";

export default class ResetEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      error: false,
      success: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.validateName = this.validateName.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // const url = "http://httpbin.org/post";

    if (!this.validateName()) {
      this.setState({
        error: true,
        success: false
      });
      return;
    }

    fetch(UPDATE_NAME_URL, {
      method: "PUT",
      body: JSON.stringify({ name: this.state.name }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (res.status == 200) {
          console.log("Success");
          this.setState({
            error: false,
            success: true,
            name: ""
          });
        } else {
          console.log("Failure");
          this.setState({
            success: false,
            error: true
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: true,
          success: false
        });
      });
  }

  validateName() {
    // console.log(this.state.name.length)
    if (this.state.name.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <h1>Update Name</h1>
          <Collapse in={this.state.success}>
            <div>
              <Alert variant="success">
                <Alert.Heading>Success</Alert.Heading>
                <p>Your name has been successfully updated.</p>
                <p>
                  If you don't need to change it again, you can navigate back to
                  the Account Screen
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-success"
                    onClick={() => history.push(ACCOUNT_PATH)}
                  >
                    Account
                  </Button>
                </div>
              </Alert>
            </div>
          </Collapse>
          <Collapse in={this.state.error}>
            <div>
              <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <p>
                  Something went wrong. Please try submiting again. If this
                  error continues please try checking your internet connection
                  or try restarting your Web Browser.
                </p>
              </Alert>
            </div>
          </Collapse>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Please Enter Your New Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter Name"
                value={this.state.name}
                onChange={this.handleNameChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button data-testid="submit" variant="success" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}
