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
import classes from "./BudgetItemForm.module.css";

export default class BudgetItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cost: "",
      name: "",
      type: "Rent"
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
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

  handleCostChange(event) {
    this.setState({ cost: event.target.value });
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.innerDiv}>
          <Jumbotron className={classes.jumbo}>
            <h1>Welcome to FINEX's Stock Search Page!</h1>
            <p>
              Below, you may search for a stock by symbol or name. Clicking on
              the stock will bring you to its own, dedicated screen where you
              can learn more about its recent trends.
            </p>
          </Jumbotron>
        </div>
        <div className={classes.innerDiv}>
          <Form style={{ width: "50rem" }} onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Cost</Form.Label>

              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="e.g. 50"
                  onChange={this.handleCostChange}
                  value={this.state.cost}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="e.g. water bill"
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
                <option>Rent</option>
                <option>Utilities</option>
                <option>Transportation</option>
                <option>Personal</option>
                <option>Medical</option>
                <option>Saving/Investing</option>
              </Form.Control>
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
