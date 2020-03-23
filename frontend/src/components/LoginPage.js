import React, { Component } from "react";
// import axios from 'axios'

// import './RegistrationPage.module.css'

import classes from "./LoginPage.module.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Card from 'react-bootstrap/Card'
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import history from "../routing/History";

import { ACCOUNT_PATH } from "../constants/Constants";
import { LOGIN_URL } from "../constants/Constants";
import { USER_INFO_URL } from "../constants/Constants";
import { FORGOT_PASSWORD_PATH } from "../constants/Constants";
import { DarkModeContext } from "../contexts/DarkModeContext";

// const axios = require('axios').default;
/*
 * Code Snippets borrowed From:
 *
 * https://stackoverflow.com/questions/32282292/how-do-you-center-a-div-element-in-react-w-out-external-css-file/32282992
 * https://react-bootstrap.github.io/components/forms/
 * https://react-bootstrap.github.io/components/images/
 * https://www.w3schools.com/css/css_padding.asp
 *
 */

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginError: true
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    // console.log("Logging In");
    // console.log(JSON.stringify(this.state));

    fetch(LOGIN_URL, {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      withCredentials: true
      // credentials: 'same-origin'
    })
      .then(response => {
        // console.log(response.status)
        if (response.status == 200) {
          // Success on Login
          // console.log(response)
          history.push(ACCOUNT_PATH);
        } else {
          // Failure to login
          console.log("Invalid Account");
          this.setState({ loginError: false });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUsernameChange(event) {
    // console.log(event.target.value)
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  componentDidMount = async () => {
    var response = await fetch(USER_INFO_URL, {
      method: "GET",
      withCredentials: true
      // credentials: 'same-origin'
    });
    if (response.status == 200) {
      history.push(ACCOUNT_PATH);
    }
  };

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <div>
            <Image
              src={
                this.context.isDarkMode
                  ? require("../assets/img/logo-white.png")
                  : require("../assets/img/logo-black.png")
              }
              fluid
            />
          </div>
          <div>
            <Jumbotron className={this.context.isDarkMode ? "bg-dark" : ""}>
              <Container>
                <h1>Welcome Back</h1>
                <p>
                  Welcome back to <b>FINEX</b>,{" "}
                  <i>let's get your money working for you. </i> <br></br>
                </p>
              </Container>
            </Jumbotron>
          </div>
          <div>
            <Alert variant="danger" hidden={this.state.loginError}>
              <Alert.Heading>No Account Found!</Alert.Heading>
              <p>
                Looks like your username or password are incorrect. Try checking
                your spelling and logging in again.
              </p>
            </Alert>
          </div>
          <div>
            <Form onSubmit={this.handleLogin}>
              <Form.Group controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep me Logged In" />
              </Form.Group>
              <Button data-testid="submit" variant="success" type="submit">
                Log In
              </Button>
              &nbsp; or &nbsp;
              <Button
                variant="outline-success"
                onClick={() => history.push(FORGOT_PASSWORD_PATH)}
              >
                Forgot Password
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
LoginPage.contextType = DarkModeContext;
