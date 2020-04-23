import React, { Component } from "react";
import classes from "./NavigationBar.module.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import history from "../../routing/History";

import {
  YOUR_STOCKS_PATH,
  LOGIN_PATH,
  REGISTRATION_PATH,
  SEARCH_STOCK_PATH,
  COMPARE_STOCKS_PATH,
  HOME_PATH,
  ACCOUNT_PATH,
  USER_INFO_URL,
  FINANCE_DASHBOARD,
  ADD_BUDGET_ITEM,
  ADD_INCOME_ITEM,
  CREATE_NEW_BUDGET,
  RISK_MANAGEMENT_PATH,
  INVESTMENT_TACTICS_PATH,
  STOCKS_PAGE_PATH,
  ALERT_RISK,
  GET_WARNING_STATUS,
} from "../../constants/Constants";

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
    super(props);

    this.state = {
      username: "",
      name: "",
      loggedIn: false,
    };
  }

  callUserInfo = async () => {
    var response = await fetch(USER_INFO_URL, {
      method: "GET",
      credentials: "include",
      // credentials: 'same-origin'
    });
    if (response.status === 200 || response.status === 304) {
      var body = await response.json();
      // console.log(body.user.username)
      this.setState({ username: body.username, name: body.name });
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  };

  componentDidMount() {
    this.callUserInfo().catch((err) => {
      console.log(err);
    });
  }

  render() {
    const loggedIn = this.state.loggedIn;
    let optional;
    if (loggedIn) {
      optional = (
        <Navbar.Text>
          SIGNED IN AS:{" "}
          <a onClick={() => history.push(ACCOUNT_PATH)}>{this.state.name}</a>
        </Navbar.Text>
      );
    } else {
      optional = (
        <div>
          <Button variant="success" onClick={() => history.push(LOGIN_PATH)}>
            Log In
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="outline-success"
            onClick={() => history.push(REGISTRATION_PATH)}
          >
            Sign Up
          </Button>
        </div>
      );
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
              src={require("../../assets/img/logo-white.png")}
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
                  onClick={() => history.push(SEARCH_STOCK_PATH)}
                >
                  FIND A STOCK
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => history.push(COMPARE_STOCKS_PATH)}
                >
                  COMPARE STOCKS
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => history.push(STOCKS_PAGE_PATH)}
                >
                  YOUR STOCKS
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={async () => {
                    var res = await fetch(GET_WARNING_STATUS, {
                      method: "GET",
                      credentials: "include",
                      withCredentials: true,
                    });
                    const body = await res.json();
                    console.log(body);
                    console.log(res);
                    if (body.accepted_warnings) {
                      history.push(INVESTMENT_TACTICS_PATH);
                    } else {
                      history.push(ALERT_RISK);
                    }
                  }}
                >
                  INVESTMENT TACTICS
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => history.push(FINANCE_DASHBOARD)}>
                FINANCE
              </Nav.Link>
              <NavDropdown title="BUDGETING" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => history.push(ADD_BUDGET_ITEM)}>
                  ADD A NEW ITEM
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => history.push(ADD_INCOME_ITEM)}>
                  ADD A NEW INCOME
                </NavDropdown.Item>
                <NavDropdown.Item>VIEW YOUR BUDGET</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => history.push(CREATE_NEW_BUDGET)}
                >
                  CREATE A NEW BUDGET
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => history.push(RISK_MANAGEMENT_PATH)}
                >
                  RISK MANAGEMENT
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>{optional}</Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
