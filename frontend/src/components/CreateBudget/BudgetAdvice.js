import React, { Component } from "react";

import Alert from "react-bootstrap/Alert";

export default class BudgetAdvice extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      data: nextProps.budget,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.budget,
    };
  }

  render() {
    return (
      <div>
        <h2>Budget Advice</h2>
        <Alert variant="warning">Test</Alert>
      </div>
    );
  }
}
