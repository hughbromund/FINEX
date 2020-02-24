import React, { Component } from "react";
import classes from "./NavigationBar.module.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import history from "../routing/History";
import { YOUR_STOCKS_PATH } from "../constants/Constants";
import { REGISTRATION_PATH } from "../constants/Constants";
import { SEARCH_STOCK_PATH } from "../constants/Constants";

/*
 * Code Snippets borrowed From:
 *
 * https://react-bootstrap.github.io/components/alerts
 * https://stackoverflow.com/questions/41111954/react-bootstrap-nav-bar-styling/43381613
 *
 */

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar
          fixed="top"
          expand="lg"
          variant="dark"
          className={classes.navbar}
        >
          <Navbar.Brand href="#home">
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
              <Navbar.Text>
                SIGNED IN AS: <a onClick={() => history.push(REGISTRATION_PATH)} >Hugh Bromund</a>
              </Navbar.Text>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
