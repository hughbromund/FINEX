import React, { Component } from "react";
import classes from "./NavigationBar.module.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import history from "../routing/History";
import { YOUR_STOCKS_PATH, LOGIN_PATH } from "../constants/Constants";
import { REGISTRATION_PATH } from "../constants/Constants";
import { SEARCH_STOCK_PATH } from "../constants/Constants";
import { HOME_PATH } from "../constants/Constants"
import { ACCOUNT_PATH } from "../constants/Constants"
import { USER_INFO_URL } from "../constants/Constants"
// import { LOGIN_PATH } from "../constants/Constants"

/*
 * Code Snippets borrowed From:
 *
 * https://react-bootstrap.github.io/components/alerts
 * https://stackoverflow.com/questions/41111954/react-bootstrap-nav-bar-styling/43381613
 *
 */

export default class NavigationBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username : "",
      loggedIn : false
    }
  }

  callUserInfo = async () => {
    var response = await fetch(USER_INFO_URL,{
        method: "GET",
        withCredentials : true,
        // credentials: 'same-origin'
    })
    if (response.status == 200) {
      var body = await response.json()
      // console.log(body.user.username)
      this.setState({username : body.username})
      this.setState({loggedIn:true})
    }
}

  componentDidMount() {
    this.callUserInfo().catch(err => {
      console.log(err)
    })
  }


  render() {
    const loggedIn = this.state.loggedIn;
    let optional;
    if (loggedIn) {
      optional = <Navbar.Text>
      SIGNED IN AS: <a onClick={() => history.push(ACCOUNT_PATH)} >{this.state.username}</a>
      </Navbar.Text>
    } else {
      optional = <div>
        <Button variant="success" onClick={() => history.push(LOGIN_PATH)}>Login</Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="outline-success" onClick={() => history.push(REGISTRATION_PATH)}>Sign Up</Button>
        </div>
    }
    return (
      <div>
        <Navbar
          fixed="top"
          expand="lg"
          variant="dark"
          className={classes.navbar}
        >
          <Navbar.Brand onClick={() => history.push(HOME_PATH)}>
            <img
              src={require("../assets/img/logo-white.png")}
              className="d-inline-block align-top"
              width="150"
              alt="FINEX"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="STOCKS" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => history.push(YOUR_STOCKS_PATH)}
                >
                  YOUR STOCKS
                </NavDropdown.Item>
                <NavDropdown.Item 
                    onClick={() => history.push(SEARCH_STOCK_PATH)}
                >
                  FIND A STOCK
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  MARKET TRENDS
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#link">FINANCE</Nav.Link>
              <NavDropdown title="BUDGETING" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  ADD A NEW ITEM
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  VIEW YOUR BUDGET
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  MAKE YOUR MONEY WORK
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              {optional}
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
