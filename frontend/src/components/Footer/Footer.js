import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg" variant="dark" sticky="bottom" bg="dark">
          <Navbar.Brand href="#">
            Copyright 2020 Finex. All Rights Reserved.
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}
