import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "./ResetEmail.module.css";

import {UPDATE_EMAIL_URL} from "../constants/Constants"

export default class ResetEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: "",
      hidden: true
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
      body: JSON.stringify({email: this.state.email}),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (res.status == 200) {
          console.log("Success")
          this.setState({
            hidden: false,
            error:
              "Success! Your account email is now " +
              this.state.email +
              ".",
            email: ""
          });
        } else {
          console.log("Failure")
          this.setState({
            hidden: false,
            error:
              "An Error Occurred while trying to update your Email.",
            email: ""
          });
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({
          hidden: false,
          error:
            "An Error Occurred while trying to update your Email.",
          email: ""
        });
      });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div className={styles.container} style={{display: 'flex', justifyContent: 'center'}}>
        <Form onSubmit={this.handleSubmit} style={{ width: '50rem'}}>
          <Form.Group>
            <Form.Label className={styles.label}>Reset Email</Form.Label>
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
            <Button data-testid="submit" variant="dark" type="submit">
              Submit
            </Button>
          </Form.Group>
          <Form.Group>
            <Alert variant="dark" hidden={this.state.hidden}>
              {this.state.error}
            </Alert>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
