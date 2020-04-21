import React, { Component } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import history from "../../routing/History";
import { INVESTMENT_TACTICS_PATH } from "../../constants/Constants";
import classes from "./AlertRisk.module.css";

export default class AlertRisk extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <div className={classes.cont}>
                <Alert variant={"danger"} className={classes.alert}>
                  By moving on to our investment page, you acknowledge that you
                  understand the risks of investing and that you do not hold
                  FINEX or its developers liable for any losses incurred by
                  advice given in this website. We are not a financial advisor
                  and do not attempt to be.
                  <br />
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
