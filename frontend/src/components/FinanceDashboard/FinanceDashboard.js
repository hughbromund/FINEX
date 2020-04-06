import React, { Component } from "react";

import classes from "./FinanceDashboard.module.css";

import TransactionToast from "./TransactionToast";
import MonthProgress from "./MonthProgress";
import CategoryProgress from "./CategoryProgress";
import history from "../../routing/History";

import {
  GET_EXPENSE_LIST,
  LOGIN_PATH,
  GET_INCOME_LIST,
  GET_CATEGORY_BUDGET,
  ADD_BUDGET_ITEM,
  ADD_INCOME_ITEM,
} from "../../constants/Constants";

// import Jumbotron from 'react-bootstrap/Jumbotron'
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// import Toast from "react-bootstrap/Toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DarkModeContext } from "../../contexts/DarkModeContext";

export default class FinanceDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionToasts: "",
      incomeToasts: "",
      categoryProgresses: "",
    };
    this.generateTransactions = this.generateTransactions.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.getIncomes = this.getIncomes.bind(this);
    this.getBudgetCategories = this.getBudgetCategories.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
    this.getIncomes();
    this.getBudgetCategories();
  }

  getIncomes = async () => {
    // console.log(GET_INCOME_LIST)
    var response = await fetch(GET_INCOME_LIST, {
      method: "GET",
      withCredentials: true,
      // credentials: 'same-origin'
    }).catch((err) => {
      console.error(err);
    });

    if (response.status === 400) {
      // User not logged in
      history.push(LOGIN_PATH);
      return;
    }

    var body = await response.json();
    // console.log(body)

    this.setState({
      income: body,
    });

    var transactionToasts = this.generateIncomes();
    // console.log(transactionToasts)
    this.setState({
      incomeToasts: transactionToasts,
    });
    // console.log(this.state)
  };

  getTransactions = async () => {
    var response = await fetch(GET_EXPENSE_LIST, {
      method: "GET",
      withCredentials: true,
      // credentials: 'same-origin'
    }).catch((err) => {
      console.error(err);
    });

    if (response.status === 400) {
      // User not logged in
      history.push(LOGIN_PATH);
      return;
    }

    var body = await response.json();
    //console.log(body)

    this.setState({
      transactions: body,
    });

    var transactionToasts = this.generateTransactions();
    // console.log(transactionToasts)
    this.setState({
      transactionToasts: transactionToasts,
    });
    // console.log(this.state)
  };

  getBudgetCategories = async () => {
    var response = await fetch(GET_CATEGORY_BUDGET, {
      method: "GET",
      withCredentials: true,
      // credentials: 'same-origin'
    }).catch((err) => {
      console.error(err);
    });
    var body = await response.json();
    // console.log(body)

    const inputs = [];
    for (let i = 0; i < body.length; i++) {
      inputs.push(
        <div key={i}>
          <CategoryProgress
            category={body[i].category}
            currentSpending={body[i].spent}
            budgetedSpending={body[i].budgeted}
          ></CategoryProgress>
        </div>
      );
    }

    this.setState({
      categoryProgresses: inputs,
    });
  };

  generateTransactions() {
    //console.log("Called")
    // console.log(response)
    //this.getTransactions()

    // console.log(this.state.transactions)

    const inputs = [];
    for (let i = 0; i < this.state.transactions.length; i++) {
      inputs.push(
        <div key={i}>
          <TransactionToast
            amount={this.state.transactions[i].cost}
            classification={this.state.transactions[i].type}
            name={this.state.transactions[i].name}
            type={this.state.transactions[i].category}
          ></TransactionToast>
        </div>
      );
    }
    // console.log(inputs)
    return inputs;
  }

  generateIncomes() {
    const inputs = [];
    for (let i = 0; i < this.state.income.length; i++) {
      inputs.push(
        <div key={i}>
          <TransactionToast
            amount={this.state.income[i].cost}
            classification={this.state.income[i].type}
            name={this.state.income[i].name}
            type={this.state.income[i].category}
          ></TransactionToast>
        </div>
      );
    }
    //console.log(inputs)
    return inputs;
  }

  render() {
    // this.generateTransactions()
    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
      >
        <Navbar sticky="top" variant="dark" className={classes.navbar}>
          <Container>
            <Navbar.Brand>
              <b>Your Finance Dashboard</b>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container fluid>
          <Row>
            <Col>
              <Card
                className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
                style={{ flex: 1 }}
              >
                <Card.Header>
                  <b>Your Recent Transactions</b>
                </Card.Header>
              </Card>
              <br />
              <Card
                className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
              >
                <Card.Header>
                  <b>Add a new Transaction</b>
                </Card.Header>
                <Card.Body>
                  <Button
                    variant="success"
                    onClick={() => history.push(ADD_BUDGET_ITEM)}
                  >
                    Add a Transaction
                  </Button>
                </Card.Body>
              </Card>
              {this.state.transactionToasts}
            </Col>
            <Col>
              <Card
                className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
                style={{ flex: 1 }}
              >
                <Card.Header>
                  <b>Your Recent Income</b>
                </Card.Header>
              </Card>
              <br />
              <Card
                className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
              >
                <Card.Header>
                  <b>Add a new Income</b>
                </Card.Header>
                <Card.Body>
                  <Button
                    variant="success"
                    onClick={() => history.push(ADD_INCOME_ITEM)}
                  >
                    Add an Income
                  </Button>
                </Card.Body>
              </Card>
              {this.state.incomeToasts}
            </Col>
            <Col>
              <Row>
                <Card
                  className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
                  style={{ flex: 1 }}
                >
                  <Card.Header>
                    <b>Monthly Budget Progress</b>
                  </Card.Header>
                  <Card.Body>
                    <MonthProgress onTrack={false}></MonthProgress>
                  </Card.Body>
                </Card>
              </Row>
              <br />
              <Row>
                <Card
                  className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
                  style={{ flex: 1 }}
                >
                  <Card.Header>
                    <b>Category Breakdown</b>
                  </Card.Header>
                  <Card.Body>{this.state.categoryProgresses}</Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

FinanceDashboard.contextType = DarkModeContext;
