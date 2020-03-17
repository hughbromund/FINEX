import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";

import classes from "../components/ResetPassword.module.css";

import { PUT_UPDATE_PASSWORD } from "../constants/Constants";
import { ACCOUNT_PATH } from "../constants/Constants";
import history from "../routing/History";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      success: false,
      error: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    // console.log(this.state.email);

    var response = await fetch(PUT_UPDATE_PASSWORD, {
      method: "PUT",
      body: JSON.stringify({ password: this.state.password }),
      headers: {
        "content-type": "application/json"
      }
    });

    if (response.status === 200) {
      console.log("Success");
      this.setState({
        success: true,
        error: false
      });
    }
    if (response.status === 400) {
      console.error("Bad Request");
      this.setState({
        success: false,
        error: true
      });
    }
  };

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div className={classes.wrapper}>
          <div className={classes.inner}>
            <Collapse in={this.state.success}>
              <div>
                <Alert variant="success">
                  <Alert.Heading>Success</Alert.Heading>
                  <p>
                    You successfully updated your password! It's a good habit to
                    change your password once a year.
                  </p>
                  <p>
                    If you don't need to change it again, you can navigate back
                    to the Account Screen
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
                <Form.Label>Please Enter your New Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter password"
                  onChange={this.handlePasswordChange}
                />
              </Form.Group>
              <Form.Group>
                <Button data-testid="submit" variant="success" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
