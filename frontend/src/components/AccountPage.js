import React, { Component } from 'react'
import classes from "./AccountPage.module.css"

import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

export default class AccountPage extends Component {

    // Changing these Variables will change the entire page
    
    firstName = "Hugh";
    lastName = "Bromund"
    username = "hbromund"
    email = "hugh@finex.com"
    password = "*********"


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
                            Welcome Back, <b>{this.firstName} {this.lastName}</b>
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
                                Username: <b>{this.username}</b>
                            </div>
                            <div>
                                Email: <b>{this.email}</b>
                            </div>
                            <div>
                                Password: <b>{this.password}</b>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
