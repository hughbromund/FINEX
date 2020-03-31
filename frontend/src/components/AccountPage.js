import React, { Component } from 'react'
import classes from "./AccountPage.module.css"

import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import history from "../routing/History";
import Badge from 'react-bootstrap/Badge'

import { HOME_PATH, LOGIN_PATH } from "../constants/Constants"
import { LOGOUT_URL } from "../constants/Constants"
import { USER_INFO_URL } from "../constants/Constants"
import { RESET_PASS_PATH } from "../constants/Constants"


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
            name: "",
            username : "",
            email : "",
            password : ""
        }
    }

    callUserInfo = async () => {
        var response = await fetch(USER_INFO_URL,{
            method: "GET",
            withCredentials : true,
            // credentials: 'same-origin'
        })
        // console.log(response)
        var body = await response.json()
        // console.log(body)
        this.setState(
            {
                username : body.username,
                email: body.email,
                name: body.name
            })
        // this.state.user = body.user.username
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

    componentDidMount = async() => {
        // console.log("TEST")
        var response = await fetch(USER_INFO_URL,{
            method: "GET",
            withCredentials : true,
            // credentials: 'same-origin'
        })
        // console.log(response)
        if (response.status != 200) {
            history.push(LOGIN_PATH);
        } else {
            this.callUserInfo().catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={require('../assets/img/slothlogo.png')} style = {{ width: '10rem'}}fluid roundedCircle />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}} className={classes.carddiv}>
                    <Card style={{ width: '50rem'}}>
                        <Card.Header>
                            Your Account
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                            Welcome Back, <b>{this.state.name}</b>
                            </Card.Title>
                            <Card.Subtitle>
                                Manage your Info, Privacy, and Security settings to make <b>FINEX</b> yours. 
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}} className={classes.carddiv}>
                    <Card style={{ width: '50rem'}}>
                        <Card.Header>
                            Personal Information
                        </Card.Header>
                        <Card.Body>
                            <div>
                                Username: <b>{this.state.username}</b>
                            </div>
                            <div>
                                Email: <b>{this.state.email}</b>&nbsp;&nbsp;
                                <Badge variant="success" onClick={() => history.push(RESET_PASS_PATH)}>Update Email</Badge>
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
