import React, { Component1 } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";

import classes from "../components/ForgotPassword.module.css";

import { PUT_RESET_PASSWORD } from "../constants/Constants";
import { LOGIN_PATH } from "../constants/Constants";
import history from "../routing/History";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      success: false,
      error: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    // console.log(this.state.email);

    var response = await fetch(PUT_RESET_PASSWORD, {
      method: "PUT",
      body: JSON.stringify({ email: this.state.email }),
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

    // var body = await response.json();

    // console.log(response);
  };

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
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
                    You successfully submited a password reset request. If we
                    find an account matching the email you provided you will
                    recieve an email with further steps
                  </p>
                  <p>For now, you can navigate back to the login screen.</p>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="outline-success"
                      onClick={() => history.push(LOGIN_PATH)}
                    >
                      Login
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
                    or restarting your Web Browser.
                  </p>
                </Alert>
              </div>
            </Collapse>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Please Enter your Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleEmailChange}
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
