import React, { Component } from "react";
import classes from "./HomePage.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import history from "../routing/History";
import { REGISTRATION_PATH } from "../constants/Constants";
import { LOGIN_PATH } from "../constants/Constants"

export default class HomePage extends Component {
  render() {
    return (
      <div className={classes.container}>
        <Container>
          <Row noGutters={true}>
            <Col className={classes.mycol}>
              <div className={classes.cont}>
                <img
                  className={classes.logo}
                  src={require("../assets/img/logo-white.png")}
                ></img>
                <h2 className={classes.text}>
                  Let's make your money work for you.
                </h2>
                <br />
                <Button variant="success" size="lg" onClick={() => history.push(REGISTRATION_PATH)}>
                  Get started!
                </Button>
                <br />
                <br />
                <p className={classes.text}>
                  Already have an account, Sign in bellow.
                </p>
                <Button variant="success" size="lg" onClick={() => history.push(LOGIN_PATH)}>
                  Log In
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
