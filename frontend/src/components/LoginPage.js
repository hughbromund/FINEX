import React, { Component } from 'react'
// import axios from 'axios'


// import './RegistrationPage.module.css'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import InputGroup from 'react-bootstrap/InputGroup'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container';
import history from "../routing/History";

import { ACCOUNT_PATH } from "../constants/Constants"
import { LOGIN_URL } from "../constants/Constants"

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
        super(props)

        this.state = {
            username: "",
            password: ""
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLogin(event) {
        event.preventDefault()
        // console.log("Logging In");
        // console.log(JSON.stringify(this.state));

        fetch(LOGIN_URL, {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state), 
            withCredentials : true,
            // credentials: 'same-origin'
          })
          .then(response => {
              // console.log(response.status)
              if (response.status == 200) {
                  // Success on Login
                // console.log(response)
                history.push(ACCOUNT_PATH)
              } else {
                  // Failure to login
                console.log("Invalid Account")
              }
          }).catch(err => {
              console.log(err);
          })
          
    }

    handleUsernameChange(event) {
        // console.log(event.target.value)
        this.setState({username: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={require('../assets/img/logo-black.png')} style = {{ width: '40rem'}}fluid />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Jumbotron style={{ width: '50rem'}}>
                    <Container>
                        <h1>Welcome Back</h1>
                        <p>
                        Welcome back to <b>FINEX</b>, <i>let's get your money working for you. </i> <br></br>
                        </p>
                    </Container>
                </Jumbotron>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Form style={{ width: '50rem'}} onSubmit={this.handleLogin}>
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
                        </Form>
                </div>
            </div>
        )
    }
}
