import React, { Component } from "react";

import PasswordStrength from "./PasswordStrength";

import classes from "./RegistrationPage.module.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";

import history from "../../routing/History";
// import { ACCOUNT_PATH } from "../constants/Constants";

import { REGISTER_URL, LOGIN_PATH } from "../../constants/Constants";

import { DarkModeContext } from "../../contexts/DarkModeContext";

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
      name: "",
      registerError: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = REGISTER_URL;
    fetch(url, {
      method: "POST",
      //   mode: "no-cors",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        name: this.state.name,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          history.push(LOGIN_PATH);
        } else {
          this.setState({ registerError: false });
        }
      })
      .catch((err) => console.log(err));
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
    this.setState({ name: event.target.value });
  }

  checkPassword() {
    // console.log(this.state.password.length)
    if (this.state.password.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
      >
        <div className={classes.inner}>
          <div>
            <Image
              src={
                this.context.isDarkMode
                  ? require("../../assets/img/logo-white.png")
                  : require("../../assets/img/logo-black.png")
              }
              fluid
            />
          </div>
          <div>
            <Jumbotron className={this.context.isDarkMode ? "bg-dark" : ""}>
              <Container>
                <h1>Create a New Account</h1>
                <p>
                  Welcome to <b>FINEX</b>,{" "}
                  <i>let's get your money working for you. </i> <br></br>
                  We just need a little information from you. Please fill out
                  the fields below to create a new <b>FINEX</b> account.
                </p>
              </Container>
            </Jumbotron>
          </div>
          <div>
            <Alert variant="danger" hidden={this.state.registerError}>
              <Alert.Heading>Unable to create account!</Alert.Heading>
              <p>
                The username you selected is already in use. Usernames must be
                unique.
              </p>
              <p>Did you mean to Log In?</p>
            </Alert>
          </div>
          <div>
            <Form onSubmit={this.handleSubmit}>
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
                <Collapse in={this.checkPassword()}>
                  <div>
                    <PasswordStrength
                      password={this.state.password}
                    ></PasswordStrength>
                  </div>
                </Collapse>
                <Form.Text className="text-muted">Make it secure.</Form.Text>
              </Form.Group>
              <hr />
              <Button variant="success" type="submit">
                Sign Up
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
RegistrationPage.contextType = DarkModeContext;
