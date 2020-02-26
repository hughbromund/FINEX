import React, { Component } from 'react'
import classes from "./AccountPage.module.css"

import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import history from "../routing/History";

import { HOME_PATH } from "../constants/Constants"
import { LOGOUT_URL } from "../constants/Constants"


/*
 * Code Snippets borrowed From:
 *
 * https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome
 */
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

    callUserInfo = async () => {
        var response = await fetch('http://localhost:5000/auth/username',{
            method: "GET",
            withCredentials : true,
            // credentials: 'same-origin'
        })
        // console.log(response)
        var body = await response.json()
        // console.log(body.user.username)
        this.setState({username : body.user.username})
        // this.state.user = body.user.username
    }
    
    componentDidMount() {
        this.callUserInfo().catch(err => {
            console.log(err)
        })
    }

    handleLogout(event) {
        event.preventDefault()
        // console.log(LOGOUT_URL)
        fetch(LOGOUT_URL, {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials : true,
        }).then(response => {
            // console.log(response)
            if (response.status == 200) {
                history.push(HOME_PATH)
            } else {
                console.log("Unable to Log Out")
            }
        }).catch(err => {
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
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="danger" onClick={this.handleLogout}>Logout</Button>
                </div>
            </div>
        )
    }
}
