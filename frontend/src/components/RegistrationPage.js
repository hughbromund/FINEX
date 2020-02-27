import React, { Component } from "react";

import "./RegistrationPage.module.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import history from "../routing/History";
import { ACCOUNT_PATH } from "../constants/Constants";
import { REGISTER_URL } from "../constants/Constants";
import { LOGIN_PATH } from "../constants/Constants";

/*
 * Code Snippets borrowed From:
 *
 * https://stackoverflow.com/questions/32282292/how-do-you-center-a-div-element-in-react-w-out-external-css-file/32282992
 * https://react-bootstrap.github.io/components/forms/
 * https://react-bootstrap.github.io/components/images/
 * https://www.w3schools.com/css/css_padding.asp
 *
 */

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = REGISTER_URL;
    fetch(url, {
      method: "POST",
      //   mode: "no-cors",
      body: JSON.stringify(this.state),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(() => {
        history.push(LOGIN_PATH)
      })
      .catch(err => console.log(err));
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={require("../assets/img/logo-black.png")}
            style={{ width: "40rem" }}
            fluid
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Jumbotron style={{ width: "50rem" }}>
            <Container>
              <h1>Create a New Account</h1>
              <p>
                Welcome to <b>FINEX</b>,{" "}
                <i>let's get your money working for you. </i> <br></br>
                We just need a little information from you. Please fill out the
                fields bellow to create a new <b>FINEX</b> account.
              </p>
            </Container>
          </Jumbotron>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form style={{ width: "50rem" }} onSubmit={this.handleSubmit}>
          <Form.Group>
              <Form.Label>Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  aria-describedby="inputGroupPrepend"
                  onChange={this.handleNameChange}
                  value={this.state.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  onChange={this.handleUsernameChange}
                  value={this.state.username}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text className="text-muted">Make it memorable.</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your Email"
                onChange={this.handleEmailChange}
                value={this.state.email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
              />
              <Form.Text className="text-muted">Make it secure.</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Keep me Logged In" />
            </Form.Group>
            <Button variant="success" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
