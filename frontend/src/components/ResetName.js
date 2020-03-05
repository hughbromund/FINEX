import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "./ResetEmail.module.css";

import {UPDATE_NAME_URL} from "../constants/Constants"

export default class ResetEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      error: "",
      hidden: true
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
            hidden: false,
            error: "Error. Name must not be empty.",
            name: ""
          });
        return;
    }

    fetch(UPDATE_NAME_URL, {
      method: "PUT",
      body: JSON.stringify({name: this.state.name}),
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
                "Success! Your account name is now " +
                this.state.name +
                ".",
                name: ""
            });
        } else {
            console.log("Failure")
            this.setState(
                {
                  error: "An Error Occurred while trying to update your name. ",
                  hidden: false
                });
        }
        })
      .catch(err => {
          console.log(err)
          this.setState(
            {
              error: "An Error Occurred while trying to update your name. ",
              hidden: false
            })
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
      <div className={styles.container} style={{display: 'flex', justifyContent: 'center'}}>
        <Form onSubmit={this.handleSubmit} style={{ width: '50rem'}}>
          <Form.Group>
            <Form.Label className={styles.label}>Reset Name</Form.Label>
            <Form.Control
              required
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.handleNameChange}
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
