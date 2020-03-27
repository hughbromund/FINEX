import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "./ResetEmail.module.css";

import { UPDATE_USERNAME_URL } from "../constants/Constants";

export default class ResetEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      error: "",
      hidden: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // const url = "http://httpbin.org/post";

    if (!this.validateUsername()) {
      this.setState({
        hidden: false,
        error: "Error. Name must not be empty.",
        username: ""
      });
      return;
    }

    fetch(UPDATE_USERNAME_URL, {
      method: "PUT",
      body: JSON.stringify({ name: this.state.name }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log("Success");
          this.setState({
            hidden: false,
            error:
              "Success! Your account username is now " +
              this.state.username +
              ".",
            name: ""
          });
        } else {
          console.log("Failure");
          this.setState({
            error: "An Error Occurred while trying to update your username.",
            hidden: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: "An Error Occurred while trying to update your username.",
          hidden: false
        });
      });
  }

  validateUsername() {
    console.log(this.state.username.length);
    if (this.state.username.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div
        className={styles.container}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Form onSubmit={this.handleSubmit} style={{ width: "50rem" }}>
          <Form.Group>
            <Form.Label className={styles.label}>Reset Username</Form.Label>
            <Form.Control
              required
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
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
