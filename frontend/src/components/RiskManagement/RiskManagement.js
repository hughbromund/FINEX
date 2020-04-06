import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Zoom from 'react-reveal/Zoom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'


import { DarkModeContext } from "../../contexts/DarkModeContext";

class RiskManagement extends Component {
  render() {
    return (
      <Zoom>
        <Jumbotron className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
          <h1>What Is Risk?</h1>
          <p>
            Every Investment decision we make carries some chance that our asset's value go down. This chance we take is
            called risk. We're here to help you naviagate understanding risk in your investment decisions.
          </p>
        </Jumbotron>
        <div>
          <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
            <Card.Body>
              hello
          </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ height: '60rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
            <Card.Body>
              anotha
          </Card.Body>
          </Card>
        </div>
      </Zoom>
    );
  }
}

RiskManagement.contextType = DarkModeContext;
export default RiskManagement;
