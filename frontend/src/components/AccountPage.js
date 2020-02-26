import React, { Component } from 'react'
import classes from "./AccountPage.module.css"

import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

export default class AccountPage extends Component {

    // Changing these Variables will change the entire page

    constructor(props) {
        super(props)

        this.state = {
            firstName : "Loading",
            lastName : "Loading",
            username : "Loading",
            email : "Loading",
            password : "Loading"
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:5000/auth/username',{
            method: "GET",
            withCredentials : true
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={require('../assets/img/slothlogo.png')} style = {{ width: '10rem'}}fluid roundedCircle />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}} className={classes.carddiv}>
                    <Card text="white" style={{ width: '50rem'}} className={classes.card}>
                        <Card.Header>
                            Your Account
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                            Welcome Back, <b>{this.state.firstName} {this.state.lastName}</b>
                            </Card.Title>
                            <Card.Subtitle>
                                Manage your Info, Privacy, and Security settings to make <b>FINEX</b> yours. 
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}} className={classes.carddiv}>
                    <Card text="white" style={{ width: '50rem'}} className={classes.card}>
                        <Card.Header>
                            Personal Information
                        </Card.Header>
                        <Card.Body>
                            <div>
                                Username: <b>{this.state.username}</b>
                            </div>
                            <div>
                                Email: <b>{this.state.email}</b>
                            </div>
                            <div>
                                Password: <b>{this.state.password}</b>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
