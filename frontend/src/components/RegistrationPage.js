import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'


/*
 * Code Snippets borrowed From:
 *
 * https://stackoverflow.com/questions/32282292/how-do-you-center-a-div-element-in-react-w-out-external-css-file/32282992
 * https://react-bootstrap.github.io/components/forms/
 * https://react-bootstrap.github.io/components/images/
 * 
 */

export default class RegistrationPage extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to FINEX, Let's get an account setup for you</h1>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={require('../assets/img/logo-black.png')} style = {{ width: '50rem'}}fluid />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Form style={{ width: '50rem'}}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                </div>
            </div>
        )
    }
}
