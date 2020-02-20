import React, { Component } from 'react'

import './RegistrationPage.module.css'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import InputGroup from 'react-bootstrap/InputGroup'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container';


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
    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={require('../assets/img/logo-black.png')} style = {{ width: '40rem'}}fluid />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Jumbotron style={{ width: '50rem'}}>
                    <Container>
                        <h1>Create a New Account</h1>
                        <p>
                        Welcome to <b>FINEX</b>, <i>let's get your money working for you. </i> <br></br>
                        We just need a little information from you.
                        Please fill out the fields bellow to create a new <b>FINEX</b> account.
                        </p>
                    </Container>
                </Jumbotron>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Form style={{ width: '50rem'}}>

                            <Form.Group controlId="validationCustomUsername">
                                <Form.Label>Username</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                Make it memorable. 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                <Form.Text className="text-muted">
                                Make it secure. 
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                                <Form.Text className="text-muted">
                                One more time. 
                                </Form.Text>
                            </Form.Group>


                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                </div>
            </div>
        )
    }
}
