import React, { Component } from "react";
import { Container, Row, Col, Alert, Button, Jumbotron } from "react-bootstrap";
import history from "../../routing/History";
import {
  INVESTMENT_TACTICS_PATH,
  RISK_MANAGEMENT_PATH,
  SET_WARNING_STATUS,
} from "../../constants/Constants";
import classes from "./AlertRisk.module.css";

export default class AlertRisk extends Component {
  state = {};
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col className={classes.mycol}>
              <div className={classes.cont}>
                <Alert variant={"danger"} className={classes.alert}>
                  <h1>FINEX OFFICIAL DISCLAIMER</h1>
                  By moving on to our investment page, you acknowledge that you
                  understand the risks of investing and that you do not hold
                  FINEX or its developers liable for any losses incurred by
                  advice given in this website. We are not a financial advisor
                  and do not attempt to be.
                  <hr />
                  <Button
                    variant={"danger"}
                    onClick={() => {
                      fetch(SET_WARNING_STATUS, {
                        method: "POST",
                        withCredentials: true,
                        headers: {
                          "Content-Type": "application/json",
                          credentials: "include",
                        },
                        body: JSON.stringify({ accepted_warnings: true }),
                      });
                      history.push(RISK_MANAGEMENT_PATH);
                    }}
                  >
                    I would like to learn more about the risks involved in
                    investing.
                  </Button>
                  &nbsp; &nbsp; &nbsp;
                  <Button
                    variant={"success"}
                    onClick={() => history.push(INVESTMENT_TACTICS_PATH)}
                  >
                    I accept and acknowledge these risks.
                  </Button>
                </Alert>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
