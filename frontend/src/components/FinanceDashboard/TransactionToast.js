import React, { Component } from "react";

// import Toast from "react-bootstrap/Toast";
import Card from "react-bootstrap/Card";
import { DarkModeContext } from "../../contexts/DarkModeContext";

export default class TransactionToast extends Component {
  render() {
    // console.log(this.props)
    const amount = this.props.amount;
    const classification = this.props.classification;
    const name = this.props.name;
    const type = this.props.type;
    const fixedType = type.charAt(0).toUpperCase() + type.substring(1);

    return (
      <div>
        <Card
          className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
          style={{ flex: 1 }}
        >
          <Card.Header>
            <b>{fixedType}</b>
          </Card.Header>
          <Card.Body>
            <b>Name:</b> {name} <br />
            <b>Total Cost:</b> ${amount} <br />
            <b>Category:</b> {classification}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

TransactionToast.contextType = DarkModeContext;
