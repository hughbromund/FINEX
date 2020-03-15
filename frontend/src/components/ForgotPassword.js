import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import classes from "../components/ForgotPassword.module.css";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // event.preventDefault();
    console.log("test");
  }

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
            <Form>
              <Form.Group>
                <Form.Label>Please Enter your Email Address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group>
                <Button
                  onClick={this.handleSubmit()}
                  data-testid="submit"
                  variant="success"
                  type="submit"
                >
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
