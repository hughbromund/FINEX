import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Card from 'react-bootstrap/Card'
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import history from "../routing/History";
import classes from "./IncomeItemForm.module.css";

export default class IncomeItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      name: "",
      type: "Rent"
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "50rem" }}>
            <Jumbotron className={classes.jumbo}>
              <h1>Welcome to FINEX's Add Income Form!</h1>
              <p>Below, you may input a new income to your budget!</p>
            </Jumbotron>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>

                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="number"
                    placeholder="e.g. 50"
                    onChange={this.handleAmountChange}
                    value={this.state.amount}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="e.g. paycheck"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.handleTypeChange}
                  value={this.state.type}
                >
                  <option>Income</option>
                  <option>Gift</option>
                </Form.Control>
              </Form.Group>

              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
