import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import classes from "./ResetEmail.module.css";
import Collapse from "react-bootstrap/Collapse";

import { UPDATE_EMAIL_URL, ACCOUNT_PATH } from "../../constants/Constants";

import history from "../../routing/History";

export default class ResetEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      success: false,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail(email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  }

  handleSubmit(event) {
    event.preventDefault();
    // const url = "http://httpbin.org/post";
    if (!this.validateEmail(this.state.email)) {
      return;
    }
    fetch(UPDATE_EMAIL_URL, {
      method: "PUT",
      body: JSON.stringify({ email: this.state.email }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          //console.log("Success");
          this.setState({
            success: true,
            error: false,
            email: "",
          });
        } else {
          //console.log("Failure");
          this.setState({
            error: true,
            success: false,
            email: "",
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          error: true,
          success: false,
          email: "",
        });
      });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <h1>Update Email</h1>
          <Collapse in={this.state.success}>
            <div>
              <Alert variant="success">
                <Alert.Heading>Success</Alert.Heading>
                <p>You successfully updated your email!</p>
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
                  Something went wrong. Please try submitting again. If this
                  error continues please try checking your internet connection
                  or try restarting your Web Browser.
                </p>
              </Alert>
            </div>
          </Collapse>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Please Enter your new Email</Form.Label>
              <Form.Control
                required
                data-testid="email"
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleEmailChange}
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
